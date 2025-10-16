import React from 'react';
import { IonIcon } from '@ionic/react';
import { bulb, flash, people } from 'ionicons/icons';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: 'indigo' | 'purple' | 'pink';
}

const iconMap: Record<string, string> = {
  lightbulb: bulb,
  flash: flash,
  people: people
};

const colorClasses = {
  indigo: 'bg-indigo-600/20 text-indigo-400',
  purple: 'bg-purple-600/20 text-purple-400',
  pink: 'bg-pink-600/20 text-pink-400'
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, color }) => {
  return (
    <div className="feature-card p-8 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-lg">
      <div className={`${colorClasses[color]} rounded-lg h-12 w-12 flex items-center justify-center mb-5`}>
        <IonIcon icon={iconMap[icon]} className="text-2xl" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};
