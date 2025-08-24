/**
 * Helper Types Index
 * 
 * Centralized export of all type definitions for the StockSavvy helper
 * utilities. This provides a single import point for all helper-related
 * types and interfaces throughout the application.
 * 
 * @fileoverview Main export file for helper types
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// FORMATTER TYPES
// ============================================================================

export type {
  // Number formatting
  NumberFormatOptions,
  CurrencyFormatOptions,
  SupportedCurrency,
  NumberSuffix,
  
  // Percentage formatting
  PercentageFormatOptions,
  TrendDirection,
  TrendDisplayOptions,
  TrendDisplay,
  BasisPointsOptions,
  
  // Date formatting
  DateInput,
  SupportedLocale,
  DateFormatOptions,
  RelativeTimeOptions,
  DateRangeOptions,
  TradingSession
} from './formatters';

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export type {
  // Core validation
  ValidationResult,
  ValidationRule,
  FieldValidationConfig,
  BatchValidationConfig,
  ValidationError,
  BatchValidationResult,
  
  // Specific validation options
  EmailValidationOptions,
  PasswordValidationOptions,
  FinancialValidationOptions,
  ChatValidationOptions,
  SearchValidationOptions,
  PhoneValidationOptions,
  URLValidationOptions,
  
  // Validation utilities
  ValidationPatterns
} from './validation';

// ============================================================================
// STYLING TYPES
// ============================================================================

export type {
  // Core styling
  ClassValue,
  ClassRecord,
  ClassArray,
  ComponentSize,
  ComponentVariant,
  ComponentState,
  
  // Theme and responsive
  ThemeClassOptions,
  ResponsiveClasses,
  
  // Component configurations
  CardStyleConfig,
  CardThemeVariant,
  ButtonStyleConfig,
  ButtonThemeConfig,
  InputStyleConfig,
  InputValidationStyling,
  BadgeStyleConfig,
  
  // Layout
  FlexLayoutConfig,
  GridLayoutConfig,
  
  // Accessibility
  FocusStyleConfig,
  AccessibilityStyleConfig,
  
  // Animation
  TransitionConfig,
  AnimationStyleConfig,
  
  // Colors
  ColorPalette,
  SemanticColors
} from './styling';

// ============================================================================
// STORAGE TYPES
// ============================================================================

export type {
  // Core storage
  StorageResult,
  StorageOptions,
  StorageWrapper,
  
  // Storage events
  StorageEventHandler,
  StorageEventConfig,
  
  // Storage quota
  StorageQuota,
  StorageMonitorConfig,
  
  // Cache storage
  CacheEntry,
  CacheOptions,
  CacheStats,
  
  // User storage
  UserSettings,
  UserProfile,
  
  // Session storage
  SessionData,
  SessionConfig,
  
  // Migration
  StorageMigration,
  MigrationHistoryEntry,
  
  // Backup and restore
  BackupConfig,
  BackupData,
  
  // Validation
  StorageValidationRule,
  StorageSchema
} from './storage';

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type {
  // Performance utilities
  DebouncedFunction,
  ThrottledFunction,
  MemoizeOptions,
  PerformanceTiming,
  DedupeOptions,
  RateLimiterConfig,
  BatchProcessingConfig,
  
  // ID generation
  IdGenerationOptions,
  UuidResult,
  SequentialIdConfig,
  ParsedApplicationId,
  IdValidationResult,
  
  // Array utilities
  ArrayGroupingConfig,
  ArraySortConfig,
  ArrayFilterConfig,
  PaginationResult,
  
  // Error handling
  RetryConfig,
  CircuitBreakerConfig,
  CircuitBreakerState,
  
  // Event utilities
  EventSubscription,
  EventHandler,
  EventEmitterConfig,
  
  // Async utilities
  TimeoutConfig,
  PromiseQueueConfig,
  PromiseWithMetadata,
  
  // Functional utilities
  PipeConfig,
  ComposeConfig,
  
  // URL utilities
  URLParamConfig,
  QueryParsingOptions
} from './utils';

// ============================================================================
// CONSTANTS TYPES
// ============================================================================

export type {
  // Theme constants types
  ThemeMode,
  ResolvedTheme,
  ThemeTransition,
  ThemeColors,
  ThemeSpacing,
  ThemeConfig,
  
  // Navigation constants types
  NavigationTransition,
  RouteMetadata,
  BreadcrumbItem,
  MenuRoute,
  
  // UI constants types
  ComponentSpacing,
  TransitionTiming,
  
  // Market color scheme types
  MarketColorScheme,
  
  // (Removed MarketMoodIndicator, ErrorPageConfig, ErrorAction as they don't exist)
} from './constants';

// ============================================================================
// TYPE GROUPS AVAILABLE THROUGH INDIVIDUAL IMPORTS FROM SPECIFIC FILES
// ============================================================================

/**
 * Import types directly from their respective modules:
 * - ./formatters for NumberFormatOptions, CurrencyFormatOptions, etc.
 * - ./validation for ValidationResult, EmailValidationOptions, etc.
 * - ./styling for ClassValue, ComponentSize, ButtonStyleConfig, etc.
 * - ./storage for StorageResult, StorageOptions, CacheOptions, etc.
 * - ./utils for DebouncedFunction, ThrottledFunction, etc.
 */

// ============================================================================
// VERSION INFORMATION
// ============================================================================

/**
 * Types version information for compatibility tracking
 */
export const TYPES_VERSION = '1.0.0';

/**
 * Type compatibility matrix
 */
export const TYPE_COMPATIBILITY = {
  formatters: '1.0.0',
  validation: '1.0.0',
  styling: '1.0.0',
  storage: '1.0.0',
  utils: '1.0.0'
} as const;