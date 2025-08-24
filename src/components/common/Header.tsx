import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import ThemeToggle from '../theme/ThemeToggle';

/**
 * Header Component Properties
 * 
 * @interface HeaderProps
 * @property {string} title - Title to display in the header
 */
interface HeaderProps {
  title: string;
}

/**
 * Header Component
 * 
 * Main navigation header for the StockSavvy application.
 * Provides:
 * - Brand logo and navigation
 * - Desktop navigation menu with smooth transitions
 * - Theme toggle functionality
 * - User notifications and profile access
 * - Responsive design for mobile and desktop
 * 
 * Features:
 * - Light/Dark theme support with proper contrast
 * - ARIA accessibility labels and semantic HTML
 * - Hover effects and smooth transitions
 * - Mobile-responsive design patterns
 * - Integration with React Router for navigation
 * 
 * @param {HeaderProps} props - Component properties
 * @returns {JSX.Element} Rendered header component
 */
const Header: React.FC<HeaderProps> = ({ title }) => {
  // Hook for programmatic navigation between routes
  const history = useHistory();
  const { theme, toggleTheme } = useTheme();

  /**
   * Navigation items configuration for desktop menu
   */
  const navigationItems = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Portfolio', path: '/dashboard' },
    { label: 'AI Assistant', path: '/chat' },
    { label: 'News', path: '/dashboard' },
    { label: 'Community', path: '/dashboard' }
  ];

  /**
   * Handle navigation item click
   * @param {React.MouseEvent} e - Mouse event
   * @param {string} path - Target route path
   */
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    history.push(path);
  };

  return (
    // Main header container with responsive design and theme support
    <header 
      className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e2e8f0] dark:border-[#374151] bg-white dark:bg-[#101e23] transition-colors duration-300"
      style={{
        paddingLeft: 'var(--spacing-lg)',
        paddingRight: 'var(--spacing-lg)',
        paddingTop: 'var(--spacing-md)',
        paddingBottom: 'var(--spacing-md)'
      }}
      role="banner"
      aria-label="Main navigation header"
    >
      {/* Left section: Logo and branding */}
      <div className="flex items-center gap-4 text-[#0f172a] dark:text-[#f8fafc]">
        {/* StockSavvy logo icon */}
        <div className="size-4" aria-label="StockSavvy logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.9849 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        
        {/* Brand name */}
        <h2 className="text-h3 text-primary">
          StockSavvy
        </h2>
      </div>
      
      {/* Right section: Navigation and actions */}
      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        {/* Desktop navigation menu */}
        <div className="hidden md:flex items-center" style={{ gap: 'var(--spacing-3xl)' }}>
          {navigationItems.map((item) => (
            <a 
              key={item.label}
              className="text-small text-secondary hover:text-accent font-medium transition-colors duration-200" 
              href="#" 
              onClick={(e) => handleNavigation(e, item.path)}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        {/* Action controls */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
          {/* Theme Toggle */}
          <ThemeToggle 
            variant="button" 
            size="sm"
            className="h-10 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          />
          
          {/* Notification button */}
          <button
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#f1f5f9] dark:bg-[#223649] text-[#334155] dark:text-[#e2e8f0] hover:bg-[#e2e8f0] dark:hover:bg-[#2a3f52] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 transition-colors duration-200"
            style={{
              height: '44px', // Minimum touch target
              padding: '0 var(--spacing-sm)'
            }}
            aria-label="Notifications"
            title="View notifications"
          >
            <div className="text-[#334155] dark:text-[#e2e8f0]" data-icon="Bell" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                ></path>
              </svg>
            </div>
          </button>
          
          {/* User avatar */}
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-transparent hover:border-[#0d80f2] dark:hover:border-[#0db9f2] transition-colors duration-200 cursor-pointer"
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCeaxPOE22Sa1yDJCzRsRth_clB1rINZtXUAwlWxLe_L3aA0z3aWNksAChbEtV_c1vC-Zgat8iiReqZe1QyCfR4yKm1Xg1Km5KeOpO46_aXkH0khA3r8PSEAOTq2hzWay8Jz5sXve7ejGHrx8DCddt1pUNrrzX2mHMk5OHhCyU3SVrfjDDjrWeao_FqQ9jOFjwN_K-UXI6Y76FM_rvwfdGmlBM7U30DDBXVihNvwyPaQKR6KNPwJpwNiV4_6PA_b81kDEpMEwxUyZx5")'}}
          >
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;