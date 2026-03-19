import React from 'react';

interface ChatMessageContent {
  title?: string;
  description?: string;
  text?: string;
  list?: string[];
}



interface ChatMessageProps {
  content: ChatMessageContent;
  isInitial?: boolean;
  isUser?: boolean;
  citations?: Array<{ source: string; type: string }>;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, isInitial = false, isUser = false, citations = [] }) => {
  if (isInitial) {
    return (
      <div className="initial-state-container">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="user-message">
        <div className="message-content">{content.text}</div>
      </div>
    );
  }

  return (
    <div className="ai-message">
      <div className="ai-avatar">
        <img src="/modcus-logo-no-text.png" alt="AI" className="w-full h-full object-contain" />
      </div>
      <div className="message-content">
        <h3>{content.title}</h3>
        {content.text && <p dangerouslySetInnerHTML={{ __html: content.text }} />}
        {content.list && (
          <ul>
            {content.list.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}
        {citations && citations.length > 0 && (
          <div className="citations-section">
            <div className="citations-header">
              <svg className="citations-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L2 6V12L8 16L14 12V6L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="6" r="0.5" fill="currentColor"/>
              </svg>
              <span className="citations-title">Sources</span>
            </div>
            <div className="citations-list">
              {citations.map((citation, idx) => (
                <div key={idx} className="citation-item">
                  <div className="citation-number">{idx + 1}</div>
                  <div className="citation-content">
                    <div className="citation-source">{citation.source}</div>
                    <div className="citation-type">{citation.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
