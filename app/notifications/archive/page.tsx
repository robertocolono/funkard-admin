"use client";

import { useEffect, useState } from "react";
import { getArchivedNotifications, AdminNotification } from "@/services/adminNotifications";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Archive } from "lucide-react";

export default function NotificationsArchivePage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArchived = async () => {
      try {
        const data = await getArchivedNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Errore nel caricamento archivio notifiche:", err);
      } finally {
        setLoading(false);
      }
    };
    loadArchived();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Caricamento archivio...
      </div>
    );

  if (notifications.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Archive className="w-6 h-6 mb-2" />
        Nessuna notifica archiviata
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center mb-6">
        <Archive className="w-6 h-6 text-gray-600 mr-2" />
        <h1 className="text-2xl font-semibold text-gray-800">Archivio Notifiche</h1>
      </header>

      <p className="text-sm text-gray-500 mb-6">
        Elenco delle notifiche risolte negli ultimi 30 giorni.
        Le notifiche più vecchie verranno eliminate automaticamente.
      </p>

      <div className="grid gap-3">
        {notifications.map((n) => (
          <Card key={n.id} className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="font-medium text-gray-800">{n.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                Risolta il {new Date(n.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
