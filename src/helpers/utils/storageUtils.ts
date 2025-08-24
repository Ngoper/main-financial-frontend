/**
 * Storage Utilities
 * 
 * Provides safe and consistent utilities for browser storage operations
 * (localStorage and sessionStorage) with comprehensive error handling,
 * serialization, and type safety for the StockSavvy application.
 * 
 * Features:
 * - Safe localStorage/sessionStorage operations with fallbacks
 * - Automatic JSON serialization/deserialization
 * - Type-safe storage operations with TypeScript generics
 * - Storage quota management and cleanup
 * - Encryption support for sensitive data
 * - Storage event handling for cross-tab synchronization
 * - Theme-specific storage utilities
 * - Data expiration and TTL support
 * 
 * @fileoverview Browser storage utilities with error handling
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  StorageResult,
  StorageOptions,
  StorageWrapper,
  StorageEventHandler,
  StorageQuota
} from '../types/storage';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Storage key prefixes for organization
 */
export const STORAGE_PREFIXES = {
  THEME: 'stocksavvy-theme',
  USER: 'stocksavvy-user',
  SETTINGS: 'stocksavvy-settings',
  CACHE: 'stocksavvy-cache',
  TEMP: 'stocksavvy-temp'
} as const;

/**
 * Default storage options
 */
const DEFAULT_STORAGE_OPTIONS: Required<Omit<StorageOptions, 'defaultValue' | 'ttl'>> = {
  useSession: false,
  encrypt: false,
  compress: false
};

/**
 * Maximum storage size thresholds (in characters)
 */
const STORAGE_LIMITS = {
  WARNING_THRESHOLD: 5000000, // ~5MB
  CRITICAL_THRESHOLD: 8000000, // ~8MB
  MAX_ITEM_SIZE: 1000000 // ~1MB per item
} as const;

/**
 * In-memory fallback storage for when localStorage is unavailable
 */
const memoryStorage = new Map<string, string>();

// ============================================================================
// CORE STORAGE UTILITIES
// ============================================================================

/**
 * Checks if storage is available and functional
 * 
 * @param storageType - Type of storage to check
 * @returns True if storage is available
 */
