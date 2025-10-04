import React, { useState } from 'react';
import { IonApp, IonContent, setupIonicReact } from '@ionic/react';
import { AppHeader } from '../../components/ai-chat/AppHeader';
import { ModeSelectionView } from '../../components/ai-chat/ModeSelectionView';
import { ChatView } from '../../components/ai-chat/ChatView';

setupIonicReact();

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
    <IonApp>
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
          <ChatView mode={selectedMode || ''} onBack={handleBack} />
        </>
      )}
    </IonApp>
  );
};
