/**
 * Dynamic ClassName Builder Utilities
 * 
 * Provides powerful utilities for dynamic className generation with theme awareness,
 * conditional styling, and component-specific class builders. These utilities
 * simplify the creation of complex CSS class combinations while maintaining
 * consistency with the StockSavvy design system.
 * 
 * Features:
 * - Conditional className combination with falsy value filtering
 * - Theme-aware class generation for light/dark modes
 * - Component-specific styling utilities (cards, buttons, forms)
 * - Responsive design helpers
 * - Accessibility-focused class builders
 * - State-based styling (hover, focus, disabled, etc.)
 * 
 * @fileoverview Dynamic className building and styling utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  ClassValue,
  ClassRecord,
  ClassArray,
  ComponentSize,
  ComponentVariant,
  ComponentState,
  ThemeClassOptions,
  ResponsiveClasses,
  CardStyleConfig,
  ButtonStyleConfig,
  InputStyleConfig,
  BadgeStyleConfig,
  FlexLayoutConfig,
  GridLayoutConfig,
  FocusStyleConfig
} from '../types/styling';

// ============================================================================
// CORE UTILITIES
// ============================================================================

/**
 * Combines className inputs, filtering out falsy values
 * 
 * This is the core utility function that handles conditional className combination.
 * It accepts multiple types of inputs and intelligently combines them into a
 * clean className string.
 * 
 * @param inputs - Variable number of className inputs
 * @returns Combined className string
 * 
 * @example
 * ```typescript
 * cn('base-class', isActive && 'active', { 'highlighted': isHighlighted })
 * // Result: "base-class active highlighted" (if conditions are true)
 * 
 * cn('btn', null, undefined, false, 'btn-primary')
 * // Result: "btn btn-primary"
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const arrayResult = cn(...input);
      if (arrayResult) classes.push(arrayResult);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  
  return classes.join(' ').trim();
};

/**
 * Creates theme-aware class combinations for light and dark modes
 * 
 * @param lightClasses - Classes for light theme
 * @param darkClasses - Classes for dark theme
 * @param options - Theme detection options
 * @returns Combined theme-aware classes
 * 
 * @example
 * ```typescript
 * themeClasses('bg-white text-black', 'bg-gray-800 text-white')
 * // Result: "bg-white text-black dark:bg-gray-800 dark:text-white"
 * ```
 */
export const themeClasses = (
  lightClasses: string,
  darkClasses: string,
  options: ThemeClassOptions = {}
): string => {
  if (options.auto && typeof document !== 'undefined') {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? darkClasses : lightClasses;
  }
  
  return `${lightClasses} dark:${darkClasses}`;
};

/**
 * Creates responsive class combinations for different screen sizes
 * 
 * @param classes - Object with breakpoint keys and class values
 * @returns Responsive className string
 * 
 * @example
 * ```typescript
 * responsiveClasses({
 *   base: 'text-sm',
 *   md: 'text-base',
 *   lg: 'text-lg'
 * })
 * // Result: "text-sm md:text-base lg:text-lg"
 * ```
 */
