import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { getCurrentUser, logout, User } from '../../services/api';
import './landing.css';

export const LandingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'feedback'>('home');
  const [email, setEmail] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({ nama: '', email: '', pesan: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useIonRouter();

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => prev === 2 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      router.push('/chat');
    } else {
      router.push(`/register?email=${encodeURIComponent(email)}`);
    }
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
          <a href="#" onClick={() => setCurrentPage('home')}>
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#fitur" className="text-gray-400 hover:text-white transition">Fitur</a>
            <a href="#" className="text-gray-400 hover:text-white transition" onClick={() => setCurrentPage('about')}>Tentang Kami</a>
            <a href="#" className="text-gray-400 hover:text-white transition" onClick={() => setCurrentPage('feedback')}>Saran</a>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-400 hover:text-white font-medium transition flex items-center gap-2"
                >
                  {user.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => router.push('/login')} className="text-gray-400 hover:text-white font-medium transition">Login</button>
                <button onClick={() => router.push('/register')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg">Sign Up</button>
              </>
            )}
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
                {!user && (
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
                )}
                {user && (
                  <button onClick={() => router.push('/chat')} className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg text-lg">
                    Mulai Analisis
                  </button>
                )}
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

            <section className="py-24 overflow-hidden">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Coba Analis Saham AI Kami</h2>
                <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">Rasakan kekuatan analisis berbasis AI. Ajukan pertanyaan tentang saham Indonesia dan dapatkan respons cerdas secara instan.</p>
                
                <div className="mt-12 max-w-4xl mx-auto relative">
                  <div className="swiper-container overflow-hidden">
                    <div className="swiper-wrapper flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                      <div className="swiper-slide min-w-full">
                        <img src="https://placehold.co/1024x600/0A0A0A/FFFFFF?text=Contoh+Analisis+Fundamental+BBCA" alt="Contoh Analisis Fundamental" className="rounded-2xl border border-gray-800 shadow-2xl w-full" />
                      </div>
                      <div className="swiper-slide min-w-full">
                        <img src="https://placehold.co/1024x600/0A0A0A/A855F7?text=Contoh+Perbandingan+Saham+BMRI+vs+BBRI" alt="Contoh Perbandingan Saham" className="rounded-2xl border border-gray-800 shadow-2xl w-full" />
                      </div>
                      <div className="swiper-slide min-w-full">
                        <img src="https://placehold.co/1024x600/0A0A0A/4F46E5?text=Contoh+Prediksi+Tren+Saham+GOTO" alt="Contoh Prediksi Tren" className="rounded-2xl border border-gray-800 shadow-2xl w-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8 space-x-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentSlide === index ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            <section className="py-24">
              <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-sm font-semibold text-indigo-400">WHY CHOOSE OUR AI?</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">Dibuat Khusus untuk Pasar Indonesia</h2>
                    <p className="text-lg text-gray-400 mb-8">Tidak seperti alat AI finansial generik, chatbot kami dilatih secara eksklusif menggunakan data pasar saham Indonesia, regulasi, dan dinamika pasar lokal.</p>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-indigo-600/20 text-indigo-400 rounded-lg h-10 w-10 flex-shrink-0 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Keahlian Lokal</h4>
                          <p className="text-gray-400">Pemahaman mendalam tentang peraturan BEI, faktor ekonomi Indonesia, dan sentimen pasar lokal.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-indigo-600/20 text-indigo-400 rounded-lg h-10 w-10 flex-shrink-0 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Update Real-time</h4>
                          <p className="text-gray-400">Tetap terdepan dengan pembaruan pasar instan, analisis berita terkini, dan insight trading langsung.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-card rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Market Performance</h3>
                        <p className="text-sm text-gray-500">Last 30 days tracking</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Successful Predictions</span>
                        <span className="font-semibold text-green-400">87.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Average Response Time</span>
                        <span className="font-semibold text-white">1.2s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Stocks Analyzed Daily</span>
                        <span className="font-semibold text-white">500+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">User Satisfaction</span>
                        <span className="font-semibold text-green-400">96.2%</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 mt-6 pt-6">
                      <h4 className="text-sm text-gray-500 mb-3">Popular Indonesian Stocks We Track:</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-800 text-xs font-medium px-2 py-1 rounded">BBCA</span>
                        <span className="bg-gray-800 text-xs font-medium px-2 py-1 rounded">BMRI</span>
                        <span className="bg-gray-800 text-xs font-medium px-2 py-1 rounded">ASII</span>
                        <span className="bg-gray-800 text-xs font-medium px-2 py-1 rounded">TLKM</span>
                        <span className="bg-gray-800 text-xs font-medium px-2 py-1 rounded">UNVR</span>
                        <span className="bg-gray-800 text-xs font-medium px-2 py-1 rounded">ICBP</span>
                        <span className="bg-gray-800 text-xs font-medium px-2 py-1 rounded">GOTO</span>
                      </div>
                    </div>
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
              <a href="#" onClick={() => setCurrentPage('home')}>
              <img src="/modcus-logo.png" alt="Modcus" className="h-6" />
            </a>
              <p className="text-sm text-gray-500 mt-2">AI-Powered Stock Analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produk</h4>
              <a href="#fitur" className="block mt-2 text-sm text-gray-400 hover:text-white">Fitur</a>
              <a href="/feedback" className="block mt-2 text-sm text-gray-400 hover:text-white">Feedback User</a>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Dokumentasi</a>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white" onClick={() => setCurrentPage('about')}>Tentang Kami</a>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Blog</a>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Syarat & Ketentuan</a>
              <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Kebijakan Privasi</a>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Kontak</h4>
              <a href="mailto:support@stockbot.id" className="flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@stockbot.id
              </a>
              <a href="tel:+622112345678" className="flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +62 21 1234 5678
              </a>
              <p className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Jakarta, Indonesia
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 PT. Ngoper Global Infinity All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      </IonContent>
    </IonPage>
  );
};
