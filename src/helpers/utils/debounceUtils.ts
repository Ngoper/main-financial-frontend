/**
 * Performance and Debounce Utilities
 * 
 * Provides performance optimization utilities including debouncing, throttling,
 * and memoization functions for the StockSavvy application. These utilities
 * help optimize user interactions, API calls, and rendering performance.
 * 
 * Features:
 * - Debouncing for search inputs and user interactions
 * - Throttling for scroll and resize events
 * - Memoization for expensive calculations
 * - Request deduplication to prevent duplicate API calls
 * - Performance monitoring and timing utilities
 * - Animation frame utilities for smooth UI updates
 * 
 * @fileoverview Performance optimization utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  DebouncedFunction,
  ThrottledFunction,
  MemoizeOptions,
  PerformanceTiming,
  DedupeOptions,
  BatchProcessingConfig
} from '../types/utils';

// ============================================================================
// DEBOUNCING UTILITIES
// ============================================================================

/**
 * Creates a debounced function that delays execution until after delay milliseconds
 * have elapsed since the last time it was invoked
 * 
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @param immediate - Whether to execute on leading edge
 * @returns Debounced function with cancel and flush capabilities
 * 
 * @example
 * ```typescript
 * const debouncedSearch = debounce((query: string) => {
 *   performSearch(query);
 * }, 300);
 * 
 * // Usage
 * debouncedSearch('apple'); // Will execute after 300ms of no more calls
 * debouncedSearch.cancel(); // Cancel pending execution
 * ```
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean = false
): DebouncedFunction<T> => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastCallTime = 0;
  let lastArgs: Parameters<T> | null = null;
  
  const debouncedFn = (...args: Parameters<T>): void => {
    lastArgs = args;
    lastCallTime = Date.now();
    
    const callNow = immediate && !timeoutId;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func(...args);
      }
    }, delay);
    
    if (callNow) {
      func(...args);
    }
  };
  
  debouncedFn.cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
  };
  
  debouncedFn.flush = (): void => {
    if (timeoutId && lastArgs) {
      debouncedFn.cancel();
      func(...lastArgs);
    }
  };
  
  debouncedFn.pending = (): boolean => {
    return timeoutId !== null;
  };
  
  return debouncedFn;
};

/**
 * Creates a debounced search handler optimized for search inputs
 * 
 * @param searchCallback - Search function to call
 * @param delay - Debounce delay (default: 300ms)
 * @param minLength - Minimum query length to trigger search (default: 1)
 * @returns Debounced search function
 * 
 * @example
 * ```typescript
 * const debouncedSearch = createDebouncedSearch((query) => {
 *   if (query.length >= 2) {
 *     performStockSearch(query);
 *   }
 * });
 * ```
 */
export const createDebouncedSearch = (
  searchCallback: (query: string) => void,
  delay: number = 300,
  minLength: number = 1
): DebouncedFunction<(query: string) => void> => {
  return debounce((query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= minLength) {
      searchCallback(trimmedQuery);
    }
  }, delay);
};

// ============================================================================
// THROTTLING UTILITIES
// ============================================================================

/**
 * Creates a throttled function that only executes at most once per specified interval
 * 
 * @param func - Function to throttle
 * @param interval - Minimum interval between executions in milliseconds
 * @param options - Throttling options
 * @returns Throttled function
 * 
 * @example
 * ```typescript
 * const throttledScrollHandler = throttle((event) => {
 *   updateScrollPosition(event);
 * }, 16); // ~60fps
 * ```
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  interval: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): ThrottledFunction<T> => {
  const { leading = true, trailing = true } = options;
  
  let lastCallTime = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  
  const throttledFn = (...args: Parameters<T>): void => {
    const now = Date.now();
    
    if (!lastCallTime && !leading) {
      lastCallTime = now;
    }
    
    const remainingTime = interval - (now - lastCallTime);
    lastArgs = args;
    
    if (remainingTime <= 0 || remainingTime > interval) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      func(...args);
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        lastCallTime = leading ? Date.now() : 0;
        timeoutId = null;
        if (lastArgs) {
          func(...lastArgs);
        }
      }, remainingTime);
    }
  };
  
  throttledFn.cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastCallTime = 0;
    lastArgs = null;
  };
  
  throttledFn.flush = (): void => {
    if (timeoutId && lastArgs) {
      throttledFn.cancel();
      func(...lastArgs);
    }
  };
  
  return throttledFn;
};

/**
 * Creates a throttled function optimized for scroll events
 * 
 * @param callback - Scroll handler function
 * @param fps - Target frames per second (default: 60)
 * @returns Throttled scroll handler
 */
