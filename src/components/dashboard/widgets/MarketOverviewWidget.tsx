import React from 'react';
import { MarketOverviewWidgetProps, MarketIndicator } from '../../../types/dashboard';

// Import helper utilities
import {
  formatNumber,
  formatCurrency,
  formatPercentageChange,
  getTrendIcon,
  getTrendClasses,
  createTrendDisplay
} from '../../../helpers';
import { cn, createCardClasses, createButtonClasses } from '../../../helpers';

/**
 * MarketOverviewWidget Component
 * 
 * A comprehensive market overview widget that displays key financial indicators:
 * - Stock market indices (IHSG, S&P 500, etc.)
 * - Currency exchange rates (USD/IDR, EUR/USD, etc.)
 * - Commodity prices (Gold, Oil, etc.)
 * - Real-time price changes with trend indicators
 * 
 * Features:
 * - Real-time market data display
 * - Color-coded trend indicators (green for up, red for down)
 * - Responsive grid layout for different screen sizes
 * - Loading states and error handling
 * - Accessibility support with proper ARIA labels
 * - Dark/light theme compatibility
 * 
 * @component
 * @param {MarketOverviewWidgetProps} props - The component props
 * @param {MarketIndicator[]} props.indicators - Array of market indicators to display
 * @param {boolean} [props.isLoading] - Loading state flag
 * @param {string} [props.error] - Error message if data fetch fails
 * @param {() => void} [props.onRefresh] - Optional refresh callback
 * @param {string} [props.title] - Custom widget title
 */
