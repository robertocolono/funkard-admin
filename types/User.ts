// types/User.ts

export type UserStatus = "active" | "suspended" | "banned";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  status: UserStatus;
  cards: number;
  orders: number;
  reports: number;
  lastLogin: string;
  avatar?: string;
  phone?: string;
  location?: string;
}
