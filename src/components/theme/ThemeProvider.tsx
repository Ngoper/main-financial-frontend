import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Theme types for the StockSavvy application
 * @typedef {'light' | 'dark' | 'system'} ThemeMode
 * - light: Force light mode
 * - dark: Force dark mode  
 * - system: Follow system preference
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Resolved theme types (system preference resolved)
 * @typedef {'light' | 'dark'} ResolvedTheme
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme context interface providing theme state and controls
 * @interface ThemeContextType
 */
export interface ThemeContextType {
  /** Current theme mode (including 'system' option) */
  theme: ThemeMode;
  
  /** Resolved theme (system preference resolved to 'light' or 'dark') */
  resolvedTheme: ResolvedTheme;
  
  /** System preference for theme */
  systemTheme: ResolvedTheme;
  
  /** Whether we're currently following system preference */
  isFollowingSystem: boolean;
  
  /** Set theme mode */
  setTheme: (theme: ThemeMode) => void;
  
  /** Toggle between light and dark (sets to explicit mode, not system) */
  toggleTheme: () => void;
  
  /** Whether theme is currently transitioning */
  isTransitioning: boolean;
  
  /** Theme colors for the current resolved theme */
  colors: ThemeColors;
}

/**
 * Theme colors interface for consistent color usage across components
 * @interface ThemeColors
 */
export interface ThemeColors {
  // Background colors
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Text colors with proper contrast
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Brand colors
  accentBlue: string;
  accentCyan: string;
  
  // Interactive states
  hover: string;
  active: string;
  focus: string;
  
  // Status colors
  success: string;
  error: string;
  warning: string;
  
  // Border colors
  borderLight: string;
  borderMedium: string;
  borderStrong: string;
}

/**
 * Theme color definitions for light and dark modes
 */
const themeColors: Record<ResolvedTheme, ThemeColors> = {
  light: {
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8fafc',
    backgroundTertiary: '#f1f5f9',
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    accentBlue: '#0d80f2',
    accentCyan: '#0db9f2',
    hover: '#e2e8f0',
    active: '#cbd5e1',
    focus: '#0d80f2',
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
    borderLight: '#e2e8f0',
    borderMedium: '#cbd5e1',
    borderStrong: '#94a3b8'
  },
  dark: {
    backgroundPrimary: '#101e23',
    backgroundSecondary: '#182634',
    backgroundTertiary: '#223649',
    textPrimary: '#f8fafc',
    textSecondary: '#e2e8f0',
    textMuted: '#94a3b8',
    accentBlue: '#0d80f2',
    accentCyan: '#0db9f2',
    hover: '#2a3f52',
    active: '#374151',
    focus: '#0d80f2',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    borderLight: '#374151',
    borderMedium: '#4b5563',
    borderStrong: '#6b7280'
  }
};

/**
 * Theme context - provides theme state to the entire application
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider props interface
 * @interface ThemeProviderProps
 */
interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  
  /** Default theme mode (defaults to 'system') */
  defaultTheme?: ThemeMode;
  
  /** Storage key for localStorage persistence */
  storageKey?: string;
  
  /** Whether to enable smooth theme transitions */
  enableTransitions?: boolean;
}

