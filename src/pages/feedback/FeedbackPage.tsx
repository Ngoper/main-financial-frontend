import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

export const FeedbackPage: React.FC = () => {
  const [feedbackForm, setFeedbackForm] = useState({ nama: '', email: '', pesan: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useIonRouter();

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
    setShowSuccess(true);
  };

  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <nav className="flex items-center space-x-8">
            <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }} className="text-gray-400 hover:text-white transition">Beranda</a>
          </nav>
        </div>
      </header>

      <IonContent className="landing-content">
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
      </IonContent>
    </IonPage>
  );
};
