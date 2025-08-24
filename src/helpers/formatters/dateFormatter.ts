/**
 * Date and Time Formatter Utilities
 * 
 * Provides comprehensive date and time formatting utilities for the StockSavvy
 * application. These utilities standardize timestamp display across chat interfaces,
 * activity feeds, and data tables with support for multiple locales and formats.
 * 
 * Features:
 * - Chat message timestamp formatting
 * - Relative time calculations (e.g., "2 hours ago")
 * - Trading session and market hours formatting
 * - Date range formatting for reports
 * - Timezone-aware formatting
 * - Internationalization support
 * - Accessibility-friendly date descriptions
 * 
 * @fileoverview Date and time formatting utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  DateInput,
  SupportedLocale,
  DateFormatOptions,
  RelativeTimeOptions,
  DateRangeOptions,
  TradingSession
} from '../types/formatters';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default formatting options
 */
const DEFAULT_DATE_OPTIONS: Required<DateFormatOptions> = {
  locale: 'en-US',
  timeZone: 'UTC',
  hour12: true
};

/**
 * Default relative time options
 */
const DEFAULT_RELATIVE_OPTIONS: Required<RelativeTimeOptions> = {
  ...DEFAULT_DATE_OPTIONS,
  maxRelativeHours: 168, // 7 days
  shortFormat: false,
  nowThreshold: 60 // 1 minute
};

/**
 * Time unit thresholds for relative time calculations
 */
const TIME_UNITS = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
  month: 1000 * 60 * 60 * 24 * 30,
  year: 1000 * 60 * 60 * 24 * 365
} as const;

/**
 * Relative time format templates for different locales
 */
const RELATIVE_TIME_TEMPLATES = {
  'en-US': {
    now: 'Just now',
    minutes: (n: number, short: boolean) => short ? `${n}m` : `${n} minute${n !== 1 ? 's' : ''} ago`,
    hours: (n: number, short: boolean) => short ? `${n}h` : `${n} hour${n !== 1 ? 's' : ''} ago`,
    days: (n: number, short: boolean) => short ? `${n}d` : n === 1 ? 'Yesterday' : `${n} days ago`,
    weeks: (n: number, short: boolean) => short ? `${n}w` : `${n} week${n !== 1 ? 's' : ''} ago`,
    months: (n: number, short: boolean) => short ? `${n}mo` : `${n} month${n !== 1 ? 's' : ''} ago`,
    years: (n: number, short: boolean) => short ? `${n}y` : `${n} year${n !== 1 ? 's' : ''} ago`
  },
  'id-ID': {
    now: 'Baru saja',
    minutes: (n: number, short: boolean) => short ? `${n}m` : `${n} menit yang lalu`,
    hours: (n: number, short: boolean) => short ? `${n}j` : `${n} jam yang lalu`,
    days: (n: number, short: boolean) => short ? `${n}h` : n === 1 ? 'Kemarin' : `${n} hari yang lalu`,
    weeks: (n: number, short: boolean) => short ? `${n}mg` : `${n} minggu yang lalu`,
    months: (n: number, short: boolean) => short ? `${n}bl` : `${n} bulan yang lalu`,
    years: (n: number, short: boolean) => short ? `${n}th` : `${n} tahun yang lalu`
  }
} as const;

/**
 * Major financial market timezones
 */
