import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { apiService } from '../../services/api';
import { useTranslation } from '../../i18n/TranslationContext';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';

export const Feedback: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [wantContact, setWantContact] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiService.submitFeedback({ phone, email, feedback, wantContact });
      setSuccess(true);
      setPhone('');
      setEmail('');
      setFeedback('');
      setWantContact(false);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/home">
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <button onClick={() => router.push('/home')} className="text-gray-400 hover:text-white font-medium transition">
            {t('common.back')}
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      <IonContent className="landing-content">
        <div className="min-h-screen flex items-center justify-center py-12 px-6">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('feedback.title')}</h1>
              <p className="text-lg text-gray-400">{t('feedback.subtitle')}</p>
            </div>

            {success ? (
              <div className="feature-card p-8 rounded-2xl text-center">
                <div className="text-green-400 text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-white mb-2">{t('feedback.success.title')}</h2>
                <p className="text-gray-400 mb-6">{t('feedback.success.message')}</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg"
                >
                  {t('feedback.success.button')}
                </button>
              </div>
            ) : (
              <div className="feature-card p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('feedback.form.phone')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('feedback.form.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('feedback.form.feedback')}
                    </label>
                    <textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder={t('feedback.form.feedbackPlaceholder')}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      id="wantContact"
                      type="checkbox"
                      checked={wantContact}
                      onChange={(e) => setWantContact(e.target.checked)}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-900"
                    />
                    <label htmlFor="wantContact" className="ml-3 text-sm text-gray-300">
                      {t('feedback.form.wantContact')}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg disabled:opacity-50"
                  >
                    {loading ? t('feedback.form.submitting') : t('feedback.form.submit')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
