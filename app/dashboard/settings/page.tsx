"use client";

import { useState } from "react";
import { Wrench, RefreshCw, Database, Trash2, FileText, Loader2 } from "lucide-react";
import { apiPost } from "@/lib/api";

export default function SettingsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    setLoading(action);
    setMessage(null);
    try {
      let endpoint = "";
      switch (action) {
        case "cleanup":
          endpoint = "/api/admin/maintenance/cleanup";
          break;
        case "refresh_market":
          endpoint = "/api/admin/valuation/refreshIncremental";
          break;
        case "rebuild_cache":
          endpoint = "/api/admin/maintenance/cache/rebuild";
          break;
        case "export_logs":
          endpoint = "/api/admin/maintenance/logs/export";
          break;
        default:
          return;
      }

      // ✅ API reale pronta, da attivare dopo fix CORS:
      /*
      const res = await apiPost(endpoint);
      setMessage(`✅ Azione completata con successo: ${action}`);
      */

      // Mock temporaneo per testing UI
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage(`✅ Azione completata con successo: ${action}`);
    } catch (err) {
      setMessage(`❌ Errore durante l'esecuzione: ${action}`);
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  const actions = [
    {
      id: "cleanup",
      label: "Pulizia DB & Notifiche Risolte",
      description: "Rimuove notifiche risolte, ticket chiusi e cache vecchie oltre 30 giorni.",
      icon: <Trash2 className="w-5 h-5 text-red-600" />,
      color: "border-red-200 bg-red-50 hover:bg-red-100",
    },
    {
      id: "refresh_market",
      label: "Aggiorna Valutazioni Marketplace",
      description: "Forza l'aggiornamento manuale dei valori di mercato.",
      icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
      color: "border-blue-200 bg-blue-50 hover:bg-blue-100",
    },
    {
      id: "rebuild_cache",
      label: "Rigenera Cache Sistema",
      description: "Ripulisce e ricostruisce la cache interna per sincronizzare i dati.",
      icon: <Database className="w-5 h-5 text-yellow-600" />,
      color: "border-yellow-200 bg-yellow-50 hover:bg-yellow-100",
    },
    {
      id: "export_logs",
      label: "Esporta Log Attività Staff",
      description: "Scarica un file CSV con le ultime attività di amministrazione.",
      icon: <FileText className="w-5 h-5 text-green-600" />,
      color: "border-green-200 bg-green-50 hover:bg-green-100",
    },
  ];

  return (
    <div>
      <header className="flex items-center gap-2 mb-6">
        <Wrench className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Impostazioni & Manutenzione</h2>
      </header>

      {message && (
        <div
          className={`p-3 rounded-md text-sm mb-5 ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            disabled={loading !== null}
            className={`flex flex-col items-start p-4 border rounded-xl transition text-left ${action.color}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {loading === action.id ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              ) : (
                action.icon
              )}
              <span className="font-semibold">{action.label}</span>
            </div>
            <p className="text-xs text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}