export const MARKET_TIMEZONES = {
  'US_EASTERN': 'America/New_York',
  'US_PACIFIC': 'America/Los_Angeles',
  'LONDON': 'Europe/London',
  'TOKYO': 'Asia/Tokyo',
  'HONG_KONG': 'Asia/Hong_Kong',
  'SINGAPORE': 'Asia/Singapore',
  'JAKARTA': 'Asia/Jakarta',
  'SYDNEY': 'Australia/Sydney'
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely converts various date inputs to Date object
 * 
 * @param date - Date input to convert
 * @returns Date object or null if invalid
 */
const safeDateConversion = (date: DateInput): Date | null => {
  try {
    if (date instanceof Date) {
      return isNaN(date.getTime()) ? null : date;
    }
    
    if (typeof date === 'number') {
      return new Date(date);
    }
    
    if (typeof date === 'string') {
      const parsed = new Date(date);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    
    return null;
  } catch {
    return null;
  }
};

/**
 * Gets the current timestamp for relative time calculations
 * 
 * @returns Current timestamp in milliseconds
 */
const getCurrentTimestamp = (): number => Date.now();

// ============================================================================
// CORE FORMATTING FUNCTIONS
// ============================================================================

/**
 * Formats a timestamp for chat messages with clean, readable output
 * 
 * @param date - Date input to format
 * @param options - Formatting options
 * @returns Formatted time string (e.g., "10:30 AM", "14:30")
 * 
 * @example
 * ```typescript
 * formatChatTimestamp(new Date())                    // "10:30 AM"
 * formatChatTimestamp(Date.now(), { hour12: false }) // "22:30"
 * formatChatTimestamp("2024-01-24T10:30:00Z", { locale: 'id-ID' }) // "10.30"
 * ```
 */
export const formatChatTimestamp = (
  date: DateInput,
  options: DateFormatOptions = {}
): string => {
  const dateObj = safeDateConversion(date);
  if (!dateObj) {
    return '--:--';
  }

  const opts = { ...DEFAULT_DATE_OPTIONS, ...options };
  
  try {
    return dateObj.toLocaleTimeString(opts.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: opts.hour12,
      timeZone: opts.timeZone
    });
  } catch (error) {
    console.warn('Failed to format chat timestamp:', error);
    return dateObj.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
};

/**
 * Formats relative time with intelligent fallback to absolute dates
 * 
 * @param date - Date input to format
 * @param options - Relative time formatting options
 * @returns Human-readable relative time string
 * 
 * @example
 * ```typescript
 * formatRelativeTime(new Date(Date.now() - 5000))     // "Just now"
 * formatRelativeTime(new Date(Date.now() - 3600000))  // "1 hour ago"
 * formatRelativeTime(new Date(Date.now() - 86400000)) // "Yesterday"
 * ```
 */
export const formatRelativeTime = (
  date: DateInput,
  options: RelativeTimeOptions = {}
): string => {
  const dateObj = safeDateConversion(date);
  if (!dateObj) {
    return 'Unknown time';
  }

  const opts = { ...DEFAULT_RELATIVE_OPTIONS, ...options };
  const now = getCurrentTimestamp();
  const diffInMs = now - dateObj.getTime();
  
  // Handle future dates
  if (diffInMs < 0) {
    return formatAbsoluteDate(dateObj, opts);
  }
  
  // Check if we should use absolute formatting
  const maxRelativeMs = opts.maxRelativeHours * TIME_UNITS.hour;
  if (diffInMs > maxRelativeMs) {
    return formatAbsoluteDate(dateObj, opts);
  }
  
  // Get locale templates
  const templates = (RELATIVE_TIME_TEMPLATES as any)[opts.locale] || RELATIVE_TIME_TEMPLATES['en-US'];
  
  // Just now threshold
  if (diffInMs < opts.nowThreshold * TIME_UNITS.second) {
    return templates.now;
  }
  
  // Calculate appropriate unit
  if (diffInMs < TIME_UNITS.hour) {
    const minutes = Math.floor(diffInMs / TIME_UNITS.minute);
    return templates.minutes(Math.max(1, minutes), opts.shortFormat);
  }
  
  if (diffInMs < TIME_UNITS.day) {
    const hours = Math.floor(diffInMs / TIME_UNITS.hour);
    return templates.hours(hours, opts.shortFormat);
  }
  
  if (diffInMs < TIME_UNITS.week) {
    const days = Math.floor(diffInMs / TIME_UNITS.day);
    return templates.days(days, opts.shortFormat);
  }
  
  if (diffInMs < TIME_UNITS.month) {
    const weeks = Math.floor(diffInMs / TIME_UNITS.week);
    return templates.weeks(weeks, opts.shortFormat);
  }
  
  if (diffInMs < TIME_UNITS.year) {
    const months = Math.floor(diffInMs / TIME_UNITS.month);
    return templates.months(months, opts.shortFormat);
  }
  
  const years = Math.floor(diffInMs / TIME_UNITS.year);
  return templates.years(years, opts.shortFormat);
};

/**
 * Formats an absolute date in a user-friendly format
 * 
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 * 
 * @example
 * ```typescript
 * formatAbsoluteDate(new Date("2024-01-24"))  // "Jan 24, 2024"
 * formatAbsoluteDate(new Date(), { locale: 'id-ID' }) // "24 Jan 2024"
 * ```
 */
export const formatAbsoluteDate = (
  date: DateInput,
  options: DateFormatOptions = {}
): string => {
  const dateObj = safeDateConversion(date);
  if (!dateObj) {
    return 'Invalid date';
  }

  const opts = { ...DEFAULT_DATE_OPTIONS, ...options };
  
  try {
    return dateObj.toLocaleDateString(opts.locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: opts.timeZone
    });
  } catch (error) {
    console.warn('Failed to format absolute date:', error);
    return dateObj.toLocaleDateString();
  }
};

/**
 * Formats a complete date and time string
 * 
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Complete date and time string
 * 
 * @example
 * ```typescript
 * formatDateTime(new Date())  // "Jan 24, 2024 at 10:30 AM"
 * ```
 */
export const formatDateTime = (
  date: DateInput,
  options: DateFormatOptions = {}
): string => {
  const dateObj = safeDateConversion(date);
  if (!dateObj) {
    return 'Invalid date';
  }

  const opts = { ...DEFAULT_DATE_OPTIONS, ...options };
  
  try {
    return dateObj.toLocaleDateString(opts.locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: opts.hour12,
      timeZone: opts.timeZone
    });
  } catch (error) {
    console.warn('Failed to format date time:', error);
    return `${formatAbsoluteDate(date, opts)} at ${formatChatTimestamp(date, opts)}`;
  }
};

