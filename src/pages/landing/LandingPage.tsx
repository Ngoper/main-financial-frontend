import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { getCurrentUser, logout, User } from '../../services/api';
import './landing.css';

export const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
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



  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#fitur" className="text-gray-400 hover:text-white transition">Fitur</a>
            <a href="#" className="text-gray-400 hover:text-white transition" onClick={(e) => { e.preventDefault(); router.push('/about'); }}>Tentang Kami</a>
            <a href="#" className="text-gray-400 hover:text-white transition" onClick={(e) => { e.preventDefault(); router.push('/feedback'); }}>Saran</a>
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
                <button onClick={() => router.push('/register')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg">Daftar</button>
              </>
            )}
          </div>
        </div>
      </header>

      <IonContent className="landing-content">
        <main>
            <section className="hero-bg py-24 lg:py-40 fade-in-up">
              <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                  Berhenti Menebak. Mulai Untung.
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                  AI kami menganalisis saham untuk Anda. Dalam hitungan detik. Tanpa perlu baca laporan keuangan yang bikin pusing.
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
                <p className="text-center text-gray-500 font-medium uppercase tracking-widest">Dipercaya Ribuan Investor Indonesia</p>
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
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Investasi Cerdas Tanpa Ribet</h2>
                  <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">Kami ubah data keuangan yang rumit jadi jawaban sederhana: Beli, Tahan, atau Jual. Sesimpel itu.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="feature-card p-8 rounded-2xl">
                    <div className="bg-indigo-600/20 text-indigo-400 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Skor Saham Instan</h3>
                    <p className="text-gray-400 font-semibold mb-2">Tidak perlu lagi menebak-nebak.</p>
                    <p className="text-gray-400">Dapatkan skor 0-100 untuk setiap saham. Semakin tinggi skornya, semakin bagus peluang untungnya. Simpel.</p>
                  </div>
                  <div className="feature-card p-8 rounded-2xl">
                    <div className="bg-purple-600/20 text-purple-400 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Selalu Update, Selalu Akurat</h3>
                    <p className="text-gray-400">Data terbaru setiap saat. Berita pasar terkini. Analisis yang selalu fresh. Anda selalu selangkah lebih maju.</p>
                  </div>
                  <div className="feature-card p-8 rounded-2xl">
                    <div className="bg-pink-600/20 text-pink-400 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Tanya Apa Saja, Kapan Saja</h3>
                    <p className="text-gray-400">Punya pertanyaan tentang saham? Tanya langsung ke AI kami. Jawaban langsung. Bahasa sederhana. Seperti ngobrol sama teman.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24 overflow-hidden">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Lihat Sendiri Cara Kerjanya</h2>
                <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">Tanya tentang saham apapun. Dapat jawaban dalam detik. Mudah dipahami. Langsung actionable.</p>
                
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
                    <span className="text-sm font-semibold text-indigo-400">KENAPA KAMI BEDA?</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">100% Fokus ke Saham Indonesia</h2>
                    <p className="text-lg text-gray-400 mb-8">Bukan AI asal-asalan. Kami paham BEI, paham ekonomi Indonesia, paham saham-saham lokal. Karena kami fokus ke sini, hasilnya lebih akurat.</p>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-indigo-600/20 text-indigo-400 rounded-lg h-10 w-10 flex-shrink-0 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Paham Pasar Indonesia</h4>
                          <p className="text-gray-400">Kami ngerti aturan BEI, kondisi ekonomi RI, dan gimana investor lokal berpikir. Analisis yang relevan untuk Anda.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-indigo-600/20 text-indigo-400 rounded-lg h-10 w-10 flex-shrink-0 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Cepat & Akurat</h4>
                          <p className="text-gray-400">Berita baru keluar? Kami langsung analisis. Harga bergerak? Kami langsung kasih insight. Anda selalu tahu duluan.</p>
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
                        <h3 className="text-xl font-bold text-white">Bukti Nyata</h3>
                        <p className="text-sm text-gray-500">Data 30 hari terakhir</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Tingkat Akurasi</span>
                        <span className="font-semibold text-green-400">87.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Kecepatan Jawaban</span>
                        <span className="font-semibold text-white">1.2s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Saham Dianalisis Harian</span>
                        <span className="font-semibold text-white">500+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Kepuasan Pengguna</span>
                        <span className="font-semibold text-green-400">96.2%</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 mt-6 pt-6">
                      <h4 className="text-sm text-gray-500 mb-3">Saham Populer yang Bisa Anda Analisis:</h4>
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
                  <p className="text-2xl font-medium text-white">"Dulu saya takut beli saham karena gak ngerti. Sekarang? Tinggal tanya AI, langsung dapat jawaban jelas. Investasi jadi gampang banget!"</p>
                  <div className="mt-6">
                    <p className="font-bold text-lg text-gray-300">Budi Santoso</p>
                    <p className="text-gray-500">Karyawan Swasta, Investor Pemula</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="hero-bg">
              <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Saatnya Anda Untung dari Saham</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">Gratis. Tanpa kartu kredit. Langsung bisa pakai. Mulai sekarang.</p>
                <a href="#" className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 font-bold text-lg shadow-2xl inline-block">Mulai Gratis Sekarang</a>
              </div>
            </section>
        </main>

        <footer className="bg-black border-t border-gray-800">
          <div className="container mx-auto px-6 py-12">
            <div className="flex flex-wrap gap-8">
              <div className="flex-1 min-w-[150px]">
                <a href="#" onClick={() => router.push('/home')}>
                  <img src="/modcus-logo.png" alt="Modcus" className="h-6 mb-4" />
                </a>
                <p className="text-sm text-gray-500">Analisis Saham Berbasis AI.</p>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">Produk</h4>
                <a href="#fitur" className="block mt-2 text-sm text-gray-400 hover:text-white">Fitur</a>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/feedback'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">Feedback User</a>
                <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Dokumentasi</a>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/about'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">Tentang Kami</a>
                <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">Blog</a>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/tnc'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">Syarat & Ketentuan</a>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/privacy'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">Kebijakan Privasi</a>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">Kontak</h4>
                <a href="mailto:support@stockbot.id" className="flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> modcusai@gmail.com </a> 
                <a href="tel:+6282131099968" className="flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> +62 821-3109-9968</a>
                <p className="flex items-center gap-2 mt-2 text-sm text-gray-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Surabaya, Indonesia</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">&copy; 2025 PT Ngoper Global Infinity. Hak Cipta Dilindungi.</p>
                <div className="flex items-center gap-4">
                  <a href="https://www.tiktok.com/@modcus.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/modcusai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.threads.com/@modcusai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192">
                      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61571109164479" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/modcusai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </IonContent>
    </IonPage>
  );
};
