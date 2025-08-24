import React from 'react';
import { RecentActivitiesProps, Activity, ActivityType } from '../../../types/dashboard';

/**
 * RecentActivities Component
 * 
 * A comprehensive recent activities component for tracking user actions:
 * - Stock analysis completions
 * - Report uploads and processing
 * - AI chat sessions
 * - Watchlist updates
 * - Research activities
 * 
 * Features:
 * - Real-time activity feed with timestamps
 * - Interactive activity cards with click handlers
 * - Activity type icons and categorization
 * - Loading states and skeleton UI
 * - Accessibility support with proper ARIA labels
 * - Dark/light theme compatibility
 * - Smooth animations and transitions
 * 
 * @component
 * @param {RecentActivitiesProps} props - The component props
 * @param {RecentActivities} props.activities - Activities data with loading/error states
 * @param {string} [props.title] - Optional custom title
 * @param {number} [props.maxItems] - Maximum number of activities to display
 * @param {(activity: Activity) => void} [props.onActivityClick] - Handler for activity clicks
 */
const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities,
  title = "Recent Activities",
  maxItems = 5,
  onActivityClick
}) => {

  /**
   * Default activities for demonstration if none provided
   */
  const defaultActivities: Activity[] = [
    {
      id: '1',
      type: 'analysis',
      title: 'Stock Analysis Completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'user',
      details: 'BBRI analysis with AI insights',
      relatedEntity: 'BBRI'
    },
    {
      id: '2',
      type: 'upload',
      title: 'Report Uploaded Successfully',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'check',
      details: 'Q3 2024 Financial Report processed',
      relatedEntity: 'Financial Report'
    },
    {
      id: '3',
      type: 'chat',
      title: 'AI Chat Session Started',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'chat',
      details: 'Investment strategy discussion',
      relatedEntity: 'AI Assistant'
    }
  ];

  // Use provided activities or fallback to default
  const displayActivities = activities?.activities?.length > 0 ? 
    activities.activities.slice(0, maxItems) : 
    defaultActivities.slice(0, maxItems);

  /**
   * Formats timestamp to human-readable relative time
   * @param {Date} timestamp - The timestamp to format
   * @returns {string} Human-readable time string
   */
  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return diffInDays === 1 ? 'Yesterday' : `${diffInDays} days ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  /**
   * Gets the appropriate icon component for each activity type
   * @param {string} iconType - The icon type identifier
   * @param {ActivityType} activityType - The activity type for fallback
   * @returns {JSX.Element} SVG icon component
   */
  const getActivityIcon = (iconType: string, activityType: ActivityType): React.JSX.Element => {
    switch (iconType) {
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
          </svg>
        );
      case 'check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
          </svg>
        );
      case 'chat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,48H40A16,16,0,0,0,24,64V192a15.85,15.85,0,0,0,9.24,14.5A16.05,16.05,0,0,0,40,208a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,176H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,192V64H216V160H82.5a16,16,0,0,0-10.3,3.75L40,192Z"/>
          </svg>
        );
      case 'upload':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H80a8,8,0,0,1,0,16H32v64H224V136H176a8,8,0,0,1,0-16h48A16,16,0,0,1,240,136ZM85.66,77.66,120,43.31V128a8,8,0,0,0,16,0V43.31l34.34,34.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,77.66Z"/>
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8V112a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,48,171.31V208H224A8,8,0,0,1,232,208Z"/>
          </svg>
        );
      default:
        // Fallback based on activity type
        switch (activityType) {
          case 'analysis':
            return getActivityIcon('chart', activityType);
          case 'upload':
            return getActivityIcon('upload', activityType);
          case 'chat':
            return getActivityIcon('chat', activityType);
          default:
            return getActivityIcon('check', activityType);
        }
    }
  };

  /**
   * Gets background color class based on activity type
   * @param {ActivityType} activityType - The activity type
   * @returns {string} CSS background color class
   */
  const getActivityBackgroundColor = (activityType: ActivityType): string => {
    switch (activityType) {
      case 'analysis':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'upload':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'chat':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'watchlist':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'research':
        return 'bg-indigo-50 dark:bg-indigo-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20';
    }
  };

  /**
   * Handles activity click with optional callback
   * @param {Activity} activity - The clicked activity
   */
  const handleActivityClick = (activity: Activity): void => {
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };

  /**
   * Renders individual activity card
   * @param {Activity} activity - The activity to render
   * @param {number} index - Array index for key prop
   * @returns {JSX.Element} Individual activity card
   */
  const renderActivityCard = (activity: Activity, index: number): React.JSX.Element => (
    <div
      key={activity.id}
      onClick={() => handleActivityClick(activity)}
      className={`
        recent-activity-card flex items-center gap-6
        cursor-pointer transition-all duration-200 ease-in-out
        hover:scale-[1.01] hover:shadow-md hover:border-[#0d80f2] dark:hover:border-[#0db9f2]
        focus-within:scale-[1.01] focus-within:shadow-md focus-within:border-[#0d80f2] dark:focus-within:border-[#0db9f2]
        bg-white dark:bg-[#182634] hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]
        ${onActivityClick ? '' : 'cursor-default'}
      `}
      role={onActivityClick ? "button" : "article"}
      tabIndex={onActivityClick ? 0 : -1}
      aria-label={`Activity: ${activity.title} - ${formatTimestamp(activity.timestamp)}`}
      onKeyDown={onActivityClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivityClick(activity);
        }
      } : undefined}
    >
      {/* Activity Icon */}
      <div className={`
        icon-container icon-lg text-[#0d80f2] dark:text-[#0db9f2] 
        bg-[#e7f3ff] dark:bg-[#1a3b5c]
        ${getActivityBackgroundColor(activity.type)}
      `}>
        {getActivityIcon(activity.icon, activity.type)}
      </div>

      {/* Activity Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-body text-primary font-semibold truncate">
            {activity.title}
          </p>
          
          {/* Related Entity Badge */}
          {activity.relatedEntity && (
            <span className="badge-responsive badge-primary shadow-sm whitespace-nowrap">
              {activity.relatedEntity}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <p className="text-small text-secondary font-medium">
            {formatTimestamp(activity.timestamp)}
          </p>
          
          {/* Activity Details */}
          {activity.details && (
            <>
              <span className="text-small text-secondary">•</span>
              <p className="text-small text-secondary truncate">
                {activity.details}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Action Indicator */}
      {onActivityClick && (
        <div className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#0d80f2] dark:hover:text-[#0db9f2] shrink-0 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
            <path d="m221.66,133.66-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
          </svg>
        </div>
      )}
    </div>
  );

  /**
   * Renders loading skeleton for activities
   * @returns {JSX.Element} Loading skeleton
   */
  const renderLoadingSkeleton = (): React.JSX.Element => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-6 bg-white dark:bg-[#182634] rounded-xl border border-[#cedbe8] dark:border-[#314d68] px-6 py-4 animate-pulse">
          <div className="bg-gray-300 dark:bg-gray-700 rounded-lg shrink-0 size-12"></div>
          <div className="flex flex-col justify-center flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );

  /**
   * Renders error state
   * @returns {JSX.Element} Error message
   */
  const renderError = (): React.JSX.Element => (
    <div className="text-center py-8" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
      <div className="text-red-500 dark:text-red-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256" className="mx-auto">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"/>
        </svg>
      </div>
      <p className="text-body text-muted">
        {activities?.error || 'Failed to load recent activities'}
      </p>
    </div>
  );

  return (
    <section 
      className=""
      style={{ marginBottom: 'var(--section-spacing)' }}
      role="region"
      aria-label="Recent user activities and actions"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
        <h3 className="text-h2 text-primary">
          {title}
        </h3>
        
        {/* View All Button */}
        {displayActivities.length >= maxItems && (
          <button
            className="text-[#0d80f2] dark:text-[#0db9f2] hover:text-[#0c72d9] dark:hover:text-[#0aa8e6] text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0d80f2] focus:ring-offset-2 dark:focus:ring-offset-[#101a23] rounded px-2 py-1"
            aria-label="View all recent activities"
          >
            View All
          </button>
        )}
      </div>

      {/* Activities Content */}
      {activities?.error ? renderError() : 
       activities?.isLoading ? renderLoadingSkeleton() : 
       displayActivities.length > 0 ? (
        <div className="space-y-4" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
          {displayActivities.map(renderActivityCard)}
        </div>
      ) : (
        <div className="text-center py-8" style={{ paddingLeft: 'var(--card-padding-x)', paddingRight: 'var(--card-padding-x)' }}>
          <div className="text-[#6b7280] dark:text-[#9ca3af] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256" className="mx-auto">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108A12,12,0,1,1,92,96,12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.39,28-46.93,28s-36.64-10.21-46.93-28a8,8,0,1,1,13.86-8c7.46,12.91,19.69,20,33.07,20s25.61-7.1,33.07-20a8,8,0,1,1,13.86,8Z"/>
            </svg>
          </div>
          <p className="text-body text-muted">
            No recent activities found
          </p>
          <p className="text-small text-muted mt-2">
            Start analyzing stocks or uploading reports to see your activity history
          </p>
        </div>
      )}
    </section>
  );
};

export default RecentActivities;