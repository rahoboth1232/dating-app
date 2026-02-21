import { create } from 'zustand'

type ChatState = {
  activeChatId: string | null
  typingUsers: Record<string, boolean>
  unreadCount: number

  setActiveChat: (chatId: string | null) => void
  setUserTyping: (userId: string, typing: boolean) => void
  incrementUnread: () => void
  resetUnread: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  activeChatId: null,
  typingUsers: {},
  unreadCount: 0,

  setActiveChat: (chatId) =>
    set({
      activeChatId: chatId,
    }),

  setUserTyping: (userId, typing) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [userId]: typing,
      },
    })),

  incrementUnread: () =>
    set((state) => ({
      unreadCount: state.unreadCount + 1,
    })),

  resetUnread: () =>
    set({
      unreadCount: 0,
    }),
}))
