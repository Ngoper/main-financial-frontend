import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonFooter, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTranslation, IndonesianCompany } from '../localization/LanguageProvider';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useTheme } from '../theme/ThemeProvider';

// Message types for Indonesian chat
export interface IndonesianMessage {
  id: string;
  konten: string; // Indonesian content
  tipe: 'user' | 'ai';
  timestamp: Date;
  levelAnalisis?: 1 | 2;
  metadata?: {
    namaPerusahaan?: string;
    kodePerusahaan?: string;
    jenisAnalisis?: string;
    confidence?: number;
  };
}

// Topic types for Indonesian interface
export type IndonesianTopic = 'upload-laporan' | 'analisa-saham' | 'rekomendasi-saham';

interface IndonesianChatInterfaceProps {
  selectedTopic: IndonesianTopic;
  selectedCompany?: IndonesianCompany;
  analysisLevel: 1 | 2;
  onCompanySelect: (company: IndonesianCompany) => void;
  onTopicChange: (topic: IndonesianTopic) => void;
}

// Mock AI responses for demonstration
const mockAIResponses = {
  'analisa-saham': {
    level1: [
      'Berdasarkan laporan keuangan Q3 2024, PT Bank Central Asia (BBCA) mencatat pendapatan bunga bersih sebesar Rp 23.8 triliun, naik 12.3% dari periode yang sama tahun lalu.',
      'Data menunjukkan ROE PT Telkom Indonesia (TLKM) sebesar 14.2% di tahun 2024, dengan total aset Rp 182.4 triliun.',
      'PT Unilever Indonesia (UNVR) melaporkan laba bersih Rp 7.8 triliun dengan margin laba 18.5% pada tahun 2024.'
    ],
    level2: [
      'Analisis mendalam PT Bank BCA menunjukkan tren positif dengan NPL ratio yang tetap rendah di 0.3%. Implikasi untuk investor: Stabilitas keuangan yang sangat baik dan potensi dividen yield konsisten.',
      'Kinerja PT Telkom menunjukkan transformasi digital yang sukses. Analisis: Pertumbuhan revenue dari segmen digital 25% YoY. Rekomendasi: HOLD dengan target price Rp 4,200.',
      'PT Unilever menunjukkan resiliensi di tengah inflasi. Analisis: Pricing power yang kuat dan efisiensi operasional. Outlook: Prospek pertumbuhan jangka panjang positif dengan expansion ke rural market.'
    ]
  },
  'upload-laporan': [
    'Laporan keuangan berhasil dianalisis. Saya menemukan beberapa poin penting untuk dibahas.',
    'Analisis laporan menunjukkan tren pertumbuhan yang menarik. Mari kita bahas secara detail.',
    'Data keuangan telah diproses. Ada beberapa insight menarik yang perlu Anda ketahui.'
  ],
  'rekomendasi-saham': [
    'Berdasarkan profil risiko Anda, saya merekomendasikan diversifikasi antara sektor perbankan (40%), teknologi (30%), dan consumer goods (30%).',
    'Untuk portfolio konservatif, pertimbangkan BBCA, BMRI, dan UNVR sebagai core holdings.',
    'Rekomendasi bulanan: TLKM untuk growth, ASII untuk value, dan ICBP untuk defensive play.'
  ]
};

