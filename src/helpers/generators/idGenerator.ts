/**
 * ID Generator Utilities
 * 
 * Provides utilities for generating unique identifiers across the StockSavvy
 * application. These generators ensure uniqueness for messages, activities,
 * components, and other entities that require unique identification.
 * 
 * Features:
 * - Timestamp-based ID generation
 * - UUID v4 generation with fallback
 * - Application-specific ID formats (messages, activities, etc.)
 * - Short ID generation for URLs and references
 * - Sequential ID generation with prefixes
 * - Collision detection and retry mechanisms
 * 
 * @fileoverview Unique ID generation utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  IdGenerationOptions,
  UuidResult,
  SequentialIdConfig,
  ParsedApplicationId
} from '../types/utils';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Character sets for ID generation
 */
const CHARSETS = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  numeric: '0123456789',
  hex: '0123456789abcdef',
  base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
} as const;

/**
 * Default options for different ID types
 */
const DEFAULT_OPTIONS: Required<Omit<IdGenerationOptions, 'prefix' | 'suffix'>> = {
  length: 8,
  includeTimestamp: true,
  charset: 'alphanumeric',
  separator: '-'
};

/**
 * Application-specific ID prefixes
 */
export const ID_PREFIXES = {
  MESSAGE: 'msg',
  ACTIVITY: 'act',
  USER: 'usr',
  SESSION: 'ses',
  CHAT: 'cht',
  TRANSACTION: 'txn',
  COMPONENT: 'cmp',
  ERROR: 'err',
  LOG: 'log',
  TEMP: 'tmp'
} as const;

// ============================================================================
// CORE ID GENERATION FUNCTIONS
// ============================================================================

/**
 * Generates a timestamp-based ID with optional random suffix
 * 
 * @param options - ID generation options
 * @returns Generated timestamp-based ID
 * 
 * @example
 * ```typescript
 * generateTimestampId()                    // "1642781234567"
 * generateTimestampId({ prefix: 'msg' })   // "msg-1642781234567"
 * generateTimestampId({ length: 4 })       // "1642781234567-a8f2"
 * ```
 */
export const generateTimestampId = (options: IdGenerationOptions = {}): string => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const timestamp = Date.now().toString();
  
  const parts: string[] = [];
  
  if (opts.prefix) {
    parts.push(opts.prefix);
  }
  
  parts.push(timestamp);
  
  // Add random suffix if length is specified
  if (opts.length > 0) {
    const randomPart = generateRandomString(opts.length, opts.charset);
    parts.push(randomPart);
  }
  
  if (opts.suffix) {
    parts.push(opts.suffix);
  }
  
  return parts.join(opts.separator);
};

/**
 * Generates a UUID v4 with crypto API when available
 * 
 * @returns UUID generation result with metadata
 * 
 * @example
 * ```typescript
 * const { uuid, method } = generateUuid();
 * console.log(uuid); // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 * console.log(method); // "crypto" or "fallback"
 * ```
 */
export const generateUuid = (): UuidResult => {
  // Try crypto API first (most secure)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return {
        uuid: crypto.randomUUID(),
        method: 'crypto',
        cryptographicallySecure: true
      };
    } catch (error) {
      console.warn('crypto.randomUUID failed, falling back to manual generation');
    }
  }
  
  // Fallback to manual UUID generation
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  
  return {
    uuid,
    method: 'fallback',
    cryptographicallySecure: false
  };
};

/**
 * Generates a short, URL-safe ID
 * 
 * @param length - Length of the ID (default: 8)
 * @param charset - Character set to use
 * @returns Short random ID
 * 
 * @example
 * ```typescript
 * generateShortId()        // "a8K9mP2x"
 * generateShortId(6)       // "b4N7qR"
 * generateShortId(4, 'hex') // "a3f2"
 * ```
 */
export const generateShortId = (
  length: number = 8,
  charset: keyof typeof CHARSETS = 'alphanumeric'
): string => {
  return generateRandomString(length, charset);
};

/**
 * Generates a random string from specified character set
 * 
 * @param length - Length of the string
 * @param charset - Character set to use
 * @returns Random string
 */
export const generateRandomString = (
  length: number,
  charset: keyof typeof CHARSETS = 'alphanumeric'
): string => {
  const chars = CHARSETS[charset];
  let result = '';
  
  // Use crypto API if available for better randomness
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    // Fallback to Math.random
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return result;
};

/**
 * Creates a sequential ID generator with configurable options
 * 
 * @param config - Sequential ID configuration
 * @returns Function that generates sequential IDs
 * 
 * @example
 * ```typescript
 * const generateOrderId = createSequentialIdGenerator({
 *   prefix: 'ORD',
 *   start: 1000,
 *   minDigits: 6
 * });
 * 
 * console.log(generateOrderId()); // "ORD-001000"
 * console.log(generateOrderId()); // "ORD-001001"
 * ```
 */
