import { useState, useEffect, useCallback, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DashboardState,
  DashboardAction,
  UseDashboardReturn,
  UseMarketDataReturn,
  UseRecentActivitiesReturn,
  MarketIndicator,
  Activity,
  ChatTopicType,
  ChatTopic,
  MarketOverview,
  RecentActivities
} from '../types/dashboard';

/**
 * Custom hooks for dashboard functionality
 * 
 * This file contains reusable hooks for managing dashboard state,
 * market data, activities, and user interactions. Following React best
 * practices for state management and side effects.
 */

// =============================================================================
// DASHBOARD STATE REDUCER
// =============================================================================

/**
 * Initial dashboard state
 */
const initialDashboardState: DashboardState = {
  user: {
    id: 'user_1',
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      theme: 'system',
      language: 'en',
      showMarketOverview: true,
      maxRecentActivities: 5
    }
  },
  market: {
    indicators: [],
    lastUpdate: new Date(),
    isLoading: false
  },
  activities: {
    activities: [],
    isLoading: false
  },
  chatTopics: [],
  searchQuery: '',
  loading: {
    market: false,
    activities: false,
    chatTopics: false
  },
  errors: {}
};

/**
 * Dashboard state reducer
 * @param {DashboardState} state - Current state
 * @param {DashboardAction} action - Action to apply
 * @returns {DashboardState} New state
 */
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        user: action.payload
      };

    case 'UPDATE_MARKET_DATA':
      return {
        ...state,
        market: {
          ...state.market,
          indicators: action.payload,
          lastUpdate: new Date(),
          isLoading: false
        },
        loading: {
          ...state.loading,
          market: false
        },
        errors: {
          ...state.errors,
          market: undefined
        }
      };

    case 'SET_CHAT_TOPICS':
      return {
        ...state,
        chatTopics: action.payload
      };

    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: {
          ...state.activities,
          activities: [action.payload, ...state.activities.activities]
        }
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value
        }
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.value
        }
      };

    case 'RESET_DASHBOARD':
      return initialDashboardState;

    default:
      return state;
  }
};

// =============================================================================
// MAIN DASHBOARD HOOK
// =============================================================================

/**
 * Main dashboard hook that manages all dashboard state and actions
 * @returns {UseDashboardReturn} Dashboard state and actions
 */
export const useDashboard = (): UseDashboardReturn => {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);
  const history = useHistory();

  /**
   * Initialize dashboard data on mount
   */
  useEffect(() => {
    initializeDashboard();
  }, []);

  /**
   * Initialize dashboard with default data
   */
  const initializeDashboard = useCallback(async () => {
    // Initialize chat topics
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

    // Set chat topics in state
    dispatch({ type: 'SET_CHAT_TOPICS', payload: defaultTopics });

    // Initialize market data and activities
    await refreshMarketData();
    await refreshActivities();
  }, []);

  /**
   * Refresh market data from API
   */
  const refreshMarketData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'market', value: true } });
    
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMarketData: MarketIndicator[] = [
        {
          id: 'ihsg',
          name: 'IHSG',
          symbol: '^JKSE',
          value: 7234.56,
          change: 1.2,
          currency: 'IDR',
          decimals: 2
        },
        {
          id: 'usdidr',
          name: 'USD/IDR',
          symbol: 'USDIDR',
          value: 15234,
          change: -0.3,
          currency: 'IDR',
          decimals: 0
        },
        {
          id: 'gold',
          name: 'Gold',
          symbol: 'XAUUSD',
          value: 2045.67,
          change: 0.8,
          currency: 'USD',
          decimals: 2
        }
      ];

      dispatch({ type: 'UPDATE_MARKET_DATA', payload: mockMarketData });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: { key: 'market', value: 'Failed to load market data' }
      });
      dispatch({ type: 'SET_LOADING', payload: { key: 'market', value: false } });
    }
  }, []);

  /**
   * Refresh activities from API
   */
  const refreshActivities = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'activities', value: true } });
    
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'analysis',
          title: 'Stock Analysis Completed',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          icon: 'user',
          details: 'BBRI analysis with AI insights',
          relatedEntity: 'BBRI'
        },
        {
          id: '2',
          type: 'upload',
          title: 'Report Uploaded Successfully',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: 'check',
          details: 'Q3 2024 Financial Report processed',
          relatedEntity: 'Financial Report'
        }
      ];

      // Update activities in state
      const updatedState = {
        ...state,
        activities: {
          activities: mockActivities,
          isLoading: false
        }
      };

      dispatch({ type: 'SET_LOADING', payload: { key: 'activities', value: false } });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: { key: 'activities', value: 'Failed to load activities' }
      });
      dispatch({ type: 'SET_LOADING', payload: { key: 'activities', value: false } });
    }
  }, []);

  /**
   * Add new activity
   */
  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    dispatch({ type: 'ADD_ACTIVITY', payload: newActivity });
  }, []);

  /**
   * Set search query
   */
  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  /**
   * Select chat topic and navigate
   */
  const selectChatTopic = useCallback((topicId: ChatTopicType) => {
    // Add activity for chat topic selection
    addActivity({
      type: 'chat',
      title: 'AI Chat Session Started',
      icon: 'chat',
      details: `Started ${topicId} analysis`,
      relatedEntity: 'AI Assistant'
    });

    // Navigate directly to unified chat interface with topic mode
    const topicModeMap: Record<ChatTopicType, string> = {
      'upload-laporan': 'report-upload',
      'analisa-saham': 'stock-analysis',
      'rekomendasi-saham': 'stock-recommendations'
    };
    
    const mode = topicModeMap[topicId] || 'general-chat';
    history.push(`/chat?mode=${mode}&topic=${topicId}`);
  }, [history, addActivity]);

  return {
    state,
    actions: {
      setSearchQuery,
      refreshMarketData,
      refreshActivities,
      addActivity,
      selectChatTopic
    }
  };
};

