import React, { useEffect, useMemo, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { AppHeader } from '../../components/ai-chat/AppHeader';
import { ModeSelectionView } from '../../components/ai-chat/ModeSelectionView';
import { ChatView } from '../../components/ai-chat/ChatView';
import { ChatSessionSidebar } from '../../components/ai-chat/ChatSessionSidebar';
import { useChatSession } from '../../hooks/useChatSession';
import { apiService, ChatSession } from '../../services/api';

export const AIChat: React.FC = () => {
  const [currentView, setCurrentView] = useState<'selection' | 'chat'>('selection');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    sessions,
    messages,
    loadingSessions,
    loadingMessages,
    hasMoreMessages,
    currentSessionId,
    currentConversationId,
    loadSessions,
    createSession,
    selectSession,
    loadMoreMessages,
    clearSelection,
    patchCurrentSessionLink,
    setMessages,
  } = useChatSession();

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const buildApiMode = (mode: string): string => {
    if (mode === 'rekomendasi') return 'stock-recommendations';
    if (mode === 'dokumen') return 'document-analysis';
    return 'company-analysis';
  };

  const handleSelectMode = async (mode: string) => {
    setSelectedMode(mode);
    setCurrentView('chat');
    clearSelection();
    if (window.innerWidth <= 900) {
      setIsSidebarOpen(false);
    }
  };

  const handleBack = () => {
    setCurrentView('selection');
    setSelectedMode(null);
    clearSelection();
  };

  const handleNewSession = async () => {
    if (!selectedMode) {
      setCurrentView('selection');
      return;
    }
    clearSelection();
    setMessages([]);
    setCurrentView('chat');
    if (window.innerWidth <= 900) {
      setIsSidebarOpen(false);
    }
  };

  const handleSelectSession = async (session: ChatSession) => {
    await selectSession(session);
    if (session.mode === 'stock-recommendations') {
      setSelectedMode('rekomendasi');
    } else if (session.mode === 'document-analysis') {
      setSelectedMode('dokumen');
    } else {
      setSelectedMode('analisis');
    }
    setCurrentView('chat');
    if (window.innerWidth <= 900) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteSession = async (session: ChatSession) => {
    await apiService.deleteChatSession(session.ID);
    await loadSessions();
    if (currentSessionId === session.ID) {
      setMessages([]);
      clearSelection();
      setCurrentView('selection');
    }
  };

  const chatMode = useMemo(() => selectedMode || 'analisis', [selectedMode]);

  return (
    <IonPage>
      {currentView === 'selection' ? (
        <>
          <AppHeader showBackButton={false} />
          <IonContent>
            <div className="chat-layout">
              <ChatSessionSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                loading={loadingSessions}
                isOpen={isSidebarOpen}
                onNewSession={handleNewSession}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
              />
              <div
                className={`sidebar-overlay ${isSidebarOpen && window.innerWidth <= 900 ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                role="button"
                tabIndex={0}
                aria-label="Close sidebar"
              />
              <div className="chat-main-panel">
                <ModeSelectionView onSelectMode={handleSelectMode} />
              </div>
            </div>
          </IonContent>
        </>
      ) : (
        <>
          <AppHeader 
            onBack={handleBack} 
            showBackButton={true} 
            showSidebarToggle={true}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onNewChat={handleNewSession}
          />
          <IonContent className="chat-page-content">
            <div className="chat-layout">
              <ChatSessionSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                loading={loadingSessions}
                isOpen={isSidebarOpen}
                onNewSession={handleNewSession}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
              />
              <div
                className={`sidebar-overlay ${isSidebarOpen && window.innerWidth <= 900 ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                role="button"
                tabIndex={0}
                aria-label="Close sidebar"
              />
              <div className="chat-main-panel">
                <ChatView
                  mode={chatMode}
                  messages={messages}
                  onMessagesChange={setMessages}
                  sessionId={currentSessionId}
                  conversationId={currentConversationId}
                  onSessionLinked={patchCurrentSessionLink}
                  onLoadMoreMessages={loadMoreMessages}
                  hasMoreMessages={hasMoreMessages}
                  loadingMessages={loadingMessages}
                  createSession={createSession}
                />
              </div>
            </div>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};