const IndonesianChatInterface: React.FC<IndonesianChatInterfaceProps> = ({
  selectedTopic,
  selectedCompany,
  analysisLevel,
  onCompanySelect,
  onTopicChange
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [messages, setMessages] = useState<IndonesianMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message based on topic
  useEffect(() => {
    const welcomeMessage: IndonesianMessage = {
      id: `welcome-${Date.now()}`,
      konten: getWelcomeMessage(selectedTopic),
      tipe: 'ai',
      timestamp: new Date(),
      levelAnalisis: analysisLevel
    };
    setMessages([welcomeMessage]);
  }, [selectedTopic, analysisLevel]);

  const getWelcomeMessage = (topic: IndonesianTopic): string => {
    switch (topic) {
      case 'analisa-saham':
        return 'Halo! Saya siap membantu analisis saham Indonesia. Silakan pilih perusahaan atau tanyakan langsung tentang saham yang Anda minati.';
      case 'upload-laporan':
        return 'Selamat datang! Silakan upload laporan keuangan perusahaan untuk analisis mendalam dengan AI.';
      case 'rekomendasi-saham':
        return 'Hai! Saya akan memberikan rekomendasi saham yang dipersonalisasi. Mari kita mulai dengan profil investasi Anda.';
      default:
        return 'Halo! Bagaimana saya bisa membantu analisis finansial Anda hari ini?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: IndonesianMessage = {
      id: `user-${Date.now()}`,
      konten: inputValue,
      tipe: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, selectedTopic, analysisLevel);
      const aiMessage: IndonesianMessage = {
        id: `ai-${Date.now()}`,
        konten: aiResponse,
        tipe: 'ai',
        timestamp: new Date(),
        levelAnalisis: analysisLevel,
        metadata: selectedCompany ? {
          namaPerusahaan: selectedCompany.nama,
          kodePerusahaan: selectedCompany.kode,
          jenisAnalisis: selectedTopic,
          confidence: 85
        } : undefined
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string, topic: IndonesianTopic, level: 1 | 2): string => {
    const responses = mockAIResponses[topic];
    
    if (topic === 'analisa-saham' && Array.isArray(responses)) {
      const levelKey = `level${level}` as keyof typeof responses;
      const levelResponses = (responses as any)[levelKey];
      if (Array.isArray(levelResponses)) {
        return levelResponses[Math.floor(Math.random() * levelResponses.length)];
      }
    }
    
    if (Array.isArray(responses)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return 'Terima kasih atas pertanyaan Anda. Saya sedang menganalisis informasi yang tersedia.';
  };

  const getTopicTitle = (topic: IndonesianTopic): string => {
    switch (topic) {
      case 'analisa-saham':
        return t.topicSelection.stockAnalysis.title;
      case 'upload-laporan':
        return t.topicSelection.uploadReport.title;
      case 'rekomendasi-saham':
        return t.topicSelection.stockRecommendations.title;
      default:
        return 'Chat AI';
    }
  };

  // Render message bubble
  const renderMessage = (message: IndonesianMessage) => (
    <div 
      key={message.id} 
      className={cn(
        'flex gap-3 px-4 py-3',
        message.tipe === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {message.tipe !== 'user' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0d80f2] to-[#0066cc] flex items-center justify-center shrink-0">
          <span className="text-white text-sm">🤖</span>
        </div>
      )}
      
      <div className={cn(
        'flex flex-col gap-1 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl',
        message.tipe === 'user' ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'rounded-2xl px-4 py-3 text-body transition-all duration-200',
          'break-words whitespace-pre-line',
          message.tipe === 'user' 
            ? 'bg-[#0d80f2] text-white rounded-br-md shadow-md' 
            : resolvedTheme === 'dark'
              ? 'bg-gradient-to-r from-purple-900 to-blue-800 text-white rounded-bl-md shadow-md'
              : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-bl-md shadow-md'
        )}>
          {message.konten}
        </div>
        
        <span className={cn(
          'text-caption opacity-75',
          message.tipe === 'user' ? 'text-right' : 'text-left',
          message.tipe === 'user' 
            ? 'text-white/80' 
            : 'text-white/80'
        )}>
          {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {message.tipe === 'user' && (
        <div className="w-8 h-8 rounded-full bg-[#e7edf4] dark:bg-[#374151] flex items-center justify-center shrink-0">
          <span className="text-[#49739c] dark:text-[#90bccb] text-sm">👤</span>
        </div>
      )}
    </div>
  );

  // Helper function for class names
  const cn = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <IonPage>
      <Header title={getTopicTitle(selectedTopic)} />
      <IonContent fullscreen>
        <div className="flex flex-col h-full bg-light-surface dark:bg-dark-surface transition-colors duration-300">
          {/* Back button and topic info */}
          <div className="flex items-center bg-light-surface dark:bg-dark-surface p-4 border-b border-gray-200 dark:border-gray-700">
            <div 
              className="text-[#0d141c] dark:text-white flex size-10 shrink-0 items-center cursor-pointer mr-3" 
              onClick={() => history.goBack()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-[#0d141c] dark:text-white font-semibold text-lg">
                {getTopicTitle(selectedTopic)}
              </h3>
              {selectedCompany && (
                <p className="text-[#49739c] dark:text-[#90bccb] text-sm">
                  {selectedCompany.nama} ({selectedCompany.kode})
                </p>
              )}
            </div>
          </div>
          
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto chat-log">
            <div className="max-w-4xl mx-auto">
              {messages.map(renderMessage)}
              {isTyping && (
                <div className="flex gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0d80f2] to-[#0066cc] flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className={cn(
                    'flex items-center gap-1 rounded-2xl rounded-bl-md px-4 py-3 shadow-md',
                    resolvedTheme === 'dark'
                      ? 'bg-gradient-to-r from-purple-900 to-blue-800'
                      : 'bg-gradient-to-r from-purple-600 to-blue-500'
                  )}>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-[#e5e7eb] dark:border-[#374151] bg-light-surface dark:bg-dark-surface p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 bg-[#f8fafc] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] rounded-2xl px-4 py-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 bg-transparent border-none outline-none text-input placeholder-muted"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={cn(
                    'p-2 rounded-xl transition-all duration-200',
                    inputValue.trim()
                      ? 'bg-[#0d80f2] text-white hover:bg-[#0066cc] transform hover:scale-105 active:scale-95'
                      : 'bg-[#e5e7eb] dark:bg-[#4b5563] text-[#9ca3af] cursor-not-allowed'
                  )}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default IndonesianChatInterface;