import React, { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ExamplePrompts } from './ExamplePrompts';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';
import { apiService, AIQueryRequest } from '../../services/api';

interface Message {
  content: {
    title?: string;
    description?: string;
    text?: string;
    list?: string[];
  };
  isInitial: boolean;
  isUser?: boolean;
}

interface ChatViewProps {
  mode: string;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ mode, onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<'newbie' | 'novice' | 'expert'>('newbie');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChatMode(mode);
  }, [mode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage: Message = {
        content: { text: input },
        isInitial: false,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      setHasUserSentMessage(true);
      setIsLoading(true);
      
      try {
        const modeMap: Record<string, AIQueryRequest['mode']> = {
          'rekomendasi': 'stock-recommendations',
          'analisis': 'company-analysis',
          'dokumen': 'document-analysis'
        };
        
        const request: AIQueryRequest = {
          mode: modeMap[mode] || 'company-analysis',
          level: selectedLevel,
          query: input,
          file: selectedFile || undefined
        };
        
        const response = await apiService.queryAI(request);
        
        const aiMessage: Message = {
          content: { text: response.response },
          isInitial: false,
          isUser: false
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        const errorMessage: Message = {
          content: { text: 'Maaf, terjadi kesalahan. Silakan coba lagi.' },
          isInitial: false,
          isUser: false
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        setInput('');
        setSelectedFile(null);
      }
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleShuffle = () => {
    setPrompts([...prompts].sort(() => Math.random() - 0.5));
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleLevelChange = (level: 'newbie' | 'novice' | 'expert') => {
    setSelectedLevel(level);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages-wrapper">
        <div className="chat-log">
          <div className="chat-log-inner">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} content={msg.content} isInitial={msg.isInitial} isUser={msg.isUser} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {prompts.length > 0 && !hasUserSentMessage && (
          <ExamplePrompts
            prompts={prompts}
            onSelectPrompt={handleSelectPrompt}
            onShuffle={handleShuffle}
          />
        )}
      </div>
      <div className="chat-input-wrapper">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          showUpload={mode === 'dokumen'}
          onFileSelect={handleFileSelect}
          selectedLevel={selectedLevel}
          onLevelChange={handleLevelChange}
          selectedFile={selectedFile}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};