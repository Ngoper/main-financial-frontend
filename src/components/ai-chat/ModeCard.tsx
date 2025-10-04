import React from 'react';
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';

interface ModeCardProps {
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  badge?: string;
  onClick: () => void;
}

export const ModeCard: React.FC<ModeCardProps> = ({
  title,
  description,
  emoji,
  gradient,
  badge,
  onClick
}) => {
  return (
    <IonCard onClick={onClick} className="mode-card" button>
      <div className={`card-illustration ${gradient}`}>
        <span className="emoji">{emoji}</span>
        {badge && (
          <div className="badge">
            <IonIcon icon={star} />
            {badge}
          </div>
        )}
      </div>
      <IonCardContent>
        <h3>{title}</h3>
        <p>{description}</p>
      </IonCardContent>
    </IonCard>
  );
};