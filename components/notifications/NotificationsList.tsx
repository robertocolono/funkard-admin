"use client";

import { motion, AnimatePresence } from "framer-motion";
import NotificationCard from "./NotificationCard";
import EmptyState, { EmptyNotifications, EmptySearchResults } from "@/components/common/EmptyState";

interface AdminNotification {
  id: number;
  type: string;
  priority: string;
  title: string;
  message: string;
  readStatus: boolean;
  readAt: string | null;
  createdAt: string;
  archived: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
  history: string;
}

interface NotificationsListProps {
  notifications: AdminNotification[];
  onMarkAsRead: (id: number) => void;
  onResolve: (id: number, note?: string) => void;
  onArchive: (id: number, note?: string) => void;
  isLoading?: boolean;
  searchQuery?: string;
}

export default function NotificationsList({
  notifications,
  onMarkAsRead,
  onResolve,
  onArchive,
  isLoading = false,
  searchQuery = "",
}: NotificationsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 bg-muted/30 rounded-lg animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-muted rounded" />
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="w-8 h-8 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    if (searchQuery) {
      return <EmptySearchResults />;
    }
    return <EmptyNotifications />;
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05 // Staggered animation
            }}
          >
            <NotificationCard
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onResolve={onResolve}
              onArchive={onArchive}
              isLoading={isLoading}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
