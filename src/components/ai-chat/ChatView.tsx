import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonChip, IonLabel } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { ChatMessage } from './ChatMessage';
import { ExamplePrompts } from './ExamplePrompts';
import { ChatInput } from './ChatInput';

interface Message {
  content: {
    title?: string;
    description?: string;
    text?: string;
    list?: string[];
  };
  isInitial: boolean;
}

interface ChatViewProps {
  mode: string;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ mode, onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('Pemula');
  const [selectedChatHistory, setSelectedChatHistory] = useState<string | null>(null);
  const [chatHistory] = useState<string[]>([
    'Analisis fundamental saham BBCA periode Q3 2024',
    'Rekomendasi portofolio investasi untuk pemula dengan modal 10 juta',
    'Prediksi pergerakan IHSG hari ini berdasarkan sentimen global',
    'Teknikal analysis GOTO dengan indikator RSI dan MACD',
    'Fundamental analysis ADRO dan prospek industri batubara 2025',
    'Perbandingan saham bank konvensional vs bank syariah di Indonesia',
    'Strategi diversifikasi investasi saham untuk mengurangi risiko',
    'Analisis laporan keuangan TLKM dan outlook bisnis digital',
    'Impact kenaikan suku bunga BI terhadap sektor properti',
    'Review saham UNVR dan prospek pertumbuhan consumer goods',
    'Tips memilih saham blue chip untuk investasi jangka panjang',
    'Analisis sektor teknologi Indonesia setelah pandemi',
    'Evaluasi kinerja reksadana saham vs direct investing',
    'Studi kasus: IPO dan kinerja saham baru di tahun 2024',
    'Warren Buffett value investing strategy diterapkan di pasar Indonesia'
  ]);

  useEffect(() => {
    initializeChatMode(mode);
  }, [mode]);

  const initializeChatMode = (modeType: string) => {
    let initialContent: Message['content'];
    let examplePrompts: string[];

    switch (modeType) {
      case 'rekomendasi':
        initialContent = {
          title: '💎 Rekomendasi Saham Value Investing Hari Ini',
          text: 'Berdasarkan analisis valuasi dan fundamental, berikut adalah 3 saham yang menarik untuk diperhatikan:',
          list: [
            '<strong>1. PT Bank Mandiri (BMRI)</strong> - Valuasi P/BV di bawah rata-rata historis dengan potensi pertumbuhan laba yang kuat dari sektor korporat.',
            '<strong>2. PT Adaro Energy (ADRO)</strong> - Yield dividen menarik dan valuasi rendah, diuntungkan dari diversifikasi ke bisnis energi terbarukan.',
            '<strong>3. PT Telkom Indonesia (TLKM)</strong> - Dominasi pasar yang solid dan potensi pertumbuhan dari bisnis data center.'
          ]
        };
        examplePrompts = ['Bandingkan BMRI dan BBCA', 'Analisis prospek ADRO', 'Saham apa yang bagus di sektor konsumer?'];
        break;
      case 'analisis':
        initialContent = {
          title: 'Analisis Saham & Pasar',
          description: 'Ajukan pertanyaan spesifik tentang saham, emiten, atau kondisi pasar.'
        };
        examplePrompts = ['Bagaimana kondisi IHSG minggu ini?', 'Analisis fundamental GOTO', 'Apa itu P/E ratio?'];
        break;
      case 'dokumen':
        initialContent = {
          title: 'Analisis Dokumen',
          description: 'Unggah laporan keuangan, materi public expose, atau riset untuk dianalisis oleh AI.'
        };
        examplePrompts = ['Ringkas laporan keuangan ini', 'Apa sentimen utama dari public expose ini?', 'Identifikasi risiko utama'];
        break;
      default:
        initialContent = { title: 'Chat', description: 'Start chatting' };
        examplePrompts = [];
    }

    setMessages([{ content: initialContent, isInitial: initialContent.description !== undefined }]);
    setPrompts(examplePrompts);
  };