export const createSequentialIdGenerator = (
  config: SequentialIdConfig = {}
): (() => string) => {
  const {
    start = 1,
    step = 1,
    prefix = '',
    minDigits = 0
  } = config;
  
  let current = start;
  
  return (): string => {
    const number = current;
    current += step;
    
    const paddedNumber = minDigits > 0 
      ? number.toString().padStart(minDigits, '0')
      : number.toString();
    
    return prefix ? `${prefix}-${paddedNumber}` : paddedNumber;
  };
};

// ============================================================================
// APPLICATION-SPECIFIC ID GENERATORS
// ============================================================================

/**
 * Generates a message ID for chat systems
 * 
 * @param isUser - Whether the message is from a user
 * @param chatId - Optional chat/conversation ID
 * @returns Formatted message ID
 * 
 * @example
 * ```typescript
 * generateMessageId(true)           // "usr-msg-1642781234567-a8f2"
 * generateMessageId(false)          // "ai-msg-1642781234567-b9g3"
 * generateMessageId(true, "chat1")  // "usr-msg-chat1-1642781234567-c0h4"
 * ```
 */
export const generateMessageId = (
  isUser: boolean = false,
  chatId?: string
): string => {
  const userPrefix = isUser ? 'usr' : 'ai';
  const parts = [userPrefix, ID_PREFIXES.MESSAGE];
  
  if (chatId) {
    parts.push(chatId);
  }
  
  return generateTimestampId({
    prefix: parts.join('-'),
    length: 4
  });
};

/**
 * Generates an activity ID for activity feeds
 * 
 * @param activityType - Type of activity
 * @param userId - Optional user ID
 * @returns Formatted activity ID
 * 
 * @example
 * ```typescript
 * generateActivityId('login')           // "act-login-1642781234567-d1i5"
 * generateActivityId('trade', 'usr123') // "act-trade-usr123-1642781234567-e2j6"
 * ```
 */
export const generateActivityId = (
  activityType: string,
  userId?: string
): string => {
  const parts = [ID_PREFIXES.ACTIVITY, activityType];
  
  if (userId) {
    parts.push(userId);
  }
  
  return generateTimestampId({
    prefix: parts.join('-'),
    length: 4
  });
};

/**
 * Generates a transaction ID for financial operations
 * 
 * @param transactionType - Type of transaction
 * @param accountId - Optional account ID
 * @returns Formatted transaction ID
 * 
 * @example
 * ```typescript
 * generateTransactionId('buy')                    // "txn-buy-1642781234567-f3k7"
 * generateTransactionId('sell', 'acc456')        // "txn-sell-acc456-1642781234567-g4l8"
 * ```
 */
export const generateTransactionId = (
  transactionType: string,
  accountId?: string
): string => {
  const parts = [ID_PREFIXES.TRANSACTION, transactionType];
  
  if (accountId) {
    parts.push(accountId);
  }
  
  return generateTimestampId({
    prefix: parts.join('-'),
    length: 6,
    charset: 'alphanumeric'
  });
};

/**
 * Generates a session ID for user sessions
 * 
 * @param userId - Optional user ID
 * @returns Formatted session ID
 * 
 * @example
 * ```typescript
 * generateSessionId()          // "ses-1642781234567-h5m9"
 * generateSessionId('usr789')  // "ses-usr789-1642781234567-i6n0"
 * ```
 */
export const generateSessionId = (userId?: string): string => {
  return generateTimestampId({
    prefix: userId ? `${ID_PREFIXES.SESSION}-${userId}` : ID_PREFIXES.SESSION,
    length: 8,
    charset: 'alphanumeric'
  });
};

/**
 * Generates a component ID for React components
 * 
 * @param componentName - Name of the component
 * @param instanceId - Optional instance identifier
 * @returns Formatted component ID
 * 
 * @example
 * ```typescript
 * generateComponentId('Button')           // "cmp-Button-1642781234567"
 * generateComponentId('Modal', 'login')   // "cmp-Modal-login-1642781234567"
 * ```
 */
export const generateComponentId = (
  componentName: string,
  instanceId?: string
): string => {
  const parts = [ID_PREFIXES.COMPONENT, componentName];
  
  if (instanceId) {
    parts.push(instanceId);
  }
  
  return generateTimestampId({
    prefix: parts.join('-'),
    length: 0 // No random suffix for components
  });
};

