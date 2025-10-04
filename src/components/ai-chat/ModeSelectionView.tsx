import React from 'react';
import { ModeCard } from './ModeCard';

interface ModeSelectionViewProps {
  onSelectMode: (modeId: string) => void;
}

export const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({ onSelectMode }) => {
  const modes = [
    {
      id: 'rekomendasi',
      title: 'Rekomendasi Saham',
      description: 'Temukan saham undervalued berdasarkan prinsip value investing.',
      emoji: '💎',
      gradient: 'rekomendasi'
    },
    {
      id: 'analisis',
      title: 'Analisis Saham & Pasar',
      description: 'Analisis perusahaan, IHSG, atau berita makroekonomi secara mendalam.',
      emoji: '📈',
      gradient: 'analisis-pasar',
      badge: 'POPULER'
    },
    {
      id: 'dokumen',
      title: 'Analisis Dokumen',
      description: 'Unggah laporan keuangan atau public expose untuk dianalisis AI.',
      emoji: '📄',
      gradient: 'analisis-dokumen'
    }
  ];

  return (
    <div className="mode-selection-wrapper">
      <div className="welcome-header">
        <h1>Create with Modcus AI</h1>
        <p>Bagaimana Anda ingin memulai analisis hari ini?</p>
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
