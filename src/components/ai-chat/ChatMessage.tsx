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
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, isInitial = false }) => {
  if (isInitial) {
    return (
      <div className="initial-state-container">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>
    );
  }
  // For specific initial content like the "💎 Rekomendasi..." block,
  // remove the top padding so the title and text align with surrounding content.
  const noTopPadding = !!content.title && content.title.startsWith('💎 Rekomendasi');

  return (
    <div className={"ai-message" + (noTopPadding ? ' no-top-padding' : '')}>
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
  );
};
