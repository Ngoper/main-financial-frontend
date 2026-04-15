import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { apiService, ChatMessage, ChatSession } from '../services/api';

export interface UIMessage {
  id: string;
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

interface UseChatSessionState {
  sessions: ChatSession[];
  loadingSessions: boolean;
  loadingMessages: boolean;
  currentSessionId: number | null;
  currentConversationId: string | null;
  messagesCursor: number;
  hasMoreMessages: boolean;
}

interface UseChatSessionResult extends UseChatSessionState {
  messages: UIMessage[];
  loadSessions: () => Promise<ChatSession[]>;
  createSession: (mode: string, level: 'newbie' | 'novice' | 'expert', title?: string) => Promise<ChatSession>;
  selectSession: (session: ChatSession) => Promise<void>;
  loadMoreMessages: (limit?: number) => Promise<void>;
  clearSelection: () => void;
  refreshSessions: () => Promise<void>;
  patchCurrentSessionLink: (sessionId: number, conversationId?: string) => void;
  setMessages: Dispatch<SetStateAction<UIMessage[]>>;
}

function parseJSONSafe<T>(input: string, fallback: T): T {
  try {
    if (!input) return fallback;
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}

function toUIMessage(msg: ChatMessage): UIMessage {
  const citations = parseJSONSafe<Array<{ source: string; type: string }>>(msg.citations, []);
  return {
    id: String(msg.ID),
    content: { text: msg.content },
    isInitial: false,
    isUser: msg.role === 'user',
    citations,
  };
}

export function useChatSession(): UseChatSessionResult {
  const [state, setState] = useState<UseChatSessionState>({
    sessions: [],
    loadingSessions: false,
    loadingMessages: false,
    currentSessionId: null,
    currentConversationId: null,
    messagesCursor: 0,
    hasMoreMessages: false,
  });

  const [messages, setMessages] = useState<UIMessage[]>([]);

  const loadSessions = useCallback(async () => {
    setState((prev) => ({ ...prev, loadingSessions: true }));
    try {
      const res = await apiService.listChatSessions(1, 50);
      setState((prev) => ({ ...prev, sessions: res.data, loadingSessions: false }));
      return res.data;
    } catch {
      setState((prev) => ({ ...prev, loadingSessions: false }));
      return [];
    }
  }, []);

  const createSession = useCallback(async (mode: string, level: 'newbie' | 'novice' | 'expert', title?: string) => {
    const created = await apiService.createChatSession({ mode, level, title });
    setState((prev) => ({
      ...prev,
      sessions: [created, ...prev.sessions.filter((item) => item.ID !== created.ID)],
      currentSessionId: created.ID,
      currentConversationId: created.conversation_id || null,
      messagesCursor: 0,
      hasMoreMessages: false,
    }));
    setMessages([]);
    return created;
  }, []);

  const selectSession = useCallback(async (session: ChatSession) => {
    setState((prev) => ({
      ...prev,
      currentSessionId: session.ID,
      currentConversationId: session.conversation_id || null,
      loadingMessages: true,
      messagesCursor: 0,
    }));

    const res = await apiService.getSessionMessages(session.ID, undefined, 200);
    const mapped = res.data.map(toUIMessage);
    setMessages(mapped);
    setState((prev) => ({
      ...prev,
      loadingMessages: false,
      messagesCursor: res.next_cursor,
      hasMoreMessages: res.has_more,
    }));
  }, []);

  const loadMoreMessages = useCallback(async (limit = 50) => {
    if (!state.currentSessionId || !state.hasMoreMessages || state.loadingMessages) {
      return;
    }

    setState((prev) => ({ ...prev, loadingMessages: true }));
    try {
      const res = await apiService.getSessionMessages(state.currentSessionId, state.messagesCursor, limit);
      const mapped = res.data.map(toUIMessage);
      setMessages((prev) => [...mapped, ...prev]);
      setState((prev) => ({
        ...prev,
        loadingMessages: false,
        messagesCursor: res.next_cursor,
        hasMoreMessages: res.has_more,
      }));
    } catch {
      setState((prev) => ({ ...prev, loadingMessages: false }));
    }
  }, [state.currentSessionId, state.hasMoreMessages, state.loadingMessages, state.messagesCursor]);

  const clearSelection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentSessionId: null,
      currentConversationId: null,
      messagesCursor: 0,
      hasMoreMessages: false,
    }));
    setMessages([]);
  }, []);

  const refreshSessions = useCallback(async () => {
    await loadSessions();
  }, [loadSessions]);

  const patchCurrentSessionLink = useCallback((sessionId: number, conversationId?: string) => {
    if (!conversationId) return;
    setState((prev) => ({
      ...prev,
      currentConversationId: prev.currentSessionId === sessionId ? conversationId : prev.currentConversationId,
      sessions: prev.sessions.map((item) => (item.ID === sessionId ? { ...item, conversation_id: conversationId } : item)),
    }));
  }, []);

  return useMemo(
    () => ({
      ...state,
      messages,
      loadSessions,
      createSession,
      selectSession,
      loadMoreMessages,
      clearSelection,
      refreshSessions,
      patchCurrentSessionLink,
      setMessages,
    }),
    [state, messages, loadSessions, createSession, selectSession, loadMoreMessages, clearSelection, refreshSessions, patchCurrentSessionLink],
  );
}
