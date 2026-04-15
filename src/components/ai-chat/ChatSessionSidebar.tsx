import React from 'react';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';
import { ChatSession } from '../../services/api';
import { useTranslation } from '../../i18n/TranslationContext';

interface ChatSessionSidebarProps {
  sessions: ChatSession[];
  currentSessionId: number | null;
  loading?: boolean;
  onNewSession: () => void;
  onSelectSession: (session: ChatSession) => void;
  onDeleteSession: (session: ChatSession) => void;
}

function sessionTitle(session: ChatSession): string {
  if (session.title && session.title.trim() !== '') {
    return session.title;
  }
  return session.mode || 'New Chat';
}

function formatDateTime(input: string): string {
  if (!input) return '-';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString();
}

export const ChatSessionSidebar: React.FC<ChatSessionSidebarProps> = ({
  sessions,
  currentSessionId,
  loading = false,
  onNewSession,
  onSelectSession,
  onDeleteSession,
}) => {
  const { t } = useTranslation();

  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar-header">
        <h2>{t('chat.historyTitle')}</h2>
        <IonButton fill="solid" size="small" onClick={onNewSession}>
          <IonIcon icon={addOutline} slot="start" />
          {t('chat.historyNew')}
        </IonButton>
      </div>

      {loading ? (
        <div className="chat-sidebar-loading">
          <IonSpinner name="dots" />
        </div>
      ) : (
        <div className="chat-sidebar-list">
          {sessions.length === 0 ? (
            <div className="chat-sidebar-empty">{t('chat.historyEmpty')}</div>
          ) : (
            sessions.map((session) => (
              <button
                key={session.ID}
                className={`chat-session-item ${currentSessionId === session.ID ? 'active' : ''}`}
                onClick={() => onSelectSession(session)}
                  type="button"
                  aria-label={sessionTitle(session)}
              >
                <div className="chat-session-main">
                  <div className="chat-session-title">{sessionTitle(session)}</div>
                  <div className="chat-session-preview">{session.last_message_preview || t('chat.historyNoMessages')}</div>
                  <div className="chat-session-meta">{formatDateTime(session.last_message_at)}</div>
                </div>
                <span
                  className="chat-session-delete"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onDeleteSession(session);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <IonIcon icon={trashOutline} />
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </aside>
  );
};