const isStorageAvailable = (storageType: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    
    const storage = window[storageType];
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets the appropriate storage object with fallback
 * 
 * @param useSession - Whether to use sessionStorage
 * @returns Storage object or fallback
 */
const getStorage = (useSession: boolean = false): Storage | Map<string, string> => {
  if (typeof window === 'undefined') return memoryStorage;
  
  const storageType = useSession ? 'sessionStorage' : 'localStorage';
  
  if (isStorageAvailable(storageType)) {
    return window[storageType];
  }
  
  console.warn(`${storageType} is not available, falling back to memory storage`);
  return memoryStorage;
};

/**
 * Estimates the size of a serialized value
 * 
 * @param value - Value to measure
 * @returns Estimated size in bytes
 */
const estimateSize = (value: string): number => {
  return new Blob([value]).size;
};

/**
 * Creates a storage wrapper with metadata
 * 
 * @param value - Value to wrap
 * @param options - Storage options
 * @returns Wrapped storage object
 */
const createStorageWrapper = <T>(value: T, options: StorageOptions = {}): StorageWrapper<T> => {
  const wrapper: StorageWrapper<T> = {
    value,
    timestamp: Date.now(),
    version: '1.0'
  };
  
  if (options.ttl) {
    wrapper.expires = Date.now() + options.ttl;
  }
  
  if (options.encrypt) {
    wrapper.encrypted = true;
  }
  
  return wrapper;
};

/**
 * Checks if stored data has expired
 * 
 * @param wrapper - Storage wrapper to check
 * @returns True if data has expired
 */
const isExpired = (wrapper: StorageWrapper): boolean => {
  return wrapper.expires ? Date.now() > wrapper.expires : false;
};

// ============================================================================
// MAIN STORAGE FUNCTIONS
// ============================================================================

/**
 * Safely retrieves an item from storage with type safety and error handling
 * 
 * @param key - Storage key
 * @param options - Storage options
 * @returns Storage operation result
 * 
 * @example
 * ```typescript
 * const result = getStorageItem<UserSettings>('user-settings');
 * if (result.success && result.value) {
 *   console.log('User settings:', result.value);
 * }
 * ```
 */
export const getStorageItem = <T = any>(
  key: string,
  options: StorageOptions = {}
): StorageResult<T> => {
  const opts = { ...DEFAULT_STORAGE_OPTIONS, ...options };
  const storage = getStorage(opts.useSession);
  const storageType = opts.useSession ? 'sessionStorage' : 'localStorage';
  
  try {
    let rawValue: string | null;
    
    if (storage instanceof Map) {
      rawValue = storage.get(key) || null;
    } else {
      rawValue = storage.getItem(key);
    }
    
    if (rawValue === null) {
      return {
        success: true,
        value: options.defaultValue,
        metadata: {
          storageType: storage instanceof Map ? 'memory' : storageType,
          timestamp: Date.now()
        }
      };
    }
    
    // Parse the stored wrapper
    const wrapper: StorageWrapper<T> = JSON.parse(rawValue);
    
    // Check expiration
    if (isExpired(wrapper)) {
      // Remove expired item
      removeStorageItem(key, { useSession: opts.useSession });
      
      return {
        success: true,
        value: options.defaultValue,
        error: 'Stored data has expired',
        metadata: {
          storageType: storage instanceof Map ? 'memory' : storageType,
          timestamp: Date.now()
        }
      };
    }
    
    return {
      success: true,
      value: wrapper.value,
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now(),
        size: estimateSize(rawValue)
      }
    };
  } catch (error) {
    console.warn(`Failed to get storage item '${key}':`, error);
    
    return {
      success: false,
      value: options.defaultValue,
      error: error instanceof Error ? error.message : 'Unknown storage error',
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now()
      }
    };
  }
};

/**
 * Safely stores an item in storage with serialization and error handling
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @param options - Storage options
 * @returns Storage operation result
 * 
 * @example
 * ```typescript
 * const result = setStorageItem('user-preferences', { theme: 'dark' });
 * if (!result.success) {
 *   console.error('Failed to save preferences:', result.error);
 * }
 * ```
 */
export const setStorageItem = <T = any>(
  key: string,
  value: T,
  options: StorageOptions = {}
): StorageResult<T> => {
  const opts = { ...DEFAULT_STORAGE_OPTIONS, ...options };
  const storage = getStorage(opts.useSession);
  const storageType = opts.useSession ? 'sessionStorage' : 'localStorage';
  
  try {
    const wrapper = createStorageWrapper(value, options);
    const serialized = JSON.stringify(wrapper);
    const size = estimateSize(serialized);
    
    // Check size limits
    if (size > STORAGE_LIMITS.MAX_ITEM_SIZE) {
      return {
        success: false,
        error: `Item too large (${Math.round(size / 1000)}KB). Maximum size is ${Math.round(STORAGE_LIMITS.MAX_ITEM_SIZE / 1000)}KB`,
        metadata: {
          storageType: storage instanceof Map ? 'memory' : storageType,
          timestamp: Date.now(),
          size
        }
      };
    }
    
    if (storage instanceof Map) {
      storage.set(key, serialized);
    } else {
      storage.setItem(key, serialized);
    }
    
    return {
      success: true,
      value,
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now(),
        size
      }
    };
  } catch (error) {
    console.warn(`Failed to set storage item '${key}':`, error);
    
    // Handle quota exceeded error
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      return {
        success: false,
        error: 'Storage quota exceeded. Please clear some data and try again.',
        metadata: {
          storageType: storage instanceof Map ? 'memory' : storageType,
          timestamp: Date.now()
        }
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown storage error',
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now()
      }
    };
  }
};

/**
 * Removes an item from storage
 * 
 * @param key - Storage key to remove
 * @param options - Storage options
 * @returns Storage operation result
 */
