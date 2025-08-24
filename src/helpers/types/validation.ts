/**
 * Validation Types and Interfaces
 * 
 * Centralized type definitions for input validation utilities in the
 * StockSavvy application. This includes form validation, chat message
 * validation, and data integrity types.
 * 
 * @fileoverview Type definitions for validation utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// CORE VALIDATION TYPES
// ============================================================================

/**
 * Validation result interface with detailed feedback
 */
export interface ValidationResult<T = any> {
  /** Whether the input is valid */
  isValid: boolean;
  /** Error message if validation fails */
  error?: string;
  /** Warning message for potential issues */
  warning?: string;
  /** Sanitized/normalized value */
  sanitized?: T;
  /** Validation metadata */
  metadata?: {
    /** Validation rules that were applied */
    rulesApplied?: string[];
    /** Confidence score (0-100) */
    confidence?: number;
    /** Suggestions for improvement */
    suggestions?: string[];
  };
}

// ============================================================================
// EMAIL VALIDATION TYPES
// ============================================================================

/**
 * Email validation configuration
 */
export interface EmailValidationOptions {
  /** Whether to allow temporary/disposable emails */
  allowDisposable?: boolean;
  /** Maximum email length */
  maxLength?: number;
  /** Whether to normalize the email format */
  normalize?: boolean;
  /** Custom domain restrictions */
  allowedDomains?: string[];
  /** Blocked domain patterns */
  blockedDomains?: string[];
}

// ============================================================================
// PASSWORD VALIDATION TYPES
// ============================================================================

/**
 * Password validation configuration
 */
export interface PasswordValidationOptions {
  /** Minimum password length */
  minLength?: number;
  /** Maximum password length */
  maxLength?: number;
  /** Require uppercase letters */
  requireUppercase?: boolean;
  /** Require lowercase letters */
  requireLowercase?: boolean;
  /** Require numbers */
  requireNumbers?: boolean;
  /** Require special characters */
  requireSpecialChars?: boolean;
  /** Disallow common passwords */
  disallowCommon?: boolean;
}

// ============================================================================
// FINANCIAL VALIDATION TYPES
// ============================================================================

/**
 * Financial input validation options
 */
export interface FinancialValidationOptions {
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Maximum decimal places */
  maxDecimals?: number;
  /** Whether negative values are allowed */
  allowNegative?: boolean;
  /** Currency code for validation */
  currency?: string;
}

// ============================================================================
// CHAT VALIDATION TYPES
// ============================================================================

/**
 * Chat message validation options
 */
export interface ChatValidationOptions {
  /** Maximum message length */
  maxLength?: number;
  /** Minimum message length */
  minLength?: number;
  /** Whether to filter profanity */
  filterProfanity?: boolean;
  /** Whether to check for spam patterns */
  checkSpam?: boolean;
  /** Allow markdown formatting */
  allowMarkdown?: boolean;
}

// ============================================================================
// VALIDATION RULE TYPES
// ============================================================================

/**
 * Validation rule configuration
 */
export interface ValidationRule<T = any> {
  /** Rule name/identifier */
  name: string;
  /** Rule validation function */
  validator: (value: T) => ValidationResult<T>;
  /** Rule priority (higher = earlier execution) */
  priority?: number;
  /** Whether this rule is required */
  required?: boolean;
}

/**
 * Field validation configuration
 */
export interface FieldValidationConfig<T = any> {
  /** Field name */
  name: string;
  /** Validation rules for this field */
  rules: ValidationRule<T>[];
  /** Field display label */
  label?: string;
  /** Whether field is required */
  required?: boolean;
}

/**
 * Batch validation configuration
 */
export interface BatchValidationConfig {
  /** Fields to validate */
  fields: Record<string, FieldValidationConfig>;
  /** Whether to stop on first error */
  stopOnFirstError?: boolean;
  /** Custom validation order */
  validationOrder?: string[];
}

// ============================================================================
// SEARCH VALIDATION TYPES
// ============================================================================

/**
 * Search query validation options
 */
export interface SearchValidationOptions {
  /** Minimum query length */
  minLength?: number;
  /** Maximum query length */
  maxLength?: number;
  /** Allowed characters pattern */
  allowedPattern?: RegExp;
  /** Whether to trim whitespace */
  trimWhitespace?: boolean;
  /** Whether to convert to lowercase */
  toLowercase?: boolean;
}

// ============================================================================
// PHONE VALIDATION TYPES
// ============================================================================

/**
 * Phone number validation options
 */
export interface PhoneValidationOptions {
  /** Whether to allow international format */
  allowInternational?: boolean;
  /** Specific country code requirement */
  requireCountryCode?: string;
  /** Format to normalize to */
  normalizeFormat?: 'international' | 'national' | 'e164';
}

// ============================================================================
// URL VALIDATION TYPES
// ============================================================================

/**
 * URL validation options
 */
export interface URLValidationOptions {
  /** Whether to require HTTPS */
  requireHttps?: boolean;
  /** Allowed domains */
  allowedDomains?: string[];
  /** Blocked domains */
  blockedDomains?: string[];
  /** Whether to validate domain existence */
  validateDomain?: boolean;
}

// ============================================================================
// VALIDATION PATTERN TYPES
// ============================================================================

/**
 * Common validation patterns
 */
export interface ValidationPatterns {
  email: RegExp;
  phone: RegExp;
  url: RegExp;
  alphanumeric: RegExp;
  alphanumericWithSpaces: RegExp;
  number: RegExp;
  percentage: RegExp;
  currency: RegExp;
  strongPassword: RegExp;
}

// ============================================================================
// VALIDATION ERROR TYPES
// ============================================================================

/**
 * Validation error details
 */
export interface ValidationError {
  /** Field name that failed validation */
  field: string;
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Current field value */
  value: any;
  /** Rule that failed */
  rule?: string;
  /** Additional error context */
  context?: Record<string, any>;
}

/**
 * Batch validation result
 */
export interface BatchValidationResult {
  /** Whether all validations passed */
  isValid: boolean;
  /** Individual field results */
  results: Record<string, ValidationResult>;
  /** Array of all errors */
  errors: ValidationError[];
  /** Array of all warnings */
  warnings: string[];
  /** Validation summary */
  summary: {
    /** Total fields validated */
    totalFields: number;
    /** Number of valid fields */
    validFields: number;
    /** Number of invalid fields */
    invalidFields: number;
    /** Number of warnings */
    warningCount: number;
  };
}

// ============================================================================
// VALIDATION EXPORTS HANDLED BY INDIVIDUAL INTERFACE DECLARATIONS
// ============================================================================