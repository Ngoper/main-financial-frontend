import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import helper utilities
import {
  validateEmail,
  validatePassword,
  cn,
  createButtonClasses,
  createInputClasses
} from '../../helpers';

/**
 * Login Component
 * 
 * Provides user authentication interface for the StockSavvy financial application.
 * This component offers a clean, responsive login form with the following features:
 * 
 * Features:
 * - Email and password input fields with proper validation
 * - "Forgot Password" link functionality
 * - Direct navigation to dashboard upon login
 * - Registration redirect for new users
 * - Dark/light theme support with proper color contrast
 * - Mobile-first responsive design using Ionic React
 * - Accessibility compliance with proper form labels
 * - Cross-platform compatibility (iOS, Android, Web)
 * 
 * Design:
 * - Clean, minimalist interface following financial app UI patterns
 * - StockSavvy branding with consistent styling
 * - Smooth transitions and hover effects
 * - Professional color scheme suitable for financial applications
 * 
 * Navigation:
 * - Successful login redirects to `/dashboard`
 * - Registration link navigates to `/auth/register`
 * - Back button provides navigation history
 * 
 * @component
 * @returns {JSX.Element} The rendered login page component
 * 
 * @example
 * ```tsx
 * // Used in routing configuration
 * <Route path="/auth/login" component={Login} />
 * ```
 */
const Login: React.FC = () => {
  // Hook for programmatic navigation between routes
  const history = useHistory();
  
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle login form submission with validation using helper utilities
   * Validates credentials and handles authentication
   */
  const handleLogin = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    // Validate email using helper utility
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password, { 
      minLength: 1, // Less strict for login
      requireUppercase: false,
      requireLowercase: false,
      requireNumbers: false,
      requireSpecialChars: false,
      disallowCommon: false
    });
    
    // Collect validation errors
    const newErrors: { email?: string; password?: string } = {};
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
      // TODO: Add actual authentication logic
      // - Call authentication API with validated credentials
      // - Handle success/error states
      // - Store authentication tokens
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard on success
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ password: 'Invalid credentials. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle forgot password action
   * Currently logs to console - in production,
   * this would trigger password reset flow
   */
  const handleForgotPassword = () => {
    // TODO: Implement password reset functionality
    // - Navigate to password reset form
    // - Send reset email
    // - Show confirmation message
    console.log("Forgot password clicked");
  };

  /**
   * Navigate to registration page
   */
  const handleSignUpRedirect = () => {
    history.push('/auth/register');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Main container with responsive design and theme support */}
        <div
          className="relative flex size-full min-h-screen flex-col bg-slate-50 dark:bg-[#101e23] justify-between group/design-root overflow-x-hidden"
          style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}
        >
          {/* Header section with back button and title */}
          <div>
            {/* Navigation header with back button and page title */}
            <div className="flex items-center bg-slate-50 dark:bg-[#101e23] p-4 pb-2 justify-between">
              {/* Back navigation button - currently non-functional, would use history.goBack() */}
              <div 
                className="text-[#0d141c] dark:text-white flex size-12 shrink-0 items-center cursor-pointer" 
                data-icon="ArrowLeft" 
                data-size="24px" 
                data-weight="regular"
                onClick={() => history.goBack()}
                role="button"
                aria-label="Go back to previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
              {/* Page title centered with proper spacing */}
              <h2 className="text-[#0d141c] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Login</h2>
            </div>
            {/* Email input field with validation and helper styling */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4" style={{ paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
              <label className="flex flex-col min-w-40 flex-1">
                {/* Email field label */}
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal pb-2">Email</p>
                {/* Email input with responsive design and theme support */}
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
                {/* Password input with security attributes and theme support */}
                <input
                  placeholder="Enter your password"
                  type="password"
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
                  autoComplete="current-password"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                {/* Password validation error display */}
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm mt-1 font-medium">
                    {errors.password}
                  </p>
                )}
              </label>
            </div>
            {/* Forgot password link with accessibility features */}
            <p 
              className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal underline cursor-pointer hover:text-[#0d80f2] dark:hover:text-[#0db9f2] transition-colors"
              style={{ paddingBottom: 'var(--spacing-md)', paddingTop: 'var(--spacing-xs)', paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)' }}
              onClick={handleForgotPassword}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
              aria-label="Reset forgotten password"
            >
              Forgot Password?
            </p>
          </div>
          {/* Bottom section with login button and signup link */}
          <div>
            {/* Primary login button with helper styling */}
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
                onClick={handleLogin}
                type="button"
                disabled={isSubmitting}
                aria-label="Log in to your account"
              >
                <span className="truncate">
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </span>
              </button>
            </div>
            
            {/* Registration redirect link */}
            <p 
              className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal text-center underline cursor-pointer hover:text-[#0d80f2] dark:hover:text-[#0db9f2] transition-colors"
              style={{ paddingBottom: 'var(--spacing-md)', paddingTop: 'var(--spacing-xs)', paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)' }}
              onClick={handleSignUpRedirect}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSignUpRedirect()}
              aria-label="Create a new account"
            >
              Don't have an account? Sign Up
            </p>
            
            {/* Bottom spacing for design consistency */}
            <div className="h-5 bg-slate-50 dark:bg-[#101e23]"></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
