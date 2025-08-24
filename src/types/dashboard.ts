/**
 * Dashboard Types and Interfaces
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the financial dashboard application. It promotes type safety and provides
 * clear contracts for component props and data structures.
 */

// =============================================================================
// MARKET DATA TYPES
// =============================================================================

/**
 * Represents a financial market index or indicator
 */
export interface MarketIndicator {
  /** Unique identifier for the market indicator */
  id?: string;
  /** Display name (e.g., "IHSG", "USD/IDR") */
  name: string;
  /** Trading symbol (e.g., "^JKSE", "USDIDR") */
  symbol?: string;
  /** Current value of the indicator */
  value: number;
  /** Percentage change from previous period */
  change: number;
  /** Absolute change value */
  changeValue?: number;
  /** Currency symbol (e.g., "USD", "IDR", "NONE") */
  currency?: string;
  /** Number of decimal places to display */
  decimals?: number;
  /** Last update timestamp */
  lastUpdate?: Date;
}

/**
 * Market overview data structure
 */
export interface MarketOverview {
  /** Array of market indicators */
  indicators: MarketIndicator[];
  /** Last update timestamp */
  lastUpdate: Date;
  /** Loading state */
  isLoading?: boolean;
}

// =============================================================================
// AI CHAT TYPES
// =============================================================================

/**
 * Available AI chat topics for financial analysis
 */
export type ChatTopicType = 'upload-laporan' | 'analisa-saham' | 'rekomendasi-saham';

/**
 * AI chat topic configuration
 */
export interface ChatTopic {
  /** Unique identifier */
  id: ChatTopicType;
  /** Display title */
  title: string;
  /** Description text */
  description: string;
  /** Icon component or emoji */
  icon: string;
  /** Whether this topic is recommended */
  isRecommended?: boolean;
  /** AI capability level (1-3) */
  aiLevel: 1 | 2 | 3;
  /** Background color for the card */
  bgColor?: string;
  /** Border style for highlighting */
  borderStyle?: 'default' | 'highlighted';
}

// =============================================================================
// ACTIVITY TYPES
// =============================================================================

/**
 * Types of activities that can be tracked
 */
export type ActivityType = 'analysis' | 'upload' | 'chat' | 'watchlist' | 'research' | 'onboarding';

/**
 * User activity entry
 */
export interface Activity {
  /** Unique identifier */
  id: string;
  /** Type of activity */
  type: ActivityType;
  /** Activity title/description */
  title: string;
  /** When the activity occurred */
  timestamp: Date;
  /** Icon for the activity */
  icon: string;
  /** Optional additional details */
  details?: string;
  /** Related entity (e.g., stock symbol) */
  relatedEntity?: string;
}

/**
 * Recent activities data structure
 */