const MarketOverviewWidget: React.FC<MarketOverviewWidgetProps> = ({
  indicators = [],
  isLoading = false,
  error,
  onRefresh,
  title = "Market Overview"
}) => {

  /**
   * Formats currency value using helper utilities
   * @param {number} value - The numeric value to format
   * @param {string} currency - Currency code (USD, IDR, etc.)
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted currency or number string
   */
  const formatIndicatorValue = (value: number, currency?: string, decimals: number = 2): string => {
    if (currency && currency !== 'NONE') {
      return formatCurrency(value, { currency: currency as any, decimals });
    }
    return formatNumber(value, { decimals });
  };

  /**
   * Renders individual market indicator card using helper utilities
   * @param {MarketIndicator} indicator - The market indicator data
   * @param {number} index - Array index for key prop
   * @returns {JSX.Element} Individual indicator card
   */
  const renderIndicator = (indicator: MarketIndicator, index: number): React.JSX.Element => {
    // Create trend display using helper utility
    const trendDisplay = createTrendDisplay(indicator.change);
    
    // Generate card classes using helper utilities
    const cardItemClasses = cn(
      'flex justify-between items-center rounded-lg transition-all duration-200',
      'border border-transparent hover:shadow-sm',
      'hover:bg-[#f1f5f9] dark:hover:bg-[#2a3f52]',
      'hover:border-[#0d80f2] dark:hover:border-[#0db9f2]'
    );
    
    return (
      <div 
        key={indicator.symbol || index}
        className={cardItemClasses}
        style={{
          padding: 'var(--card-padding-y) var(--card-padding-x)'
        }}
        role="article"
        aria-label={`${indicator.name} market indicator`}
      >
        {/* Indicator Name */}
        <div className="flex flex-col space-y-2">
          <span className="text-[#0f172a] dark:text-[#f8fafc] text-sm font-semibold leading-relaxed">
            {indicator.name}
          </span>
          {indicator.symbol && (
            <span className="text-[#64748b] dark:text-[#94a3b8] text-xs font-medium">
              {indicator.symbol}
            </span>
          )}
        </div>
        
        {/* Value and Change */}
        <div className="text-right space-y-2 min-w-[120px]">
          <div className="text-[#0f172a] dark:text-[#f8fafc] font-bold text-base md:text-lg leading-tight">
            {indicator.currency && indicator.currency !== 'NONE' && (
              <span className="text-[#64748b] dark:text-[#94a3b8] text-xs mr-2 font-medium">
                {indicator.currency}
              </span>
            )}
            {formatIndicatorValue(indicator.value, indicator.currency, indicator.decimals || 2)}
          </div>
          <div 
            className={cn(
              trendDisplay.classes,
              'text-sm font-semibold flex items-center justify-end space-x-1'
            )}
            aria-label={`${trendDisplay.isPositive ? 'Increase' : 'Decrease'} of ${Math.abs(indicator.change)} percent`}
          >
            <span>{trendDisplay.icon}</span>
            <span>{trendDisplay.value}</span>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders loading skeleton for indicators
   * @returns {JSX.Element} Loading skeleton grid
   */
  const renderLoadingSkeleton = (): React.JSX.Element => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0] dark:divide-[#374151]">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex justify-between items-center animate-pulse" style={{ padding: 'var(--card-padding-y) var(--card-padding-x)' }}>
          <div className="flex flex-col space-y-3">
            <div className="h-4 bg-[#e2e8f0] dark:bg-[#374151] rounded-md w-20"></div>
            <div className="h-3 bg-[#e2e8f0] dark:bg-[#374151] rounded-md w-16"></div>
          </div>
          <div className="text-right space-y-3">
            <div className="h-5 bg-[#e2e8f0] dark:bg-[#374151] rounded-md w-24"></div>
            <div className="h-4 bg-[#e2e8f0] dark:bg-[#374151] rounded-md w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );

  /**
   * Renders error state with retry option
   * @returns {JSX.Element} Error message with retry button
   */
  const renderError = (): React.JSX.Element => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-[#dc2626] dark:text-[#ef4444] mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"/>
        </svg>
      </div>
      <p className="text-[#334155] dark:text-[#e2e8f0] mb-6 text-base leading-relaxed max-w-sm">
        {error || 'Failed to load market data'}
      </p>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className={createButtonClasses({ variant: 'primary', size: 'md' })}
          aria-label="Retry loading market data"
        >
          Try Again
        </button>
      )}
    </div>
  );

  return (
    <section 
      className=""
      style={{ 
        paddingTop: 'var(--section-spacing)', 
        paddingBottom: 'var(--section-spacing)',
        marginBottom: 'var(--section-spacing)' 
      }}
      role="region"
      aria-label="Market overview and indicators"
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-6" style={{ paddingLeft: 'var(--spacing-3xl)', paddingRight: 'var(--spacing-3xl)' }}>
        <h3 className="text-[#0f172a] dark:text-[#f8fafc] text-2xl font-bold leading-tight tracking-tight">
          {title}
        </h3>
        
        {/* Refresh Button */}
        {onRefresh && !isLoading && (
          <button
            onClick={onRefresh}
            className="p-3 text-[#64748b] dark:text-[#94a3b8] hover:text-[#0d80f2] dark:hover:text-[#0db9f2] transition-colors duration-200 rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#2a3f52] focus:outline-none focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#101e23]"
            aria-label="Refresh market data"
            title="Refresh market data"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.63,74a79.84,79.84,0,0,0-54.63-22A80,80,0,0,0,54.63,182a8,8,0,0,1-13.26,9A96,96,0,0,1,128,32a95.82,95.82,0,0,1,65.37,26L208,72.69V96A8,8,0,0,1,224,48ZM201.37,182a8,8,0,0,0-13.26-9,79.84,79.84,0,0,1-54.63,22A80,80,0,0,1,73.37,74l14.06-14.06H116a8,8,0,0,0,0-16H68a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V72.69l14.06,14.06A96,96,0,0,0,201.37,182Z"/>
            </svg>
          </button>
        )}
      </div>
      
      {/* Widget Content */}
      <div 
        className={cn(
          createCardClasses({ variant: 'elevated' }),
          'shadow-sm'
        )} 
        style={{ marginLeft: 'var(--spacing-3xl)', marginRight: 'var(--spacing-3xl)' }}
      >
        {error ? renderError() : 
         isLoading ? renderLoadingSkeleton() : 
         indicators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0] dark:divide-[#374151]">
            {indicators.map(renderIndicator)}
          </div>
        ) : (
          <div className="text-center py-16 text-[#64748b] dark:text-[#94a3b8]">
            <p className="text-base leading-relaxed">No market data available</p>
          </div>
        )}
      </div>
      
      {/* Last Updated Timestamp */}
      {indicators.length > 0 && !isLoading && !error && (
        <div className="mt-4" style={{ paddingLeft: 'var(--spacing-3xl)', paddingRight: 'var(--spacing-3xl)' }}>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] text-right font-medium">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}
    </section>
  );
};

export default MarketOverviewWidget;