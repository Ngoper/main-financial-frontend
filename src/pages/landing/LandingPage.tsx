import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import './landing.css';

export const LandingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'feedback'>('home');
  const [email, setEmail] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({ nama: '', email: '', pesan: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useIonRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  router.push('/chat');
    setEmail('');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
    setShowSuccess(true);
  };

  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-3xl font-bold gradient-text" onClick={() => setCurrentPage('home')}>Modcus</a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#fitur" className="text-gray-400 hover:text-white transition">Fitur</a>
            <a href="#" className="text-gray-400 hover:text-white transition" onClick={() => setCurrentPage('about')}>Tentang Kami</a>
            <a href="#" className="text-gray-400 hover:text-white transition" onClick={() => setCurrentPage('feedback')}>Saran</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="#" className="hidden md:block text-gray-400 hover:text-white font-medium transition">Login</a>
            <a href="#" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg">Sign Up for Free</a>
          </div>
        </div>
      </header>

      <IonContent className="landing-content">
        {currentPage === 'home' && (
          <main>
            <section className="hero-bg py-24 lg:py-40 fade-in-up">
              <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                  Analisis Saham Fundamental Generasi Berikutnya
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                  Modcus menggunakan AI untuk menyaring data finansial yang kompleks menjadi insight yang mudah Anda pahami. Buat keputusan investasi dengan lebih percaya diri.
                </p>
                <div className="max-w-xl mx-auto">
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Masukkan email Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                      required
                    />
                    <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg whitespace-nowrap">
                      Mulai Gratis
                    </button>
                  </form>
                </div>
              </div>
            </section>

            <div className="py-16 bg-black">
              <div className="container mx-auto px-6">
                <p className="text-center text-gray-500 font-medium uppercase tracking-widest">Digunakan oleh Investor dan Trader Profesional</p>
                <div className="flex flex-wrap justify-center items-center mt-8 gap-8 md:gap-12">
                  <img src="https://placehold.co/120x40/1f2937/4b5563?text=Partner+1" alt="Logo Partner 1" className="h-8 opacity-50 hover:opacity-100 transition" />
                  <img src="https://placehold.co/120x40/1f2937/4b5563?text=Partner+2" alt="Logo Partner 2" className="h-8 opacity-50 hover:opacity-100 transition" />
                  <img src="https://placehold.co/120x40/1f2937/4b5563?text=Partner+3" alt="Logo Partner 3" className="h-8 opacity-50 hover:opacity-100 transition" />
                  <img src="https://placehold.co/120x40/1f2937/4b5563?text=Partner+4" alt="Logo Partner 4" className="h-8 opacity-50 hover:opacity-100 transition" />
                </div>
              </div>
            </div>

            <section id="fitur" className="py-24">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Unlock the Power of AI</h2>
                  <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">Platform kami dirancang untuk memberikan keunggulan kompetitif di pasar saham.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="feature-card p-8 rounded-2xl">
                    <div className="bg-indigo-600/20 text-indigo-400 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">AI Scoring</h3>
                    <p className="text-gray-400">Skor fundamental dari 0-100 yang mengevaluasi kesehatan finansial, valuasi, dan efisiensi perusahaan secara objektif.</p>
                  </div>
                  <div className="feature-card p-8 rounded-2xl">
                    <div className="bg-purple-600/20 text-purple-400 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Real-time Data Processing</h3>
                    <p className="text-gray-400">Analisis berdasarkan laporan keuangan terkini, berita pasar, dan data makroekonomi secara real-time.</p>
                  </div>
                  <div className="feature-card p-8 rounded-2xl">
                    <div className="bg-pink-600/20 text-pink-400 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Chatbot Analis Saham</h3>
                    <p className="text-gray-400">Tanyakan apapun tentang saham pilihan Anda dan dapatkan jawaban instan dari analis AI personal Anda.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24">
              <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                  <img src="https://i.pravatar.cc/80?u=susan" alt="Foto Susan" className="h-20 w-20 rounded-full mx-auto mb-4" />
                  <p className="text-2xl font-medium text-white">"Modcus adalah game-changer. Saya bisa menganalisis fundamental saham dalam hitungan menit, bukan jam. Fitur AI Scoring-nya luar biasa akurat."</p>
                  <div className="mt-6">
                    <p className="font-bold text-lg text-gray-300">Susan Wijaya</p>
                    <p className="text-gray-500">Full-time Trader</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="hero-bg">
              <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Mulai Investasi Lebih Cerdas Hari Ini</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">Dapatkan akses gratis ke platform analisis saham fundamental paling canggih.</p>
                <a href="#" className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 font-bold text-lg shadow-2xl inline-block">Klaim Akses Gratis Anda</a>
              </div>
            </section>
          </main>
        )}

        {currentPage === 'feedback' && (
          <section className="py-24 lg:py-32">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Beri Kami Saran</h1>
                <p className="text-lg md:text-xl text-gray-400 mb-12">Feedback Anda sangat berharga untuk membantu kami meningkatkan Modcus. Silakan bagikan kritik, saran, atau ide Anda.</p>
                {!showSuccess ? (
                  <form onSubmit={handleFeedbackSubmit} className="text-left space-y-6">
                    <div>
                      <label htmlFor="nama" className="block text-sm font-medium text-gray-300 mb-2">Nama Anda</label>
                      <input
                        type="text"
                        id="nama"
                        value={feedbackForm.nama}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, nama: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email_saran" className="block text-sm font-medium text-gray-300 mb-2">Alamat Email</label>
                      <input
                        type="email"
                        id="email_saran"
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="pesan" className="block text-sm font-medium text-gray-300 mb-2">Pesan Anda</label>
                      <textarea
                        id="pesan"
                        rows={6}
                        value={feedbackForm.pesan}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, pesan: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg">Kirim Saran</button>
                    </div>
                  </form>
                ) : (
                  <p className="mt-8 text-green-400">Terima kasih! Saran Anda telah kami terima.</p>
                )}
              </div>
            </div>
          </section>
        )}

        <footer className="bg-black border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <a href="#" className="text-2xl font-bold gradient-text" onClick={() => setCurrentPage('home')}>Modcus</a>
              <p className="text-sm text-gray-500 mt-2">AI-Powered Stock Analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produk</h4>
              <a href="#fitur" className="block mt-2 text-sm text-gray-400 hover:text-white">Fitur</a>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white" onClick={() => setCurrentPage('feedback')}>Feedback User</a>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white" onClick={() => setCurrentPage('about')}>Tentang Kami</a>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Syarat & Ketentuan</a>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Kebijakan Privasi</a>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Kontak</h4>
              <a href="mailto:support@stockbot.id" className="block mt-2 text-sm text-gray-400 hover:text-white">support@stockbot.id</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 Modcus. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      </IonContent>
    </IonPage>
  );
};
