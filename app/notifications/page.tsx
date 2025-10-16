"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Wrench,
  User,
  ShoppingBag,
  Database,
  Info,
  Archive,
  CheckCircle2,
} from "lucide-react";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: "MARKET" | "GRADING" | "SUPPORT" | "SYSTEM" | "USER" | "INFO";
  severity: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  resolved: boolean;
  createdAt: string;
};

const typeIcons: Record<Notification["type"], JSX.Element> = {
  MARKET: <ShoppingBag className="text-yellow-500" />,
  GRADING: <Wrench className="text-red-500" />,
  SUPPORT: <Info className="text-green-500" />,
  SYSTEM: <Database className="text-gray-500" />,
  USER: <User className="text-blue-500" />,
  INFO: <Info className="text-sky-400" />,
};

const severityColors: Record<Notification["severity"], string> = {
  INFO: "bg-sky-100 text-sky-700",
  WARN: "bg-yellow-100 text-yellow-700",
  ERROR: "bg-red-100 text-red-700",
  CRITICAL: "bg-red-600 text-white",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [archived, setArchived] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ACTIVE");

  // 🔁 carica notifiche attive e archiviate
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const endpoint =
        filter === "ARCHIVED"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/archived`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/active`;

      const res = await fetch(endpoint);
      const data = await res.json();
      filter === "ARCHIVED" ? setArchived(data) : setNotifications(data);
    } catch (err) {
      console.error("Errore caricamento notifiche:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  // 🔘 segna come risolta
  const resolveNotification = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/${id}/resolve`, {
        method: "PATCH",
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Errore aggiornamento notifica:", err);
    }
  };

  const dataToRender = filter === "ARCHIVED" ? archived : notifications;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifiche amministratore</h1>
        <div className="flex gap-2">
          <Button
            variant={filter === "ACTIVE" ? "default" : "outline"}
            onClick={() => setFilter("ACTIVE")}
          >
            Attive
          </Button>
          <Button
            variant={filter === "ARCHIVED" ? "default" : "outline"}
            onClick={() => setFilter("ARCHIVED")}
          >
            <Archive className="w-4 h-4 mr-1" /> Archiviate
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : dataToRender.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Nessuna notifica {filter === "ARCHIVED" ? "archiviata" : "attiva"}.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {dataToRender.map((n) => (
            <Card
              key={n.id}
              className={`transition hover:shadow-lg border-l-4 ${
                n.severity === "CRITICAL"
                  ? "border-red-600"
                  : n.severity === "ERROR"
                  ? "border-red-400"
                  : n.severity === "WARN"
                  ? "border-yellow-400"
                  : "border-sky-400"
              }`}
            >
              <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  {typeIcons[n.type]}
                  <CardTitle className="text-sm font-semibold">{n.title}</CardTitle>
                </div>
                <Badge className={`${severityColors[n.severity]} text-xs`}>
                  {n.severity}
                </Badge>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-3">
                <p>{n.message}</p>
                <div className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString("it-IT")}
                </div>

                {filter === "ACTIVE" && (
                  <Button
                    size="sm"
                    className="w-full flex items-center justify-center gap-1"
                    onClick={() => resolveNotification(n.id)}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Segna come risolta
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
