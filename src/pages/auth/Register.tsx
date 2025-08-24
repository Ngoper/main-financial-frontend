import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import helper utilities
import {
  validateEmail,
  validatePassword,
  cn,
  createButtonClasses
} from '../../helpers';

/**
 * Register Component
 * 
 * User registration interface for the StockSavvy financial application.
 * This component provides a comprehensive signup form with the following features:
 * 
 * Features:
 * - Full name, email, and password registration fields
 * - Form validation with proper input types
 * - Immediate redirect to dashboard after registration
 * - Login redirect for existing users
 * - Back navigation to previous page
 * - Dark/light theme support with consistent styling
 * - Mobile-first responsive design using Ionic React
 * - Accessibility compliance with proper form structure
 * - Cross-platform compatibility (iOS, Android, Web)
 * 
 * Design:
 * - Clean, professional interface following financial app standards
 * - Consistent with StockSavvy branding and login page
 * - Background images with theme-aware visibility
 * - Smooth transitions and interactive elements
 * - Professional color scheme optimized for trust and usability
 * 
 * Navigation:
 * - Successful registration redirects to `/dashboard`
 * - Login redirect navigates to `/auth/login`
 * - Back button returns to previous page in history
 * 
 * Security Considerations:
 * - Password input type for security
 * - Email validation through input type
 * - Form structure prepared for validation logic
 * 
 * @component
 * @returns {JSX.Element} The rendered registration page component
 * 
 * @example
 * ```tsx
 * // Used in routing configuration
 * <Route path="/auth/register" component={Register} />
 * ```
 */