export interface RecentActivities {
  /** Array of recent activities */
  activities: Activity[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string;
}

// =============================================================================
// COMPONENT PROPS TYPES
// =============================================================================

/**
 * Props for the HeroSection component
 */
export interface HeroSectionProps {
  /** User's name for personalized greeting */
  userName?: string;
  /** Current search query */
  searchQuery: string;
  /** Search query change handler */
  onSearchChange: (query: string) => void;
  /** Handler for analyze stock action */
  onAnalyzeStock: () => void;
  /** Handler for upload report action */
  onUploadReport: () => void;
  /** Handler for AI chat action */
  onAIChat: () => void;
  /** Time of day for personalized greeting */
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
}

/**
 * Props for the MarketOverviewWidget component
 */
export interface MarketOverviewWidgetProps {
  /** Array of market indicators to display */
  indicators?: MarketIndicator[];
  /** Loading state flag */
  isLoading?: boolean;
  /** Error message if data fetch fails */
  error?: string;
  /** Optional refresh callback */
  onRefresh?: () => void;
  /** Custom widget title */
  title?: string;
}

/**
 * Props for the AITopicSelectionCards component
 */
export interface AITopicSelectionCardsProps {
  /** Array of available chat topics */
  topics: ChatTopic[];
  /** Handler for when a topic is selected */
  onTopicSelect: (topicId: ChatTopicType) => void;
  /** Optional title override */
  title?: string;
  /** Loading state */
  isLoading?: boolean;
}

/**
 * Props for the RecentActivities component
 */
export interface RecentActivitiesProps {
  /** Recent activities data */
  activities: RecentActivities;
  /** Optional title override */
  title?: string;
  /** Maximum number of activities to display */
  maxItems?: number;
  /** Handler for when an activity is clicked */
  onActivityClick?: (activity: Activity) => void;
}

// =============================================================================
// DASHBOARD STATE TYPES
// =============================================================================

/**
 * User preferences for dashboard customization
 */
export interface UserPreferences {
  /** Preferred theme */
  theme: 'light' | 'dark' | 'system';
  /** Preferred language */
  language: 'en' | 'id';
  /** Whether to show market overview */
  showMarketOverview: boolean;
  /** Number of recent activities to display */
  maxRecentActivities: number;
}

/**
 * User information
 */
export interface User {
  /** User's unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Email address */
  email: string;
  /** Profile picture URL */
  avatar?: string;
  /** User preferences */
  preferences: UserPreferences;
}

/**
 * Complete dashboard state
 */
export interface DashboardState {
  /** Current user information */
  user: User;
  /** Market overview data */
  market: MarketOverview;
  /** Recent activities */
  activities: RecentActivities;
  /** Available chat topics */
  chatTopics: ChatTopic[];
  /** Current search query */
  searchQuery: string;
  /** Loading states */
  loading: {
    market: boolean;
    activities: boolean;
    chatTopics: boolean;
  };
  /** Error states */
  errors: {
    market?: string;
    activities?: string;
    chatTopics?: string;
  };
}

// =============================================================================
// ACTION TYPES
// =============================================================================

/**
 * Dashboard action types for state management
 */
export type DashboardAction =
  | { type: 'SET_USER_DATA'; payload: User }
  | { type: 'UPDATE_MARKET_DATA'; payload: MarketIndicator[] }
  | { type: 'SET_CHAT_TOPICS'; payload: ChatTopic[] }
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_LOADING'; payload: { key: keyof DashboardState['loading']; value: boolean } }
  | { type: 'SET_ERROR'; payload: { key: keyof DashboardState['errors']; value: string | undefined } }
  | { type: 'RESET_DASHBOARD' };

// =============================================================================
// HOOK RETURN TYPES
// =============================================================================

/**
 * Return type for the useDashboard hook
 */
export interface UseDashboardReturn {
  /** Current dashboard state */
  state: DashboardState;
  /** Actions to modify dashboard state */
  actions: {
    setSearchQuery: (query: string) => void;
    refreshMarketData: () => Promise<void>;
    refreshActivities: () => Promise<void>;
    addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
    selectChatTopic: (topicId: ChatTopicType) => void;
  };
}

/**
 * Return type for the useMarketData hook
 */
export interface UseMarketDataReturn {
  /** Market data */
  marketData: MarketOverview;
  /** Refresh function */
  refresh: () => Promise<void>;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
}

/**
 * Return type for the useRecentActivities hook
 */
export interface UseRecentActivitiesReturn {
  /** Activities data */
  activities: RecentActivities;
  /** Add new activity */
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  /** Refresh activities */
  refresh: () => Promise<void>;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Generic API response type
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Success flag */
  success: boolean;
  /** Error message if any */
  message?: string;
  /** Response timestamp */
  timestamp: Date;
}

/**
 * Loading state for async operations
 */
export interface LoadingState {
  /** Whether operation is in progress */
  isLoading: boolean;
  /** Error message if operation failed */
  error?: string;
  /** Success message if operation completed */
  success?: string;
}