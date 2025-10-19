export interface SupportTicket {
  id: string;
  email: string;
  subject: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
  resolvedAt?: string;
}

export interface SupportTicketRequest {
  email: string;
  subject: string;
  message: string;
}

export interface TicketStatusRequest {
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
  note?: string;
}

export interface SupportTicketFilters {
  status: string;
  search: string;
}