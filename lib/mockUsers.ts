// lib/mockUsers.ts
import { AdminUser } from "@/types/User";

export const mockUsers: AdminUser[] = [
  {
    id: "u1",
    name: "Luca Rossi",
    email: "luca@example.com",
    joinedAt: "2025-09-10T10:15:00Z",
    lastLogin: "2025-01-15T22:30:00Z",
    status: "active",
    cards: 12,
    orders: 4,
    reports: 0,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    phone: "+39 333 123 4567",
    location: "Milano, Italia"
  },
  {
    id: "u2",
    name: "Elena Verdi",
    email: "elena@example.com",
    joinedAt: "2025-08-22T09:00:00Z",
    lastLogin: "2025-01-14T19:45:00Z",
    status: "suspended",
    cards: 3,
    orders: 1,
    reports: 2,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    phone: "+39 333 987 6543",
    location: "Roma, Italia"
  },
  {
    id: "u3",
    name: "Marco Bianchi",
    email: "marco@example.com",
    joinedAt: "2025-07-04T15:30:00Z",
    lastLogin: "2025-01-12T11:00:00Z",
    status: "banned",
    cards: 0,
    orders: 0,
    reports: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    phone: "+39 333 555 7890",
    location: "Napoli, Italia"
  },
  {
    id: "u4",
    name: "Giulia Neri",
    email: "giulia@example.com",
    joinedAt: "2025-06-15T14:20:00Z",
    lastLogin: "2025-01-15T16:15:00Z",
    status: "active",
    cards: 8,
    orders: 6,
    reports: 0,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    phone: "+39 333 444 5555",
    location: "Torino, Italia"
  },
  {
    id: "u5",
    name: "Andrea Ferrari",
    email: "andrea@example.com",
    joinedAt: "2025-05-28T11:45:00Z",
    lastLogin: "2025-01-13T09:30:00Z",
    status: "active",
    cards: 15,
    orders: 8,
    reports: 1,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    phone: "+39 333 666 7777",
    location: "Firenze, Italia"
  }
];
