"use client";

import { useEffect, useState } from "react";
import { getAdminNotificationsArchive } from "@/lib/services/adminNotifications";
import { motion } from "framer-motion";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "ERROR" | "SUCCESS";
  resolvedAt: string;
  createdAt: string;
}

export default function AdminNotificationsArchive({ token }: { token: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminNotificationsArchive(token);
        setNotifications(data);
      } catch (err) {
        console.error("Errore nel caricamento archivio:", err);
        setError("Errore nel caricamento dell'archivio notifiche");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ERROR":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "WARNING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "SUCCESS":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "INFO":
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        <span className="ml-3 text-gray-400">Caricamento archivio...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📦</div>
        <p className="text-gray-400 text-lg">Nessuna notifica archiviata</p>
        <p className="text-gray-500 text-sm mt-2">
          Le notifiche risolte appariranno qui
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">
          📦 Archivio Notifiche ({notifications.length})
        </h2>
        <div className="text-sm text-gray-400">
          Notifiche risolte e archiviate
        </div>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50 hover:bg-zinc-900/70 transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                <h3 className="text-white font-semibold text-lg">
                  {notification.title}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${getTypeColor(notification.type)}`}
                >
                  {notification.type}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              {notification.message}
            </p>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div>
                <span className="text-gray-400">Creata:</span>{" "}
                {new Date(notification.createdAt).toLocaleString("it-IT")}
              </div>
              <div>
                <span className="text-gray-400">Risolta:</span>{" "}
                {new Date(notification.resolvedAt).toLocaleString("it-IT")}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {notifications.length > 10 && (
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Mostrando {notifications.length} notifiche archiviate
          </p>
        </div>
      )}
    </div>
  );
}
