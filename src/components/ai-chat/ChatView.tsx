import React, { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ExamplePrompts } from './ExamplePrompts';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';
import { FeedbackModal } from './FeedbackModal';
import { apiService, AIQueryRequest } from '../../services/api';
import { parseAIResponse } from '../../utils/responseFormatter';
import { useTranslation } from '../../i18n/TranslationContext';

interface Message {
  content: {
    title?: string;
    description?: string;
    text?: string;
    list?: string[];
  };
  isInitial: boolean;
  isUser?: boolean;
  citations?: Array<{ source: string; type: string }>;
}

interface ChatViewProps {
  mode: string;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ mode, onBack }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<'newbie' | 'novice' | 'expert'>('newbie');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const promptCount = parseInt(localStorage.getItem('promptCount') || '0');
    const feedbackShown = localStorage.getItem('feedbackShown') === 'true';
    
    if (promptCount >= 3 && !feedbackShown) {
      setShowFeedbackModal(true);
    }
  }, []);

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
          title: t('chat.modes.rekomendasi.initialTitle'),
          text: t('chat.modes.rekomendasi.initialText'),
          list: t('chat.modes.rekomendasi.initialList') as unknown as string[]
        };
        examplePrompts = t('chat.modes.rekomendasi.examples') as unknown as string[];
        break;
      case 'analisis':
        initialContent = {
          title: t('chat.modes.analisis.initialTitle'),
          description: t('chat.modes.analisis.initialDescription')
        };
        examplePrompts = t('chat.modes.analisis.examples') as unknown as string[];
        break;
      case 'dokumen':
        initialContent = {
          title: t('chat.modes.dokumen.initialTitle'),
          description: t('chat.modes.dokumen.initialDescription')
        };
        examplePrompts = t('chat.modes.dokumen.examples') as unknown as string[];
        break;
      default:
        initialContent = { title: t('chat.title'), description: t('chat.modes.welcomeSubtitle') };
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
      
      // Increment prompt count
      const currentCount = parseInt(localStorage.getItem('promptCount') || '0');
      const newCount = currentCount + 1;
      localStorage.setItem('promptCount', newCount.toString());
      
      // Show feedback modal after 3 prompts
      const feedbackShown = localStorage.getItem('feedbackShown') === 'true';
      if (newCount === 3 && !feedbackShown) {
        setTimeout(() => setShowFeedbackModal(true), 1000);
      }
      
      try {
        const modeMap: Record<string, AIQueryRequest['mode']> = {
          'rekomendasi': 'stock-recommendations',
          'analisis': 'company-analysis',
          'dokumen': 'document-analysis'
        };
        
        // Build conversation history and append to query
        const conversationHistory = messages
          .filter(msg => !msg.isInitial && msg.content.text)
          .map(msg => {
            const role = msg.isUser ? 'User' : 'Assistant';
            return `${role}: ${msg.content.text!}`;
          });
        
        // Combine history with current query
        let fullQuery = input;
        if (conversationHistory.length > 0) {
          fullQuery = conversationHistory.join('\n\n') + '\n\nUser: ' + input;
        }
        
        const request: AIQueryRequest = {
          mode: modeMap[mode] || 'company-analysis',
          level: selectedLevel,
          query: fullQuery,
          ...(selectedFiles.length > 0 && { files: selectedFiles })
        };
        
        const response = await apiService.queryAI(request);
        
        const parsed = parseAIResponse(response.answer, response.citations);
        
        let fullResponse = parsed.mainAnswer;
        if (parsed.sources.length > 0) {
          fullResponse += `\n\n---\n\n**${t('chat.sourcesLabel')}**\n\n`;
          fullResponse += parsed.sources.join('\n');
        }
        
        const aiMessage: Message = {
          content: { text: fullResponse },
          isInitial: false,
          isUser: false,
          citations: parsed.citations
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        const errorMessage: Message = {
          content: { text: t('chat.error') },
          isInitial: false,
          isUser: false
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        setInput('');
        setSelectedFiles([]);
      }
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleShuffle = () => {
    setPrompts([...prompts].sort(() => Math.random() - 0.5));
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleLevelChange = (level: 'newbie' | 'novice' | 'expert') => {
    setSelectedLevel(level);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    localStorage.setItem('feedbackShown', 'true');
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages-wrapper">
          <div className="chat-log">
            <div className="chat-log-inner">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} content={msg.content} isInitial={msg.isInitial} isUser={msg.isUser} citations={msg.citations} />
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
            selectedFiles={selectedFiles}
            isLoading={isLoading}
          />
        </div>
      </div>
      <FeedbackModal isOpen={showFeedbackModal} onClose={handleCloseFeedbackModal} />
    </>
  );
};