  const handleSend = () => {
    if (input.trim()) {
      console.log('Sending message:', input);
      setInput('');
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleShuffle = () => {
    setPrompts([...prompts].sort(() => Math.random() - 0.5));
  };

  const handleFileSelect = (file: File) => {
    alert(`File "${file.name}" telah dipilih.`);
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
  };

  const handleChatHistorySelect = (item: string) => {
    setSelectedChatHistory(item);
  };

  return (
    <>
      {/* Header with back button */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* IonBackButton doesn't accept an onClick prop in the current types, use IonButton + IonIcon instead */}
            <IonButton fill="clear" onClick={onBack}>
              <IonIcon icon={chevronBack} slot="start" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <div style={{ display: 'flex', height: 'calc(100vh - 56px)', flexDirection: 'column' }}>
        {/* Sidebar - 1/6 of width */}
        <div style={{
          width: '16.67%',
          backgroundColor: 'var(--bg-dark)', // Use CSS variable for consistent theming
          borderRight: '1px solid var(--border-dark)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: 0,
          top: '56px', // Account for header height
          height: 'calc(100vh - 56px)',
          zIndex: 10
        }}>
          {/* Fixed Level and Chat History Section */}
          <div style={{
            padding: '20px 8px',
            borderBottom: '1px solid var(--border-dark)',
            backgroundColor: 'var(--bg-dark)',
            position: 'sticky',
            top: 0,
            zIndex: 11
          }}>
            <div style={{
              color: 'var(--text-primary-dark)',
              fontSize: '14px',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '10px 5px',
              borderBottom: '1px solid var(--border-dark)',
              marginBottom: '15px'
            }}>
              Level
            </div>
            <IonChip
              className={selectedLevel === 'Pemula' ? 'active' : ''}
              onClick={() => handleLevelSelect('Pemula')}
              style={{
                width: 'calc(100% - 16px)',
                margin: '4px 8px',
                justifyContent: 'center',
                backgroundColor: selectedLevel === 'Pemula' ? 'var(--primary-color-dark)' : 'var(--card-bg-dark)',
                color: selectedLevel === 'Pemula' ? 'white' : 'var(--text-primary-dark)',
                // keep border width consistent to avoid layout shift when toggling selection
                border: '1px solid var(--border-dark)',
                borderColor: selectedLevel === 'Pemula' ? 'transparent' : 'var(--border-dark)',
                boxSizing: 'border-box',
                maxWidth: 'calc(100% - 16px)',
                minWidth: 'calc(100% - 16px)',
                padding: '12px 8px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <IonLabel>Pemula</IonLabel>
            </IonChip>
            <IonChip
              className={selectedLevel === 'Intermediate' ? 'active' : ''}
              onClick={() => handleLevelSelect('Intermediate')}
              style={{
                width: 'calc(100% - 16px)',
                margin: '4px 8px',
                justifyContent: 'center',
                backgroundColor: selectedLevel === 'Intermediate' ? 'var(--accent-color-dark)' : 'var(--card-bg-dark)',
                color: selectedLevel === 'Intermediate' ? 'white' : 'var(--text-primary-dark)',
                border: '1px solid var(--border-dark)',
                borderColor: selectedLevel === 'Intermediate' ? 'transparent' : 'var(--border-dark)',
                boxSizing: 'border-box',
                maxWidth: 'calc(100% - 16px)',
                minWidth: 'calc(100% - 16px)',
                padding: '12px 8px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <IonLabel>Intermediate</IonLabel>
            </IonChip>
            <IonChip
              className={selectedLevel === 'Advanced' ? 'active' : ''}
              onClick={() => handleLevelSelect('Advanced')}
              style={{
                width: 'calc(100% - 16px)',
                margin: '4px 8px',
                justifyContent: 'center',
                backgroundColor: selectedLevel === 'Advanced' ? '#FF9800' : 'var(--card-bg-dark)',
                color: selectedLevel === 'Advanced' ? 'white' : 'var(--text-primary-dark)',
                border: '1px solid var(--border-dark)',
                borderColor: selectedLevel === 'Advanced' ? 'transparent' : 'var(--border-dark)',
                boxSizing: 'border-box',
                maxWidth: 'calc(100% - 16px)',
                minWidth: 'calc(100% - 16px)',
                padding: '12px 8px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <IonLabel>Advanced</IonLabel>
            </IonChip>

            <div style={{
              color: 'var(--text-primary-dark)',
              fontSize: '14px',
              fontWeight: 'bold',
              textAlign: 'center',
              // padding: '10px 5px',
              marginTop: '25px',
            }}>
              Chat History
            </div>
          </div>

          {/* Scrollable Chat History Section */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--border-dark) transparent',
            padding: '20px 8px',
            paddingTop: '10px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {chatHistory.map((item, index) => (
                <IonChip
                  key={index}
                  className={selectedChatHistory === item ? 'active' : ''}
                  onClick={() => handleChatHistorySelect(item)}
                  style={{
                    width: 'calc(100% - 16px)',
                    margin: '2px 8px',
                    justifyContent: 'flex-start',
                    backgroundColor: selectedChatHistory === item ? 'var(--primary-color-dark)' : 'var(--card-bg-dark)',
                    color: selectedChatHistory === item ? 'white' : 'var(--text-primary-dark)',
                    // keep border width consistent to avoid layout shift when toggling selection
                    border: '1px solid var(--border-dark)',
                    borderColor: selectedChatHistory === item ? 'transparent' : 'var(--border-dark)',
                    padding: '10px 12px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    height: 'auto',
                    minHeight: '40px',
                    lineHeight: '1.4',
                    alignItems: 'flex-start',
                    boxSizing: 'border-box',
                    maxWidth: 'calc(100% - 16px)',
                    minWidth: 'calc(100% - 16px)'
                  }}
                >
                  <IonLabel style={{
                    fontSize: '11px',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    textAlign: 'left',
                    wordBreak: 'break-word',
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box'
                  }}>{item}</IonLabel>
                </IonChip>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - 5/6 of width */}
        <div style={{
          marginLeft: '16.67%',
          width: '83.33%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <IonContent className="chat-content" style={{
            flex: 1,
            height: 'calc(100% - 80px)' // Account for input area height
          }}>
            <div className="chat-log">
              <div className="chat-log-inner">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} content={msg.content} isInitial={msg.isInitial} />
                ))}
              </div>
            </div>
            {prompts.length > 0 && (
              <ExamplePrompts
                prompts={prompts}
                onSelectPrompt={handleSelectPrompt}
                onShuffle={handleShuffle}
              />
            )}
          </IonContent>

          {/* Fixed input area at bottom */}
          <div style={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'var(--bg-dark)',
            borderTop: '1px solid var(--border-dark)'
          }}>
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              showUpload={mode === 'dokumen'}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>
      </div>
    </>
  );
};