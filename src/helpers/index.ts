/**
 * StockSavvy Helper Utilities
 * 
 * Centralized collection of reusable, stateless utility functions for the
 * StockSavvy financial frontend application. These utilities promote code
 * reusability, maintainability, and consistency across components.
 * 
 * Organization:
 * - Formatters: Number, date, percentage, and trend formatting utilities
 * - Validators: Input validation and type guard functions
 * - Constants: Theme colors, navigation routes, and UI configuration
 * - Utils: Storage, debounce, and array operation utilities
 * - Styling: Dynamic className generation and theme utilities
 * - Generators: ID generation and mock data utilities
 * 
 * Best Practices:
 * - All utilities are stateless and pure functions
 * - Comprehensive TypeScript interfaces for type safety
 * - JSDoc documentation for all public functions
 * - Consistent error handling and fallback values
 * - Theme-aware utilities for light/dark mode support
 * 
 * @fileoverview Main entry point for StockSavvy helper utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// FORMATTERS
// ============================================================================

// Number and currency formatting utilities
export * from './formatters/numberFormatter';

// Date and time formatting utilities
export * from './formatters/dateFormatter';

// Percentage and trend formatting utilities
export * from './formatters/percentageFormatter';

// ============================================================================
// VALIDATORS
// ============================================================================

// Input validation and sanitization utilities
export * from './validators/inputValidators';

// (typeGuards module does not exist - removed)

// ============================================================================
// CONSTANTS
// ============================================================================

// Theme colors and configuration
export * from './constants/themeConstants';

// Navigation routes and configuration
export * from './constants/navigationConstants';

// (uiConstants module does not exist - removed)

// ============================================================================
// UTILITIES
// ============================================================================

// localStorage and sessionStorage utilities
export * from './utils/storageUtils';

// Performance optimization utilities
export * from './utils/debounceUtils';

// (arrayUtils module does not exist - removed)

// ============================================================================
// STYLING
// ============================================================================

// Dynamic className building and conditional styling
export * from './styling/classNameBuilder';

// (colorUtils module does not exist - removed)

// ============================================================================
// GENERATORS
// ============================================================================

// Unique ID generation utilities
export * from './generators/idGenerator';

// (mockDataGenerator module does not exist - removed)

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Pre-grouped exports for common use cases
 * These provide convenient access to frequently used utility combinations
 */

// Number formatting utilities grouped for financial applications
export { 
  formatNumber, 
  formatCurrency, 
  formatLargeNumber
} from './formatters/numberFormatter';

// Percentage and trend formatting utilities
export {
  formatPercentageChange,
  createTrendDisplay
} from './formatters/percentageFormatter';

// Styling utilities for dynamic className generation
export { 
  cn, 
  themeClasses, 
  createCardClasses, 
  createButtonClasses 
} from './styling/classNameBuilder';

// Validation utilities for form and input handling
export {
  validateEmail,
  validateChatMessage,
  validateSearchQuery
} from './validators/inputValidators';

// Date formatting utilities for timestamps and relative time
export {
  formatChatTimestamp,
  formatRelativeTime,
  formatDateRange
} from './formatters/dateFormatter';

// Storage utilities for persistent data management
export {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  themeStorage
} from './utils/storageUtils';

// ID generation utilities for unique identifiers
export {
  generateTimestampId,
  generateActivityId,
  generateMessageId,
  generateUuid
} from './generators/idGenerator';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Re-export important types for external consumption
// (Removed incorrect type exports that don't exist in their modules)
// Types should be imported directly from their respective modules when needed

// ============================================================================
// VERSION INFO
// ============================================================================

/**
 * Helper utilities version information
 */
export const HELPERS_VERSION = '1.0.0';

/**
 * Compatibility information for the StockSavvy application
 */
export const COMPATIBILITY = {
  minAppVersion: '1.0.0',
  supportedBrowsers: ['Chrome 90+', 'Firefox 88+', 'Safari 14+', 'Edge 90+'],
  supportedPlatforms: ['Web', 'iOS', 'Android']
} as const;