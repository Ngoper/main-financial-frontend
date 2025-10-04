import React from 'react';
import { IonChip, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { shuffleOutline } from 'ionicons/icons';

interface ExamplePromptsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
  onShuffle: () => void;
}

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({
  prompts,
  onSelectPrompt,
  onShuffle
}) => {
  return (
    <div className="example-prompts-section">
      <div className="prompt-header">
        <span className="line"></span>
        <span className="text">Contoh Prompt</span>
        <span className="line"></span>
      </div>
      <div className="example-prompts">
        {prompts.map((prompt, idx) => (
          <IonChip key={idx} onClick={() => onSelectPrompt(prompt)} className="prompt-chip">
            <IonLabel>{prompt}</IonLabel>
          </IonChip>
        ))}
      </div>
      <div className="shuffle-container">
        <IonButton fill="outline" onClick={onShuffle}>
          <IonIcon icon={shuffleOutline} slot="start" />
          Coba Prompt Lain
        </IonButton>
      </div>
    </div>
  );
};