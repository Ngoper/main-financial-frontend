import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from './ThemeProvider';

/**
 * Theme toggle variant types for different UI contexts
 * @typedef {'button' | 'switch' | 'dropdown' | 'floating'} ThemeToggleVariant
 */
export type ThemeToggleVariant = 'button' | 'switch' | 'dropdown' | 'floating';

/**
 * Theme toggle size options
 * @typedef {'sm' | 'md' | 'lg'} ThemeToggleSize
 */
export type ThemeToggleSize = 'sm' | 'md' | 'lg';

/**
 * Theme toggle component props interface
 * @interface ThemeToggleProps
 */
export interface ThemeToggleProps {
  /** Visual variant of the toggle */
  variant?: ThemeToggleVariant;
  
  /** Size of the toggle component */
  size?: ThemeToggleSize;
  
  /** Whether to show labels */
  showLabels?: boolean;
  
  /** Whether to show system option */
  showSystemOption?: boolean;
  
  /** Custom className for styling */
  className?: string;
  
  /** Custom aria-label for accessibility */
  ariaLabel?: string;
  
  /** Callback when theme changes */
  onChange?: (theme: ThemeMode) => void;
  
  /** Whether toggle is disabled */
  disabled?: boolean;
  
  /** Position for floating variant */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Theme Toggle Component
 * 
 * A highly accessible and beautifully animated theme switching component for StockSavvy.
 * Supports multiple variants, sizes, and interaction patterns with comprehensive accessibility.
 * 
 * Features:
 * - 🎨 Multiple variants: button, switch, dropdown, floating
 * - ⚡ Smooth animations with CSS transitions and transforms
 * - ♿ Full accessibility support (ARIA, keyboard navigation, screen readers)
 * - 🎯 TypeScript interfaces for type safety
 * - 📱 Responsive design with proper touch targets
 * - 🌙 Beautiful light/dark theme icons with smooth transitions
 * - 🖥️ System preference detection and indication
 * - 🎭 Multiple sizes for different UI contexts
 * - 🔧 Customizable styling and positioning
 * 
 * Accessibility Features:
 * - Proper ARIA labels and descriptions
 * - Keyboard navigation support (Space, Enter, Arrow keys)
 * - Screen reader announcements for state changes
 * - High contrast mode support
 * - Focus management with visible focus rings
 * - Semantic HTML structure
 * 
 * @component
 * @param {ThemeToggleProps} props - The component props
 * 
 * @example
 * ```tsx
 * // Basic usage in header
 * <ThemeToggle variant="button" size="md" showLabels={false} />
 * 
 * // Switch variant with system option
 * <ThemeToggle 
 *   variant="switch" 
 *   showSystemOption={true}
 *   onChange={(theme) => console.log('Theme changed:', theme)}
 * />
 * 
 * // Floating toggle for quick access
 * <ThemeToggle 
 *   variant="floating" 
 *   position="bottom-right"
 *   size="lg"
 * />
 * 
 * // Dropdown for settings page
 * <ThemeToggle 
 *   variant="dropdown" 
 *   showLabels={true}
 *   showSystemOption={true}
 * />
 * ```
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  showLabels = false,
  showSystemOption = true,
  className = '',
  ariaLabel,
  onChange,
  disabled = false,
  position = 'bottom-right'
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme, isTransitioning, systemTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Size configuration for different toggle sizes
   */
  const sizeConfig = {
    sm: {
      button: 'w-8 h-8 p-1',
      icon: 'w-4 h-4',
      text: 'text-xs',
      dropdown: 'text-sm',
      floating: 'w-10 h-10'
    },
    md: {
      button: 'w-10 h-10 p-2',
      icon: 'w-5 h-5',
      text: 'text-sm',
      dropdown: 'text-base',
      floating: 'w-12 h-12'
    },
    lg: {
      button: 'w-12 h-12 p-2',
      icon: 'w-6 h-6',
      text: 'text-base',
      dropdown: 'text-lg',
      floating: 'w-14 h-14'
    }
  };

  const currentSize = sizeConfig[size];

  /**
   * Position configuration for floating variant
   */
  const positionConfig = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  /**
   * Handles theme change with animation and callback
   */
  const handleThemeChange = (newTheme: ThemeMode) => {
    if (disabled || isTransitioning) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    setTheme(newTheme);
    onChange?.(newTheme);

    // Close dropdown if open
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }

