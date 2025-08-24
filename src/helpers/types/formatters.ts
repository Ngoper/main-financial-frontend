/**
 * Formatter Types and Interfaces
 * 
 * Centralized type definitions for all formatting utilities in the StockSavvy
 * application. This includes number, percentage, date, and currency formatting
 * types and interfaces.
 * 
 * @fileoverview Type definitions for formatter utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// NUMBER FORMATTER TYPES
// ============================================================================

/**
 * Configuration options for number formatting
 */
export interface NumberFormatOptions {
  /** Number of decimal places to display */
  decimals?: number;
  /** Locale for formatting (e.g., 'en-US', 'id-ID') */
  locale?: string;
  /** Whether to use grouping separators (commas) */
  useGrouping?: boolean;
  /** Minimum number of decimal places to display */
  minimumFractionDigits?: number;
  /** Maximum number of decimal places to display */
  maximumFractionDigits?: number;
}

/**
 * Configuration options for currency formatting
 */
export interface CurrencyFormatOptions extends NumberFormatOptions {
  /** Currency code (e.g., 'USD', 'IDR', 'EUR') */
  currency?: string;
  /** Currency display style */
  currencyDisplay?: 'symbol' | 'code' | 'name';
}

/**
 * Supported currency codes for the application
 */
export type SupportedCurrency = 'USD' | 'IDR' | 'EUR' | 'GBP' | 'JPY' | 'SGD' | 'NONE';

/**
 * Large number suffix configuration
 */
export interface NumberSuffix {
  value: number;
  suffix: string;
}

// ============================================================================
// PERCENTAGE FORMATTER TYPES
// ============================================================================

/**
 * Configuration options for percentage formatting
 */
export interface PercentageFormatOptions {
  /** Number of decimal places to display */
  decimals?: number;
  /** Whether to show + sign for positive values */
  showSign?: boolean;
  /** Whether to include the % symbol */
  includeSymbol?: boolean;
  /** Locale for number formatting */
  locale?: string;
  /** Minimum value to display (values below this show as ~0%) */
  minDisplayValue?: number;
}

/**
 * Trend direction enumeration
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Trend display configuration
 */
export interface TrendDisplayOptions {
  /** Whether to include arrow icons */
  includeIcon?: boolean;
  /** Whether to include trend classes */
  includeClasses?: boolean;
  /** Custom icon set to use */
  iconSet?: 'unicode' | 'custom';
  /** Theme variant for styling */
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Complete trend display object with all formatting properties
 */
export interface TrendDisplay {
  /** Formatted percentage value */
  value: string;
  /** Raw numeric value */
  rawValue: number;
  /** CSS classes for styling */
  classes: string;
  /** Trend icon (arrow or symbol) */
  icon: string;
  /** Trend direction */
  direction: TrendDirection;
  /** Whether the trend is positive */
  isPositive: boolean;
  /** Whether the trend is neutral (zero or near-zero) */
  isNeutral: boolean;
  /** Accessibility label for screen readers */
  ariaLabel: string;
}

/**
 * Basis points conversion options
 */
export interface BasisPointsOptions {
  /** Whether to include 'bp' or 'bps' suffix */
  includeSuffix?: boolean;
  /** Number of decimal places for basis points */
  decimals?: number;
}

// ============================================================================
// DATE FORMATTER TYPES
// ============================================================================

/**
 * Date input types that can be formatted
 */
export type DateInput = Date | number | string;

/**
 * Supported locale codes for date formatting
 */
export type SupportedLocale = 'en-US' | 'id-ID' | 'en-GB' | 'ja-JP' | 'zh-CN';

/**
 * Configuration options for date formatting
 */
export interface DateFormatOptions {
  /** Locale for formatting */
  locale?: SupportedLocale;
  /** Timezone to use for formatting */
  timeZone?: string;
  /** Whether to use 12-hour or 24-hour format */
  hour12?: boolean;
}

/**
 * Configuration options for relative time formatting
 */
export interface RelativeTimeOptions extends DateFormatOptions {
  /** Maximum age in hours before showing absolute date */
  maxRelativeHours?: number;
  /** Whether to use short format (e.g., "2h" instead of "2 hours ago") */
  shortFormat?: boolean;
  /** Custom "now" threshold in seconds */
  nowThreshold?: number;
}

/**
 * Date range formatting options
 */
export interface DateRangeOptions extends DateFormatOptions {
  /** Format for displaying date ranges */
  rangeFormat?: 'short' | 'medium' | 'long';
  /** Whether to include time in range display */
  includeTime?: boolean;
}

/**
 * Trading session information
 */
export interface TradingSession {
  /** Session name */
  name: string;
  /** Session start time */
  start: Date;
  /** Session end time */
  end: Date;
  /** Whether the session is currently active */
  isActive: boolean;
  /** Market timezone */
  timeZone: string;
}

// ============================================================================
// FORMATTERS EXPORTS HANDLED BY INDIVIDUAL INTERFACE DECLARATIONS
// ============================================================================