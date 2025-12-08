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
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, isInitial = false, isUser = false }) => {
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
      </div>
    </div>
  );
};
