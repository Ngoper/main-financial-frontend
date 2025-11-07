import React from 'react';
import { IonSpinner } from '@ionic/react';

export const LoadingIndicator: React.FC = () => (
  <div className="loading-message">
    <IonSpinner name="dots" />
    <span>AI sedang memproses...</span>
  </div>
);