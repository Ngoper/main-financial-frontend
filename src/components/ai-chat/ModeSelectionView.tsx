import React from 'react';
import { ModeCard } from './ModeCard';
import { useTranslation } from '../../i18n/TranslationContext';

interface ModeSelectionViewProps {
  onSelectMode: (modeId: string) => void;
}

export const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({ onSelectMode }) => {
  const { t } = useTranslation();
  
  const modes = [
    {
      id: 'rekomendasi',
      title: t('chat.modes.rekomendasi.title'),
      description: t('chat.modes.rekomendasi.description'),
      emoji: '💎',
      gradient: 'rekomendasi'
    },
    {
      id: 'analisis',
      title: t('chat.modes.analisis.title'),
      description: t('chat.modes.analisis.description'),
      emoji: '📈',
      gradient: 'analisis-pasar',
      badge: t('chat.modes.analisis.badge')
    },
    {
      id: 'dokumen',
      title: t('chat.modes.dokumen.title'),
      description: t('chat.modes.dokumen.description'),
      emoji: '📄',
      gradient: 'analisis-dokumen'
    }
  ];

  return (
    <div className="mode-selection-wrapper">
      <div className="welcome-header">
        <h1>{t('chat.modes.welcomeTitle')}</h1>
        <p>{t('chat.modes.welcomeSubtitle')}</p>
      </div>
      <div className="modes-grid">
        {modes.map(mode => (
          <ModeCard
            key={mode.id}
            title={mode.title}
            description={mode.description}
            emoji={mode.emoji}
            gradient={mode.gradient}
            badge={mode.badge}
            onClick={() => onSelectMode(mode.id)}
          />
        ))}
      </div>
    </div>
  );
};