/**
 * Theme Provider Component
 * 
 * Provides comprehensive theme management for the StockSavvy application including:
 * - Light/Dark/System theme modes
 * - localStorage persistence
 * - System preference detection
 * - Smooth theme transitions
 * - Accessible theme colors
 * - TypeScript type safety
 * 
 * Features:
 * - 🎨 Comprehensive theme color system
 * - 🔄 Automatic system preference detection
 * - 💾 Persistent theme selection via localStorage
 * - ⚡ Smooth theme transitions with animation control
 * - ♿ Accessibility-first design with proper contrast ratios
 * - 📱 Responsive design support
 * - 🎯 TypeScript interfaces for type safety
 * 
 * @component
 * @param {ThemeProviderProps} props - The component props
 * @param {ReactNode} props.children - Child components to provide theme context to
 * @param {ThemeMode} [props.defaultTheme='system'] - Default theme mode
 * @param {string} [props.storageKey='stocksavvy-theme'] - localStorage key for persistence
 * @param {boolean} [props.enableTransitions=true] - Enable smooth theme transitions
 * 
 * @example
 * ```tsx
 * // Basic usage with system default
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // Custom configuration
 * <ThemeProvider 
 *   defaultTheme="dark" 
 *   storageKey="my-app-theme"
 *   enableTransitions={false}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'stocksavvy-theme',
  enableTransitions = true
}) => {
  // Theme state management
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  /**
   * Detects system theme preference using media query
   * @returns {ResolvedTheme} The current system theme preference
   */
  const detectSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  /**
   * Resolves the current theme mode to an actual theme
   * @param {ThemeMode} themeMode - The theme mode to resolve
   * @returns {ResolvedTheme} The resolved theme
   */
  const resolveTheme = (themeMode: ThemeMode): ResolvedTheme => {
    if (themeMode === 'system') {
      return systemTheme;
    }
    return themeMode;
  };

  // Calculate derived state
  const resolvedTheme = resolveTheme(theme);
  const isFollowingSystem = theme === 'system';
  const colors = themeColors[resolvedTheme];

  /**
   * Updates the document class and CSS custom properties for theme switching
   * @param {ResolvedTheme} newTheme - The new theme to apply
   */
  const updateDocumentTheme = (newTheme: ResolvedTheme) => {
    const root = document.documentElement;
    const body = document.body;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(newTheme);
    body.classList.add(newTheme);

    // Update CSS custom properties for dynamic theming
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', colors.backgroundPrimary);
    }
  };

  /**
   * Sets theme with transition animation and persistence
   * @param {ThemeMode} newTheme - The new theme mode to set
   */
  const setTheme = (newTheme: ThemeMode) => {
    if (enableTransitions) {
      setIsTransitioning(true);
      // Brief transition state for smooth animation
      setTimeout(() => setIsTransitioning(false), 300);
    }

    setThemeState(newTheme);

    // Persist to localStorage
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference to localStorage:', error);
    }
  };

  /**
   * Toggles between light and dark themes (explicit modes, not system)
   */
  const toggleTheme = () => {
    const currentResolved = resolveTheme(theme);
    const newTheme: ResolvedTheme = currentResolved === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  /**
   * Loads theme preference from localStorage
   * @returns {ThemeMode} The stored theme preference or default
   */
  const loadStoredTheme = (): ThemeMode => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as ThemeMode;
      }
    } catch (error) {
      console.warn('Failed to load theme preference from localStorage:', error);
    }
    return defaultTheme;
  };

  // Initialize theme on mount
  useEffect(() => {
    const initialSystemTheme = detectSystemTheme();
    setSystemTheme(initialSystemTheme);

    const storedTheme = loadStoredTheme();
    setThemeState(storedTheme);

    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme: ResolvedTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Update document theme when resolved theme changes
  useEffect(() => {
    if (mounted) {
      updateDocumentTheme(resolvedTheme);
    }
  }, [resolvedTheme, mounted]);

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    resolvedTheme,
    systemTheme,
    isFollowingSystem,
    setTheme,
    toggleTheme,
    isTransitioning,
    colors
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="theme-loading">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 * 
 * Provides access to theme state and controls with TypeScript safety.
 * Must be used within a ThemeProvider.
 * 
 * @returns {ThemeContextType} Theme context with state and controls
 * @throws {Error} If used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, resolvedTheme, setTheme, colors } = useTheme();
 *   
 *   return (
 *     <div style={{ backgroundColor: colors.backgroundPrimary }}>
 *       <p style={{ color: colors.textPrimary }}>
 *         Current theme: {resolvedTheme}
 *       </p>
 *       <button onClick={() => setTheme('dark')}>
 *         Switch to Dark
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your app with <ThemeProvider> to use theme functionality.'
    );
  }
  
  return context;
};

/**
 * Utility hook for theme-aware styling
 * 
 * Provides convenient utilities for conditional styling based on theme.
 * 
 * @returns {object} Theme utilities
 * 
 * @example
 * ```tsx
 * function ThemedComponent() {
 *   const { isDark, isLight, themeClass } = useThemeUtils();
 *   
 *   return (
 *     <div className={`base-class ${themeClass}`}>
 *       {isDark && <DarkModeIcon />}
 *       {isLight && <LightModeIcon />}
 *     </div>
 *   );
 * }
 * ```
 */
export const useThemeUtils = () => {
  const { resolvedTheme } = useTheme();
  
  return {
    /** Whether current theme is dark */
    isDark: resolvedTheme === 'dark',
    
    /** Whether current theme is light */
    isLight: resolvedTheme === 'light',
    
    /** Theme class name for CSS */
    themeClass: `theme-${resolvedTheme}`,
    
    /** Conditional class helper */
    themeClasses: (lightClass: string, darkClass: string) => 
      resolvedTheme === 'light' ? lightClass : darkClass,
  };
};

/**
 * Type export for external usage
 */
// Types are exported individually through interface declarations above