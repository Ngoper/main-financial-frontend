import React from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useTranslation } from '../../i18n/TranslationContext';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';

export const TermsPage: React.FC = () => {
  const router = useIonRouter();
  const { t } = useTranslation();

  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <nav className="flex items-center space-x-8">
            <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }} className="text-gray-400 hover:text-white transition">{t('common.back')}</a>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <IonContent className="landing-content">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t('terms.title')}</h1>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-sm text-gray-500">{t('terms.lastUpdated')}</p>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.acceptance.title')}</h2>
                  <p>{t('terms.sections.acceptance.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.description.title')}</h2>
                  <p>{t('terms.sections.description.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.account.title')}</h2>
                  <p>{t('terms.sections.account.content')}</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>{t('terms.sections.account.items.confidentiality')}</li>
                    <li>{t('terms.sections.account.items.activities')}</li>
                    <li>{t('terms.sections.account.items.accurate')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.usage.title')}</h2>
                  <p>{t('terms.sections.usage.content')}</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>{t('terms.sections.usage.items.illegal')}</li>
                    <li>{t('terms.sections.usage.items.access')}</li>
                    <li>{t('terms.sections.usage.items.disrupt')}</li>
                    <li>{t('terms.sections.usage.items.abuse')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.disclaimer.title')}</h2>
                  <p className="font-semibold text-yellow-400">{t('terms.sections.disclaimer.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.intellectual.title')}</h2>
                  <p>{t('terms.sections.intellectual.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.liability.title')}</h2>
                  <p>{t('terms.sections.liability.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.changes.title')}</h2>
                  <p>{t('terms.sections.changes.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.jurisdiction.title')}</h2>
                  <p>{t('terms.sections.jurisdiction.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('terms.sections.contact.title')}</h2>
                  <p>{t('terms.sections.contact.content')}</p>
                  <p className="mt-2">Email: {t('terms.sections.contact.email')}</p>
                  <p>Telepon: {t('terms.sections.contact.phone')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};