export const responsiveClasses = (classes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string => {
  const result: string[] = [];
  
  if (classes.base) result.push(classes.base);
  if (classes.sm) result.push(`sm:${classes.sm}`);
  if (classes.md) result.push(`md:${classes.md}`);
  if (classes.lg) result.push(`lg:${classes.lg}`);
  if (classes.xl) result.push(`xl:${classes.xl}`);
  if (classes['2xl']) result.push(`2xl:${classes['2xl']}`);
  
  return result.join(' ');
};

// ============================================================================
// COMPONENT-SPECIFIC BUILDERS
// ============================================================================

/**
 * Creates comprehensive card styling with variants and states
 * 
 * @param config - Card styling configuration
 * @returns Complete card className string
 * 
 * @example
 * ```typescript
 * createCardClasses({ variant: 'elevated', interactive: true })
 * // Result: Complete card classes with elevation and hover effects
 * ```
 */
export const createCardClasses = (config: CardStyleConfig = {}): string => {
  const {
    variant = 'default',
    interactive = false,
    highlighted = false,
    padding = 'md',
    state = 'default'
  } = config;
  
  // Base card classes with theme awareness
  const baseClasses = themeClasses(
    'bg-white border-[#e2e8f0]',
    'bg-[#182634] border-[#374151]'
  );
  
  // Variant-specific styling
  const variantClasses = {
    default: 'border rounded-lg shadow-sm',
    elevated: 'border rounded-xl shadow-lg',
    outlined: 'border-2 rounded-lg bg-transparent',
    ghost: 'border-transparent rounded-lg'
  };
  
  // Padding configuration
  const paddingClasses = {
    none: '',
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  // Interactive states
  const interactiveClasses = interactive ? cn(
    'cursor-pointer transition-all duration-300',
    'hover:shadow-lg hover:scale-[1.02]',
    themeClasses(
      'hover:border-[#0d80f2]',
      'hover:border-[#0db9f2]'
    )
  ) : '';
  
  // Highlight styling
  const highlightClasses = highlighted ? cn(
    'border-2',
    themeClasses(
      'border-[#0d80f2] bg-[#f8fafc]',
      'border-[#0db9f2] bg-[#223649]'
    )
  ) : '';
  
  // State-specific styling
  const stateClasses = {
    default: '',
    hover: 'shadow-md',
    focus: 'ring-2 ring-[#0d80f2] ring-opacity-50',
    active: 'scale-[0.98]',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    loading: 'opacity-75 pointer-events-none'
  };
  
  return cn(
    baseClasses,
    variantClasses[variant],
    padding !== 'none' && paddingClasses[padding],
    interactiveClasses,
    highlightClasses,
    stateClasses[state]
  );
};

/**
 * Creates comprehensive button styling with variants, sizes, and states
 * 
 * @param config - Button styling configuration
 * @returns Complete button className string
 * 
 * @example
 * ```typescript
 * createButtonClasses({ variant: 'primary', size: 'lg', state: 'loading' })
 * // Result: Complete button classes with primary styling and loading state
 * ```
 */
export const createButtonClasses = (config: ButtonStyleConfig = {}): string => {
  const {
    variant = 'primary',
    size = 'md',
    state = 'default',
    fullWidth = false,
    iconOnly = false
  } = config;
  
  // Base button classes
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-lg',
    'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    themeClasses('focus:ring-offset-white', 'focus:ring-offset-[#101e23]')
  );
  
  // Size configuration
  const sizeClasses = {
    xs: iconOnly ? 'p-1' : 'px-2 py-1 text-xs',
    sm: iconOnly ? 'p-2' : 'px-3 py-1.5 text-sm',
    md: iconOnly ? 'p-3' : 'px-4 py-2 text-base',
    lg: iconOnly ? 'p-4' : 'px-6 py-3 text-lg',
    xl: iconOnly ? 'p-5' : 'px-8 py-4 text-xl'
  };
  
  // Variant styling
  const variantClasses = {
    primary: cn(
      'bg-[#0d80f2] text-white focus:ring-[#0d80f2]',
      'hover:bg-[#0c72d9] active:bg-[#0a6bbf]'
    ),
    secondary: themeClasses(
      'bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0] focus:ring-[#64748b] hover:bg-[#e2e8f0]',
      'bg-[#374151] text-[#e2e8f0] border border-[#4b5563] focus:ring-[#94a3b8] hover:bg-[#4b5563]'
    ),
    tertiary: themeClasses(
      'text-[#334155] hover:bg-[#f1f5f9] focus:ring-[#64748b]',
      'text-[#e2e8f0] hover:bg-[#374151] focus:ring-[#94a3b8]'
    ),
    danger: cn(
      'bg-[#dc2626] text-white focus:ring-[#dc2626]',
      'hover:bg-[#b91c1c] active:bg-[#991b1b]'
    ),
    success: cn(
      'bg-[#059669] text-white focus:ring-[#059669]',
      'hover:bg-[#047857] active:bg-[#065f46]'
    ),
    warning: cn(
      'bg-[#d97706] text-white focus:ring-[#d97706]',
      'hover:bg-[#b45309] active:bg-[#92400e]'
    )
  };
  
  // State-specific styling
  const stateClasses = {
    default: '',
    hover: '', // Handled by variant classes
    focus: '', // Handled by variant classes
    active: 'scale-95',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    loading: 'opacity-75 cursor-wait'
  };
  
  // Width configuration
  const widthClasses = fullWidth ? 'w-full' : '';
  
  return cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    stateClasses[state],
    widthClasses
  );
};

/**
 * Creates form input styling with validation states and variants
 * 
 * @param config - Input styling configuration
 * @returns Complete input className string
 * 
 * @example
 * ```typescript
 * createInputClasses({ size: 'lg', hasError: true, variant: 'outlined' })
 * // Result: Complete input classes with error state styling
 * ```
 */
export const createInputClasses = (config: InputStyleConfig = {}): string => {
  const {
    size = 'md',
    state = 'default',
    hasError = false,
    required = false,
    variant = 'default'
  } = config;
  
  // Base input classes
  const baseClasses = cn(
    'block w-full rounded-lg border transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'placeholder:text-opacity-75',
    themeClasses(
      'text-[#0f172a] placeholder:text-[#64748b] focus:ring-offset-white',
      'text-[#f8fafc] placeholder:text-[#94a3b8] focus:ring-offset-[#101e23]'
    )
  );
  
  // Size configuration
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
    xl: 'px-6 py-4 text-xl'
  };
  
  // Variant styling
  const variantClasses = {
    default: themeClasses(
      'bg-white border-[#e2e8f0] focus:border-[#0d80f2] focus:ring-[#0d80f2]',
      'bg-[#182634] border-[#374151] focus:border-[#0db9f2] focus:ring-[#0db9f2]'
    ),
    filled: themeClasses(
      'bg-[#f8fafc] border-transparent focus:bg-white focus:border-[#0d80f2] focus:ring-[#0d80f2]',
      'bg-[#223649] border-transparent focus:bg-[#182634] focus:border-[#0db9f2] focus:ring-[#0db9f2]'
    ),
    outlined: themeClasses(
      'bg-transparent border-[#cbd5e1] focus:border-[#0d80f2] focus:ring-[#0d80f2]',
      'bg-transparent border-[#4b5563] focus:border-[#0db9f2] focus:ring-[#0db9f2]'
    )
  };
  
  // Error state styling
  const errorClasses = hasError ? themeClasses(
    'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]',
    'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]'
  ) : '';
  
  // Success state styling
  const successClasses = state === 'success' ? themeClasses(
    'border-[#059669] focus:border-[#059669] focus:ring-[#059669]',
    'border-[#10b981] focus:border-[#10b981] focus:ring-[#10b981]'
  ) : '';
  
  // State-specific styling
  const stateClasses = {
    default: '',
    hover: '', // Handled by focus states
    focus: '', // Handled by variant classes
    active: '',
    disabled: 'opacity-50 cursor-not-allowed bg-opacity-50',
    loading: 'opacity-75',
    error: errorClasses,
    success: successClasses
  };
  
  // Required indicator
  const requiredClasses = required ? 'required' : '';
  
  return cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    stateClasses[state],
    requiredClasses
  );
};

