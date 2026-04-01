import React from 'react';
import { IonSpinner } from '@ionic/react';
import { useTranslation } from '../../i18n/TranslationContext';

export const LoadingIndicator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="loading-message">
      <IonSpinner name="dots" />
      <span>{t('chat.thinking')}</span>
    </div>
  );
};