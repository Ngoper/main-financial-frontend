/**
 * Percentage and Trend Formatter Utilities
 * 
 * Provides comprehensive percentage formatting and trend analysis utilities for
 * financial applications. These utilities standardize the display of percentage
 * changes, trend indicators, and market movements across the StockSavvy application.
 * 
 * Features:
 * - Percentage formatting with customizable precision and sign display
 * - Trend direction indicators with Unicode symbols
 * - Theme-aware CSS class generation for trend styling
 * - Complete trend display objects with all necessary properties
 * - Support for basis points and percentage point conversions
 * - Market-specific formatting for financial data
 * 
 * @fileoverview Percentage and trend formatting utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  PercentageFormatOptions,
  TrendDirection,
  TrendDisplayOptions,
  TrendDisplay,
  BasisPointsOptions
} from '../types/formatters';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default percentage formatting options
 */
const DEFAULT_PERCENTAGE_OPTIONS: Required<PercentageFormatOptions> = {
  decimals: 2,
  showSign: true,
  includeSymbol: true,
  locale: 'en-US',
  minDisplayValue: 0.001
};

/**
 * Default trend display options
 */
const DEFAULT_TREND_OPTIONS: Required<TrendDisplayOptions> = {
  includeIcon: true,
  includeClasses: true,
  iconSet: 'unicode',
  theme: 'auto'
};

/**
 * Trend icons for different icon sets
 */
const TREND_ICONS = {
  unicode: {
    up: '↗',
    down: '↘',
    neutral: '→'
  },
  custom: {
    up: '▲',
    down: '▼',
    neutral: '●'
  }
} as const;

/**
 * Theme-aware CSS classes for trend styling
 */
const TREND_CLASSES = {
  light: {
    positive: 'text-[#059669] font-semibold',
    negative: 'text-[#dc2626] font-semibold',
    neutral: 'text-[#64748b] font-medium'
  },
  dark: {
    positive: 'text-[#10b981] font-semibold',
    negative: 'text-[#ef4444] font-semibold',
    neutral: 'text-[#94a3b8] font-medium'
  }
} as const;

/**
 * Market-specific trend classes (as used in existing components)
 */
const MARKET_TREND_CLASSES = {
  positive: 'stocksavvy-market-positive',
  negative: 'stocksavvy-market-negative'
} as const;

// ============================================================================
// CORE FORMATTING FUNCTIONS
// ============================================================================

/**
 * Formats a percentage change with customizable options
 * 
 * @param change - The percentage change value (e.g., 5.25 for 5.25%)
 * @param options - Formatting options
 * @returns Formatted percentage string
 * 
 * @example
 * ```typescript
 * formatPercentageChange(5.25)                    // "+5.25%"
 * formatPercentageChange(-2.1)                    // "-2.10%"
 * formatPercentageChange(0.001, { decimals: 3 })  // "+0.001%"
 * formatPercentageChange(5.25, { showSign: false }) // "5.25%"
 * ```
 */
