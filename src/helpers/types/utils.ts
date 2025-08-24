/**
 * Utility Types and Interfaces
 * 
 * Centralized type definitions for utility functions including performance
 * optimization, debouncing, ID generation, and other helper utilities in
 * the StockSavvy application.
 * 
 * @fileoverview Type definitions for utility functions
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// PERFORMANCE UTILITY TYPES
// ============================================================================

/**
 * Debounced function type with cancel capability
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  /** Execute the debounced function */
  (...args: Parameters<T>): void;
  /** Cancel pending execution */
  cancel(): void;
  /** Execute immediately, canceling pending execution */
  flush(): void;
  /** Check if execution is pending */
  pending(): boolean;
}

/**
 * Throttled function type with similar capabilities
 */
export interface ThrottledFunction<T extends (...args: any[]) => any> {
  /** Execute the throttled function */
  (...args: Parameters<T>): void;
  /** Cancel pending execution */
  cancel(): void;
  /** Execute immediately if not recently executed */
  flush(): void;
}

/**
 * Memoization options
 */
export interface MemoizeOptions {
  /** Maximum cache size */
  maxSize?: number;
  /** Time-to-live for cached values in milliseconds */
  ttl?: number;
  /** Custom key generator function */
  keyGenerator?: (...args: any[]) => string;
  /** Whether to use weak references for cache */
  weak?: boolean;
}

/**
 * Performance timing information
 */