const Register: React.FC = () => {
  // Hook for programmatic navigation between routes
  const history = useHistory();
  
  // Form state management
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle registration form submission with validation using helper utilities
   * Validates form data and creates new user account
   */
  const handleSignUp = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    // Validate all form fields using helper utilities
    const nameValidation = fullName.trim() ? { isValid: true } : { isValid: false, error: 'Full name is required' };
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    // Collect validation errors
    const newErrors: { fullName?: string; email?: string; password?: string } = {};
    if (!nameValidation.isValid) {
      newErrors.fullName = nameValidation.error;
    }
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }
    
    // If validation fails, show errors and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // TODO: Add actual registration logic
      // - Check email uniqueness
      // - Hash password securely
      // - Call user creation API with validated data
      // - Handle success/error states
      // - Send verification email if needed
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to dashboard on success
      history.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ email: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Navigate to login page for existing users
   */
  const handleLoginRedirect = () => {
    history.push('/auth/login');
  };

  /**
   * Navigate back to previous page
   */
  const handleBackNavigation = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Main container with responsive design and theme support */}
        <div 
          className="relative flex size-full min-h-screen flex-col bg-slate-50 dark:bg-[#101e23] justify-between group/design-root overflow-x-hidden" 
          style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}
        >
          <div>
            {/* Navigation header with back button and page title */}
            <div className="flex items-center bg-slate-50 dark:bg-[#101e23] p-4 pb-2 justify-between">
              {/* Back navigation button with proper click handling */}
              <div 
                className="text-[#0d141c] dark:text-white flex size-12 shrink-0 items-center cursor-pointer hover:bg-[#e7edf4] dark:hover:bg-[#223f49] rounded-lg transition-colors" 
                data-icon="ArrowLeft" 
                data-size="24px" 
                data-weight="regular"
                onClick={handleBackNavigation}
                role="button"
                aria-label="Go back to previous page"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleBackNavigation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
              {/* Page title centered with proper spacing */}
              <h2 className="text-[#0d141c] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Sign Up</h2>
            </div>
            {/* Full name input field with validation and helper styling */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4" style={{ paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
              <label className="flex flex-col min-w-40 flex-1">
                {/* Full name field label */}
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal pb-2">Full Name</p>
                {/* Full name input with accessibility and validation */}
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={cn(
                    'form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl',
                    'text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border-none',
                    'bg-[#e7edf4] dark:bg-[#223f49] focus:border-none text-base font-normal leading-normal',
                    'placeholder:text-[#49739c] dark:placeholder:text-[#90bccb]',
                    errors.fullName ? 'border-2 border-red-500' : ''
                  )}
                  style={{
                    height: '56px', // Minimum touch target
                    padding: 'var(--spacing-lg)',
                    fontSize: '16px' // Prevents zoom on iOS
                  }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  aria-label="Full name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? 'fullname-error' : undefined}
                />
                {/* Full name validation error display */}
                {errors.fullName && (
                  <p id="fullname-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </label>
            </div>
            {/* Email input field with validation and helper styling */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4" style={{ paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
              <label className="flex flex-col min-w-40 flex-1">
                {/* Email field label */}
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal pb-2">Email</p>
                {/* Email input with proper type and validation */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    'form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl',
                    'text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border-none',
                    'bg-[#e7edf4] dark:bg-[#223f49] focus:border-none text-base font-normal leading-normal',
                    'placeholder:text-[#49739c] dark:placeholder:text-[#90bccb]',
                    errors.email ? 'border-2 border-red-500' : ''
                  )}
                  style={{
                    height: '56px', // Minimum touch target
                    padding: 'var(--spacing-lg)',
                    fontSize: '16px' // Prevents zoom on iOS
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {/* Email validation error display */}
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.email}
                  </p>
                )}
              </label>
            </div>
            {/* Password input field with validation and helper styling */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4" style={{ paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
              <label className="flex flex-col min-w-40 flex-1">
                {/* Password field label */}
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal pb-2">Password</p>
                {/* Password input with security and accessibility features */}
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={cn(
                    'form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl',
                    'text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border-none',
                    'bg-[#e7edf4] dark:bg-[#223f49] focus:border-none text-base font-normal leading-normal',
                    'placeholder:text-[#49739c] dark:placeholder:text-[#90bccb]',
                    errors.password ? 'border-2 border-red-500' : ''
                  )}
                  style={{
                    height: '56px', // Minimum touch target
                    padding: 'var(--spacing-lg)',
                    fontSize: '16px' // Prevents zoom on iOS
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                  autoComplete="new-password"
                  minLength={8}
                  aria-describedby={errors.password ? 'password-error' : 'password-help'}
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                {/* Password validation error display */}
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.password}
                  </p>
                )}
                {/* Password requirements hint - visible when no error */}
                {!errors.password && (
                  <span id="password-help" className="text-[#64748b] dark:text-[#94a3b8] text-xs mt-1">
                    Password must be at least 8 characters with uppercase, lowercase, number, and special character
                  </span>
                )}
              </label>
            </div>
            {/* Primary sign up button with helper styling */}
            <div className="flex" style={{ paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
              <button
                className={cn(
                  createButtonClasses({ variant: 'primary', size: 'lg', state: isSubmitting ? 'loading' : 'default' }),
                  'flex-1 max-w-[480px]'
                )}
                style={{
                  height: '48px', // Minimum touch target
                  padding: 'var(--button-padding-y) var(--button-padding-x)'
                }}
                onClick={handleSignUp}
                type="button"
                disabled={isSubmitting}
                aria-label="Create your account"
              >
                <span className="truncate">
                  {isSubmitting ? 'Creating account...' : 'Sign Up'}
                </span>
              </button>
            </div>
            
            {/* Login redirect text */}
            <p className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal text-center" style={{ paddingBottom: 'var(--spacing-md)', paddingTop: 'var(--spacing-xs)', paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)' }}>
              Already have an account?
            </p>
            
            {/* Login redirect link */}
            <p 
              className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal text-center underline cursor-pointer hover:text-[#0d80f2] dark:hover:text-[#0db9f2] transition-colors"
              style={{ paddingBottom: 'var(--spacing-md)', paddingTop: 'var(--spacing-xs)', paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)' }}
              onClick={handleLoginRedirect}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleLoginRedirect()}
              aria-label="Go to login page"
            >
              Log In
            </p>
          </div>
          {/* Bottom section with decorative background images */}
          <div>
            {/* Dark theme background image - visible only in dark mode */}
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-none hidden dark:block"
              style={{aspectRatio: '390 / 320'}}
              role="img"
              aria-label="StockSavvy branding background for dark theme"
            ></div>
            
            {/* Light theme background image - visible only in light mode */}
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-none block dark:hidden"
              style={{aspectRatio: '390 / 320'}}
              role="img"
              aria-label="StockSavvy branding background for light theme"
            ></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
