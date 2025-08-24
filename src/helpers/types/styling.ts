/**
 * Styling Types and Interfaces
 * 
 * Centralized type definitions for styling and className building utilities
 * in the StockSavvy application. This includes component variants, states,
 * and dynamic styling configuration types.
 * 
 * @fileoverview Type definitions for styling utilities
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// CORE STYLING TYPES
// ============================================================================

/**
 * Valid className input types
 */
export type ClassValue = string | number | null | undefined | false | 0 | ClassRecord | ClassArray;

/**
 * Object with conditional classes
 */
export interface ClassRecord {
  [key: string]: any;
}

/**
 * Array of class values
 */
export interface ClassArray extends Array<ClassValue> {}

// ============================================================================
// COMPONENT VARIANT TYPES
// ============================================================================

/**
 * Component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Component variant types
 */
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning';

/**
 * Component state types
 */
export type ComponentState = 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading';

// ============================================================================
// THEME STYLING TYPES
// ============================================================================

/**
 * Theme-aware styling options
 */
export interface ThemeClassOptions {
  /** Light theme classes */
  light?: string;
  /** Dark theme classes */
  dark?: string;
  /** Auto-detect theme from document */
  auto?: boolean;
}

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveClasses {
  /** Base (mobile-first) classes */
  base?: string;
  /** Small screen classes (640px+) */
  sm?: string;
  /** Medium screen classes (768px+) */
  md?: string;
  /** Large screen classes (1024px+) */
  lg?: string;
  /** Extra large screen classes (1280px+) */
  xl?: string;
  /** 2xl screen classes (1536px+) */
  '2xl'?: string;
}

// ============================================================================
// CARD STYLING TYPES
// ============================================================================

/**
 * Card styling configuration
 */
export interface CardStyleConfig {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  /** Whether card is interactive */
  interactive?: boolean;
  /** Whether card is highlighted/selected */
  highlighted?: boolean;
  /** Custom padding override */
  padding?: ComponentSize | 'none';
  /** Card state */
  state?: ComponentState;
}

/**
 * Card theme variants
 */
export interface CardThemeVariant {
  /** Background color */
  background: string;
  /** Border color */
  border: string;
  /** Box shadow */
  shadow: string;
  /** Hover shadow (for interactive cards) */
  hoverShadow?: string;
}

// ============================================================================
// BUTTON STYLING TYPES
// ============================================================================

/**
 * Button styling configuration
 */
export interface ButtonStyleConfig {
  /** Button variant */
  variant?: ComponentVariant;
  /** Button size */
  size?: ComponentSize;
  /** Button state */
  state?: ComponentState;
  /** Whether button is full width */
  fullWidth?: boolean;
  /** Whether button is icon-only */
  iconOnly?: boolean;
}

/**
 * Button theme configuration
 */
export interface ButtonThemeConfig {
  /** Background color */
  background: string;
  /** Text color */
  text: string;
  /** Hover background color */
  hover: string;
  /** Active background color */
  active: string;
  /** Border color (optional) */
  border?: string;
}

// ============================================================================
// INPUT STYLING TYPES
// ============================================================================

/**
 * Form input styling configuration
 */
export interface InputStyleConfig {
  /** Input size */
  size?: ComponentSize;
  /** Input state */
  state?: ComponentState | 'error' | 'success';
  /** Whether input has error */
  hasError?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Input variant */
  variant?: 'default' | 'filled' | 'outlined';
}

/**
 * Input validation state styling
 */
export interface InputValidationStyling {
  /** Default state classes */
  default: string;
  /** Error state classes */
  error: string;
  /** Success state classes */
  success: string;
  /** Warning state classes */
  warning: string;
}

// ============================================================================
// BADGE STYLING TYPES
// ============================================================================

/**
 * Badge styling configuration
 */
export interface BadgeStyleConfig {
  /** Badge variant */
  variant?: ComponentVariant;
  /** Badge size */
  size?: ComponentSize;
  /** Badge shape */
  shape?: 'rounded' | 'pill' | 'square';
  /** Whether badge has border */
  outlined?: boolean;
}

// ============================================================================
// LAYOUT STYLING TYPES
// ============================================================================

/**
 * Flexbox layout configuration
 */
export interface FlexLayoutConfig {
  /** Flex direction */
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Whether to wrap */
  wrap?: boolean;
  /** Gap between items */
  gap?: ComponentSize;
}

/**
 * Grid layout configuration
 */
export interface GridLayoutConfig {
  /** Grid columns configuration */
  columns: {
    /** Base columns */
    base?: number;
    /** Small screen columns */
    sm?: number;
    /** Medium screen columns */
    md?: number;
    /** Large screen columns */
    lg?: number;
    /** Extra large screen columns */
    xl?: number;
  };
  /** Grid gap size */
  gap?: ComponentSize;
  /** Grid rows configuration (optional) */
  rows?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

// ============================================================================
// ACCESSIBILITY STYLING TYPES
// ============================================================================

/**
 * Focus styling configuration
 */
export interface FocusStyleConfig {
  /** Focus variant */
  variant?: 'default' | 'inset' | 'offset';
  /** Focus ring color */
  color?: string;
  /** Focus ring width */
  width?: 'thin' | 'medium' | 'thick';
  /** Focus ring offset */
  offset?: 'none' | 'small' | 'medium' | 'large';
}

/**
 * Accessibility styling options
 */
export interface AccessibilityStyleConfig {
  /** Screen reader only classes */
  srOnly?: boolean;
  /** Focus styling configuration */
  focus?: FocusStyleConfig;
  /** High contrast support */
  highContrast?: boolean;
  /** Reduced motion support */
  reducedMotion?: boolean;
}

// ============================================================================
// ANIMATION STYLING TYPES
// ============================================================================

/**
 * Transition configuration
 */
export interface TransitionConfig {
  /** Transition property */
  property?: string;
  /** Transition duration */
  duration?: 'fast' | 'normal' | 'slow' | string;
  /** Transition timing function */
  timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  /** Transition delay */
  delay?: string;
}

/**
 * Animation styling configuration
 */
export interface AnimationStyleConfig {
  /** Animation name */
  name?: string;
  /** Animation duration */
  duration?: string;
  /** Animation timing function */
  timing?: string;
  /** Animation iteration count */
  iteration?: number | 'infinite';
  /** Animation direction */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

// ============================================================================
// COLOR STYLING TYPES
// ============================================================================

/**
 * Color palette definition
 */
export interface ColorPalette {
  /** Primary colors */
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  /** Secondary colors */
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  /** Neutral colors */
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

/**
 * Semantic color mapping
 */
export interface SemanticColors {
  /** Success colors */
  success: {
    light: string;
    main: string;
    dark: string;
    contrast: string;
  };
  /** Error colors */
  error: {
    light: string;
    main: string;
    dark: string;
    contrast: string;
  };
  /** Warning colors */
  warning: {
    light: string;
    main: string;
    dark: string;
    contrast: string;
  };
  /** Info colors */
  info: {
    light: string;
    main: string;
    dark: string;
    contrast: string;
  };
}

// ============================================================================
// STYLING EXPORTS HANDLED BY INDIVIDUAL INTERFACE DECLARATIONS
// ============================================================================