/**
 * Formats a date range with intelligent formatting
 * 
 * @param startDate - Range start date
 * @param endDate - Range end date
 * @param options - Range formatting options
 * @returns Formatted date range string
 * 
 * @example
 * ```typescript
 * formatDateRange(start, end)  // "Jan 24 - Feb 15, 2024"
 * formatDateRange(start, end, { rangeFormat: 'short' })  // "1/24 - 2/15"
 * ```
 */
export const formatDateRange = (
  startDate: DateInput,
  endDate: DateInput,
  options: DateRangeOptions = {}
): string => {
  const start = safeDateConversion(startDate);
  const end = safeDateConversion(endDate);
  
  if (!start || !end) {
    return 'Invalid date range';
  }

  const opts = { 
    ...DEFAULT_DATE_OPTIONS, 
    rangeFormat: 'medium' as const,
    includeTime: false,
    ...options 
  };
  
  try {
    const formatter = new Intl.DateTimeFormat(opts.locale, {
      timeZone: opts.timeZone
    });
    
    return formatter.formatRange(start, end);
  } catch (error) {
    console.warn('Failed to format date range:', error);
    return `${formatAbsoluteDate(start, opts)} - ${formatAbsoluteDate(end, opts)}`;
  }
};

// ============================================================================
// SPECIALIZED FORMATTING FUNCTIONS
// ============================================================================

/**
 * Formats market timestamp with timezone awareness
 * 
 * @param date - Date to format
 * @param marketTimezone - Market timezone
 * @param options - Formatting options
 * @returns Market-aware formatted time
 */
export const formatMarketTime = (
  date: DateInput,
  marketTimezone: string = MARKET_TIMEZONES.US_EASTERN,
  options: DateFormatOptions = {}
): string => {
  return formatDateTime(date, {
    ...options,
    timeZone: marketTimezone
  });
};

/**
 * Formats last updated timestamp for data displays
 * 
 * @param date - Last updated date
 * @param options - Formatting options
 * @returns Last updated string
 * 
 * @example
 * ```typescript
 * formatLastUpdated(new Date())  // "Last updated: 10:30 AM"
 * ```
 */
