import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { getCurrentUser, logout, User } from '../../services/api';
import { useTranslation } from '../../i18n/TranslationContext';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import './about.css';

export const AboutPage: React.FC = () => {
  const router = useIonRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/home">
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/home#fitur" className="text-gray-400 hover:text-white transition">{t('landing.nav.features')}</a>
            <a href="/about" className="text-white font-medium">{t('landing.nav.about')}</a>
            <a href="/feedback" className="text-gray-400 hover:text-white transition">{t('landing.nav.feedback')}</a>
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
                      {t('common.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => router.push('/login')} className="text-gray-400 hover:text-white font-medium transition">{t('landing.nav.login')}</button>
                <button onClick={() => router.push('/register')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg">{t('landing.nav.register')}</button>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <IonContent className="about-content">
        <main>
          <section className="hero-bg py-24 lg:py-32">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {t('about.title')}
              </h1>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">{t('about.mission.title')}</h2>
              <div className="text-lg text-gray-300 leading-relaxed space-y-6 text-left">
                <p>{t('about.mission.p1')}</p>
                <p>{t('about.mission.p2')}</p>
              </div>
            </div>
          </section>

          <section className="py-24 bg-black">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">{t('about.principles.title')}</h2>
                <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">
                  {t('about.principles.subtitle')}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="text-center">
                  <div className="mx-auto bg-indigo-600/20 text-indigo-400 rounded-lg h-16 w-16 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('about.principles.security.title')}</h3>
                  <p className="text-gray-400">
                    {t('about.principles.security.description')}
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto bg-purple-600/20 text-purple-400 rounded-lg h-16 w-16 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('about.principles.objectivity.title')}</h3>
                  <p className="text-gray-400">
                    {t('about.principles.objectivity.description')}
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto bg-pink-600/20 text-pink-400 rounded-lg h-16 w-16 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('about.principles.empowerment.title')}</h3>
                  <p className="text-gray-400">
                    {t('about.principles.empowerment.description')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">{t('about.team.title')}</h2>
                <p className="text-lg text-gray-400 mt-3">
                  {t('about.team.subtitle')}
                </p>
              </div>
              <div className="space-y-12 text-left">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-400 mb-4">{t('about.team.research.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t('about.team.research.description')}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">{t('about.team.engineering.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t('about.team.engineering.description')}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-pink-400 mb-4">{t('about.team.operations.title')}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t('about.team.operations.description')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-6 text-center max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('about.cta.title')}</h2>
              <p className="text-lg text-gray-400 mb-8">
                {t('about.cta.subtitle')}
              </p>
              <button 
                onClick={() => router.push('/feedback')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                {t('about.cta.button')}
              </button>
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
                <p className="text-sm text-gray-500">{t('about.footer.tagline')}</p>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">{t('about.footer.product')}</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/home'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">{t('about.footer.features')}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/feedback'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">{t('about.footer.userFeedback')}</a>
                <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">{t('about.footer.docs')}</a>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">{t('about.footer.company')}</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/about'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">{t('about.footer.about')}</a>
                <a href="#" className="block mt-2 text-sm text-gray-400 hover:text-white">{t('about.footer.blog')}</a>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">{t('about.footer.legal')}</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/tnc'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">{t('about.footer.terms')}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); router.push('/privacy'); }} className="block mt-2 text-sm text-gray-400 hover:text-white">{t('about.footer.privacy')}</a>
              </div>
              <div className="flex-1 min-w-[150px]">
                <h4 className="font-semibold text-white mb-4">{t('about.footer.contact')}</h4>
                <a href="mailto:support@stockbot.id" className="flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> modcusai@gmail.com </a> 
                <a href="tel:+6282131099968" className="flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> +62 821-3109-9968</a>
                <p className="flex items-center gap-2 mt-2 text-sm text-gray-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {t('about.footer.location')}</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">{t('about.footer.copyright')}</p>
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
