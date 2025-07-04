// src/store/guideStore.ts
import { create } from 'zustand';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface GuideState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  askQuestion: (question: string, locationName: string) => Promise<void>;
  startConversation: (locationName: string) => void;
  clearChat: () => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  startConversation: (locationName) => {
    set({
      messages: [{
        sender: 'bot',
        text: `Olá! Sou Iara, sua guia virtual. O que você gostaria de saber sobre o ${locationName}?`
      }],
      isLoading: false,
      error: null,
    });
  },

  clearChat: () => set({ messages: [], error: null }),

  askQuestion: async (question, locationName) => {
    const userMessage: ChatMessage = { sender: 'user', text: question };
    set(state => ({ messages: [...state.messages, userMessage], isLoading: true, error: null }));

    try {
      const response = await fetch('/api/ask-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, locationName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'A IA não conseguiu responder.');
      }

      const data = await response.json();
      const botMessage: ChatMessage = { sender: 'bot', text: data.answer };
      
      set(state => ({ messages: [...state.messages, botMessage], isLoading: false }));

    } catch (error) {
      if (error instanceof Error) {
        const errorMessage: ChatMessage = { sender: 'bot', text: `Desculpe, ocorreu um erro: ${error.message}` };
        set(state => ({ messages: [...state.messages, errorMessage], isLoading: false, error: error.message }));
      }
    }
  },
}));