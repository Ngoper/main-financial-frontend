import React, { useState } from 'react';

interface HeroSectionProps {
  onEmailSubmit: (email: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit(email);
    setEmail('');
  };

  return (
    <section className="hero-bg py-24 lg:py-40">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
          Analisis Saham Fundamental Generasi Berikutnya
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Modcus menggunakan AI untuk menyaring data finansial yang kompleks menjadi insight yang mudah Anda pahami. Buat keputusan investasi dengan lebih percaya diri.
        </p>
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg whitespace-nowrap"
            >
              Mulai Gratis
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
