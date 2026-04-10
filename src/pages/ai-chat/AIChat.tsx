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
    await createSession(buildApiMode(mode), 'newbie', `New ${mode} chat`);
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
    await createSession(buildApiMode(selectedMode), 'newbie', `New ${selectedMode} chat`);
    setMessages([]);
    setCurrentView('chat');
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
                onNewSession={handleNewSession}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
              />
              <div className="chat-main-panel">
                <ModeSelectionView onSelectMode={handleSelectMode} />
              </div>
            </div>
          </IonContent>
        </>
      ) : (
        <>
          <AppHeader onBack={handleBack} showBackButton={true} />
          <IonContent className="chat-page-content">
            <div className="chat-layout">
              <ChatSessionSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                loading={loadingSessions}
                onNewSession={handleNewSession}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
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
                />
              </div>
            </div>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};
