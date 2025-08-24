import React from 'react';
import { AITopicSelectionCardsProps, ChatTopic, ChatTopicType } from '../../../types/dashboard';

/**
 * AITopicSelectionCards Component
 * 
 * A comprehensive AI topic selection component for financial analysis:
 * - Upload financial reports for AI analysis
 * - Stock analysis with AI insights
 * - Investment recommendations from AI
 * - Interactive cards with hover effects and accessibility
 * 
 * Features:
 * - Dynamic topic cards with icons and descriptions
 * - Responsive grid layout for different screen sizes
 * - Loading states and skeleton UI
 * - Accessibility support with proper ARIA labels
 * - Dark/light theme compatibility
 * - Smooth animations and transitions
 * 
 * @component
 * @param {AITopicSelectionCardsProps} props - The component props
 * @param {ChatTopic[]} props.topics - Array of available chat topics
 * @param {(topicId: ChatTopicType) => void} props.onTopicSelect - Handler for topic selection
 * @param {string} [props.title] - Optional custom title
 * @param {boolean} [props.isLoading] - Loading state flag
 */
const AITopicSelectionCards: React.FC<AITopicSelectionCardsProps> = ({
  topics = [],
  onTopicSelect,
  title = "AI Assistant - Choose Your Analysis",
  isLoading = false
}) => {

  /**
   * Default topics for financial analysis if none provided
   */
  const defaultTopics: ChatTopic[] = [
    {
      id: 'upload-laporan',
      title: '📊 Upload Laporan',
      description: 'Upload laporan keuangan perusahaan untuk analisis mendalam',
      icon: 'upload',
      aiLevel: 3,
      isRecommended: true,
      borderStyle: 'highlighted'
    },
    {
      id: 'analisa-saham',
      title: '📈 Analisa Saham',
      description: 'Dapatkan analisis teknikal dan fundamental saham real-time',
      icon: 'chart',
      aiLevel: 3,
      isRecommended: true,
      borderStyle: 'default'
    },
    {
      id: 'rekomendasi-saham',
      title: '💡 Rekomendasi Saham',
      description: 'Temukan peluang investasi terbaik berdasarkan AI analysis',
      icon: 'lightbulb',
      aiLevel: 2,
      isRecommended: false,
      borderStyle: 'default'
    }
  ];

  // Use provided topics or fallback to default
  const displayTopics = topics.length > 0 ? topics : defaultTopics;

  /**
   * Gets the appropriate icon component for each topic
   * @param {string} iconType - The icon type identifier
   * @returns {JSX.Element} SVG icon component
   */
  const getTopicIcon = (iconType: string): React.JSX.Element => {
    switch (iconType) {
      case 'upload':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H80a8,8,0,0,1,0,16H32v64H224V136H176a8,8,0,0,1,0-16h48A16,16,0,0,1,240,136ZM85.66,77.66,120,43.31V128a8,8,0,0,0,16,0V43.31l34.34,34.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,77.66ZM200,168a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z"></path>
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8V112a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,48,171.31V208H224A8,8,0,0,1,232,208Z"></path>
          </svg>
        );
      case 'lightbulb':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16.24,16.24,0,0,0-6.36-12.79A87.55,87.55,0,0,1,40,104a88,88,0,0,1,176,0Zm-16,0a72,72,0,0,0-144,0,71.64,71.64,0,0,0,27.64,56.59A32.15,32.15,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.36-25.41A71.64,71.64,0,0,0,200,104Z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
          </svg>
        );
    }
  };

  /**
   * Gets border styling classes based on topic configuration
   * @param {ChatTopic} topic - The topic configuration
   * @returns {string} CSS classes for border styling
   */
  const getBorderClasses = (topic: ChatTopic): string => {
    if (topic.borderStyle === 'highlighted' || topic.isRecommended) {
      return 'border-[#0d80f2] dark:border-[#0db9f2] border-2';
    }
    return 'border-[#cedbe8] dark:border-[#314d68] border';
  };

  /**
   * Gets background classes with hover effects
   * @param {ChatTopic} topic - The topic configuration
   * @returns {string} CSS classes for background styling
   */
  const getBackgroundClasses = (topic: ChatTopic): string => {
    const baseClasses = 'bg-white dark:bg-[#182634] hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]';
    if (topic.isRecommended) {
      return `${baseClasses} shadow-lg`;
    }
    return baseClasses;
  };

  /**
   * Handles topic selection with analytics tracking
   * @param {ChatTopic} topic - The selected topic
   */
  const handleTopicClick = (topic: ChatTopic): void => {
    // Add analytics tracking here if needed
    console.log(`Topic selected: ${topic.id}`);
    onTopicSelect(topic.id);
  };

  /**
   * Renders individual topic card
   * @param {ChatTopic} topic - The topic to render
   * @param {number} index - Array index for key prop
   * @returns {JSX.Element} Individual topic card
   */
  const renderTopicCard = (topic: ChatTopic, index: number): React.JSX.Element => (
    <div
      key={topic.id}
      onClick={() => handleTopicClick(topic)}
      className={`
        ai-topic-card flex items-center gap-4 cursor-pointer 
        transition-all duration-200 ease-in-out
        hover:shadow-md
        focus-within:shadow-md
        ${getBackgroundClasses(topic)}
        ${getBorderClasses(topic)}
      `}
      role="button"
      tabIndex={0}
      aria-label={`Select ${topic.title} for AI analysis`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTopicClick(topic);
        }
      }}
    >
      {/* Topic Icon */}
      <div className="ai-topic-icon text-[#0d80f2] dark:text-[#0db9f2] bg-[#e7f3ff] dark:bg-[#1a3b5c]">
        {getTopicIcon(topic.icon)}
      </div>

      {/* Topic Content */}
      <div className="flex flex-col flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-[#0f172a] dark:text-[#f8fafc] text-base font-semibold leading-normal truncate">
            {topic.title}
          </h4>
          
          {/* Recommended Badge */}
          {topic.isRecommended && (
            <span className="ai-topic-badge shadow-sm">
              Recommended
            </span>
          )}
        </div>
        
        {/* AI Level Indicator */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-medium">AI Level</span>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < topic.aiLevel ? 'bg-[#0d80f2] dark:bg-[#0db9f2]' : 'bg-[#e2e8f0] dark:bg-[#374151]'
              }`}
            />
          ))}
        </div>
        
        <p className="text-[#64748b] dark:text-[#94a3b8] text-sm font-normal leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* Action Button */}
      <button
        className="btn-responsive btn-primary min-w-[84px] focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#182634] hover:shadow-md"
        aria-label={`Start ${topic.title} analysis`}
        onClick={(e) => {
          e.stopPropagation();
          handleTopicClick(topic);
        }}
      >
        <span className="truncate font-medium">Chat</span>
      </button>
    </div>
  );

  /**
   * Renders loading skeleton for topic cards
   * @returns {JSX.Element} Loading skeleton
   */
  const renderLoadingSkeleton = (): React.JSX.Element => (
    <div className="space-y-6" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-6 bg-white dark:bg-[#182634] rounded-xl border border-[#e2e8f0] dark:border-[#374151] p-6 animate-pulse">
          <div className="bg-[#e2e8f0] dark:bg-[#374151] rounded-lg shrink-0 size-14"></div>
          <div className="flex flex-col flex-1 space-y-3">
            <div className="h-5 bg-[#e2e8f0] dark:bg-[#374151] rounded w-32"></div>
            <div className="h-3 bg-[#e2e8f0] dark:bg-[#374151] rounded w-16"></div>
            <div className="h-4 bg-[#e2e8f0] dark:bg-[#374151] rounded w-48"></div>
          </div>
          <div className="h-10 bg-[#e2e8f0] dark:bg-[#374151] rounded w-20"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      className=""
      style={{ marginBottom: 'var(--section-spacing)' }}
      role="region"
      aria-label="AI topic selection for financial analysis"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
        <h3 className="text-[#0f172a] dark:text-[#f8fafc] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          {title}
        </h3>
        
        {/* Help Icon */}
        <button
          className="p-2 text-[#64748b] dark:text-[#94a3b8] hover:text-[#0d80f2] dark:hover:text-[#0db9f2] transition-colors duration-200 rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#2a3f52] focus:outline-none focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#101e23]"
          aria-label="Get help with AI topic selection"
          title="Choose a topic to start your AI-powered financial analysis"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/>
          </svg>
        </button>
      </div>

      {/* Topic Cards */}
      {isLoading ? renderLoadingSkeleton() : (
        <div className="space-y-6" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
          {displayTopics.map(renderTopicCard)}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && displayTopics.length === 0 && (
        <div className="text-center py-12" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
          <div className="text-[#64748b] dark:text-[#94a3b8] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256" className="mx-auto">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/>
            </svg>
          </div>
          <p className="text-[#64748b] dark:text-[#94a3b8]">
            No AI topics available at the moment
          </p>
        </div>
      )}
    </section>
  );
};

export default AITopicSelectionCards;