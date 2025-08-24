import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/**
 * Footer Component
 * 
 * Mobile-first bottom navigation component for StockSavvy financial app.
 * Provides quick access to main app sections with Indonesian labels:
 * - Beranda (Home/Dashboard)
 * - Saham (Stocks/Portfolio)
 * - Portofolio (Portfolio management)
 * - Chat (AI Assistant)
 * - Profil (Profile/Settings)
 * 
 * Features:
 * - Active state indication with blue accent
 * - Responsive icons and typography
 * - Dark/light theme support
 * - Accessibility compliance
 * - Smooth transitions and hover effects
 */

const Footer: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  /**
   * Check if current route is active
   * @param {string} path - Route path to check
   * @returns {boolean} Whether the route is active
   */
  const isActiveRoute = (path: string): boolean => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  /**
   * Navigation items configuration
   */
  const navigationItems = [
    {
      id: 'beranda',
      label: 'Beranda',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.10Z"/>
        </svg>
      )
    },
    {
      id: 'saham',
      label: 'Saham',
      path: '/stocks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8V112a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,48,171.31V208H224A8,8,0,0,1,232,208Z"/>
        </svg>
      )
    },
    {
      id: 'portofolio',
      label: 'Portofolio',
      path: '/portfolio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M224,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H32A16,16,0,0,0,16,72V200a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V72A16,16,0,0,0,224,56ZM92.28,48h71.44l8,16H84.27ZM224,200H32V72H224V200ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"/>
        </svg>
      )
    },
    {
      id: 'chat',
      label: 'Chat',
      path: '/chat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,48H40A16,16,0,0,0,24,64V192a15.85,15.85,0,0,0,9.24,14.5A16.05,16.05,0,0,0,40,208a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,176H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,192V64H216V160H82.5a16,16,0,0,0-10.3,3.75L40,192Z"/>
        </svg>
      )
    },
    {
      id: 'profil',
      label: 'Profil',
      path: '/profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
        </svg>
      )
    }
  ];

  /**
   * Handle navigation item click
   * @param {string} path - Target route path
   */
  const handleNavigation = (path: string): void => {
    history.push(path);
  };

  /**
   * Get styling classes for navigation item
   * @param {boolean} isActive - Whether the item is active
   * @returns {Object} Styling classes for different parts
   */
  const getItemStyles = (isActive: boolean) => {
    return {
      container: `
        flex flex-col items-center justify-center flex-1
        border-b-[3px] transition-all duration-200 ease-in-out
        hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]
        focus:outline-none focus:ring-2 focus:ring-[#0d80f2] focus:ring-inset
        ${isActive 
          ? 'border-b-[#0d80f2] dark:border-b-[#0db9f2]' 
          : 'border-b-transparent'
        }
      `,
      spacing: {
        gap: 'var(--spacing-xs)',
        paddingBottom: 'var(--spacing-sm)',
        paddingTop: 'var(--spacing-sm)'
      },
      icon: isActive 
        ? 'text-[#0d80f2] dark:text-[#0db9f2]' 
        : 'text-[#49739c] dark:text-[#90adcb]',
      label: `
        text-xs md:text-sm font-bold leading-normal tracking-[0.015em]
        ${isActive 
          ? 'text-[#0d80f2] dark:text-[#0db9f2]' 
          : 'text-[#49739c] dark:text-[#90adcb]'
        }
      `
    };
  };

  return (
    <footer 
      className="flex justify-center bg-white dark:bg-[#182634] border-t border-[#cedbe8] dark:border-[#314d68]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="pb-3">
          <div className="flex justify-between" style={{ paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)' }}>
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              const styles = getItemStyles(isActive);
              
              return (
                <button
                  key={item.id}
                  className={styles.container}
                  onClick={() => handleNavigation(item.path)}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    gap: styles.spacing.gap,
                    paddingBottom: styles.spacing.paddingBottom,
                    paddingTop: styles.spacing.paddingTop,
                    minHeight: '44px' // Minimum touch target
                  }}
                >
                  <div className={styles.icon}>
                    {item.icon}
                  </div>
                  <p className={styles.label}>
                    {item.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
