/**
 * Input Validation Utilities
 * 
 * Provides comprehensive input validation utilities for forms, chat messages,
 * and user inputs across the StockSavvy application. These utilities ensure
 * data integrity, security, and user experience consistency.
 * 
 * Features:
 * - Email and contact information validation
 * - Chat message content validation and sanitization
 * - Financial data input validation (amounts, percentages, etc.)
 * - Search query validation and optimization
 * - Password strength validation
 * - Phone number format validation
 * - URL and link validation
 * - Comprehensive error messaging
 * 
 * @fileoverview Input validation and sanitization utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  ValidationResult,
  EmailValidationOptions,
  PasswordValidationOptions,
  FinancialValidationOptions,
  ChatValidationOptions
} from '../types/validation';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default validation options
 */
const DEFAULT_EMAIL_OPTIONS: Required<EmailValidationOptions> = {
  allowDisposable: true,
  maxLength: 254,
  normalize: true,
  allowedDomains: [],
  blockedDomains: []
};

const DEFAULT_PASSWORD_OPTIONS: Required<PasswordValidationOptions> = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  disallowCommon: true
};

const DEFAULT_FINANCIAL_OPTIONS: Required<FinancialValidationOptions> = {
  min: 0,
  max: Number.MAX_SAFE_INTEGER,
  maxDecimals: 2,
  allowNegative: false,
  currency: 'USD'
};

const DEFAULT_CHAT_OPTIONS: Required<ChatValidationOptions> = {
  maxLength: 2000,
  minLength: 1,
  filterProfanity: false,
  checkSpam: false,
  allowMarkdown: false
};

/**
 * Regular expression patterns for validation
 */
const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphanumericWithSpaces: /^[a-zA-Z0-9\s]+$/,
  number: /^-?\d*\.?\d+$/,
  percentage: /^-?\d*\.?\d+%?$/,
  currency: /^-?\$?\d{1,3}(,\d{3})*(\.\d{2})?$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/
};

/**
 * Common disposable email domains (partial list)
 */
const DISPOSABLE_EMAIL_DOMAINS = [
  '10minutemail.com',
  'tempmail.org',
  'guerrillamail.com',
  'yopmail.com',
  'mailinator.com'
];

/**
 * Common weak passwords (partial list)
 */
const COMMON_PASSWORDS = [
  'password',
  '123456',
  'password123',
  'admin',
  'qwerty',
  'letmein',
  'welcome',
  'monkey'
];

/**
 * Profanity filter patterns (basic implementation)
 */
const PROFANITY_PATTERNS = [
  // Add basic patterns here - in production, use a comprehensive library
  /\b(spam|scam|fraud)\b/gi
];

// ============================================================================
// CORE VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates email addresses with comprehensive checks
 * 
 * @param email - Email string to validate
 * @param options - Email validation options
 * @returns Detailed validation result
 * 
 * @example
 * ```typescript
 * validateEmail('user@example.com')
 * // { isValid: true, sanitized: 'user@example.com' }
 * 
 * validateEmail('invalid-email')
 * // { isValid: false, error: 'Please enter a valid email address' }
 * ```
 */
export const validateEmail = (
  email: string,
  options: EmailValidationOptions = {}
): ValidationResult<string> => {
  const opts = { ...DEFAULT_EMAIL_OPTIONS, ...options };
  
  // Basic presence check
  if (!email?.trim()) {
    return {
      isValid: false,
      error: 'Email is required',
      metadata: { rulesApplied: ['required'] }
    };
  }
  
  const trimmed = email.trim();
  
  // Length validation
  if (trimmed.length > opts.maxLength) {
    return {
      isValid: false,
      error: `Email must be less than ${opts.maxLength} characters`,
      metadata: { rulesApplied: ['maxLength'] }
    };
  }
  
  // Format validation
  if (!VALIDATION_PATTERNS.email.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
      metadata: { 
        rulesApplied: ['format'],
        suggestions: ['Check for typos', 'Ensure @ symbol is present', 'Verify domain format']
      }
    };
  }
  
  const [localPart, domain] = trimmed.split('@');
  
  // Domain restrictions
  if (opts.allowedDomains.length > 0 && !opts.allowedDomains.includes(domain.toLowerCase())) {
    return {
      isValid: false,
      error: `Email domain not allowed. Allowed domains: ${opts.allowedDomains.join(', ')}`,
      metadata: { rulesApplied: ['allowedDomains'] }
    };
  }
  
  if (opts.blockedDomains.includes(domain.toLowerCase())) {
    return {
      isValid: false,
      error: 'Email domain is not allowed',
      metadata: { rulesApplied: ['blockedDomains'] }
    };
  }
  
  // Disposable email check
  const warnings: string[] = [];
  if (!opts.allowDisposable && DISPOSABLE_EMAIL_DOMAINS.includes(domain.toLowerCase())) {
    warnings.push('Temporary email addresses may not receive important notifications');
  }
  
  // Normalize email
  const sanitized = opts.normalize ? trimmed.toLowerCase() : trimmed;
  
  return {
    isValid: true,
    sanitized,
    warning: warnings.length > 0 ? warnings[0] : undefined,
    metadata: {
      rulesApplied: ['required', 'format', 'length'],
      confidence: 95,
      suggestions: warnings.length > 0 ? ['Consider using a permanent email address'] : []
    }
  };
};

