'use client';

import { useState } from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { Bell, X, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function NotificationDrawer() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, resetUnread } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new-ticket':
        return '🆕';
      case 'ticket-reply':
        return '💬';
      case 'ticket-assigned':
        return '🎯';
      case 'ticket-resolved':
        return '✅';
      case 'ticket-status-changed':
        return '📬';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new-ticket':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ticket-reply':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ticket-assigned':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ticket-resolved':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'ticket-status-changed':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ora';
    if (minutes < 60) return `${minutes}m fa`;
    if (hours < 24) return `${hours}h fa`;
    return `${days}g fa`;
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.ticketId);
    setOpen(false);
  };

  return (
    <>
      {/* Pulsante apertura drawer */}
      <button
        onClick={() => setOpen(true)}
        className="relative text-gray-300 hover:text-white transition-colors flex items-center gap-2"
      >
        <Bell className="w-5 h-5" />
        <span className="text-sm">Notifiche</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer notifiche */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-96 bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                <h2 className="text-lg font-semibold text-white">Notifiche</h2>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <Button
                    onClick={resetUnread}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Segna tutte lette
                  </Button>
                )}
                <Button
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Lista notifiche */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                  <p className="text-gray-500 text-sm">Nessuna notifica recente</p>
                  <p className="text-gray-600 text-xs mt-1">
                    Le notifiche appariranno qui quando arriveranno eventi
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {notifications.slice(0, 20).map((notification) => (
                    <motion.li
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 hover:bg-zinc-900 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-zinc-800/50' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm text-white font-medium truncate">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <Badge className={`text-xs ${getNotificationColor(notification.type)}`}>
                              {notification.type.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {formatTime(notification.timestamp)}
                              </span>
                              <ExternalLink className="w-3 h-3 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900">
              <Link
                href="/dashboard/notifications"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Vedi tutte le notifiche
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
