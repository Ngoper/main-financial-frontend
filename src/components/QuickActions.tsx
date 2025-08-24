import React from 'react';

/**
 * QuickActions Component
 * 
 * Dashboard widget providing quick access to core financial analysis features.
 * This component offers a responsive grid of action cards with the following capabilities:
 * 
 * Features:
 * - Four primary action buttons: Search, Analyze, News, Alerts
 * - Responsive grid layout that adapts to screen size
 * - Icon-driven visual design for intuitive navigation
 * - Dark/light theme support with consistent styling
 * - Hover effects for enhanced user interaction
 * - Accessibility compliance with proper focus management
 * - Mobile-optimized touch targets
 * 
 * Actions:
 * - Search: Financial data and company lookup
 * - Analyze: Stock analysis and technical indicators
 * - News: Latest financial news and market updates
 * - Alerts: Price alerts and notification management
 * 
 * Design:
 * - Card-based layout with consistent spacing
 * - Professional icon set for financial context
 * - Theme-aware color scheme
 * - Responsive grid using CSS Grid auto-fit
 * - Minimum card width of 158px for optimal mobile experience
 * 
 * @component
 * @returns {JSX.Element} The rendered quick actions widget
 * 
 * @example
 * ```tsx
 * // Used in dashboard layout
 * <QuickActions />
 * ```
 */
const QuickActions: React.FC = () => {
  /**
   * Action items configuration with icons and labels
   */
  const actionItems = [
    {
      id: 'search',
      label: 'Search',
      description: 'Find stocks, companies, and financial data',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
        </svg>
      )
    },
    {
      id: 'analyze',
      label: 'Analyze',
      description: 'Technical and fundamental stock analysis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z" />
        </svg>
      )
    },
    {
      id: 'news',
      label: 'News',
      description: 'Latest financial news and market updates',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,64V184a24,24,0,0,1-24,24H32A24,24,0,0,1,8,184.11V88a8,8,0,0,1,16,0v96a8,8,0,0,0,16,0V64A16,16,0,0,1,56,48H216A16,16,0,0,1,232,64Zm-16,0H56V184a23.84,23.84,0,0,1-1.37,8H208a8,8,0,0,0,8-8Z" />
        </svg>
      )
    },
    {
      id: 'alerts',
      label: 'Alerts',
      description: 'Price alerts and notifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
        </svg>
      )
    }
  ];

  /**
   * Handle action item click
   * @param {string} actionId - The ID of the clicked action
   */
  const handleActionClick = (actionId: string) => {
    // TODO: Implement action handlers
    // - Search: Navigate to search page
    // - Analyze: Open analysis tools
    // - News: Navigate to news feed
    // - Alerts: Open alerts management
    console.log(`Action clicked: ${actionId}`);
  };

  return (
    <section aria-labelledby="quick-actions-heading">
      {/* Section heading with proper typography */}
      <h2 
        id="quick-actions-heading"
        className="text-light-text dark:text-dark-text text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
      >
        Quick Actions
      </h2>
      
      {/* Responsive grid container for action cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {actionItems.map((action) => (
          <button
            key={action.id}
            className="flex flex-1 gap-3 rounded-lg border border-secondary dark:border-dark-secondary bg-light-bg dark:bg-dark-bg p-4 items-center hover:bg-[#f8fafc] dark:hover:bg-[#1e293b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#101a23]"
            onClick={() => handleActionClick(action.id)}
            aria-label={action.description}
            title={action.description}
          >
            {/* Action icon */}
            <div className="text-light-text dark:text-dark-text" data-icon={action.id} data-size="24px" data-weight="regular">
              {action.icon}
            </div>
            
            {/* Action label */}
            <h3 className="text-light-text dark:text-dark-text text-base font-bold leading-tight">
              {action.label}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;