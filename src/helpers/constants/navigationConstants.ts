/**
 * Navigation Constants
 * 
 * Centralized navigation and routing constants for the StockSavvy application.
 * These constants ensure consistent navigation patterns and route definitions
 * across the entire application.
 * 
 * @fileoverview Navigation routes and constants
 * @version 1.0.0
 * @author StockSavvy Development Team
 * @created 2025-01-24
 */

// ============================================================================
// ROUTE DEFINITIONS
// ============================================================================

/**
 * Application route paths
 */
export const ROUTES = {
  // Root and main pages
  ROOT: '/',
  DASHBOARD: '/dashboard',
  
  // Authentication routes
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  
  // Chat and AI features
  CHAT: {
    BASE: '/chat',
    TOPIC_SELECTION: '/chat/topics',
    STOCK_ANALYSIS: '/chat/stock-analysis',
    UPLOAD_REPORT: '/chat/upload-report',
    RECOMMENDATIONS: '/chat/recommendations'
  },
  
  // Onboarding flows
  ONBOARDING: {
    BASE: '/onboarding',
    CREATE_WITH_AI: '/onboarding/create-with-ai',
    SETUP_PROFILE: '/onboarding/setup-profile',
    COMPLETE: '/onboarding/complete'
  },
  
  // Settings and profile
  SETTINGS: {
    BASE: '/settings',
    PROFILE: '/settings/profile',
    PREFERENCES: '/settings/preferences',
    NOTIFICATIONS: '/settings/notifications',
    SECURITY: '/settings/security'
  },
  
  // Error pages
  ERROR: {
    NOT_FOUND: '/404',
    SERVER_ERROR: '/500',
    UNAUTHORIZED: '/401',
    FORBIDDEN: '/403'
  }
} as const;

/**
 * External links and resources
 */
export const EXTERNAL_LINKS = {
  SUPPORT: 'https://support.stocksavvy.com',
  DOCUMENTATION: 'https://docs.stocksavvy.com',
  PRIVACY_POLICY: 'https://stocksavvy.com/privacy',
  TERMS_OF_SERVICE: 'https://stocksavvy.com/terms',
  CONTACT: 'https://stocksavvy.com/contact'
} as const;

// ============================================================================
// TYPE IMPORTS
// ============================================================================

import type {
  NavigationTransition,
  RouteMetadata
} from '../types/constants';

/**
 * Route metadata definitions
 */
export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  [ROUTES.ROOT]: {
    title: 'Home',
    description: 'StockSavvy Home',
    showInMenu: false,
    category: 'main'
  },
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    description: 'Financial Dashboard',
    requiresAuth: true,
    showInMenu: true,
    icon: 'dashboard',
    category: 'main'
  },
  [ROUTES.AUTH.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your account',
    requiresAuth: false,
    showInMenu: false,
    category: 'auth'
  },
  [ROUTES.AUTH.REGISTER]: {
    title: 'Register',
    description: 'Create a new account',
    requiresAuth: false,
    showInMenu: false,
    category: 'auth'
  },
  [ROUTES.CHAT.TOPIC_SELECTION]: {
    title: 'AI Chat Topics',
    description: 'Select a topic for AI assistance',
    requiresAuth: true,
    showInMenu: true,
    icon: 'chat',
    category: 'chat'
  },
  [ROUTES.SETTINGS.BASE]: {
    title: 'Settings',
    description: 'Application settings and preferences',
    requiresAuth: true,
    showInMenu: true,
    icon: 'settings',
    category: 'settings'
  }
};

// ============================================================================
// NAVIGATION UTILITIES
// ============================================================================

/**
 * Gets route metadata for a given path
 * 
 * @param path - Route path
 * @returns Route metadata or null
 */
export const getRouteMetadata = (path: string): RouteMetadata | null => {
  return ROUTE_METADATA[path] || null;
};

/**
 * Checks if a route requires authentication
 * 
 * @param path - Route path
 * @returns True if authentication is required
 */
export const isProtectedRoute = (path: string): boolean => {
  const metadata = getRouteMetadata(path);
  return metadata?.requiresAuth ?? false;
};

/**
 * Gets all routes that should appear in navigation menu
 * 
 * @returns Array of routes with menu visibility
 */
export const getMenuRoutes = (): Array<{ path: string; metadata: RouteMetadata }> => {
  return Object.entries(ROUTE_METADATA)
    .filter(([_, metadata]) => metadata.showInMenu)
    .map(([path, metadata]) => ({ path, metadata }));
};

/**
 * Builds a route path with parameters
 * 
 * @param route - Base route
 * @param params - Route parameters
 * @returns Parameterized route path
 * 
 * @example
 * ```typescript
 * buildRoutePath('/chat/:topic', { topic: 'stocks' }) // "/chat/stocks"
 * ```
 */
export const buildRoutePath = (route: string, params: Record<string, string> = {}): string => {
  let path = route;
  
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, encodeURIComponent(value));
  });
  
  return path;
};

/**
 * Extracts parameters from a route path
 * 
 * @param template - Route template with parameters
 * @param path - Actual route path
 * @returns Extracted parameters
 */
export const extractRouteParams = (
  template: string,
  path: string
): Record<string, string> => {
  const templateParts = template.split('/');
  const pathParts = path.split('/');
  const params: Record<string, string> = {};
  
  if (templateParts.length !== pathParts.length) {
    return params;
  }
  
  templateParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      params[paramName] = decodeURIComponent(pathParts[index]);
    }
  });
  
  return params;
};

// ============================================================================
// BREADCRUMB UTILITIES
// ============================================================================

/**
 * Generates breadcrumb trail for a route
 * 
 * @param path - Current route path
 * @returns Array of breadcrumb items
 */
export const generateBreadcrumbs = (path: string): Array<{ title: string; path: string }> => {
  const breadcrumbs: Array<{ title: string; path: string }> = [];
  const pathParts = path.split('/').filter(Boolean);
  
  let currentPath = '';
  
  pathParts.forEach(part => {
    currentPath += `/${part}`;
    const metadata = getRouteMetadata(currentPath);
    
    if (metadata) {
      breadcrumbs.push({
        title: metadata.title,
        path: currentPath
      });
    }
  });
  
  return breadcrumbs;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ROUTES,
  EXTERNAL_LINKS,
  ROUTE_METADATA,
  getRouteMetadata,
  isProtectedRoute,
  getMenuRoutes,
  buildRoutePath,
  extractRouteParams,
  generateBreadcrumbs
};