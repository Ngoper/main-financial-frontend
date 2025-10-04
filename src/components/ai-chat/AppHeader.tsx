import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import {
  homeOutline,
  personCircleOutline,
  arrowBack
} from 'ionicons/icons';

interface AppHeaderProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onBack, showBackButton = false }) => {
  return (
    <IonHeader>
      <IonToolbar color="dark">
        <IonButtons slot="start">
          {showBackButton ? (
            <IonButton onClick={onBack}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          ) : (
            <IonButton>
              <IonIcon icon={homeOutline} />
              Home
            </IonButton>
          )}
        </IonButtons>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Sign In</IonLabel>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};