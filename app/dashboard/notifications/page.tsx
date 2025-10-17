"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ fetch reale pronto
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications`)
    //   .then(res => res.json())
    //   .then(setNotifications)
    //   .finally(() => setLoading(false));

    // Mock temporaneo per testing
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          title: "Nuovo prodotto senza storico",
          message: "Charizard Base Set aggiunto senza dati storici",
          type: "MARKET",
          severity: "WARN",
          resolved: false,
          createdAt: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "Errore di grading",
          message: "Problema con il sistema di valutazione automatica",
          type: "GRADING", 
          severity: "ERROR",
          resolved: false,
          createdAt: "2024-01-15T09:15:00Z"
        },
        {
          id: 3,
          title: "Ticket supporto urgente",
          message: "Nuovo ticket con priorità alta da mario.rossi@email.com",
          type: "SUPPORT",
          severity: "INFO",
          resolved: false,
          createdAt: "2024-01-15T08:45:00Z"
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-600 text-white';
      case 'ERROR': return 'bg-red-100 text-red-700';
      case 'WARN': return 'bg-yellow-100 text-yellow-700';
      case 'INFO': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MARKET': return '🛒';
      case 'GRADING': return '⚙️';
      case 'SUPPORT': return '🎧';
      case 'SYSTEM': return '🔧';
      case 'USER': return '👤';
      default: return '📢';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Notifiche Amministratore</h2>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Caricamento notifiche...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Nessuna notifica attiva</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(notification.createdAt).toLocaleString('it-IT')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(notification.severity)}`}>
                      {notification.severity}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      {notification.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!notification.resolved && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Risolvi
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                    Dettagli
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