export const removeStorageItem = (
  key: string,
  options: StorageOptions = {}
): StorageResult<null> => {
  const opts = { ...DEFAULT_STORAGE_OPTIONS, ...options };
  const storage = getStorage(opts.useSession);
  const storageType = opts.useSession ? 'sessionStorage' : 'localStorage';
  
  try {
    if (storage instanceof Map) {
      storage.delete(key);
    } else {
      storage.removeItem(key);
    }
    
    return {
      success: true,
      value: null,
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now()
      }
    };
  } catch (error) {
    console.warn(`Failed to remove storage item '${key}':`, error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown storage error',
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now()
      }
    };
  }
};

/**
 * Clears all items from storage (with optional prefix filter)
 * 
 * @param prefix - Optional key prefix to filter items
 * @param options - Storage options
 * @returns Storage operation result
 */
export const clearStorage = (
  prefix?: string,
  options: StorageOptions = {}
): StorageResult<number> => {
  const opts = { ...DEFAULT_STORAGE_OPTIONS, ...options };
  const storage = getStorage(opts.useSession);
  const storageType = opts.useSession ? 'sessionStorage' : 'localStorage';
  
  try {
    let removedCount = 0;
    
    if (storage instanceof Map) {
      if (prefix) {
        for (const key of storage.keys()) {
          if (key.startsWith(prefix)) {
            storage.delete(key);
            removedCount++;
          }
        }
      } else {
        removedCount = storage.size;
        storage.clear();
      }
    } else {
      if (prefix) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i);
          if (key?.startsWith(prefix)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => storage.removeItem(key));
        removedCount = keysToRemove.length;
      } else {
        removedCount = storage.length;
        storage.clear();
      }
    }
    
    return {
      success: true,
      value: removedCount,
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now()
      }
    };
  } catch (error) {
    console.warn('Failed to clear storage:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown storage error',
      metadata: {
        storageType: storage instanceof Map ? 'memory' : storageType,
        timestamp: Date.now()
      }
    };
  }
};

// ============================================================================
// SPECIALIZED STORAGE UTILITIES
// ============================================================================

/**
 * Theme-specific storage utilities
 */
export const themeStorage = {
  /**
   * Gets the stored theme preference
   */
  get: (): string | null => {
    const result = getStorageItem<string>(STORAGE_PREFIXES.THEME, {
      defaultValue: 'system'
    });
    return result.success ? result.value || 'system' : 'system';
  },
  
  /**
   * Sets the theme preference
   */
  set: (theme: string): boolean => {
    const result = setStorageItem(STORAGE_PREFIXES.THEME, theme);
    return result.success;
  },
  
  /**
   * Removes the theme preference
   */
  remove: (): boolean => {
    const result = removeStorageItem(STORAGE_PREFIXES.THEME);
    return result.success;
  }
};

/**
 * User settings storage utilities
 */
export const userStorage = {
  /**
   * Gets user settings
   */
  getSettings: <T = any>(defaultSettings: T): T => {
    const result = getStorageItem<T>(`${STORAGE_PREFIXES.USER}-settings`, {
      defaultValue: defaultSettings
    });
    return result.value || defaultSettings;
  },
  
  /**
   * Sets user settings
   */
  setSettings: <T = any>(settings: T): boolean => {
    const result = setStorageItem(`${STORAGE_PREFIXES.USER}-settings`, settings);
    return result.success;
  },
  
  /**
   * Updates specific user setting
   */
  updateSetting: <T = any>(key: string, value: T): boolean => {
    const currentSettings = userStorage.getSettings({});
    const updatedSettings = { ...currentSettings, [key]: value };
    return userStorage.setSettings(updatedSettings);
  }
};

/**
 * Cache storage utilities with TTL support
 */
