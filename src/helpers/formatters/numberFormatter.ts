/**
 * Number Formatter Utilities
 * 
 * Provides comprehensive number formatting utilities for financial applications.
 * These utilities standardize the display of numeric values across the StockSavvy
 * application, ensuring consistency in currency formatting, large number abbreviations,
 * and decimal precision handling.
 * 
 * Features:
 * - Internationalization support with locale-aware formatting
 * - Currency formatting with symbol placement and precision
 * - Large number abbreviation with K/M/B/T suffixes
 * - Decimal precision control and rounding
 * - Error handling and fallback values
 * - Performance optimized with minimal overhead
 * 
 * @fileoverview Number and currency formatting utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  NumberFormatOptions,
  CurrencyFormatOptions,
  SupportedCurrency,
  NumberSuffix
} from '../types/formatters';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default formatting options
 */
const DEFAULT_FORMAT_OPTIONS: Required<NumberFormatOptions> = {
  decimals: 2,
  locale: 'en-US',
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
};

/**
 * Default currency formatting options
 */
const DEFAULT_CURRENCY_OPTIONS: Required<CurrencyFormatOptions> = {
  ...DEFAULT_FORMAT_OPTIONS,
  currency: 'USD',
  currencyDisplay: 'symbol'
};

/**
 * Large number suffixes for abbreviation
 */
const NUMBER_SUFFIXES: NumberSuffix[] = [
  { value: 1e12, suffix: 'T' }, // Trillion
  { value: 1e9, suffix: 'B' },  // Billion
  { value: 1e6, suffix: 'M' },  // Million
  { value: 1e3, suffix: 'K' }   // Thousand
];

/**
 * Currency symbol mappings for special cases
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$',
  'IDR': 'Rp',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥',
  'SGD': 'S$'
};

// ============================================================================
// CORE FORMATTING FUNCTIONS
// ============================================================================

/**
 * Formats a numeric value with consistent decimal places and locale support
 * 
 * @param value - The numeric value to format
 * @param options - Formatting options
 * @returns Formatted number string
 * 
 * @example
 * ```typescript
 * formatNumber(1234.567)                    // "1,234.57"
 * formatNumber(1234.567, { decimals: 0 })  // "1,235"
 * formatNumber(1234.567, { locale: 'id-ID' }) // "1.234,57"
 * ```
 */
export const formatNumber = (
  value: number,
  options: NumberFormatOptions = {}
): string => {
  try {
    // Handle invalid inputs
    if (!isFinite(value) || isNaN(value)) {
      return '0';
    }

    const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };
    
    const formatter = new Intl.NumberFormat(opts.locale, {
      minimumFractionDigits: opts.decimals ?? opts.minimumFractionDigits,
      maximumFractionDigits: opts.decimals ?? opts.maximumFractionDigits,
      useGrouping: opts.useGrouping
    });

    return formatter.format(value);
  } catch (error) {
    console.warn('Failed to format number:', error);
    return value.toString();
  }
};

/**
 * Formats a currency value with proper symbols and locale support
 * 
 * @param value - The numeric value to format as currency
 * @param options - Currency formatting options
 * @returns Formatted currency string
 * 
 * @example
 * ```typescript
 * formatCurrency(1234.56)                           // "$1,234.56"
 * formatCurrency(1234.56, { currency: 'IDR' })     // "Rp1,235"
 * formatCurrency(1234.56, { currency: 'NONE' })    // "1,234.56"
 * ```
 */
export const formatCurrency = (
  value: number,
  options: CurrencyFormatOptions = {}
): string => {
  try {
    // Handle invalid inputs
    if (!isFinite(value) || isNaN(value)) {
      return options.currency === 'NONE' ? '0' : '$0.00';
    }

    const opts = { ...DEFAULT_CURRENCY_OPTIONS, ...options };
    
    // Handle special case where no currency symbol is wanted
    if (opts.currency === 'NONE') {
      return formatNumber(value, opts);
    }

    // Special handling for IDR (Indonesian Rupiah) - typically no decimals
    if (opts.currency === 'IDR') {
      const formatter = new Intl.NumberFormat(opts.locale, {
        style: 'currency',
        currency: opts.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currencyDisplay: opts.currencyDisplay
      });
      return formatter.format(value);
    }

    // Standard currency formatting
    const formatter = new Intl.NumberFormat(opts.locale, {
      style: 'currency',
      currency: opts.currency,
      minimumFractionDigits: opts.decimals ?? opts.minimumFractionDigits,
      maximumFractionDigits: opts.decimals ?? opts.maximumFractionDigits,
      currencyDisplay: opts.currencyDisplay
    });

    return formatter.format(value);
  } catch (error) {
    console.warn('Failed to format currency:', error);
    // Fallback to simple formatting with currency symbol
    const symbol = CURRENCY_SYMBOLS[options.currency || 'USD'] || '$';
    return `${symbol}${formatNumber(value, options)}`;
  }
};