/**
 * Validates password strength with customizable requirements
 * 
 * @param password - Password to validate
 * @param options - Password validation options
 * @returns Detailed validation result
 */
export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): ValidationResult<string> => {
  const opts = { ...DEFAULT_PASSWORD_OPTIONS, ...options };
  
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required',
      metadata: { rulesApplied: ['required'] }
    };
  }
  
  const issues: string[] = [];
  const rulesApplied: string[] = ['required'];
  
  // Length validation
  if (password.length < opts.minLength) {
    issues.push(`Password must be at least ${opts.minLength} characters long`);
    rulesApplied.push('minLength');
  }
  
  if (password.length > opts.maxLength) {
    issues.push(`Password must be less than ${opts.maxLength} characters long`);
    rulesApplied.push('maxLength');
  }
  
  // Character requirements
  if (opts.requireUppercase && !/[A-Z]/.test(password)) {
    issues.push('Password must contain at least one uppercase letter');
    rulesApplied.push('uppercase');
  }
  
  if (opts.requireLowercase && !/[a-z]/.test(password)) {
    issues.push('Password must contain at least one lowercase letter');
    rulesApplied.push('lowercase');
  }
  
  if (opts.requireNumbers && !/\d/.test(password)) {
    issues.push('Password must contain at least one number');
    rulesApplied.push('numbers');
  }
  
  if (opts.requireSpecialChars && !/[@$!%*?&]/.test(password)) {
    issues.push('Password must contain at least one special character (@$!%*?&)');
    rulesApplied.push('specialChars');
  }
  
  // Common password check
  if (opts.disallowCommon && COMMON_PASSWORDS.includes(password.toLowerCase())) {
    issues.push('Password is too common. Please choose a more unique password');
    rulesApplied.push('commonPassword');
  }
  
  if (issues.length > 0) {
    return {
      isValid: false,
      error: issues[0],
      metadata: {
        rulesApplied,
        suggestions: issues.slice(1)
      }
    };
  }
  
  // Calculate strength score
  let strength = 0;
  if (password.length >= 12) strength += 25;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/\d/.test(password)) strength += 15;
  if (/[@$!%*?&]/.test(password)) strength += 20;
  
  return {
    isValid: true,
    sanitized: password,
    metadata: {
      rulesApplied,
      confidence: strength,
      suggestions: strength < 80 ? ['Consider adding more character variety for stronger security'] : []
    }
  };
};

/**
 * Validates chat messages with content filtering and length checks
 * 
 * @param message - Message content to validate
 * @param options - Chat validation options
 * @returns Detailed validation result
 * 
 * @example
 * ```typescript
 * validateChatMessage('Hello, how can I help?')
 * // { isValid: true, sanitized: 'Hello, how can I help?' }
 * ```
 */
