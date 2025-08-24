/**
 * Theme Constants and Configuration
 * 
 * Centralizes theme-related constants, color definitions, and configuration
 * for the StockSavvy application. These constants ensure consistent theming
 * across components and provide a single source of truth for design tokens.
 * 
 * Features:
 * - Light and dark theme color definitions
 * - Theme mode type definitions
 * - Storage key constants for persistence
 * - CSS custom property mappings
 * - Accessibility-compliant color contrast ratios
 * - Financial app-specific color schemes
 * 
 * @fileoverview Theme constants and color definitions
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  ThemeMode,
  ResolvedTheme,
  ThemeTransition,
  ThemeColors,
  ThemeSpacing,
  ThemeConfig
} from '../types/constants';

// ============================================================================
// COLOR DEFINITIONS
// ============================================================================

/**
 * Complete theme color definitions
 * Extracted and enhanced from existing ThemeProvider and CSS variables
 */
export const THEME_COLORS: Record<ResolvedTheme, ThemeColors> = {
  light: {
    // Background hierarchy
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8fafc',
    backgroundTertiary: '#f1f5f9',
    
    // Text hierarchy with accessibility compliance
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    
    // Brand colors
    accentBlue: '#0d80f2',
    accentCyan: '#0db9f2',
    
    // Interactive states
    hover: '#e2e8f0',
    active: '#cbd5e1',
    focus: '#0d80f2',
    
    // Status colors
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
    info: '#0284c7',
    
    // Borders
    borderLight: '#e2e8f0',
    borderMedium: '#cbd5e1',
    borderStrong: '#94a3b8',
    
    // Financial-specific
    marketPositive: '#059669',
    marketNegative: '#dc2626',
    marketNeutral: '#64748b',
    
    // Charts and data visualization
    chartPrimary: '#0d80f2',
    chartSecondary: '#06b6d4',
    chartTertiary: '#8b5cf6',
    
    // Surfaces
    surfaceDefault: '#ffffff',
    surfaceElevated: '#f8fafc',
    surfacePressed: '#e2e8f0'
  },
  dark: {
    // Background hierarchy
    backgroundPrimary: '#101e23',
    backgroundSecondary: '#182634',
    backgroundTertiary: '#223649',
    
    // Text hierarchy with accessibility compliance
    textPrimary: '#f8fafc',
    textSecondary: '#e2e8f0',
    textMuted: '#94a3b8',
    
    // Brand colors
    accentBlue: '#0d80f2',
    accentCyan: '#0db9f2',
    
    // Interactive states
    hover: '#2a3f52',
    active: '#374151',
    focus: '#0d80f2',
    
    // Status colors (enhanced for dark theme visibility)
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#0ea5e9',
    
    // Borders
    borderLight: '#374151',
    borderMedium: '#4b5563',
    borderStrong: '#6b7280',
    
    // Financial-specific (enhanced contrast for dark theme)
    marketPositive: '#10b981',
    marketNegative: '#ef4444',
    marketNeutral: '#94a3b8',
    
    // Charts and data visualization
    chartPrimary: '#3b82f6',
    chartSecondary: '#06b6d4',
    chartTertiary: '#a855f7',
    
    // Surfaces
    surfaceDefault: '#101e23',
    surfaceElevated: '#182634',
    surfacePressed: '#2a3f52'
  }
};

/**
 * Spacing system based on existing CSS custom properties
 */
export const THEME_SPACING: ThemeSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '48px'
};

/**
 * Component-specific spacing constants
 */
export const COMPONENT_SPACING = {
  cardPaddingX: '20px',
  cardPaddingY: '24px',
  buttonPaddingX: '16px',
  buttonPaddingY: '12px',
  sectionSpacing: '32px',
  componentGap: '16px'
} as const;

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

/**
 * Default theme configuration
 */
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  defaultMode: 'system',
  storageKey: 'stocksavvy-theme',
  enableTransitions: true,
  transitionDuration: 300,
  respectSystemPreference: true
};

/**
 * Theme storage key constant (for consistency across app)
 */
export const THEME_STORAGE_KEY = 'stocksavvy-theme';

/**
 * CSS custom property prefix for theme variables
 */
export const CSS_VAR_PREFIX = '--theme-' as const;

/**
 * Transition configuration for theme switching
 */
export const THEME_TRANSITION = {
  duration: '300ms',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  property: 'color, background-color, border-color, opacity, box-shadow'
} as const;

// ============================================================================
// CSS CUSTOM PROPERTY MAPPINGS
// ============================================================================

/**
 * Maps theme color properties to CSS custom properties
 */
export const CSS_COLOR_MAPPINGS: Record<keyof ThemeColors, string> = {
  backgroundPrimary: '--theme-bg-primary',
  backgroundSecondary: '--theme-bg-secondary',
  backgroundTertiary: '--theme-bg-tertiary',
  textPrimary: '--theme-text-primary',
  textSecondary: '--theme-text-secondary',
  textMuted: '--theme-text-muted',
  accentBlue: '--theme-accent-blue',
  accentCyan: '--theme-accent-cyan',
  hover: '--theme-hover',
  active: '--theme-active',
  focus: '--theme-focus',
  success: '--theme-success',
  error: '--theme-error',
  warning: '--theme-warning',
  info: '--theme-info',
  borderLight: '--theme-border-light',
  borderMedium: '--theme-border-medium',
  borderStrong: '--theme-border-strong',
  marketPositive: '--theme-market-positive',
  marketNegative: '--theme-market-negative',
  marketNeutral: '--theme-market-neutral',
  chartPrimary: '--theme-chart-primary',
  chartSecondary: '--theme-chart-secondary',
  chartTertiary: '--theme-chart-tertiary',
  surfaceDefault: '--theme-surface-default',
  surfaceElevated: '--theme-surface-elevated',
  surfacePressed: '--theme-surface-pressed'
};

