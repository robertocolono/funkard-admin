// types/SupportTicket.ts

export type TicketStatus = "open" | "pending" | "resolved" | "archived";

export interface SupportTicket {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  subject: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
  status: TicketStatus;
  priority: "low" | "medium" | "high";
  category?: "payment" | "technical" | "account" | "product" | "other";
  adminResponse?: {
    message: string;
    adminId: string;
    timestamp: string;
  };
}