/**
 * Formats large numbers with abbreviated suffixes (K, M, B, T)
 * 
 * @param value - The numeric value to format
 * @param options - Formatting options
 * @returns Formatted string with appropriate suffix
 * 
 * @example
 * ```typescript
 * formatLargeNumber(1234)        // "1.2K"
 * formatLargeNumber(1234567)     // "1.2M"
 * formatLargeNumber(1234567890)  // "1.2B"
 * formatLargeNumber(500)         // "500"
 * ```
 */
export const formatLargeNumber = (
  value: number,
  options: NumberFormatOptions & { threshold?: number } = {}
): string => {
  try {
    // Handle invalid inputs
    if (!isFinite(value) || isNaN(value)) {
      return '0';
    }

    const absValue = Math.abs(value);
    const threshold = options.threshold ?? 1000;
    
    // Don't abbreviate numbers below threshold
    if (absValue < threshold) {
      return formatNumber(value, { ...options, decimals: 0 });
    }

    // Find appropriate suffix
    for (const { value: suffixValue, suffix } of NUMBER_SUFFIXES) {
      if (absValue >= suffixValue) {
        const scaledValue = value / suffixValue;
        const decimals = options.decimals ?? (scaledValue < 10 ? 1 : 0);
        return formatNumber(scaledValue, { ...options, decimals }) + suffix;
      }
    }

    // Fallback to regular formatting
    return formatNumber(value, options);
  } catch (error) {
    console.warn('Failed to format large number:', error);
    return value.toString();
  }
};

/**
 * Formats a number as a compact currency with abbreviated suffixes
 * 
 * @param value - The numeric value to format
 * @param options - Currency formatting options
 * @returns Formatted compact currency string
 * 
 * @example
 * ```typescript
 * formatCompactCurrency(1234567)                    // "$1.2M"
 * formatCompactCurrency(1234567, { currency: 'IDR' }) // "Rp1B"
 * ```
 */
export const formatCompactCurrency = (
  value: number,
  options: CurrencyFormatOptions & { threshold?: number } = {}
): string => {
  try {
    const opts = { ...DEFAULT_CURRENCY_OPTIONS, ...options };
    
    if (opts.currency === 'NONE') {
      return formatLargeNumber(value, opts);
    }

    const absValue = Math.abs(value);
    const threshold = opts.threshold ?? 1000;
    
    if (absValue < threshold) {
      return formatCurrency(value, opts);
    }

    // Get currency symbol
    const symbol = CURRENCY_SYMBOLS[opts.currency] || opts.currency;
    
    // Format the abbreviated number
    const formattedNumber = formatLargeNumber(value, opts);
    
    // Combine symbol with formatted number
    return `${symbol}${formattedNumber}`;
  } catch (error) {
    console.warn('Failed to format compact currency:', error);
    return formatCurrency(value, options);
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if a value can be safely formatted as a number
 * 
 * @param value - Value to check
 * @returns True if value can be formatted
 */
export const isFormattableNumber = (value: any): value is number => {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
};

/**
 * Safely converts a value to a number for formatting
 * 
 * @param value - Value to convert
 * @param fallback - Fallback value if conversion fails
 * @returns Converted number or fallback
 */
export const safeNumberConversion = (value: any, fallback: number = 0): number => {
  if (isFormattableNumber(value)) {
    return value;
  }
  
  const converted = Number(value);
  return isFormattableNumber(converted) ? converted : fallback;
};

/**
 * Rounds a number to specified decimal places
 * 
 * @param value - Number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 */
export const roundToDecimals = (value: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

// ============================================================================
// SPECIALIZED FORMATTERS
// ============================================================================

/**
 * Formats a number for display in financial tables
 * 
 * @param value - The numeric value to format
 * @param options - Formatting options with financial defaults
 * @returns Formatted number suitable for financial tables
 */
export const formatFinancialNumber = (
  value: number,
  options: NumberFormatOptions & { showSign?: boolean } = {}
): string => {
  const { showSign = false, ...formatOptions } = options;
  const formatted = formatNumber(value, {
    decimals: 2,
    ...formatOptions
  });
  
  if (showSign && value > 0) {
    return `+${formatted}`;
  }
  
  return formatted;
};

/**
 * Formats a number for compact display in widgets
 * 
 * @param value - The numeric value to format
 * @param options - Formatting options
 * @returns Compactly formatted number
 */
export const formatWidgetNumber = (
  value: number,
  options: NumberFormatOptions = {}
): string => {
  const absValue = Math.abs(value);
  
  if (absValue >= 1000) {
    return formatLargeNumber(value, { decimals: 1, ...options });
  }
  
  if (absValue >= 100) {
    return formatNumber(value, { decimals: 0, ...options });
  }
  
  return formatNumber(value, { decimals: 2, ...options });
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  formatNumber,
  formatCurrency,
  formatLargeNumber,
  formatCompactCurrency,
  formatFinancialNumber,
  formatWidgetNumber,
  isFormattableNumber,
  safeNumberConversion,
  roundToDecimals
};