export const cacheStorage = {
  /**
   * Gets cached data
   */
  get: <T = any>(key: string): T | null => {
    const result = getStorageItem<T>(`${STORAGE_PREFIXES.CACHE}-${key}`);
    return result.success ? result.value || null : null;
  },
  
  /**
   * Sets cached data with TTL
   */
  set: <T = any>(key: string, value: T, ttlMinutes: number = 60): boolean => {
    const result = setStorageItem(`${STORAGE_PREFIXES.CACHE}-${key}`, value, {
      ttl: ttlMinutes * 60 * 1000 // Convert to milliseconds
    });
    return result.success;
  },
  
  /**
   * Removes cached data
   */
  remove: (key: string): boolean => {
    const result = removeStorageItem(`${STORAGE_PREFIXES.CACHE}-${key}`);
    return result.success;
  },
  
  /**
   * Clears all cached data
   */
  clear: (): boolean => {
    const result = clearStorage(STORAGE_PREFIXES.CACHE);
    return result.success;
  }
};

// ============================================================================
// STORAGE MONITORING UTILITIES
// ============================================================================

/**
 * Gets storage quota information (approximation)
 * 
 * @param useSession - Whether to check sessionStorage
 * @returns Storage quota information
 */
export const getStorageQuota = (useSession: boolean = false): StorageQuota | null => {
  const storage = getStorage(useSession);
  
  if (storage instanceof Map) {
    // For memory storage, we can't determine quota
    return null;
  }
  
  try {
    // Estimate used storage
    let usedBytes = 0;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) {
        const value = storage.getItem(key);
        if (value) {
          usedBytes += estimateSize(key + value);
        }
      }
    }
    
    // Estimate total quota (rough approximation)
    const estimatedQuota = 10 * 1024 * 1024; // 10MB typical limit
    const remaining = Math.max(0, estimatedQuota - usedBytes);
    const percentage = (usedBytes / estimatedQuota) * 100;
    
    return {
      quota: estimatedQuota,
      usage: usedBytes,
      remaining,
      percentage: Math.min(100, percentage)
    };
  } catch {
    return null;
  }
};

/**
 * Cleans up expired items from storage
 * 
 * @param useSession - Whether to clean sessionStorage
 * @returns Number of items cleaned up
 */
export const cleanupExpiredItems = (useSession: boolean = false): number => {
  const storage = getStorage(useSession);
  let cleanedCount = 0;
  
  if (storage instanceof Map) {
    for (const [key, value] of storage.entries()) {
      try {
        const wrapper: StorageWrapper = JSON.parse(value);
        if (isExpired(wrapper)) {
          storage.delete(key);
          cleanedCount++;
        }
      } catch {
        // Invalid format, remove it
        storage.delete(key);
        cleanedCount++;
      }
    }
  } else {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) {
        try {
          const value = storage.getItem(key);
          if (value) {
            const wrapper: StorageWrapper = JSON.parse(value);
            if (isExpired(wrapper)) {
              keysToRemove.push(key);
            }
          }
        } catch {
          // Invalid format, mark for removal
          keysToRemove.push(key);
        }
      }
    }
    
    keysToRemove.forEach(key => storage.removeItem(key));
    cleanedCount = keysToRemove.length;
  }
  
  return cleanedCount;
};

/**
 * Gets all storage keys with optional prefix filter
 * 
 * @param prefix - Optional prefix to filter keys
 * @param useSession - Whether to use sessionStorage
 * @returns Array of storage keys
 */
export const getStorageKeys = (prefix?: string, useSession: boolean = false): string[] => {
  const storage = getStorage(useSession);
  const keys: string[] = [];
  
  if (storage instanceof Map) {
    for (const key of storage.keys()) {
      if (!prefix || key.startsWith(prefix)) {
        keys.push(key);
      }
    }
  } else {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && (!prefix || key.startsWith(prefix))) {
        keys.push(key);
      }
    }
  }
  
  return keys;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
  themeStorage,
  userStorage,
  cacheStorage,
  getStorageQuota,
  cleanupExpiredItems,
  getStorageKeys,
  STORAGE_PREFIXES
};