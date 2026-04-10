import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { AppHeader } from '../../components/ai-chat/AppHeader';
import { ModeSelectionView } from '../../components/ai-chat/ModeSelectionView';
import { ChatView } from '../../components/ai-chat/ChatView';

export const AIChat: React.FC = () => {
  const [currentView, setCurrentView] = useState<'selection' | 'chat'>('selection');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    setCurrentView('chat');
  };

  const handleBack = () => {
    setCurrentView('selection');
    setSelectedMode(null);
  };

  return (
    <IonPage>
      {currentView === 'selection' ? (
        <>
          <AppHeader showBackButton={false} />
          <IonContent>
            <ModeSelectionView onSelectMode={handleSelectMode} />
          </IonContent>
        </>
      ) : (
        <>
          <AppHeader onBack={handleBack} showBackButton={true} />
          <IonContent className="chat-page-content">
            <ChatView mode={selectedMode || ''} onBack={handleBack} />
          </IonContent>
        </>
      )}
    </IonPage>
  );
};
