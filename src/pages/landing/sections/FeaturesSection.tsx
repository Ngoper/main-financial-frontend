import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { FEATURES } from '../data/constants';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="fitur" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Unlock the Power of AI</h2>
          <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">
            Platform kami dirancang untuk memberikan keunggulan kompetitif di pasar saham.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color as 'indigo' | 'purple' | 'pink'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