/**
 * Maps spacing properties to CSS custom properties
 */
export const CSS_SPACING_MAPPINGS: Record<keyof ThemeSpacing, string> = {
  xs: '--spacing-xs',
  sm: '--spacing-sm',
  md: '--spacing-md',
  lg: '--spacing-lg',
  xl: '--spacing-xl',
  '2xl': '--spacing-2xl',
  '3xl': '--spacing-3xl',
  '4xl': '--spacing-4xl'
};

// ============================================================================
// THEME UTILITIES
// ============================================================================

/**
 * Gets the theme colors for a specific resolved theme
 * 
 * @param theme - The resolved theme
 * @returns Theme colors object
 */
export const getThemeColors = (theme: ResolvedTheme): ThemeColors => {
  return THEME_COLORS[theme];
};

/**
 * Checks if a theme mode is valid
 * 
 * @param mode - Theme mode to check
 * @returns True if valid theme mode
 */
export const isValidThemeMode = (mode: any): mode is ThemeMode => {
  return ['light', 'dark', 'system'].includes(mode);
};

/**
 * Resolves system theme preference to actual theme
 * 
 * @param mode - Theme mode to resolve
 * @param systemPreference - Current system preference
 * @returns Resolved theme
 */
export const resolveThemeMode = (
  mode: ThemeMode,
  systemPreference: ResolvedTheme = 'light'
): ResolvedTheme => {
  return mode === 'system' ? systemPreference : mode;
};

/**
 * Generates CSS custom properties object for a theme
 * 
 * @param theme - The resolved theme
 * @returns Object with CSS custom properties
 */
export const generateCSSCustomProperties = (theme: ResolvedTheme): Record<string, string> => {
  const colors = getThemeColors(theme);
  const properties: Record<string, string> = {};
  
  // Add color properties
  Object.entries(CSS_COLOR_MAPPINGS).forEach(([colorKey, cssVar]) => {
    const color = colors[colorKey as keyof ThemeColors];
    properties[cssVar] = color;
  });
  
  // Add spacing properties
  Object.entries(CSS_SPACING_MAPPINGS).forEach(([spacingKey, cssVar]) => {
    const spacing = THEME_SPACING[spacingKey as keyof ThemeSpacing];
    properties[cssVar] = spacing;
  });
  
  return properties;
};

// ============================================================================
// MARKET-SPECIFIC CONSTANTS
// ============================================================================

/**
 * Financial market color schemes
 */
export const MARKET_COLOR_SCHEMES = {
  traditional: {
    positive: '#059669', // Green for gains
    negative: '#dc2626', // Red for losses
    neutral: '#64748b'   // Gray for neutral
  },
  accessibility: {
    positive: '#047857', // Darker green for better contrast
    negative: '#b91c1c', // Darker red for better contrast
    neutral: '#374151'   // Darker gray for better contrast
  },
  colorBlind: {
    positive: '#0284c7', // Blue for gains (colorblind-friendly)
    negative: '#dc2626', // Red for losses
    neutral: '#64748b'   // Gray for neutral
  }
} as const;

/**
 * Chart color palettes for data visualization
 */
export const CHART_COLOR_PALETTES = {
  primary: ['#0d80f2', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
  pastel: ['#93c5fd', '#7dd3fc', '#c4b5fd', '#6ee7b7', '#fed7aa', '#fca5a5'],
  monochrome: ['#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db']
} as const;

// ============================================================================
// COMPONENT-SPECIFIC THEMES
// ============================================================================

/**
 * Button theme variants
 */
export const BUTTON_THEMES = {
  primary: {
    background: 'var(--theme-accent-blue)',
    text: '#ffffff',
    hover: '#0c72d9',
    active: '#0a6bbf'
  },
  secondary: {
    light: {
      background: 'var(--theme-bg-tertiary)',
      text: 'var(--theme-text-secondary)',
      hover: 'var(--theme-hover)',
      active: 'var(--theme-active)'
    },
    dark: {
      background: 'var(--theme-bg-tertiary)',
      text: 'var(--theme-text-secondary)',
      hover: 'var(--theme-hover)',
      active: 'var(--theme-active)'
    }
  }
} as const;

/**
 * Card theme variants
 */
export const CARD_THEMES = {
  default: {
    background: 'var(--theme-surface-default)',
    border: 'var(--theme-border-light)',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
  },
  elevated: {
    background: 'var(--theme-surface-elevated)',
    border: 'var(--theme-border-light)',
    shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  },
  interactive: {
    background: 'var(--theme-surface-default)',
    border: 'var(--theme-border-light)',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    hoverShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  THEME_COLORS,
  THEME_SPACING,
  COMPONENT_SPACING,
  DEFAULT_THEME_CONFIG,
  THEME_STORAGE_KEY,
  CSS_COLOR_MAPPINGS,
  CSS_SPACING_MAPPINGS,
  MARKET_COLOR_SCHEMES,
  CHART_COLOR_PALETTES,
  BUTTON_THEMES,
  CARD_THEMES,
  getThemeColors,
  isValidThemeMode,
  resolveThemeMode,
  generateCSSCustomProperties
};