export interface PerformanceTiming {
  /** Operation name */
  name: string;
  /** Start timestamp */
  startTime: number;
  /** End timestamp */
  endTime: number;
  /** Duration in milliseconds */
  duration: number;
  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * Request deduplication options
 */
export interface DedupeOptions {
  /** Time window for deduplication in milliseconds */
  window?: number;
  /** Custom key generator for requests */
  keyGenerator?: (...args: any[]) => string;
  /** Whether to resolve all pending promises with the same result */
  shareResult?: boolean;
}

/**
 * Rate limiter configuration
 */
export interface RateLimiterConfig {
  /** Maximum number of calls */
  maxCalls: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** What to do when limit is exceeded */
  onLimitExceeded?: () => void;
}

/**
 * Batch processing configuration
 */
export interface BatchProcessingConfig<T, R> {
  /** Batch size */
  batchSize?: number;
  /** Delay between batches in milliseconds */
  delay?: number;
  /** Maximum concurrent batches */
  maxConcurrency?: number;
  /** Progress callback */
  onProgress?: (processed: number, total: number) => void;
  /** Error handling strategy */
  errorStrategy?: 'stop' | 'continue' | 'retry';
}

// ============================================================================
// ID GENERATION TYPES
// ============================================================================

/**
 * ID generation options
 */
export interface IdGenerationOptions {
  /** Prefix to add to the generated ID */
  prefix?: string;
  /** Suffix to add to the generated ID */
  suffix?: string;
  /** Length of the random part (for short IDs) */
  length?: number;
  /** Whether to include timestamp */
  includeTimestamp?: boolean;
  /** Character set to use for random generation */
  charset?: 'alphanumeric' | 'alpha' | 'numeric' | 'hex' | 'base64';
  /** Separator character */
  separator?: string;
}

/**
 * UUID generation result
 */
export interface UuidResult {
  /** Generated UUID */
  uuid: string;
  /** Generation method used */
  method: 'crypto' | 'fallback';
  /** Whether the UUID is guaranteed to be unique */
  cryptographicallySecure: boolean;
}

/**
 * Sequential ID generator configuration
 */
export interface SequentialIdConfig {
  /** Starting number */
  start?: number;
  /** Increment step */
  step?: number;
  /** Prefix for the ID */
  prefix?: string;
  /** Minimum number of digits (with zero padding) */
  minDigits?: number;
}

/**
 * Parsed application ID components
 */
export interface ParsedApplicationId {
  /** ID prefix */
  prefix?: string;
  /** Timestamp extracted from ID */
  timestamp?: number;
  /** ID suffix */
  suffix?: string;
  /** All ID parts */
  parts: string[];
}

/**
 * ID validation result
 */
export interface IdValidationResult {
  /** Whether ID is valid */
  isValid: boolean;
  /** ID type detected */
  type?: 'uuid' | 'timestamp' | 'sequential' | 'random';
  /** Validation error message */
  error?: string;
  /** Extracted metadata */
  metadata?: ParsedApplicationId;
}

// ============================================================================
// ARRAY UTILITY TYPES
// ============================================================================

/**
 * Array grouping configuration
 */
export interface ArrayGroupingConfig<T> {
  /** Key generator function */
  keyFn: (item: T) => string | number;
  /** Whether to preserve order within groups */
  preserveOrder?: boolean;
  /** Maximum group size */
  maxGroupSize?: number;
}

/**
 * Array sorting configuration
 */
export interface ArraySortConfig<T> {
  /** Sort key function */
  keyFn: (item: T) => any;
  /** Sort direction */
  direction?: 'asc' | 'desc';
  /** Custom comparator function */
  compareFn?: (a: any, b: any) => number;
}

/**
 * Array filtering configuration
 */
export interface ArrayFilterConfig<T> {
  /** Filter predicate function */
  predicate: (item: T, index: number, array: T[]) => boolean;
  /** Maximum results to return */
  limit?: number;
  /** Skip first N results */
  skip?: number;
}

/**
 * Array pagination result
 */
export interface PaginationResult<T> {
  /** Paginated items */
  items: T[];
  /** Current page number */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there's a next page */
  hasNext: boolean;
  /** Whether there's a previous page */
  hasPrev: boolean;
}

// ============================================================================
// ERROR HANDLING TYPES
// ============================================================================

/**
 * Retry configuration
 */
export interface RetryConfig {
  /** Maximum number of retries */
  maxRetries: number;
  /** Base delay between retries in milliseconds */
  baseDelay?: number;
  /** Backoff strategy */
  backoffStrategy?: 'linear' | 'exponential' | 'fixed';
  /** Maximum delay between retries */
  maxDelay?: number;
  /** Function to determine if error is retryable */
  shouldRetry?: (error: Error, attempt: number) => boolean;
}

/**
 * Circuit breaker configuration
 */
export interface CircuitBreakerConfig {
  /** Failure threshold before opening circuit */
  failureThreshold: number;
  /** Reset timeout in milliseconds */
  resetTimeout: number;
  /** Monitoring window in milliseconds */
  monitoringWindow?: number;
  /** Minimum number of calls before evaluation */
  minimumCalls?: number;
}

/**
 * Circuit breaker state
 */
export type CircuitBreakerState = 'closed' | 'open' | 'half-open';

// ============================================================================
// EVENT UTILITY TYPES
// ============================================================================

/**
 * Event emitter subscription
 */
export interface EventSubscription {
  /** Unsubscribe function */
  unsubscribe: () => void;
  /** Event name */
  event: string;
  /** Subscription ID */
  id: string;
}

/**
 * Event handler function
 */
export type EventHandler<T = any> = (data: T) => void;

/**
 * Event emitter configuration
 */
export interface EventEmitterConfig {
  /** Maximum listeners per event */
  maxListeners?: number;
  /** Whether to emit warnings for memory leaks */
  warnOnMemoryLeak?: boolean;
  /** Default error handler */
  defaultErrorHandler?: (error: Error) => void;
}

// ============================================================================
// ASYNC UTILITY TYPES
// ============================================================================

/**
 * Promise timeout configuration
 */
export interface TimeoutConfig {
  /** Timeout duration in milliseconds */
  timeout: number;
  /** Custom timeout error message */
  timeoutMessage?: string;
  /** Cleanup function to call on timeout */
  cleanup?: () => void;
}

/**
 * Promise queue configuration
 */
export interface PromiseQueueConfig {
  /** Maximum concurrent promises */
  concurrency?: number;
  /** Queue priority strategy */
  priority?: 'fifo' | 'lifo' | 'priority';
  /** Maximum queue size */
  maxSize?: number;
  /** Timeout for queued items */
  timeout?: number;
}

/**
 * Promise with additional metadata
 */
export interface PromiseWithMetadata<T> extends Promise<T> {
  /** Promise ID */
  id: string;
  /** Creation timestamp */
  createdAt: number;
  /** Priority (higher = more important) */
  priority?: number;
  /** Promise metadata */
  metadata?: Record<string, any>;
}

// ============================================================================
// FUNCTIONAL UTILITY TYPES
// ============================================================================

/**
 * Pipe function configuration
 */
export interface PipeConfig {
  /** Whether to stop on first error */
  stopOnError?: boolean;
  /** Error handler function */
  errorHandler?: (error: Error, step: number) => any;
  /** Debug mode for logging */
  debug?: boolean;
}

/**
 * Compose function configuration
 */
export interface ComposeConfig {
  /** Whether to reverse function order */
  reverse?: boolean;
  /** Initial value for composition */
  initialValue?: any;
  /** Type checking for intermediate values */
  typeCheck?: boolean;
}

// ============================================================================
// URL AND QUERY UTILITY TYPES
// ============================================================================

/**
 * URL parameter configuration
 */
export interface URLParamConfig {
  /** Parameter encoding strategy */
  encoding?: 'standard' | 'rfc3986' | 'none';
  /** Whether to include empty values */
  includeEmpty?: boolean;
  /** Array parameter format */
  arrayFormat?: 'bracket' | 'comma' | 'repeat';
}

/**
 * Query string parsing options
 */
export interface QueryParsingOptions {
  /** Whether to parse numbers */
  parseNumbers?: boolean;
  /** Whether to parse booleans */
  parseBooleans?: boolean;
  /** Whether to parse arrays */
  parseArrays?: boolean;
  /** Delimiter for array values */
  arrayDelimiter?: string;
}

// ============================================================================
// UTILS EXPORTS HANDLED BY INDIVIDUAL INTERFACE DECLARATIONS
// ============================================================================