export const validateChatMessage = (
  message: string,
  options: ChatValidationOptions = {}
): ValidationResult<string> => {
  const opts = { ...DEFAULT_CHAT_OPTIONS, ...options };
  
  const trimmed = message?.trim();
  
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Message cannot be empty',
      metadata: { rulesApplied: ['required'] }
    };
  }
  
  const rulesApplied: string[] = ['required'];
  
  // Length validation
  if (trimmed.length < opts.minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${opts.minLength} character${opts.minLength > 1 ? 's' : ''}`,
      metadata: { rulesApplied: [...rulesApplied, 'minLength'] }
    };
  }
  
  if (trimmed.length > opts.maxLength) {
    return {
      isValid: false,
      error: `Message is too long (max ${opts.maxLength} characters)`,
      metadata: { rulesApplied: [...rulesApplied, 'maxLength'] }
    };
  }
  
  rulesApplied.push('length');
  
  // Profanity filtering
  const warnings: string[] = [];
  if (opts.filterProfanity) {
    for (const pattern of PROFANITY_PATTERNS) {
      if (pattern.test(trimmed)) {
        warnings.push('Message contains potentially inappropriate content');
        rulesApplied.push('profanity');
        break;
      }
    }
  }
  
  // Spam detection (basic implementation)
  if (opts.checkSpam) {
    // Check for excessive repetition
    const words = trimmed.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
      warnings.push('Message appears to contain repetitive content');
      rulesApplied.push('spam');
    }
    
    // Check for excessive caps
    const capsCount = (trimmed.match(/[A-Z]/g) || []).length;
    if (capsCount / trimmed.length > 0.5 && trimmed.length > 10) {
      warnings.push('Message contains excessive capitalization');
      rulesApplied.push('caps');
    }
  }
  
  return {
    isValid: true,
    sanitized: trimmed,
    warning: warnings.length > 0 ? warnings[0] : undefined,
    metadata: {
      rulesApplied,
      confidence: warnings.length === 0 ? 95 : 75,
      suggestions: warnings.slice(1)
    }
  };
};

/**
 * Validates search queries with optimization suggestions
 * 
 * @param query - Search query to validate
 * @param minLength - Minimum query length
 * @param maxLength - Maximum query length
 * @returns Detailed validation result
 * 
 * @example
 * ```typescript
 * validateSearchQuery('AAPL stock price')
 * // { isValid: true, sanitized: 'AAPL stock price' }
 * ```
 */
export const validateSearchQuery = (
  query: string,
  minLength: number = 1,
  maxLength: number = 100
): ValidationResult<string> => {
  const trimmed = query?.trim();
  
  if (!trimmed || trimmed.length < minLength) {
    return {
      isValid: false,
      error: `Search query must be at least ${minLength} character${minLength > 1 ? 's' : ''}`,
      metadata: { rulesApplied: ['minLength'] }
    };
  }
  
  if (trimmed.length > maxLength) {
    return {
      isValid: false,
      error: `Search query is too long (max ${maxLength} characters)`,
      metadata: { rulesApplied: ['maxLength'] }
    };
  }
  
  const suggestions: string[] = [];
  
  // Check for optimization opportunities
  if (trimmed.length < 3) {
    suggestions.push('Try using more specific terms for better results');
  }
  
  const words = trimmed.split(/\s+/);
  if (words.length === 1 && words[0].length > 2) {
    suggestions.push('Consider adding related terms to narrow your search');
  }
  
  return {
    isValid: true,
    sanitized: trimmed,
    metadata: {
      rulesApplied: ['length'],
      confidence: 90,
      suggestions
    }
  };
};

/**
 * Validates financial amounts and percentages
 * 
 * @param value - Financial value to validate
 * @param options - Financial validation options
 * @returns Detailed validation result
 */
export const validateFinancialAmount = (
  value: string | number,
  options: FinancialValidationOptions = {}
): ValidationResult<number> => {
  const opts = { ...DEFAULT_FINANCIAL_OPTIONS, ...options };
  
  if (value === null || value === undefined || value === '') {
    return {
      isValid: false,
      error: 'Amount is required',
      metadata: { rulesApplied: ['required'] }
    };
  }
  
  // Convert to string for parsing
  const stringValue = String(value).trim();
  
  // Remove currency symbols and commas
  const cleanValue = stringValue.replace(/[$,]/g, '');
  
  // Validate numeric format
  if (!VALIDATION_PATTERNS.number.test(cleanValue)) {
    return {
      isValid: false,
      error: 'Please enter a valid number',
      metadata: { rulesApplied: ['format'] }
    };
  }
  
  const numericValue = parseFloat(cleanValue);
  const rulesApplied: string[] = ['format'];
  
  // Range validation
  if (numericValue < opts.min) {
    return {
      isValid: false,
      error: `Amount must be at least ${opts.min}`,
      metadata: { rulesApplied: [...rulesApplied, 'min'] }
    };
  }
  
  if (numericValue > opts.max) {
    return {
      isValid: false,
      error: `Amount cannot exceed ${opts.max}`,
      metadata: { rulesApplied: [...rulesApplied, 'max'] }
    };
  }
  
  rulesApplied.push('range');
  
  // Negative value check
  if (!opts.allowNegative && numericValue < 0) {
    return {
      isValid: false,
      error: 'Negative amounts are not allowed',
      metadata: { rulesApplied: [...rulesApplied, 'negative'] }
    };
  }
  
  // Decimal places validation
  const decimalPlaces = (cleanValue.split('.')[1] || '').length;
  if (decimalPlaces > opts.maxDecimals) {
    return {
      isValid: false,
      error: `Amount cannot have more than ${opts.maxDecimals} decimal places`,
      metadata: { rulesApplied: [...rulesApplied, 'decimals'] }
    };
  }
  
  return {
    isValid: true,
    sanitized: numericValue,
    metadata: {
      rulesApplied,
      confidence: 95
    }
  };
};

/**
 * Validates phone numbers with international format support
 * 
 * @param phone - Phone number to validate
 * @param allowInternational - Whether to allow international formats
 * @returns Detailed validation result
 */
export const validatePhoneNumber = (
  phone: string,
  allowInternational: boolean = true
): ValidationResult<string> => {
  if (!phone?.trim()) {
    return {
      isValid: false,
      error: 'Phone number is required',
      metadata: { rulesApplied: ['required'] }
    };
  }
  
  // Remove all non-digit characters except + for international
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  if (!allowInternational && cleanPhone.startsWith('+')) {
    return {
      isValid: false,
      error: 'International numbers are not allowed',
      metadata: { rulesApplied: ['international'] }
    };
  }
  
  if (!VALIDATION_PATTERNS.phone.test(cleanPhone)) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number',
      metadata: { rulesApplied: ['format'] }
    };
  }
  
  return {
    isValid: true,
    sanitized: cleanPhone,
    metadata: {
      rulesApplied: ['format'],
      confidence: 90
    }
  };
};

/**
 * Validates URLs with protocol and domain checks
 * 
 * @param url - URL to validate
 * @param requireHttps - Whether to require HTTPS protocol
 * @returns Detailed validation result
 */
export const validateURL = (
  url: string,
  requireHttps: boolean = false
): ValidationResult<string> => {
  if (!url?.trim()) {
    return {
      isValid: false,
      error: 'URL is required',
      metadata: { rulesApplied: ['required'] }
    };
  }
  
  const trimmed = url.trim();
  
  if (!VALIDATION_PATTERNS.url.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid URL',
      metadata: { rulesApplied: ['format'] }
    };
  }
  
  if (requireHttps && !trimmed.startsWith('https://')) {
    return {
      isValid: false,
      error: 'URL must use HTTPS protocol',
      metadata: { rulesApplied: ['https'] }
    };
  }
  
  return {
    isValid: true,
    sanitized: trimmed,
    metadata: {
      rulesApplied: ['format'],
      confidence: 95
    }
  };
};

// ============================================================================
// BATCH VALIDATION UTILITIES
// ============================================================================

/**
 * Validates multiple fields at once
 * 
 * @param fields - Object with field names and values
 * @param validators - Object with field names and validator functions
 * @returns Object with validation results for each field
 */
export const validateFields = <T extends Record<string, any>>(
  fields: T,
  validators: Record<keyof T, (value: any) => ValidationResult>
): Record<keyof T, ValidationResult> => {
  const results = {} as Record<keyof T, ValidationResult>;
  
  for (const [fieldName, value] of Object.entries(fields)) {
    const validator = validators[fieldName as keyof T];
    if (validator) {
      results[fieldName as keyof T] = validator(value);
    }
  }
  
  return results;
};

/**
 * Checks if all validation results are valid
 * 
 * @param results - Validation results object
 * @returns True if all validations passed
 */
export const allFieldsValid = (results: Record<string, ValidationResult>): boolean => {
  return Object.values(results).every(result => result.isValid);
};

/**
 * Gets all error messages from validation results
 * 
 * @param results - Validation results object
 * @returns Array of error messages
 */
export const getValidationErrors = (results: Record<string, ValidationResult>): string[] => {
  return Object.values(results)
    .filter(result => !result.isValid && result.error)
    .map(result => result.error!);
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  validateEmail,
  validatePassword,
  validateChatMessage,
  validateSearchQuery,
  validateFinancialAmount,
  validatePhoneNumber,
  validateURL,
  validateFields,
  allFieldsValid,
  getValidationErrors
};