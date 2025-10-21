'use client';

import { create } from 'zustand';
import { fetchAllTickets } from '@/lib/funkardApi';

interface TicketsStore {
  tickets: any[];
  unread: number;
  reloadTickets: () => Promise<void>;
  incrementUnread: () => void;
  resetUnread: () => void;
}

export const useTicketsStore = create<TicketsStore>((set, get) => ({
  tickets: [],
  unread: 0,

  reloadTickets: async () => {
    try {
      const data = await fetchAllTickets();
      set({ tickets: data });
    } catch (error) {
      console.error('Errore reload tickets:', error);
    }
  },

  incrementUnread: () => {
    set((state) => ({ unread: state.unread + 1 }));
  },

  resetUnread: () => set({ unread: 0 }),
}));
