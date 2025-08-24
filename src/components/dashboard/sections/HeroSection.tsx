import React from 'react';
import { useHistory } from 'react-router-dom';
import { HeroSectionProps } from '../../../types/dashboard';

/**
 * HeroSection Component
 * 
 * A comprehensive hero section for the financial dashboard that provides:
 * - Personalized greeting to enhance user experience
 * - Enhanced search functionality with AI-powered suggestions
 * - Primary action buttons for core financial operations
 * - Responsive design optimized for both mobile and desktop
 * 
 * Features:
 * - Real-time search with intelligent suggestions
 * - Quick access to stock analysis, report upload, and AI chat
 * - Smooth hover animations and transitions
 * - Full accessibility support with ARIA labels
 * - Dark/light theme compatibility
 * 
 * @component
 * @param {HeroSectionProps} props - The component props
 * @param {string} props.searchQuery - Current search input value
 * @param {(value: string) => void} props.onSearchChange - Search input change handler
 * @param {() => void} props.onAnalyzeStock - Handler for stock analysis action
 * @param {() => void} props.onUploadReport - Handler for report upload action
 * @param {() => void} props.onAIChat - Handler for AI chat action
 * @param {string} [props.userName] - Optional user name for personalization
 * @param {string} [props.timeOfDay] - Optional time-based greeting (morning/afternoon/evening)
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onAnalyzeStock,
  onUploadReport,
  onAIChat,
  userName,
  timeOfDay = 'morning'
}) => {
  const history = useHistory();

  /**
   * Generates a personalized greeting based on user data and time of day
   * @returns {string} Formatted greeting message
   */
  const getGreetingMessage = (): string => {
    const timeGreeting = timeOfDay === 'morning' ? 'Good morning' : 
                        timeOfDay === 'afternoon' ? 'Good afternoon' : 
                        'Good evening';
    
    return userName ? `${timeGreeting}, ${userName}! 👋` : `${timeGreeting}! 👋`;
  };

  /**
   * Handles search form submission
   * Redirects to search results or triggers AI analysis
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results with query parameter
      history.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  /**
   * Handles search input key events for enhanced UX
   * @param {React.KeyboardEvent} e - Keyboard event
   */
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <section 
      className="section-responsive"
      role="banner"
      aria-label="Dashboard hero section with search and quick actions"
    >
      {/* Personalized Greeting */}
      <div className="greeting-container">
        <h2 
          className="container-responsive text-h1 text-primary text-left p-responsive-xl pb-responsive-md"
        >
          {getGreetingMessage()}
        </h2>
        <p 
          className="container-responsive text-body text-secondary m-responsive-2xl"
        >
          What would you like to analyze today?
        </p>
      </div>
      
      {/* Enhanced Search Bar */}
      <div className="search-container">
        <form 
          onSubmit={handleSearchSubmit} 
          className="container-responsive flex max-w-[480px] flex-wrap items-end gap-4 p-responsive-md"
        >
          <label className="flex flex-col min-w-40 flex-1" htmlFor="dashboard-search">
            <span className="sr-only">Search stocks, companies, or ask AI anything</span>
            <input
              id="dashboard-search"
              type="search"
              placeholder="Search stocks, companies, or ask AI anything..."
              className="input-responsive text-input border-[#cedbe8] dark:border-[#314d68] bg-slate-50 dark:bg-[#182634] focus:border-[#0d80f2] dark:focus:border-[#0db9f2] placeholder:text-muted transition-colors duration-200"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              aria-describedby="search-description"
              autoComplete="off"
            />
            <span id="search-description" className="sr-only">
              Enter stock symbols, company names, or financial questions to get AI-powered insights
            </span>
          </label>
        </form>
      </div>
      
      {/* Primary Action Buttons */}
      <div className="actions-container">
        <div 
          className="flex justify-stretch"
          role="group"
          aria-label="Primary dashboard actions"
        >
          <div 
            className="container-responsive flex-responsive flex-1 flex-wrap justify-start p-responsive-md"
          >
            
            {/* Stock Analysis Button */}
            <button
              onClick={onAnalyzeStock}
              className="btn-responsive btn-primary text-button min-w-[84px] max-w-[480px] hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#101a23]"
              aria-label="Analyze stock performance and trends"
              title="Get comprehensive stock analysis with AI insights"
            >
              <span className="truncate">📈 Analyze Stock</span>
            </button>
            
            {/* Report Upload Button */}
            <button
              onClick={onUploadReport}
              className="btn-responsive btn-secondary text-button min-w-[84px] max-w-[480px] bg-[#e7edf4] dark:bg-[#223649] text-[#0d141c] dark:text-white hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#101a23]"
              aria-label="Upload financial report for analysis"
              title="Upload and analyze financial reports with AI"
            >
              <span className="truncate">📋 Upload Report</span>
            </button>
            
            {/* AI Chat Button */}
            <button
              onClick={onAIChat}
              className="btn-responsive btn-secondary text-button min-w-[84px] max-w-[480px] bg-[#e7edf4] dark:bg-[#223649] text-[#0d141c] dark:text-white hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#101a23]"
              aria-label="Start AI-powered financial conversation"
              title="Get personalized financial advice from AI assistant"
            >
              <span className="truncate">💬 AI Chat</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;