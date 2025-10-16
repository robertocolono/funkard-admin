"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type AdminNotification = {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "ERROR" | "SUCCESS";
  createdAt: string;
  isRead: boolean;
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // 1️⃣ Recupera le notifiche iniziali
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications`, {
      headers: { "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "" }
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setUnreadCount(data.filter((n: AdminNotification) => !n.isRead).length);
      })
      .catch(console.error);

    // 2️⃣ Attiva lo stream SSE
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/stream`);

    eventSource.addEventListener("notification", (event) => {
      const newNotif = JSON.parse(event.data);
      console.log("🔔 Nuova notifica ricevuta:", newNotif);
      
      // Aggiorna stato locale
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // 🔔 Toast in tempo reale
      const getToastStyle = (type: string) => {
        switch (type) {
          case "ERROR":
            return {
              background: "linear-gradient(135deg, #dc2626, #991b1b)",
              border: "1px solid #dc2626",
              boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)"
            };
          case "WARNING":
            return {
              background: "linear-gradient(135deg, #d97706, #92400e)",
              border: "1px solid #d97706",
              boxShadow: "0 10px 25px rgba(217, 119, 6, 0.3)"
            };
          case "SUCCESS":
            return {
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              border: "1px solid #16a34a",
              boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)"
            };
          case "INFO":
          default:
            return {
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              border: "1px solid #2563eb",
              boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)"
            };
        }
      };

      toast(newNotif.title, {
        description: newNotif.message,
        duration: 6000,
        style: {
          ...getToastStyle(newNotif.type),
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "500"
        }
      });
    });

    eventSource.addEventListener("notification-resolved", (event) => {
      const resolvedNotif = JSON.parse(event.data);
      console.log("✅ Notifica risolta:", resolvedNotif);
      setNotifications((prev) => prev.filter(n => n.id !== resolvedNotif.id));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    });

    eventSource.onerror = (error) => {
      console.error("❌ Errore SSE:", error);
    };

    return () => eventSource.close();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/${id}/read`, { 
        method: "PATCH",
        headers: { "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "" }
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Errore nel marcare come letta:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/read-all`, { 
        method: "PATCH",
        headers: { "X-Admin-Token": localStorage.getItem("funkard_admin_token") || "" }
      });
      setNotifications((prev) => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Errore nel marcare tutte come lette:", error);
    }
  };

  return (
    <div className="relative">
      {/* 🔔 Icona campanella */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200"
      >
        <Bell className="w-6 h-6 text-gray-100" />
        {unreadCount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full font-bold"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </button>

      {/* 📋 Menu notifiche */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 max-h-[400px] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50"
          >
            <div className="p-3 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-white text-sm font-semibold">Notifiche</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-yellow-400 text-xs hover:text-yellow-300 font-medium"
                  >
                    Segna tutte
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 text-xs hover:text-gray-200"
                >
                  Chiudi
                </button>
              </div>
            </div>

            <div className="divide-y divide-zinc-800">
              {notifications.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm text-center">
                  Nessuna notifica
                </div>
              ) : (
                notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={() => markAsRead(notif.id)}
                    className={`p-3 cursor-pointer hover:bg-zinc-800 transition-colors duration-200 ${
                      !notif.isRead ? "bg-zinc-950 border-l-2 border-yellow-400" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs uppercase font-bold px-2 py-1 rounded ${
                            notif.type === "ERROR"
                              ? "text-red-400 bg-red-900/20"
                              : notif.type === "WARNING"
                              ? "text-yellow-400 bg-yellow-900/20"
                              : notif.type === "SUCCESS"
                              ? "text-green-400 bg-green-900/20"
                              : "text-blue-400 bg-blue-900/20"
                          }`}
                        >
                          {notif.type}
                        </span>
                        {!notif.isRead && (
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-white text-sm mt-2 font-medium">{notif.title}</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-zinc-800 text-center">
                <p className="text-xs text-gray-500">
                  {notifications.length} notifica{notifications.length !== 1 ? 'e' : ''} totali
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