export const createThrottledScrollHandler = (
  callback: (event: Event) => void,
  fps: number = 60
): ThrottledFunction<(event: Event) => void> => {
  const interval = 1000 / fps;
  return throttle(callback, interval, { leading: true, trailing: true });
};

// ============================================================================
// MEMOIZATION UTILITIES
// ============================================================================

/**
 * Creates a memoized version of a function with configurable caching
 * 
 * @param func - Function to memoize
 * @param options - Memoization options
 * @returns Memoized function with cache management
 * 
 * @example
 * ```typescript
 * const memoizedCalculation = memoize((a: number, b: number) => {
 *   // Expensive calculation
 *   return Math.pow(a, b);
 * }, { maxSize: 100, ttl: 5000 });
 * ```
 */
export const memoize = <T extends (...args: any[]) => any>(
  func: T,
  options: MemoizeOptions = {}
): T & { cache: Map<string, any>; clear: () => void } => {
  const {
    maxSize = 100,
    ttl,
    keyGenerator = (...args) => JSON.stringify(args)
  } = options;
  
  const cache = new Map<string, { value: ReturnType<T>; timestamp?: number }>();
  
  const memoizedFunc = (...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator(...args);
    const cached = cache.get(key);
    
    // Check if cached value exists and hasn't expired
    if (cached) {
      if (!ttl || !cached.timestamp || (Date.now() - cached.timestamp) < ttl) {
        return cached.value;
      } else {
        cache.delete(key);
      }
    }
    
    // Execute function and cache result
    const result = func(...args);
    
    // Manage cache size
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }
    
    cache.set(key, {
      value: result,
      timestamp: ttl ? Date.now() : undefined
    });
    
    return result;
  };
  
  // Add cache management methods
  (memoizedFunc as any).cache = cache;
  (memoizedFunc as any).clear = () => cache.clear();
  
  return memoizedFunc as T & { cache: Map<string, any>; clear: () => void };
};

/**
 * Memoizes expensive calculations with automatic cleanup
 * 
 * @param calculator - Calculation function
 * @param ttlMinutes - Time-to-live in minutes (default: 5)
 * @returns Memoized calculator
 */
export const memoizeCalculation = <T extends (...args: any[]) => number>(
  calculator: T,
  ttlMinutes: number = 5
): T & { cache: Map<string, any>; clear: () => void } => {
  return memoize(calculator, {
    maxSize: 1000,
    ttl: ttlMinutes * 60 * 1000
  });
};

// ============================================================================
// REQUEST DEDUPLICATION
// ============================================================================

/**
 * Creates a request deduplicator to prevent duplicate API calls
 * 
 * @param requestFunction - Function that returns a Promise
 * @param options - Deduplication options
 * @returns Deduplicated request function
 * 
 * @example
 * ```typescript
 * const deduplicatedFetch = createRequestDeduplicator(
 *   (url: string) => fetch(url).then(r => r.json())
 * );
 * 
 * // Multiple calls with same URL will only make one request
 * const promise1 = deduplicatedFetch('/api/stocks/AAPL');
 * const promise2 = deduplicatedFetch('/api/stocks/AAPL');
 * // promise1 === promise2
 * ```
 */
export const createRequestDeduplicator = <T extends (...args: any[]) => Promise<any>>(
  requestFunction: T,
  options: DedupeOptions = {}
): T => {
  const {
    window = 5000,
    keyGenerator = (...args) => JSON.stringify(args),
    shareResult = true
  } = options;
  
  const pendingRequests = new Map<string, { promise: Promise<any>; timestamp: number }>();
  
  const deduplicatedFn = (...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator(...args);
    const now = Date.now();
    
    // Check for existing request within the time window
    const existing = pendingRequests.get(key);
    if (existing && (now - existing.timestamp) < window) {
      return existing.promise as ReturnType<T>;
    }
    
    // Create new request
    const promise = requestFunction(...args);
    
    // Store the request
    pendingRequests.set(key, { promise, timestamp: now });
    
    // Clean up when request completes
    promise
      .finally(() => {
        const current = pendingRequests.get(key);
        if (current && current.promise === promise) {
          pendingRequests.delete(key);
        }
      })
      .catch(() => {
        // Error handling is left to the caller
      });
    
    return promise as ReturnType<T>;
  };
  
  return deduplicatedFn as unknown as T;
};

