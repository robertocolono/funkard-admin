"use client";

import { useEffect, useState } from "react";
import {
  getActiveNotifications,
  markNotificationAsResolved,
  AdminNotification,
} from "@/services/adminNotifications";
import { Loader2, CheckCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminNotificationList() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActiveNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Errore nel caricamento notifiche:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleResolve = async (id: number) => {
    setResolving(id);
    try {
      await markNotificationAsResolved(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Errore durante la risoluzione:", err);
    } finally {
      setResolving(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Caricamento notifiche...
      </div>
    );

  if (notifications.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Bell className="w-6 h-6 mb-2" />
        Nessuna notifica attiva
      </div>
    );

  return (
    <div className="grid gap-3">
      {notifications.map((n) => (
        <Card key={n.id} className="border border-gray-200 shadow-sm">
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <p className="font-medium text-gray-800">{n.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={resolving === n.id}
              onClick={() => handleResolve(n.id)}
            >
              {resolving === n.id ? (
                <>
                  <Loader2 className="animate-spin mr-1 w-4 h-4" /> Risoluzione...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  Risolvi
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
