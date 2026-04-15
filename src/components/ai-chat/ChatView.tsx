import React, { useEffect, useMemo, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ExamplePrompts } from './ExamplePrompts';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';
import { FeedbackModal } from './FeedbackModal';
import { apiService, AIQueryRequest } from '../../services/api';
import { parseAIResponse } from '../../utils/responseFormatter';
import { useTranslation } from '../../i18n/TranslationContext';
import { UIMessage } from '../../hooks/useChatSession';

type Message = UIMessage;

interface ChatViewProps {
  mode: string;
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
  sessionId?: number | null;
  conversationId?: string | null;
  onSessionLinked?: (sessionId: number, conversationId?: string) => void;
  onLoadMoreMessages?: (limit?: number) => Promise<void>;
  hasMoreMessages?: boolean;
  loadingMessages?: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({
  mode,
  messages,
  onMessagesChange,
  sessionId,
  conversationId,
  onSessionLinked,
  onLoadMoreMessages,
  hasMoreMessages = false,
  loadingMessages = false,
}) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<'newbie' | 'novice' | 'expert'>('newbie');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const hasUserSentMessage = useMemo(
    () => messages.some((message) => !message.isInitial && message.isUser),
    [messages],
  );

  useEffect(() => {
    const promptCount = parseInt(localStorage.getItem('promptCount') || '0', 10);
    const feedbackShown = localStorage.getItem('feedbackShown') === 'true';

    if (promptCount >= 3 && !feedbackShown) {
      setShowFeedbackModal(true);
    }
  }, []);

  useEffect(() => {
    initializeChatMode(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          list: t('chat.modes.rekomendasi.initialList') as unknown as string[],
        };
        examplePrompts = t('chat.modes.rekomendasi.examples') as unknown as string[];
        break;
      case 'analisis':
        initialContent = {
          title: t('chat.modes.analisis.initialTitle'),
          description: t('chat.modes.analisis.initialDescription'),
        };
        examplePrompts = t('chat.modes.analisis.examples') as unknown as string[];
        break;
      case 'dokumen':
        initialContent = {
          title: t('chat.modes.dokumen.initialTitle'),
          description: t('chat.modes.dokumen.initialDescription'),
        };
        examplePrompts = t('chat.modes.dokumen.examples') as unknown as string[];
        break;
      default:
        initialContent = { title: t('chat.title'), description: t('chat.modes.welcomeSubtitle') };
        examplePrompts = [];
    }

    const hasExisting = messages.some((msg) => !msg.isInitial);
    if (!hasExisting) {
      onMessagesChange([
        {
          id: `initial-${modeType}`,
          content: initialContent,
          isInitial: initialContent.description !== undefined,
        },
      ]);
    }

    setPrompts(examplePrompts);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: { text: input },
      isInitial: false,
      isUser: true,
    };

    const baseMessages = [...messages, userMessage];
    onMessagesChange(baseMessages);
    setIsLoading(true);

    const currentCount = parseInt(localStorage.getItem('promptCount') || '0', 10);
    const newCount = currentCount + 1;
    localStorage.setItem('promptCount', newCount.toString());

    const feedbackShown = localStorage.getItem('feedbackShown') === 'true';
    if (newCount === 3 && !feedbackShown) {
      setTimeout(() => setShowFeedbackModal(true), 1000);
    }

    try {
      const modeMap: Record<string, AIQueryRequest['mode']> = {
        rekomendasi: 'stock-recommendations',
        analisis: 'company-analysis',
        dokumen: 'document-analysis',
      };

      const request: AIQueryRequest = {
        mode: modeMap[mode] || 'company-analysis',
        level: selectedLevel,
        query: input,
        ...(sessionId ? { sessionId } : {}),
        ...(conversationId ? { conversationId } : {}),
        ...(selectedFiles.length > 0 ? { files: selectedFiles } : {}),
      };

      const response = await apiService.queryAI(request);

      if (sessionId && response.conversation_id) {
        onSessionLinked?.(sessionId, response.conversation_id);
      }

      const parsed = parseAIResponse(response.answer, response.citations);

      let fullResponse = parsed.mainAnswer;
      if (parsed.sources.length > 0) {
        fullResponse += `\n\n---\n\n**${t('chat.sourcesLabel')}**\n\n`;
        fullResponse += parsed.sources.join('\n');
      }

      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: { text: fullResponse },
        isInitial: false,
        isUser: false,
        citations: parsed.citations,
      };

      onMessagesChange([...baseMessages, aiMessage]);
    } catch {
      const errorMessage: Message = {
        id: `assistant-error-${Date.now()}`,
        content: { text: t('chat.error') },
        isInitial: false,
        isUser: false,
      };
      onMessagesChange([...baseMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setInput('');
      setSelectedFiles([]);
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

  const handleLoadOlder = async () => {
    if (!onLoadMoreMessages || loadingMessages || !hasMoreMessages) return;
    await onLoadMoreMessages(50);
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages-wrapper">
          <div className="chat-log">
            <div className="chat-log-inner">
              {hasMoreMessages && (
                <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={handleLoadOlder}
                    disabled={loadingMessages}
                  >
                    {loadingMessages ? t('common.loading') : t('chat.loadOlder')}
                  </button>
                </div>
              )}
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={msg.id || idx}
                  content={msg.content}
                  isInitial={msg.isInitial}
                  isUser={msg.isUser}
                  citations={msg.citations}
                />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          {prompts.length > 0 && !hasUserSentMessage && (
            <ExamplePrompts prompts={prompts} onSelectPrompt={handleSelectPrompt} onShuffle={handleShuffle} />
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
