/**
 * Constants Types and Interfaces
 * 
 * Centralized type definitions for all constant values and configuration
 * objects used throughout the StockSavvy application. This includes theme
 * configuration, navigation patterns, and UI constants.
 * 
 * @fileoverview Type definitions for application constants
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// THEME CONSTANT TYPES
// ============================================================================

/**
 * Supported theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Resolved theme (system preference resolved to actual theme)
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme transition states
 */
export type ThemeTransition = 'entering' | 'exiting' | 'idle';

/**
 * Comprehensive theme color interface
 */
export interface ThemeColors {
  // Background colors with proper hierarchy
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Text colors with proper contrast ratios
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Brand and accent colors
  accentBlue: string;
  accentCyan: string;
  
  // Interactive state colors
  hover: string;
  active: string;
  focus: string;
  
  // Status and feedback colors
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Border colors with different weights
  borderLight: string;
  borderMedium: string;
  borderStrong: string;
  
  // Financial-specific colors
  marketPositive: string;
  marketNegative: string;
  marketNeutral: string;
  
  // Chart and data visualization colors
  chartPrimary: string;
  chartSecondary: string;
  chartTertiary: string;
  
  // Surface colors for cards and containers
  surfaceDefault: string;
  surfaceElevated: string;
  surfacePressed: string;
}

/**
 * Theme spacing system interface
 */
export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  /** Default theme mode */
  defaultMode: ThemeMode;
  /** Storage key for theme persistence */
  storageKey: string;
  /** Whether to enable smooth transitions */
  enableTransitions: boolean;
  /** Transition duration in milliseconds */
  transitionDuration: number;
  /** System preference detection */
  respectSystemPreference: boolean;
}

// ============================================================================
// NAVIGATION CONSTANT TYPES
// ============================================================================

/**
 * Navigation transition types
 */
export type NavigationTransition = 'push' | 'replace' | 'back' | 'forward';

/**
 * Route metadata for navigation configuration
 */
export interface RouteMetadata {
  /** Route title for display */
  title: string;
  /** Route description */
  description?: string;
  /** Whether authentication is required */
  requiresAuth?: boolean;
  /** Whether to show in navigation menu */
  showInMenu?: boolean;
  /** Icon for navigation menu */
  icon?: string;
  /** Parent route for breadcrumbs */
  parent?: string;
  /** Route category */
  category?: 'main' | 'auth' | 'settings' | 'chat' | 'onboarding';
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /** Breadcrumb title */
  title: string;
  /** Breadcrumb path */
  path: string;
  /** Whether item is clickable */
  clickable?: boolean;
}

/**
 * Menu route interface
 */
export interface MenuRoute {
  /** Route path */
  path: string;
  /** Route metadata */
  metadata: RouteMetadata;
  /** Child routes (for nested menus) */
  children?: MenuRoute[];
}

// ============================================================================
// UI CONSTANT TYPES
// ============================================================================

/**
 * Component spacing constants interface
 */
export interface ComponentSpacing {
  /** Card horizontal padding */
  cardPaddingX: string;
  /** Card vertical padding */
  cardPaddingY: string;
  /** Button horizontal padding */
  buttonPaddingX: string;
  /** Button vertical padding */
  buttonPaddingY: string;
  /** Section spacing */
  sectionSpacing: string;
  /** Component gap */
  componentGap: string;
}

/**
 * Transition timing configuration
 */
export interface TransitionTiming {
  /** Transition duration */
  duration: string;
  /** Timing function */
  timing: string;
  /** Transition property */
  property: string;
}

/**
 * Button theme variants interface
 */
export interface ButtonThemeVariants {
  /** Primary button theme */
  primary: {
    background: string;
    text: string;
    hover: string;
    active: string;
  };
  /** Secondary button theme */
  secondary: {
    light: {
      background: string;
      text: string;
      hover: string;
      active: string;
    };
    dark: {
      background: string;
      text: string;
      hover: string;
      active: string;
    };
  };
}

/**
 * Card theme variants interface
 */
export interface CardThemeVariants {
  /** Default card theme */
  default: {
    background: string;
    border: string;
    shadow: string;
  };
  /** Elevated card theme */
  elevated: {
    background: string;
    border: string;
    shadow: string;
  };
  /** Interactive card theme */
  interactive: {
    background: string;
    border: string;
    shadow: string;
    hoverShadow: string;
  };
}

// ============================================================================
// MARKET CONSTANT TYPES
// ============================================================================

/**
 * Market color scheme interface
 */
export interface MarketColorScheme {
  /** Positive market movement color */
  positive: string;
  /** Negative market movement color */
  negative: string;
  /** Neutral market movement color */
  neutral: string;
}

/**
 * Chart color palette interface
 */
export interface ChartColorPalette {
  /** Primary chart colors */
  primary: string[];
  /** Pastel chart colors */
  pastel: string[];
  /** Monochrome chart colors */
  monochrome: string[];
}

// ============================================================================
// STORAGE CONSTANT TYPES
// ============================================================================

/**
 * Storage prefix configuration
 */
export interface StoragePrefixes {
  /** Theme storage prefix */
  THEME: string;
  /** User data storage prefix */
  USER: string;
  /** Settings storage prefix */
  SETTINGS: string;
  /** Cache storage prefix */
  CACHE: string;
  /** Temporary storage prefix */
  TEMP: string;
}

// ============================================================================
// VALIDATION CONSTANT TYPES
// ============================================================================

/**
 * Validation pattern collection
 */
export interface ValidationPatterns {
  /** Email validation pattern */
  email: RegExp;
  /** Phone validation pattern */
  phone: RegExp;
  /** URL validation pattern */
  url: RegExp;
  /** Alphanumeric pattern */
  alphanumeric: RegExp;
  /** Alphanumeric with spaces pattern */
  alphanumericWithSpaces: RegExp;
  /** Number pattern */
  number: RegExp;
  /** Percentage pattern */
  percentage: RegExp;
  /** Currency pattern */
  currency: RegExp;
  /** Strong password pattern */
  strongPassword: RegExp;
}

// ============================================================================
// ID GENERATION CONSTANT TYPES
// ============================================================================

/**
 * ID prefix configuration
 */
export interface IdPrefixes {
  /** Message ID prefix */
  MESSAGE: string;
  /** Activity ID prefix */
  ACTIVITY: string;
  /** User ID prefix */
  USER: string;
  /** Session ID prefix */
  SESSION: string;
  /** Chat ID prefix */
  CHAT: string;
  /** Transaction ID prefix */
  TRANSACTION: string;
  /** Component ID prefix */
  COMPONENT: string;
  /** Error ID prefix */
  ERROR: string;
  /** Log ID prefix */
  LOG: string;
  /** Temporary ID prefix */
  TEMP: string;
}

/**
 * Character set definition for ID generation
 */
export interface CharacterSets {
  /** Alphanumeric characters */
  alphanumeric: string;
  /** Alphabetic characters only */
  alpha: string;
  /** Numeric characters only */
  numeric: string;
  /** Hexadecimal characters */
  hex: string;
  /** Base64 characters */
  base64: string;
}

// ============================================================================
// CONSTANTS EXPORTS HANDLED BY INDIVIDUAL INTERFACE DECLARATIONS
// ============================================================================