import React, { useState, useEffect } from 'react';
import { IonModal, IonButton, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import { apiService } from '../../services/api';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Load Sociabuzz script only when modal opens
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://storage.sociabuzz.com/storage/js/main/buttononwebsite/index.min.js';
      script.async = true;
      script.onload = () => {
        if (window.sbBoW) {
          window.sbBoW.draw("modcusai", "QmVyaSBEdWt1bmdhbiA", "position-bottom-right", "#76CC11", "#FFFFFF");
          
          // Immediately move button to modal
          setTimeout(() => {
            const sociabuzzBtn = document.getElementById('wrapperFloatingBtn');
            const container = document.getElementById('sociabuzz-widget-container');
            
            if (sociabuzzBtn && container) {
              container.appendChild(sociabuzzBtn);
              sociabuzzBtn.style.position = 'static';
              sociabuzzBtn.style.zIndex = '1';
            }
          }, 100);
        }
      };
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        const btn = document.getElementById('wrapperFloatingBtn');
        if (btn) {
          btn.remove();
        }
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const moveButton = () => {
        const sociabuzzBtn = document.getElementById('wrapperFloatingBtn');
        const container = document.getElementById('sociabuzz-widget-container');
        
        if (sociabuzzBtn && container) {
          // Remove from body and add to container
          if (sociabuzzBtn.parentElement !== container) {
            container.appendChild(sociabuzzBtn);
            sociabuzzBtn.style.position = 'static';
            sociabuzzBtn.style.zIndex = '1';
          }
        } else {
          // Retry if button not found yet
          setTimeout(moveButton, 100);
        }
      };
      
      setTimeout(moveButton, 100);
    }

    return () => {
      const sociabuzzBtn = document.getElementById('wrapperFloatingBtn');
      if (sociabuzzBtn && sociabuzzBtn.parentElement?.id === 'sociabuzz-widget-container') {
        document.body.appendChild(sociabuzzBtn);
        sociabuzzBtn.style.position = 'fixed';
        sociabuzzBtn.style.bottom = '0px';
        sociabuzzBtn.style.right = '0px';
        sociabuzzBtn.style.zIndex = '9999997';
      }
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.submitFeedback({
        phone: 'anonymous',
        email: '',
        feedback,
        wantContact: false
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFeedback('');
        setEmail('');
        setPhone('');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="feedback-modal-wrapper">
      <div className="feedback-modal">
        <div className="modal-header">
          <h2 className="text-2xl font-bold text-white">Kritik & Saran</h2>
          <IonButton fill="clear" onClick={onClose}>
            <IonIcon icon={close} className="text-white" />
          </IonButton>
        </div>

        <div className="modal-content">
          <div className="modal-grid">
            <div className="support-section">
              <div className="support-content">
                <h3 className="text-lg font-semibold text-white mb-3">Dukung Kami</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Bantu kami terus berkembang dengan memberikan dukungan Anda
                </p>
                <div className="qris-container">
                  <img 
                    src="/qris.jpg" 
                    alt="QRIS Payment" 
                    className="qris-image"
                  />
                </div>
                <div id="sociabuzz-widget-container"></div>
              </div>
            </div>

            <div className="feedback-section">
              <h3 className="text-lg font-semibold text-white mb-4">Berikan Feedback</h3>
              {success ? (
                <div className="success-message">
                  <p className="text-green-400 text-center">Terima kasih atas feedback Anda!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Kritik & Saran
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Mengirim...' : 'Kirim Feedback'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .feedback-modal-wrapper {
          --width: 100%;
          --height: 100%;
        }

        @media (min-width: 768px) {
          .feedback-modal-wrapper {
            --width: 90%;
            --max-width: 1200px;
            --height: 80%;
            --max-height: 900px;
          }
        }

        .feedback-modal {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #0a0a0a;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #1f2937;
        }

        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .support-section,
        .feedback-section {
          background: #111827;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid #1f2937;
        }

        .support-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .support-content {
          text-align: center;
          width: 100%;
        }

        .qris-container {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .qris-image {
          max-width: 100%;
          width: 250px;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 768px) {
          .qris-image {
            width: 300px;
          }
        }

        #sociabuzz-widget-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100px;
        }

        #sociabuzz-widget-container #wrapperFloatingBtn {
          position: static !important;
          z-index: 1 !important;
        }

        #sociabuzz-widget-container .floating-btn {
          padding: 0 !important;
        }

        .success-message {
          padding: 2rem;
          text-align: center;
        }

        body > #wrapperFloatingBtn {
          position: fixed !important;
          bottom: 0px !important;
          right: 0px !important;
          z-index: 9999997 !important;
        }
      `}</style>
    </IonModal>
  );
};

declare global {
  interface Window {
    sbBoW: any;
  }
}
