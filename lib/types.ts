export interface PendingItem {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  historicalData: number[];
  daysSinceLastUpdate: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Ticket {
  id: string;
  user: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdate: string;
  adminResponse?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'private' | 'business';
  createdAt: string;
  lastLogin: string;
  totalCards: number;
  totalSpent: number;
}

export interface Stats {
  users: number;
  cards: number;
  pending: number;
  tickets: number;
  revenue: number;
  growth: {
    users: number;
    cards: number;
    revenue: number;
  };
}

export interface SystemSettings {
  mailEnabled: boolean;
  adminEmail: string;
  apiStatus: 'online' | 'offline';
  lastBackup: string;
  version: string;
}