export const formatPercentageChange = (
  change: number,
  options: PercentageFormatOptions = {}
): string => {
  try {
    // Handle invalid inputs
    if (!isFinite(change) || isNaN(change)) {
      return '0%';
    }

    const opts = { ...DEFAULT_PERCENTAGE_OPTIONS, ...options };
    
    // Handle very small values
    if (Math.abs(change) < opts.minDisplayValue && change !== 0) {
      const sign = opts.showSign && change >= 0 ? '+' : '';
      return `${sign}~0${opts.includeSymbol ? '%' : ''}`;
    }

    // Format the number with proper decimals
    const formatter = new Intl.NumberFormat(opts.locale, {
      minimumFractionDigits: opts.decimals,
      maximumFractionDigits: opts.decimals,
      signDisplay: opts.showSign ? 'always' : 'auto'
    });

    const formattedNumber = formatter.format(change);
    return opts.includeSymbol ? `${formattedNumber}%` : formattedNumber;
  } catch (error) {
    console.warn('Failed to format percentage change:', error);
    const sign = options.showSign && change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(options.decimals ?? 2)}%`;
  }
};

/**
 * Gets the appropriate trend icon for a change value
 * 
 * @param change - The change value to analyze
 * @param options - Icon display options
 * @returns Unicode or custom trend icon
 * 
 * @example
 * ```typescript
 * getTrendIcon(5.25)        // "↗"
 * getTrendIcon(-2.1)        // "↘"
 * getTrendIcon(0)           // "→"
 * ```
 */
export const getTrendIcon = (
  change: number,
  options: Pick<TrendDisplayOptions, 'iconSet'> = {}
): string => {
  const iconSet = options.iconSet ?? 'unicode';
  const icons = TREND_ICONS[iconSet];
  
  if (change > 0) return icons.up;
  if (change < 0) return icons.down;
  return icons.neutral;
};

/**
 * Gets theme-aware CSS classes for trend styling
 * 
 * @param change - The change value to analyze
 * @param options - Styling options
 * @returns CSS class string for trend styling
 * 
 * @example
 * ```typescript
 * getTrendClasses(5.25)                      // "text-[#059669] font-semibold"
 * getTrendClasses(-2.1, { theme: 'dark' })  // "text-[#ef4444] font-semibold"
 * ```
 */
export const getTrendClasses = (
  change: number,
  options: Pick<TrendDisplayOptions, 'theme'> = {}
): string => {
  const theme = options.theme ?? 'light';
  
  // Auto-detect theme from document if needed
  const resolvedTheme = theme === 'auto' 
    ? (typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    : theme;
  
  const classes = TREND_CLASSES[resolvedTheme];
  
  if (change > 0) return classes.positive;
  if (change < 0) return classes.negative;
  return classes.neutral;
};

/**
 * Gets market-specific trend classes (compatible with existing components)
 * 
 * @param change - The change value to analyze
 * @returns Market trend CSS class string
 * 
 * @example
 * ```typescript
 * getMarketTrendClasses(5.25)   // "stocksavvy-market-positive"
 * getMarketTrendClasses(-2.1)   // "stocksavvy-market-negative"
 * ```
 */
export const getMarketTrendClasses = (change: number): string => {
  return change >= 0 ? MARKET_TREND_CLASSES.positive : MARKET_TREND_CLASSES.negative;
};

/**
 * Determines the trend direction from a numeric change
 * 
 * @param change - The change value to analyze
 * @param neutralThreshold - Threshold for considering a change neutral
 * @returns Trend direction
 */
export const getTrendDirection = (
  change: number,
  neutralThreshold: number = 0.001
): TrendDirection => {
  if (Math.abs(change) <= neutralThreshold) return 'neutral';
  return change > 0 ? 'up' : 'down';
};

/**
 * Creates a complete trend display object with all necessary properties
 * 
 * @param change - The percentage change value
 * @param percentageOptions - Options for percentage formatting
 * @param trendOptions - Options for trend display
 * @returns Complete trend display object
 * 
 * @example
 * ```typescript
 * const trend = createTrendDisplay(5.25);
 * // {
 * //   value: "+5.25%",
 * //   rawValue: 5.25,
 * //   classes: "text-[#059669] font-semibold",
 * //   icon: "↗",
 * //   direction: "up",
 * //   isPositive: true,
 * //   isNeutral: false,
 * //   ariaLabel: "Increase of 5.25 percent"
 * // }
 * ```
 */
export const createTrendDisplay = (
  change: number,
  percentageOptions: PercentageFormatOptions = {},
  trendOptions: TrendDisplayOptions = {}
): TrendDisplay => {
  const pctOpts = { ...DEFAULT_PERCENTAGE_OPTIONS, ...percentageOptions };
  const trendOpts = { ...DEFAULT_TREND_OPTIONS, ...trendOptions };
  
  const value = formatPercentageChange(change, pctOpts);
  const direction = getTrendDirection(change);
  const isPositive = change > 0;
  const isNeutral = direction === 'neutral';
  
  const classes = trendOpts.includeClasses 
    ? getTrendClasses(change, trendOpts) 
    : '';
  
  const icon = trendOpts.includeIcon 
    ? getTrendIcon(change, trendOpts) 
    : '';
  
  // Create accessibility label
  const absChange = Math.abs(change);
  let ariaLabel: string;
  
  if (isNeutral) {
    ariaLabel = 'No change';
  } else if (isPositive) {
    ariaLabel = `Increase of ${absChange.toFixed(pctOpts.decimals)} percent`;
  } else {
    ariaLabel = `Decrease of ${absChange.toFixed(pctOpts.decimals)} percent`;
  }
  
  return {
    value,
    rawValue: change,
    classes,
    icon,
    direction,
    isPositive,
    isNeutral,
    ariaLabel
  };
};

// ============================================================================
// SPECIALIZED FORMATTING FUNCTIONS
// ============================================================================

/**
 * Formats percentage points (different from regular percentages)
 * 
 * @param change - The percentage point change
 * @param options - Formatting options
 * @returns Formatted percentage points string
 * 
 * @example
 * ```typescript
 * formatPercentagePoints(0.25)  // "+0.25pp"
 * formatPercentagePoints(-0.1)  // "-0.10pp"
 * ```
 */
export const formatPercentagePoints = (
  change: number,
  options: PercentageFormatOptions = {}
): string => {
  const opts = { ...options, includeSymbol: false };
  const formatted = formatPercentageChange(change, opts);
  return `${formatted}pp`;
};

/**
 * Converts percentage to basis points and formats
 * 
 * @param percentage - The percentage value to convert
 * @param options - Basis points formatting options
 * @returns Formatted basis points string
 * 
 * @example
 * ```typescript
 * formatBasisPoints(0.25)    // "25bp"
 * formatBasisPoints(1.5)     // "150bp"
 * ```
 */
export const formatBasisPoints = (
  percentage: number,
  options: BasisPointsOptions = {}
): string => {
  const opts = {
    includeSuffix: true,
    decimals: 0,
    ...options
  };
  
  const basisPoints = percentage * 100;
  const formatted = basisPoints.toFixed(opts.decimals);
  
  return opts.includeSuffix ? `${formatted}bp` : formatted;
};

/**
 * Formats a trend for compact display (e.g., in widgets)
 * 
 * @param change - The change value
 * @param options - Formatting options
 * @returns Compact trend string
 */
export const formatCompactTrend = (
  change: number,
  options: PercentageFormatOptions = {}
): string => {
  const compactOptions: PercentageFormatOptions = {
    decimals: 1,
    showSign: false,
    ...options
  };
  
  const icon = getTrendIcon(change);
  const value = formatPercentageChange(change, compactOptions);
  
  return `${icon} ${value}`;
};

/**
 * Creates a trend display optimized for financial tables
 * 
 * @param change - The percentage change
 * @param options - Display options
 * @returns Financial table trend display
 */
export const createFinancialTrendDisplay = (
  change: number,
  options: TrendDisplayOptions = {}
): TrendDisplay => {
  const financialOptions: PercentageFormatOptions = {
    decimals: 2,
    showSign: true,
    includeSymbol: true
  };
  
  return createTrendDisplay(change, financialOptions, options);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if a percentage change is significant
 * 
 * @param change - The percentage change
 * @param threshold - Significance threshold (default: 0.1%)
 * @returns True if change is significant
 */
export const isSignificantChange = (
  change: number,
  threshold: number = 0.1
): boolean => {
  return Math.abs(change) >= threshold;
};

/**
 * Categorizes a percentage change into performance bands
 * 
 * @param change - The percentage change
 * @returns Performance category
 */
export const categorizePerformance = (
  change: number
): 'excellent' | 'good' | 'moderate' | 'poor' | 'terrible' => {
  const absChange = Math.abs(change);
  
  if (change > 10) return 'excellent';
  if (change > 5) return 'good';
  if (absChange <= 2) return 'moderate';
  if (change < -5) return 'poor';
  if (change < -10) return 'terrible';
  
  return change > 0 ? 'good' : 'poor';
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  formatPercentageChange,
  getTrendIcon,
  getTrendClasses,
  getMarketTrendClasses,
  getTrendDirection,
  createTrendDisplay,
  formatPercentagePoints,
  formatBasisPoints,
  formatCompactTrend,
  createFinancialTrendDisplay,
  isSignificantChange,
  categorizePerformance
};