/**
 * Creates badge/pill styling with variants and sizes
 * 
 * @param variant - Badge variant
 * @param size - Badge size
 * @returns Badge className string
 * 
 * @example
 * ```typescript
 * createBadgeClasses('success', 'sm')
 * // Result: "inline-flex items-center px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full"
 * ```
 */
export const createBadgeClasses = (
  variant: ComponentVariant = 'primary',
  size: ComponentSize = 'sm'
): string => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full';
  
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-5 py-2.5 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-[#0d80f2] text-white',
    secondary: themeClasses(
      'bg-[#e2e8f0] text-[#334155]',
      'bg-[#374151] text-[#e2e8f0]'
    ),
    tertiary: themeClasses(
      'bg-[#f1f5f9] text-[#64748b]',
      'bg-[#223649] text-[#94a3b8]'
    ),
    danger: themeClasses(
      'bg-[#fee2e2] text-[#dc2626]',
      'bg-[#dc2626] text-white'
    ),
    success: themeClasses(
      'bg-[#d1fae5] text-[#059669]',
      'bg-[#059669] text-white'
    ),
    warning: themeClasses(
      'bg-[#fef3c7] text-[#d97706]',
      'bg-[#d97706] text-white'
    )
  };
  
  return cn(baseClasses, sizeClasses[size], variantClasses[variant]);
};

// ============================================================================
// LAYOUT AND POSITIONING UTILITIES
// ============================================================================

/**
 * Creates flexbox layout classes with common patterns
 * 
 * @param direction - Flex direction
 * @param align - Align items
 * @param justify - Justify content
 * @param wrap - Flex wrap
 * @returns Flex layout className string
 */
export const createFlexClasses = (
  direction: 'row' | 'col' | 'row-reverse' | 'col-reverse' = 'row',
  align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'center',
  justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start',
  wrap: boolean = false
): string => {
  return cn(
    'flex',
    `flex-${direction}`,
    `items-${align}`,
    `justify-${justify}`,
    wrap && 'flex-wrap'
  );
};

/**
 * Creates grid layout classes with responsive columns
 * 
 * @param columns - Grid columns configuration
 * @param gap - Grid gap size
 * @returns Grid layout className string
 */
export const createGridClasses = (
  columns: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  },
  gap: ComponentSize = 'md'
): string => {
  const gapClasses = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };
  
  return cn(
    'grid',
    gapClasses[gap],
    columns.base && `grid-cols-${columns.base}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`
  );
};

// ============================================================================
// ACCESSIBILITY UTILITIES
// ============================================================================

/**
 * Creates screen reader only classes for accessibility
 * 
 * @returns Screen reader only className string
 */
export const srOnly = (): string => {
  return 'sr-only';
};

/**
 * Creates focus-visible classes for keyboard navigation
 * 
 * @param variant - Focus style variant
 * @returns Focus-visible className string
 */
export const createFocusClasses = (variant: 'default' | 'inset' | 'offset' = 'default'): string => {
  const baseClasses = 'focus-visible:outline-none';
  
  const variantClasses = {
    default: 'focus-visible:ring-2 focus-visible:ring-[#0d80f2] focus-visible:ring-offset-2',
    inset: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0d80f2]',
    offset: 'focus-visible:ring-2 focus-visible:ring-[#0d80f2] focus-visible:ring-offset-4'
  };
  
  return cn(baseClasses, variantClasses[variant]);
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  cn,
  themeClasses,
  responsiveClasses,
  createCardClasses,
  createButtonClasses,
  createInputClasses,
  createBadgeClasses,
  createFlexClasses,
  createGridClasses,
  createFocusClasses,
  srOnly
};