    // Announce change to screen readers
    const announcement = `Theme changed to ${newTheme === 'system' ? `system (${systemTheme})` : newTheme} mode`;
    announceToScreenReader(announcement);
  };

  /**
   * Announces changes to screen readers
   */
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  /**
   * Handles keyboard navigation for dropdown
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        if (variant === 'dropdown') {
          setIsDropdownOpen(!isDropdownOpen);
        } else {
          toggleTheme();
        }
        break;
      case 'Escape':
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
          buttonRef.current?.focus();
        }
        break;
      case 'ArrowDown':
        if (variant === 'dropdown' && !isDropdownOpen) {
          event.preventDefault();
          setIsDropdownOpen(true);
        }
        break;
    }
  };

  /**
   * Closes dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  /**
   * Renders theme icon with smooth animation
   */
  const renderThemeIcon = (iconTheme: 'light' | 'dark' | 'system', extraClasses = '') => {
    const iconClasses = `${currentSize.icon} transition-all duration-300 ${extraClasses}`;
    
    switch (iconTheme) {
      case 'light':
        return (
          <svg 
            className={iconClasses} 
            fill="currentColor" 
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,1,69.66,58.34l16,16a8,8,0,0,1-11.32,11.32Zm0,116.68-16,16a8,8,0,0,1-11.32-11.32l16-16a8,8,0,0,1,11.32,11.32ZM192,72a8,8,0,0,1,5.66-2.34l16-16a8,8,0,0,1,11.32,11.32l-16,16A8,8,0,0,1,192,72Zm5.66,114.34a8,8,0,0,1,0,11.32l-16,16a8,8,0,0,1-11.32-11.32l16-16A8,8,0,0,1,197.66,186.34ZM48,128a8,8,0,0,1-8-8H16a8,8,0,0,1,0-16H40A8,8,0,0,1,48,128Zm80,80a8,8,0,0,1-8,8v24a8,8,0,0,1-16,0V216A8,8,0,0,1,128,208Zm112-88a8,8,0,0,1-8,8H208a8,8,0,0,1,0-16h24A8,8,0,0,1,240,120Z"/>
          </svg>
        );
      case 'dark':
        return (
          <svg 
            className={iconClasses} 
            fill="currentColor" 
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"/>
          </svg>
        );
      case 'system':
        return (
          <svg 
            className={iconClasses} 
            fill="currentColor" 
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  /**
   * Base button classes for consistent styling
   */
  const baseButtonClasses = `
    relative inline-flex items-center justify-center
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-blue-500 dark:focus:ring-blue-400
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-lg overflow-hidden
    ${isAnimating ? 'animate-pulse' : ''}
    ${disabled ? 'pointer-events-none' : 'cursor-pointer'}
  `;

  /**
   * Renders button variant
   */
  const renderButton = () => (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => handleThemeChange(resolvedTheme === 'light' ? 'dark' : 'light')}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`
        ${baseButtonClasses}
        ${currentSize.button}
        bg-gray-100 dark:bg-gray-800 
        hover:bg-gray-200 dark:hover:bg-gray-700
        text-gray-700 dark:text-gray-300
        ${className}
      `}
      aria-label={ariaLabel || `Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={resolvedTheme === 'dark'}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Light theme icon */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300 transform
          ${resolvedTheme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-75'
          }
        `}>
          {renderThemeIcon('light')}
        </div>
        
        {/* Dark theme icon */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300 transform
          ${resolvedTheme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-90 scale-75'
          }
        `}>
          {renderThemeIcon('dark')}
        </div>
      </div>
      
      {showLabels && (
        <span className={`ml-2 ${currentSize.text} font-medium`}>
          {resolvedTheme === 'light' ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );

  /**
   * Renders switch variant
   */
  const renderSwitch = () => (
    <div className={`flex items-center space-x-3 ${className}`}>
      {showLabels && (
        <label className={`${currentSize.text} font-medium text-gray-700 dark:text-gray-300`}>
          {renderThemeIcon('light', 'mr-1')}
          Light
        </label>
      )}
      
      <button
        ref={buttonRef}
        type="button"
        onClick={() => handleThemeChange(resolvedTheme === 'light' ? 'dark' : 'light')}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-blue-500 dark:focus:ring-blue-400
          ${resolvedTheme === 'dark' 
            ? 'bg-blue-600' 
            : 'bg-gray-200 dark:bg-gray-700'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        role="switch"
        aria-checked={resolvedTheme === 'dark'}
        aria-label={ariaLabel || `Toggle theme. Currently ${resolvedTheme} mode`}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full
            bg-white shadow-lg transition-transform duration-300 ease-in-out
            ${resolvedTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      
      {showLabels && (
        <label className={`${currentSize.text} font-medium text-gray-700 dark:text-gray-300`}>
          {renderThemeIcon('dark', 'mr-1')}
          Dark
        </label>
      )}
    </div>
  );

  /**
   * Renders dropdown variant
   */
  const renderDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          ${baseButtonClasses}
          ${currentSize.button}
          bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-600
          hover:bg-gray-50 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-300
          ${className}
        `}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        aria-label={ariaLabel || 'Select theme mode'}
      >
        <div className="flex items-center">
          {renderThemeIcon(theme as 'light' | 'dark' | 'system')}
          <svg 
            className={`ml-2 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              onClick={() => handleThemeChange('light')}
              className={`
                flex items-center w-full px-4 py-2 text-sm
                ${theme === 'light' 
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              {renderThemeIcon('light', 'mr-2')}
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`
                flex items-center w-full px-4 py-2 text-sm
                ${theme === 'dark' 
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              {renderThemeIcon('dark', 'mr-2')}
              Dark
            </button>
            {showSystemOption && (
              <button
                onClick={() => handleThemeChange('system')}
                className={`
                  flex items-center w-full px-4 py-2 text-sm
                  ${theme === 'system' 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {renderThemeIcon('system', 'mr-2')}
                System ({systemTheme})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  /**
   * Renders floating variant
   */
  const renderFloating = () => (
    <div className={`fixed ${positionConfig[position]} z-50 ${className}`}>
      {renderButton()}
    </div>
  );

  // Render based on variant
  switch (variant) {
    case 'switch':
      return renderSwitch();
    case 'dropdown':
      return renderDropdown();
    case 'floating':
      return renderFloating();
    default:
      return renderButton();
  }
};

export default ThemeToggle;