/**
 * Generates a temporary ID for ephemeral data
 * 
 * @param purpose - Purpose of the temporary ID
 * @param ttlMinutes - Time-to-live in minutes
 * @returns Formatted temporary ID
 * 
 * @example
 * ```typescript
 * generateTempId('upload')         // "tmp-upload-1642781234567-j7o1"
 * generateTempId('cache', 30)      // "tmp-cache-30m-1642781234567-k8p2"
 * ```
 */
export const generateTempId = (
  purpose: string,
  ttlMinutes?: number
): string => {
  const parts = [ID_PREFIXES.TEMP, purpose];
  
  if (ttlMinutes) {
    parts.push(`${ttlMinutes}m`);
  }
  
  return generateTimestampId({
    prefix: parts.join('-'),
    length: 4
  });
};

// ============================================================================
// ID VALIDATION AND UTILITIES
// ============================================================================

/**
 * Validates if a string is a valid UUID
 * 
 * @param uuid - String to validate
 * @returns True if valid UUID format
 */
export const isValidUuid = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Extracts timestamp from a timestamp-based ID
 * 
 * @param id - ID to extract timestamp from
 * @returns Timestamp in milliseconds, or null if not found
 * 
 * @example
 * ```typescript
 * extractTimestamp('msg-1642781234567-a8f2') // 1642781234567
 * extractTimestamp('invalid-id')             // null
 * ```
 */
export const extractTimestamp = (id: string): number | null => {
  // Look for timestamp pattern in the ID
  const timestampMatch = id.match(/(\d{13})/);
  
  if (timestampMatch) {
    const timestamp = parseInt(timestampMatch[1], 10);
    
    // Validate that it's a reasonable timestamp (between 2020 and 2100)
    const year2020 = new Date('2020-01-01').getTime();
    const year2100 = new Date('2100-01-01').getTime();
    
    if (timestamp >= year2020 && timestamp <= year2100) {
      return timestamp;
    }
  }
  
  return null;
};

/**
 * Checks if an ID was generated recently
 * 
 * @param id - ID to check
 * @param thresholdMinutes - Threshold in minutes (default: 60)
 * @returns True if ID was generated within the threshold
 */
export const isRecentId = (id: string, thresholdMinutes: number = 60): boolean => {
  const timestamp = extractTimestamp(id);
  
  if (!timestamp) {
    return false;
  }
  
  const now = Date.now();
  const threshold = thresholdMinutes * 60 * 1000;
  
  return (now - timestamp) <= threshold;
};

/**
 * Parses an application-specific ID to extract its components
 * 
 * @param id - ID to parse
 * @returns Parsed ID components
 * 
 * @example
 * ```typescript
 * parseApplicationId('usr-msg-chat1-1642781234567-a8f2')
 * // {
 * //   prefix: 'usr-msg-chat1',
 * //   timestamp: 1642781234567,
 * //   suffix: 'a8f2',
 * //   parts: ['usr', 'msg', 'chat1', '1642781234567', 'a8f2']
 * // }
 * ```
 */
export const parseApplicationId = (id: string): ParsedApplicationId => {
  const parts = id.split('-');
  const timestamp = extractTimestamp(id);
  
  let prefix: string | undefined;
  let suffix: string | undefined;
  
  if (timestamp) {
    const timestampStr = timestamp.toString();
    const timestampIndex = parts.findIndex(part => part === timestampStr);
    
    if (timestampIndex > 0) {
      prefix = parts.slice(0, timestampIndex).join('-');
    }
    
    if (timestampIndex < parts.length - 1) {
      suffix = parts.slice(timestampIndex + 1).join('-');
    }
  }
  
  return {
    prefix,
    timestamp: timestamp || undefined,
    suffix,
    parts
  };
};

/**
 * Generates a collision-resistant ID with retry mechanism
 * 
 * @param generator - ID generator function
 * @param validator - Function to check if ID already exists
 * @param maxRetries - Maximum number of retries
 * @returns Generated unique ID
 */
export const generateUniqueId = async (
  generator: () => string,
  validator: (id: string) => Promise<boolean> | boolean,
  maxRetries: number = 10
): Promise<string> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const id = generator();
    const isUnique = await validator(id);
    
    if (isUnique) {
      return id;
    }
  }
  
  throw new Error(`Failed to generate unique ID after ${maxRetries} attempts`);
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  generateTimestampId,
  generateUuid,
  generateShortId,
  generateRandomString,
  createSequentialIdGenerator,
  generateMessageId,
  generateActivityId,
  generateTransactionId,
  generateSessionId,
  generateComponentId,
  generateTempId,
  isValidUuid,
  extractTimestamp,
  isRecentId,
  parseApplicationId,
  generateUniqueId,
  ID_PREFIXES
};