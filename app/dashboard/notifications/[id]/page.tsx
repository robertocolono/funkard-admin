"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Bell, AlertTriangle, Info, MessageSquare, ShoppingBag, Database, CheckCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { apiGet, apiDelete } from "@/lib/api";
import { getActionHistory } from "@/services/adminService";
import { AdminActionLog } from "@/types/AdminActionLog";

interface NotificationDetail {
  id: string;
  type: "error" | "market" | "support" | "system";
  title: string;
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  createdAt: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  metadata?: {
    source?: string;
    userId?: string;
    itemId?: string;
    ticketId?: string;
    errorCode?: string;
  };
  history: Array<{
    action: string;
    timestamp: string;
    user: string;
  }>;
}

export default function NotificationDetailPage() {
  const params = useParams();
  const [notification, setNotification] = useState<NotificationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AdminActionLog[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Funzione per caricare lo storico
  const loadHistory = async () => {
    if (!params.id) return;
    
    setHistoryLoading(true);
    try {
      const actionHistory = await getActionHistory("NOTIFICATION", parseInt(params.id as string));
      setHistory(actionHistory);
    } catch (err) {
      console.error("Errore caricamento storico:", err);
      // Fallback a mock data per testing
      setHistory([
        {
          id: 1,
          targetId: parseInt(params.id as string),
          targetType: "NOTIFICATION",
          action: "Notifica creata",
          performedBy: "system",
          role: "system",
          notes: "Notifica generata automaticamente dal sistema",
          createdAt: "2025-01-15T10:30:00Z"
        },
        {
          id: 2,
          targetId: parseInt(params.id as string),
          targetType: "NOTIFICATION",
          action: "Tentativo di riconnessione automatica",
          performedBy: "system",
          role: "system",
          notes: "Sistema ha tentato di riconnettersi al database",
          createdAt: "2025-01-15T10:32:00Z"
        }
      ]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Fetch reale pronto, da attivare dopo fix backend:
    /*
    apiGet<NotificationDetail>(`/api/admin/notifications/${params.id}`)
      .then(setNotification)
      .catch(err => {
        console.error("Errore nel caricamento notifica:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing UI
    setTimeout(() => {
      setNotification({
        id: params.id as string,
        type: "error",
        title: "Errore connessione DB",
        message: "Tentativo fallito di connessione al database PostgreSQL. L'errore si è verificato durante l'operazione di aggiornamento dei prezzi delle carte. Il sistema ha tentato di riconnettersi automaticamente ma senza successo.",
        severity: "critical",
        createdAt: "2025-01-15T10:30:00Z",
        resolved: false,
        metadata: {
          source: "database",
          errorCode: "DB_CONNECTION_TIMEOUT",
          userId: "system"
        },
        history: [
          {
            action: "Notifica creata",
            timestamp: "2025-01-15T10:30:00Z",
            user: "system"
          },
          {
            action: "Tentativo di riconnessione automatica",
            timestamp: "2025-01-15T10:32:00Z",
            user: "system"
          }
        ]
      });
      setLoading(false);
      
      // Carica lo storico
      loadHistory();
    }, 600);
  }, [params.id]);

  const handleResolve = async () => {
    try {
      // ✅ API reale pronta
      // await apiDelete(`/api/admin/notifications/${params.id}/resolve`);
      
      // Mock temporaneo
      if (notification) {
        setNotification({
          ...notification,
          resolved: true,
          resolvedAt: new Date().toISOString(),
          resolvedBy: "admin",
          history: [
            ...notification.history,
            {
              action: "Notifica risolta",
              timestamp: new Date().toISOString(),
              user: "admin"
            }
          ]
        });
      }
    } catch (err) {
      console.error("Errore risoluzione notifica:", err);
      setError("Errore nella risoluzione della notifica");
    }
  };

  const handleDelete = async () => {
    try {
      // ✅ API reale pronta
      // await apiDelete(`/api/admin/notifications/${params.id}`);
      
      // Mock temporaneo - redirect alla lista
      window.location.href = "/dashboard/notifications";
    } catch (err) {
      console.error("Errore eliminazione notifica:", err);
      setError("Errore nell'eliminazione della notifica");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Caricamento dettagli notifica...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">Errore: {error}</p>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <p className="text-yellow-600">Notifica non trovata</p>
      </div>
    );
  }

  const getIcon = (type: string, severity: string) => {
    const color =
      severity === "critical"
        ? "text-red-600"
        : severity === "high"
        ? "text-orange-500"
        : severity === "medium"
        ? "text-yellow-500"
        : "text-blue-500";

    const icons: Record<string, JSX.Element> = {
      error: <AlertTriangle className={`w-6 h-6 ${color}`} />,
      market: <ShoppingBag className={`w-6 h-6 ${color}`} />,
      support: <MessageSquare className={`w-6 h-6 ${color}`} />,
      system: <Database className={`w-6 h-6 ${color}`} />,
    };
    return icons[type] || <Info className={`w-6 h-6 ${color}`} />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/dashboard/notifications"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-semibold">Notifica #{notification.id}</h2>
          <p className="text-gray-600">{notification.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informazioni notifica */}
        <div className="lg:col-span-1 space-y-6">
          {/* Dettagli principali */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Informazioni Notifica
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tipo:</span>
                <span className="text-sm font-medium">{notification.type.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Severità:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(notification.severity)}`}>
                  {notification.severity.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stato:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  notification.resolved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {notification.resolved ? "RISOLTA" : "ATTIVA"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Creata:</span>
                <span className="text-sm font-medium">
                  {new Date(notification.createdAt).toLocaleString("it-IT")}
                </span>
              </div>
              {notification.resolved && notification.resolvedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Risolta:</span>
                  <span className="text-sm font-medium">
                    {new Date(notification.resolvedAt).toLocaleString("it-IT")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Metadati */}
          {notification.metadata && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Metadati</h3>
              <div className="space-y-2">
                {notification.metadata.source && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sorgente:</span>
                    <span className="text-sm font-medium">{notification.metadata.source}</span>
                  </div>
                )}
                {notification.metadata.errorCode && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Codice errore:</span>
                    <span className="text-sm font-medium">{notification.metadata.errorCode}</span>
                  </div>
                )}
                {notification.metadata.userId && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">User ID:</span>
                    <span className="text-sm font-medium">{notification.metadata.userId}</span>
                  </div>
                )}
                {notification.metadata.itemId && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Item ID:</span>
                    <span className="text-sm font-medium">{notification.metadata.itemId}</span>
                  </div>
                )}
                {notification.metadata.ticketId && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ticket ID:</span>
                    <span className="text-sm font-medium">{notification.metadata.ticketId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Azioni */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Azioni</h3>
            <div className="space-y-2">
              {!notification.resolved && (
                <button 
                  onClick={handleResolve}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Risolvi notifica
                </button>
              )}
              <button 
                onClick={handleDelete}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Elimina notifica
              </button>
            </div>
          </div>
        </div>

        {/* Contenuto e cronologia */}
        <div className="lg:col-span-2 space-y-6">
          {/* Messaggio */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {getIcon(notification.type, notification.severity)}
              Dettagli Notifica
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg mb-2">{notification.title}</h4>
                <p className="text-gray-700 leading-relaxed">{notification.message}</p>
              </div>
            </div>
          </div>

          {/* Cronologia */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Cronologia</h3>
            <div className="space-y-3">
              {notification.history.map((entry, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium">{entry.action}</p>
                    <p className="text-sm text-gray-600">da {entry.user}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleString("it-IT")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Storico azioni */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Storico Azioni</h3>
            {historyLoading ? (
              <p className="text-sm text-gray-500">Caricamento storico...</p>
            ) : history.length === 0 ? (
              <p className="text-xs text-gray-500">Nessuna azione registrata.</p>
            ) : (
              <ul className="space-y-1">
                {history.map((a) => (
                  <li key={a.id} className="text-xs text-gray-700">
                    <b>{a.performedBy}</b> ({a.role}) → <span className="font-medium">{a.action}</span>
                    {a.notes ? ` — ${a.notes}` : ""} <br />
                    <span className="text-[10px] text-gray-400">{new Date(a.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