// ============================================================================
// ANIMATION FRAME UTILITIES
// ============================================================================

/**
 * Wraps a function to execute on the next animation frame
 * 
 * @param callback - Function to execute
 * @returns Function that schedules callback on next frame
 */
export const onNextFrame = (callback: () => void): (() => void) => {
  let frameId: number | null = null;
  
  return () => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
    
    frameId = requestAnimationFrame(() => {
      frameId = null;
      callback();
    });
  };
};

/**
 * Creates a frame-based throttled function for smooth animations
 * 
 * @param callback - Animation callback
 * @returns Frame-throttled function
 */
export const createFrameThrottledCallback = (
  callback: () => void
): (() => void) => {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Simple performance timer for measuring execution time
 * 
 * @param name - Timer name
 * @returns Timer object with end method
 * 
 * @example
 * ```typescript
 * const timer = startTimer('api-call');
 * await fetchData();
 * const timing = timer.end();
 * console.log(`API call took ${timing.duration}ms`);
 * ```
 */
export const startTimer = (name: string): { end: () => PerformanceTiming } => {
  const startTime = performance.now();
  
  return {
    end: (): PerformanceTiming => {
      const endTime = performance.now();
      return {
        name,
        startTime,
        endTime,
        duration: endTime - startTime
      };
    }
  };
};

/**
 * Measures the execution time of an async function
 * 
 * @param name - Operation name
 * @param asyncFn - Async function to measure
 * @returns Promise with result and timing information
 */
export const measureAsync = async <T>(
  name: string,
  asyncFn: () => Promise<T>
): Promise<{ result: T; timing: PerformanceTiming }> => {
  const timer = startTimer(name);
  
  try {
    const result = await asyncFn();
    const timing = timer.end();
    return { result, timing };
  } catch (error) {
    const timing = timer.end();
    timing.metadata = { error: true };
    throw error;
  }
};

/**
 * Batch processing utility for handling large datasets
 * 
 * @param items - Array of items to process
 * @param processor - Function to process each batch
 * @param batchSize - Size of each batch
 * @param delay - Delay between batches in milliseconds
 * @returns Promise that resolves when all batches are processed
 */
export const processBatches = async <T, R>(
  items: T[],
  processor: (batch: T[]) => Promise<R[]>,
  batchSize: number = 100,
  delay: number = 0
): Promise<R[]> => {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await processor(batch);
    results.push(...batchResults);
    
    // Add delay between batches if specified
    if (delay > 0 && i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if the browser supports high-resolution time
 * 
 * @returns True if performance.now() is available
 */
export const supportsHighResolutionTime = (): boolean => {
  return typeof performance !== 'undefined' && 
         typeof performance.now === 'function';
};

/**
 * Gets current timestamp with best available precision
 * 
 * @returns High-resolution timestamp if available, otherwise Date.now()
 */
export const getHighResolutionTime = (): number => {
  return supportsHighResolutionTime() ? performance.now() : Date.now();
};

/**
 * Creates a simple rate limiter
 * 
 * @param maxCalls - Maximum number of calls
 * @param windowMs - Time window in milliseconds
 * @returns Rate limiter function
 */
export const createRateLimiter = (
  maxCalls: number,
  windowMs: number
): (() => boolean) => {
  const calls: number[] = [];
  
  return (): boolean => {
    const now = Date.now();
    
    // Remove calls outside the window
    while (calls.length > 0 && now - calls[0] > windowMs) {
      calls.shift();
    }
    
    // Check if we're under the limit
    if (calls.length < maxCalls) {
      calls.push(now);
      return true;
    }
    
    return false;
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  debounce,
  createDebouncedSearch,
  throttle,
  createThrottledScrollHandler,
  memoize,
  memoizeCalculation,
  createRequestDeduplicator,
  onNextFrame,
  createFrameThrottledCallback,
  startTimer,
  measureAsync,
  processBatches,
  supportsHighResolutionTime,
  getHighResolutionTime,
  createRateLimiter
};