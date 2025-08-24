/**
 * Storage Types and Interfaces
 * 
 * Centralized type definitions for storage utilities in the StockSavvy
 * application. This includes localStorage, sessionStorage, and cache
 * management types and interfaces.
 * 
 * @fileoverview Type definitions for storage utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// CORE STORAGE TYPES
// ============================================================================

/**
 * Storage operation result interface
 */
export interface StorageResult<T = any> {
  /** Whether the operation was successful */
  success: boolean;
  /** The retrieved/stored value */
  value?: T;
  /** Error message if operation failed */
  error?: string;
  /** Additional metadata about the operation */
  metadata?: {
    /** Storage type used */
    storageType: 'localStorage' | 'sessionStorage' | 'memory';
    /** Operation timestamp */
    timestamp: number;
    /** Data size in bytes (approximation) */
    size?: number;
  };
}

/**
 * Storage configuration options
 */
export interface StorageOptions {
  /** Whether to use sessionStorage instead of localStorage */
  useSession?: boolean;
  /** Default value to return if key doesn't exist */
  defaultValue?: any;
  /** Whether to encrypt the stored value */
  encrypt?: boolean;
  /** Time-to-live in milliseconds */
  ttl?: number;
  /** Whether to compress large objects */
  compress?: boolean;
}

/**
 * Stored data wrapper with metadata
 */
export interface StorageWrapper<T = any> {
  /** The actual stored value */
  value: T;
  /** Timestamp when data was stored */
  timestamp: number;
  /** Optional expiration timestamp */
  expires?: number;
  /** Data version for migration purposes */
  version?: string;
  /** Whether data is encrypted */
  encrypted?: boolean;
}

// ============================================================================
// STORAGE EVENT TYPES
// ============================================================================

/**
 * Storage event handler type
 */
export type StorageEventHandler<T = any> = (
  key: string,
  newValue: T | null,
  oldValue: T | null,
  storageArea: Storage
) => void;

/**
 * Storage event configuration
 */
export interface StorageEventConfig {
  /** Event handler function */
  handler: StorageEventHandler;
  /** Keys to listen for (if empty, listens to all) */
  keys?: string[];
  /** Whether to include initial values */
  includeInitial?: boolean;
}

// ============================================================================
// STORAGE QUOTA TYPES
// ============================================================================

/**
 * Storage quota information
 */
export interface StorageQuota {
  /** Total available storage in bytes */
  quota: number;
  /** Used storage in bytes */
  usage: number;
  /** Remaining storage in bytes */
  remaining: number;
  /** Usage percentage */
  percentage: number;
}

/**
 * Storage monitoring configuration
 */
export interface StorageMonitorConfig {
  /** Warning threshold percentage */
  warningThreshold?: number;
  /** Critical threshold percentage */
  criticalThreshold?: number;
  /** Monitoring interval in milliseconds */
  monitorInterval?: number;
  /** Callback for threshold warnings */
  onWarning?: (quota: StorageQuota) => void;
  /** Callback for critical warnings */
  onCritical?: (quota: StorageQuota) => void;
}

// ============================================================================
// CACHE STORAGE TYPES
// ============================================================================

/**
 * Cache entry metadata
 */
export interface CacheEntry<T = any> {
  /** Cached value */
  value: T;
  /** Cache creation timestamp */
  createdAt: number;
  /** Cache expiration timestamp */
  expiresAt?: number;
  /** Cache access count */
  accessCount?: number;
  /** Last access timestamp */
  lastAccessed?: number;
  /** Cache tags for grouping */
  tags?: string[];
}

/**
 * Cache configuration options
 */
export interface CacheOptions {
  /** Default TTL in milliseconds */
  defaultTTL?: number;
  /** Maximum cache size (number of entries) */
  maxSize?: number;
  /** Cache eviction strategy */
  evictionStrategy?: 'lru' | 'fifo' | 'ttl' | 'manual';
  /** Whether to persist cache to storage */
  persistent?: boolean;
  /** Storage prefix for persistent cache */
  storagePrefix?: string;
}

/**
 * Cache statistics
 */
export interface CacheStats {
  /** Total cache hits */
  hits: number;
  /** Total cache misses */
  misses: number;
  /** Cache hit ratio */
  hitRatio: number;
  /** Current cache size */
  size: number;
  /** Maximum cache size */
  maxSize: number;
  /** Total entries created */
  totalEntries: number;
  /** Total entries evicted */
  evictedEntries: number;
}