// =============================================================================
// MARKET DATA HOOK
// =============================================================================

/**
 * Hook for managing market data independently
 * @returns {UseMarketDataReturn} Market data state and actions
 */
export const useMarketData = (): UseMarketDataReturn => {
  const [marketData, setMarketData] = useState<MarketOverview>({
    indicators: [],
    lastUpdate: new Date(),
    isLoading: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch market data from API
   */
  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: MarketIndicator[] = [
        {
          name: 'IHSG',
          value: 7234.56,
          change: 1.2,
          currency: 'IDR'
        },
        {
          name: 'USD/IDR',
          value: 15234,
          change: -0.3,
          currency: 'IDR'
        },
        {
          name: 'Gold',
          value: 2045.67,
          change: 0.8,
          currency: 'USD'
        }
      ];

      setMarketData({
        indicators: mockData,
        lastUpdate: new Date(),
        isLoading: false
      });
    } catch (err) {
      setError('Failed to fetch market data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh market data
  useEffect(() => {
    refresh();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(refresh, 30000);
    
    return () => clearInterval(interval);
  }, [refresh]);

  return {
    marketData,
    refresh,
    isLoading,
    error
  };
};

// =============================================================================
// RECENT ACTIVITIES HOOK
// =============================================================================

/**
 * Hook for managing recent activities independently
 * @returns {UseRecentActivitiesReturn} Activities state and actions
 */
export const useRecentActivities = (): UseRecentActivitiesReturn => {
  const [activities, setActivities] = useState<RecentActivities>({
    activities: [],
    isLoading: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Add new activity
   */
  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setActivities(prev => ({
      ...prev,
      activities: [newActivity, ...prev.activities].slice(0, 10) // Keep only last 10
    }));
  }, []);

  /**
   * Refresh activities from API
   */
  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'analysis',
          title: 'Stock Analysis Completed',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          icon: 'user',
          details: 'BBRI analysis with AI insights'
        },
        {
          id: '2',
          type: 'upload',
          title: 'Report Uploaded Successfully',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: 'check',
          details: 'Q3 2024 Financial Report processed'
        }
      ];

      setActivities({
        activities: mockActivities,
        isLoading: false
      });
    } catch (err) {
      setError('Failed to fetch activities');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load activities on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    activities,
    addActivity,
    refresh,
    isLoading,
    error
  };
};

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Hook for managing search functionality
 * @param {(query: string) => void} onSearch - Search callback
 * @returns {Object} Search state and handlers
 */
export const useSearch = (onSearch: (query: string) => void) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle search input change
   */
  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    
    // Simulate search suggestions
    if (value.length > 2) {
      setIsLoading(true);
      setTimeout(() => {
        const mockSuggestions = [
          `${value} stock analysis`,
          `${value} financial report`,
          `${value} market trends`
        ];
        setSuggestions(mockSuggestions);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
    }
  }, []);

  /**
   * Handle search submission
   */
  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  return {
    query,
    suggestions,
    isLoading,
    setQuery,
    handleInputChange,
    handleSearch
  };
};

/**
 * Hook for managing dashboard navigation
 * @returns {Object} Navigation handlers
 */
export const useDashboardNavigation = () => {
  const history = useHistory();

  const navigateToAnalysis = useCallback(() => {
    history.push('/chat?mode=stock-analysis&topic=analisa-saham');
  }, [history]);

  const navigateToUpload = useCallback(() => {
    history.push('/chat?mode=report-upload&topic=upload-laporan');
  }, [history]);

  const navigateToChat = useCallback(() => {
    history.push('/chat?mode=general-chat');
  }, [history]);

  const navigateToProfile = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const navigateToSettings = useCallback(() => {
    history.push('/settings');
  }, [history]);

  return {
    navigateToAnalysis,
    navigateToUpload,
    navigateToChat,
    navigateToProfile,
    navigateToSettings
  };
};