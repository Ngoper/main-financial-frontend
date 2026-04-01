import React from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { useTranslation } from '../../i18n/TranslationContext';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';

export const PrivacyPage: React.FC = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t('privacy.title')}</h1>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-sm text-gray-500">{t('privacy.lastUpdated')}</p>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.intro.title')}</h2>
                  <p>{t('privacy.sections.intro.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.collection.title')}</h2>
                  <p>{t('privacy.sections.collection.content')}</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li><strong>{t('privacy.sections.collection.items.account')}</strong></li>
                    <li><strong>{t('privacy.sections.collection.items.usage')}</strong></li>
                    <li><strong>{t('privacy.sections.collection.items.technical')}</strong></li>
                    <li><strong>{t('privacy.sections.collection.items.cookies')}</strong></li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.usage.title')}</h2>
                  <p>{t('privacy.sections.usage.content')}</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>{t('privacy.sections.usage.items.provide')}</li>
                    <li>{t('privacy.sections.usage.items.improve')}</li>
                    <li>{t('privacy.sections.usage.items.communicate')}</li>
                    <li>{t('privacy.sections.usage.items.analyze')}</li>
                    <li>{t('privacy.sections.usage.items.security')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.sharing.title')}</h2>
                  <p>{t('privacy.sections.sharing.content')}</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>{t('privacy.sections.sharing.items.consent')}</li>
                    <li>{t('privacy.sections.sharing.items.providers')}</li>
                    <li>{t('privacy.sections.sharing.items.legal')}</li>
                    <li>{t('privacy.sections.sharing.items.protect')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.security.title')}</h2>
                  <p>{t('privacy.sections.security.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.storage.title')}</h2>
                  <p>{t('privacy.sections.storage.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.rights.title')}</h2>
                  <p>{t('privacy.sections.rights.content')}</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>{t('privacy.sections.rights.items.access')}</li>
                    <li>{t('privacy.sections.rights.items.correct')}</li>
                    <li>{t('privacy.sections.rights.items.delete')}</li>
                    <li>{t('privacy.sections.rights.items.restrict')}</li>
                    <li>{t('privacy.sections.rights.items.object')}</li>
                    <li>{t('privacy.sections.rights.items.portability')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.cookies.title')}</h2>
                  <p>{t('privacy.sections.cookies.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.thirdParty.title')}</h2>
                  <p>{t('privacy.sections.thirdParty.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.changes.title')}</h2>
                  <p>{t('privacy.sections.changes.content')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('privacy.sections.contact.title')}</h2>
                  <p>{t('privacy.sections.contact.content')}</p>
                  <p className="mt-2">Email: {t('privacy.sections.contact.email')}</p>
                  <p>Telepon: {t('privacy.sections.contact.phone')}</p>
                  <p>{t('privacy.sections.contact.address')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};