// ============================================================================
// USER STORAGE TYPES
// ============================================================================

/**
 * User settings interface
 */
export interface UserSettings {
  /** Theme preference */
  theme?: 'light' | 'dark' | 'system';
  /** Language preference */
  language?: string;
  /** Notification preferences */
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    marketing?: boolean;
  };
  /** Dashboard preferences */
  dashboard?: {
    layout?: 'grid' | 'list';
    widgets?: string[];
    refreshInterval?: number;
  };
  /** Privacy preferences */
  privacy?: {
    analytics?: boolean;
    cookies?: boolean;
    tracking?: boolean;
  };
}

/**
 * User profile interface
 */
export interface UserProfile {
  /** User ID */
  id: string;
  /** Display name */
  name: string;
  /** Email address */
  email: string;
  /** Profile picture URL */
  avatar?: string;
  /** User role */
  role?: string;
  /** Account creation date */
  createdAt: Date;
  /** Last login date */
  lastLogin?: Date;
  /** Profile preferences */
  preferences?: UserSettings;
}

// ============================================================================
// SESSION STORAGE TYPES
// ============================================================================

/**
 * Session data interface
 */
export interface SessionData {
  /** Session ID */
  sessionId: string;
  /** User ID */
  userId?: string;
  /** Session start time */
  startTime: number;
  /** Last activity time */
  lastActivity: number;
  /** Session metadata */
  metadata?: {
    /** User agent */
    userAgent?: string;
    /** IP address */
    ipAddress?: string;
    /** Device information */
    device?: string;
    /** Browser information */
    browser?: string;
  };
  /** Session state */
  state?: Record<string, any>;
}

/**
 * Session configuration
 */
export interface SessionConfig {
  /** Session timeout in milliseconds */
  timeout?: number;
  /** Whether to extend session on activity */
  extendOnActivity?: boolean;
  /** Maximum session duration */
  maxDuration?: number;
  /** Session storage key */
  storageKey?: string;
}

// ============================================================================
// STORAGE MIGRATION TYPES
// ============================================================================

/**
 * Storage migration configuration
 */
export interface StorageMigration {
  /** Migration version */
  version: string;
  /** Migration description */
  description: string;
  /** Migration function */
  migrate: (data: any) => any;
  /** Rollback function */
  rollback?: (data: any) => any;
}

/**
 * Migration history entry
 */
export interface MigrationHistoryEntry {
  /** Migration version */
  version: string;
  /** Applied timestamp */
  appliedAt: number;
  /** Migration success status */
  success: boolean;
  /** Error message if failed */
  error?: string;
}

// ============================================================================
// BACKUP AND RESTORE TYPES
// ============================================================================

/**
 * Storage backup configuration
 */
export interface BackupConfig {
  /** Keys to include in backup */
  includeKeys?: string[];
  /** Keys to exclude from backup */
  excludeKeys?: string[];
  /** Whether to compress backup */
  compress?: boolean;
  /** Backup format */
  format?: 'json' | 'binary';
  /** Include metadata in backup */
  includeMetadata?: boolean;
}

/**
 * Storage backup data
 */
export interface BackupData {
  /** Backup version */
  version: string;
  /** Backup timestamp */
  timestamp: number;
  /** Backup metadata */
  metadata: {
    /** Application version */
    appVersion?: string;
    /** User agent */
    userAgent?: string;
    /** Storage type */
    storageType: 'localStorage' | 'sessionStorage';
  };
  /** Backup entries */
  entries: Record<string, any>;
}

// ============================================================================
// STORAGE VALIDATION TYPES
// ============================================================================

/**
 * Storage validation rule
 */
export interface StorageValidationRule<T = any> {
  /** Rule name */
  name: string;
  /** Validation function */
  validate: (value: T) => boolean;
  /** Error message */
  errorMessage: string;
}

/**
 * Storage schema definition
 */
export interface StorageSchema<T = any> {
  /** Schema version */
  version: string;
  /** Data type */
  type: string;
  /** Validation rules */
  rules: StorageValidationRule<T>[];
  /** Default value */
  defaultValue?: T;
  /** Schema description */
  description?: string;
}

// ============================================================================
// STORAGE EXPORTS HANDLED BY INDIVIDUAL INTERFACE DECLARATIONS
// ============================================================================