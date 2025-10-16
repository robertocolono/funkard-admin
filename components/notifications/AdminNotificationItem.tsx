"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminNotification, markAsResolved } from "@/services/adminNotifications";

interface AdminNotificationItemProps {
  notification: AdminNotification;
  onResolved: (id: string) => void;
}

export default function AdminNotificationItem({ 
  notification, 
  onResolved 
}: AdminNotificationItemProps) {
  const [isResolving, setIsResolving] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ERROR":
        return "❌";
      case "WARNING":
        return "⚠️";
      case "SUCCESS":
        return "✅";
      case "INFO":
      default:
        return "ℹ️";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ERROR":
        return "border-red-500/30 bg-red-900/10";
      case "WARNING":
        return "border-yellow-500/30 bg-yellow-900/10";
      case "SUCCESS":
        return "border-green-500/30 bg-green-900/10";
      case "INFO":
      default:
        return "border-blue-500/30 bg-blue-900/10";
    }
  };

  const getTypeTextColor = (type: string) => {
    switch (type) {
      case "ERROR":
        return "text-red-400";
      case "WARNING":
        return "text-yellow-400";
      case "SUCCESS":
        return "text-green-400";
      case "INFO":
      default:
        return "text-blue-400";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Ora";
    if (diffInMinutes < 60) return `${diffInMinutes} minuti fa`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ore fa`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} giorni fa`;
  };

  const handleResolve = async () => {
    try {
      setIsResolving(true);
      await markAsResolved(notification.id);
      onResolved(notification.id);
    } catch (error) {
      console.error("Errore nel risolvere la notifica:", error);
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg border ${getTypeColor(notification.type)} ${
        !notification.isRead ? "ring-2 ring-yellow-400/20" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{getTypeIcon(notification.type)}</span>
            <div className="flex-1">
              <h3 className={`font-semibold ${getTypeTextColor(notification.type)}`}>
                {notification.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {notification.message}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>🕒 {formatTimeAgo(notification.createdAt)}</span>
              {notification.productId && (
                <span>📦 ID: {notification.productId}</span>
              )}
              {notification.userId && (
                <span>👤 User: {notification.userId}</span>
              )}
            </div>
            
            {!notification.isRead && (
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
        
        <div className="ml-4">
          <button
            onClick={handleResolve}
            disabled={isResolving}
            className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isResolving ? "Risolvendo..." : "Risolvi"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