export const formatLastUpdated = (
  date: DateInput,
  options: RelativeTimeOptions = {}
): string => {
  const relativeTime = formatRelativeTime(date, options);
  
  // If it's very recent, show the time instead
  const dateObj = safeDateConversion(date);
  if (dateObj) {
    const diffInMs = getCurrentTimestamp() - dateObj.getTime();
    if (diffInMs < TIME_UNITS.hour) {
      return `Last updated: ${formatChatTimestamp(date, options)}`;
    }
  }
  
  return `Last updated: ${relativeTime}`;
};

/**
 * Formats activity timestamp for activity feeds
 * 
 * @param date - Activity date
 * @param options - Formatting options
 * @returns Activity timestamp string
 */
export const formatActivityTimestamp = (
  date: DateInput,
  options: RelativeTimeOptions = {}
): string => {
  return formatRelativeTime(date, {
    maxRelativeHours: 24 * 7, // 1 week
    ...options
  });
};

/**
 * Creates a trading session object with current status
 * 
 * @param sessionName - Name of the trading session
 * @param startTime - Session start time (24-hour format, e.g., "09:30")
 * @param endTime - Session end time (24-hour format, e.g., "16:00")
 * @param timeZone - Session timezone
 * @returns Trading session object
 */
export const createTradingSession = (
  sessionName: string,
  startTime: string,
  endTime: string,
  timeZone: string = MARKET_TIMEZONES.US_EASTERN
): TradingSession => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const start = new Date(today);
  start.setHours(startHour, startMinute, 0, 0);
  
  const end = new Date(today);
  end.setHours(endHour, endMinute, 0, 0);
  
  // Check if session spans midnight
  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }
  
  const isActive = now >= start && now <= end;
  
  return {
    name: sessionName,
    start,
    end,
    isActive,
    timeZone
  };
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if a date is today
 * 
 * @param date - Date to check
 * @param timeZone - Timezone for comparison
 * @returns True if date is today
 */
export const isToday = (date: DateInput, timeZone?: string): boolean => {
  const dateObj = safeDateConversion(date);
  if (!dateObj) return false;
  
  const now = new Date();
  const today = timeZone 
    ? new Date(now.toLocaleString('en-US', { timeZone }))
    : now;
  
  const checkDate = timeZone
    ? new Date(dateObj.toLocaleString('en-US', { timeZone }))
    : dateObj;
  
  return today.toDateString() === checkDate.toDateString();
};

/**
 * Checks if a date is within the last N days
 * 
 * @param date - Date to check
 * @param days - Number of days to check within
 * @returns True if date is within the specified days
 */
export const isWithinDays = (date: DateInput, days: number): boolean => {
  const dateObj = safeDateConversion(date);
  if (!dateObj) return false;
  
  const diffInMs = getCurrentTimestamp() - dateObj.getTime();
  return diffInMs <= (days * TIME_UNITS.day) && diffInMs >= 0;
};

/**
 * Gets the age of a date in various units
 * 
 * @param date - Date to calculate age for
 * @returns Object with age in different units
 */
export const getDateAge = (date: DateInput) => {
  const dateObj = safeDateConversion(date);
  if (!dateObj) {
    return { seconds: 0, minutes: 0, hours: 0, days: 0 };
  }
  
  const diffInMs = getCurrentTimestamp() - dateObj.getTime();
  
  return {
    seconds: Math.floor(diffInMs / TIME_UNITS.second),
    minutes: Math.floor(diffInMs / TIME_UNITS.minute),
    hours: Math.floor(diffInMs / TIME_UNITS.hour),
    days: Math.floor(diffInMs / TIME_UNITS.day)
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  formatChatTimestamp,
  formatRelativeTime,
  formatAbsoluteDate,
  formatDateTime,
  formatDateRange,
  formatMarketTime,
  formatLastUpdated,
  formatActivityTimestamp,
  createTradingSession,
  isToday,
  isWithinDays,
  getDateAge,
  MARKET_TIMEZONES
};