import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/dashboard/sections/HeroSection';
import MarketOverviewWidget from '../components/dashboard/widgets/MarketOverviewWidget';
import AITopicSelectionCards from '../components/dashboard/cards/AITopicSelectionCards';
import RecentActivities from '../components/dashboard/cards/RecentActivities';
import { useDashboard, useDashboardNavigation, useSearch } from '../hooks/useDashboard';
import { ChatTopicType } from '../types/dashboard';
import { useTranslation } from '../components/localization/LanguageProvider';

/**
 * Dashboard Component
 * 
 * Main dashboard page for the StockSavvy financial application.
 * Provides users with:
 * - Personalized hero section with search and quick actions
 * - Real-time market overview with key financial indicators
 * - AI-powered topic selection for financial analysis
 * - Recent activities and user engagement tracking
 * 
 * Features:
 * - Responsive design optimized for mobile and desktop
 * - Dark/light theme support with proper contrast
 * - Accessibility compliance with ARIA labels
 * - Modern financial app UI/UX patterns
 * - Modular component architecture for maintainability
 */

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { state, actions } = useDashboard();
  const navigation = useDashboardNavigation();
  
  // Search functionality with suggestions
  const { query, handleInputChange, handleSearch } = useSearch((searchQuery) => {
    // Navigate to search results page
    history.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  });

  /**
   * Handle search input changes
   */
  const handleSearchChange = (value: string) => {
    actions.setSearchQuery(value);
    handleInputChange(value);
  };

  /**
   * Handle Create with AI onboarding - Direct to chat instead of separate page
   */
  const handleCreateWithAI = () => {
    actions.addActivity({
      type: 'onboarding',
      title: 'Create with AI Started',
      icon: 'sparkles',
      details: 'Accessed Create with AI onboarding'
    });
    // Direct navigation to chat with onboarding context
    history.push('/chat?mode=onboarding&topic=create-with-ai');
  };

  /**
   * Handle direct navigation to Indonesian stock analysis
   */
  const handleAnalysisNavigation = () => {
    actions.addActivity({
      type: 'analysis',
      title: 'Stock Analysis Started',
      icon: 'chart',
      details: 'Started Indonesian stock analysis'
    });
    // Direct navigation to unified chat with stock analysis context
    history.push('/chat?mode=stock-analysis&topic=analisa-saham');
  };

  /**
   * Handle report upload action
   */
  const handleUploadReport = () => {
    actions.addActivity({
      type: 'upload',
      title: 'Report Upload Started',
      icon: 'upload',
      details: 'Initiated report upload process'
    });
    // Direct navigation to unified chat with upload context
    history.push('/chat?mode=report-upload&topic=upload-laporan');
  };

  /**
   * Handle AI chat action
   */
  const handleAIChat = () => {
    actions.addActivity({
      type: 'chat',
      title: 'AI Chat Started',
      icon: 'chat',
      details: 'Started conversation with AI assistant'
    });
    // Direct navigation to unified chat interface
    history.push('/chat?mode=general-chat');
  };

  /**
   * Handle topic selection from AI cards - Navigate directly to chat
   */
  const handleTopicSelect = (topicId: ChatTopicType) => {
    actions.selectChatTopic(topicId);
    // Navigate directly to the enhanced chat interface with topic context
    actions.addActivity({
      type: 'chat',
      title: `AI Chat: ${topicId.replace('-', ' ')}`,
      icon: 'chat',
      details: `Started ${topicId} analysis conversation`
    });
    
    // Map topic IDs to appropriate chat modes
    const topicModeMap: Record<ChatTopicType, string> = {
      'upload-laporan': 'report-upload',
      'analisa-saham': 'stock-analysis',
      'rekomendasi-saham': 'stock-recommendations'
    };
    
    const mode = topicModeMap[topicId] || 'general-chat';
    history.push(`/chat?mode=${mode}&topic=${topicId}`);
  };

  /**
   * Handle activity click for navigation
   */
  const handleActivityClick = (activity: any) => {
    // Navigate based on activity type - all go to unified chat with context
    switch (activity.type) {
      case 'analysis':
        history.push('/chat?mode=stock-analysis&from=activity');
        break;
      case 'upload':
        history.push('/chat?mode=report-upload&from=activity');
        break;
      case 'chat':
        history.push('/chat?mode=general-chat&from=activity');
        break;
      default:
        history.push('/chat?mode=general-chat');
    }
  };

  /**
   * Get current time of day for personalized greeting
   */
  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };
  return (
    <IonPage>
      <Header title="StockSavvy" />
      <IonContent fullscreen className="bg-slate-50 dark:bg-[#101a23]">
        <div className="flex flex-1 justify-center container-responsive p-responsive-xl">
          <div className="w-full max-w-[1200px]">
            <div className="layout-content-container flex flex-col flex-1">
            
            {/* Enhanced Hero Section with Create with AI */}
            <HeroSection
              userName={state.user.name}
              searchQuery={query}
              onSearchChange={handleSearchChange}
              onAnalyzeStock={handleAnalysisNavigation}
              onUploadReport={handleUploadReport}
              onAIChat={handleAIChat}
              timeOfDay={getTimeOfDay()}
            />
            
            {/* Create with AI Quick Access Card */}
            <div className="section-responsive">
              <div 
                className="card-responsive bg-gradient-to-r from-[#0d80f2] to-[#0db9f2] cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 stocksavvy-fade-in"
                onClick={handleCreateWithAI}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="icon-container icon-xl bg-white bg-opacity-20 m-responsive-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="white" viewBox="0 0 256 256">
                        <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132Zm-88,0a12,12,0,1,1-12-12A12,12,0,0,1,96,132Zm44,40a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Zm-88,0a12,12,0,1,1-12-12A12,12,0,0,1,96,172Z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-h3 text-white mb-1">
                        {t.onboarding.createWithAI.title}
                      </h3>
                      <p className="text-small text-white text-opacity-80">
                        Mulai analisis dengan AI - Pilih cara yang sesuai untuk Anda
                      </p>
                    </div>
                  </div>
                  <div className="text-white text-opacity-80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="m221.66,133.66-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Market Overview Widget */}
            <MarketOverviewWidget
              indicators={state.market.indicators}
              isLoading={state.loading.market}
              error={state.errors.market}
              onRefresh={actions.refreshMarketData}
              title="Market Overview"
            />

            {/* AI Topic Selection Cards */}
            <AITopicSelectionCards
              topics={state.chatTopics}
              onTopicSelect={handleTopicSelect}
              isLoading={state.loading.chatTopics}
              title="AI Assistant - Choose Your Analysis"
            />

            {/* Recent Activities */}
            <RecentActivities
              activities={state.activities}
              onActivityClick={handleActivityClick}
              maxItems={state.user.preferences.maxRecentActivities}
              title="Recent Activities"
            />
            </div>
          </div>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Dashboard;