"use client";

import { useEffect, useState } from "react";
import { getCleanupLogs } from "@/lib/api/system";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useAdminHealth } from "@/providers/AdminHealthProvider";

export default function SystemPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { lastResult } = useAdminHealth();

  useEffect(() => {
    getCleanupLogs()
      .then((data) => setLogs(data.reverse())) // ordine cronologico
      .catch((err) => console.error("Errore logs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Caricamento...</div>;

  const lastLog = logs[logs.length - 1];
  const lastResultDisplay = lastLog?.result === "success" ? "✅ Tutto OK" : "⚠️ Errore";
  const lastDeleted = lastLog?.deleted ?? 0;
  const lastDate = lastLog ? new Date(lastLog.timestamp).toLocaleString() : "N/D";

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">🧹 Sistema & Cleanup</h1>

      {/* Banner errore */}
      {lastResult === "error" && (
        <div className="bg-red-600/15 border border-red-600/40 text-red-300 px-4 py-3 rounded-xl">
          ⚠️ Ultimo cleanup fallito. Verifica i log sotto.
        </div>
      )}

      {/* --- 🧭 Dashboard Stato --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-400">Ultimo cleanup</p>
          <p className="text-lg font-medium mt-1">{lastDate}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-400">Record eliminati</p>
          <p className="text-lg font-medium mt-1 text-green-400">{lastDeleted}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-400">Stato sistema</p>
          <p className={`text-lg font-medium mt-1 ${lastLog?.result === "success" ? "text-green-400" : "text-red-400"}`}>
            {lastResultDisplay}
          </p>
        </div>
      </div>

      {/* --- 📊 Tabella log --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-800 bg-black text-gray-200 rounded-lg">
          <thead>
            <tr className="text-left bg-gray-900">
              <th className="px-3 py-2 border-b border-gray-800">Data</th>
              <th className="px-3 py-2 border-b border-gray-800">Risultato</th>
              <th className="px-3 py-2 border-b border-gray-800">Eliminati</th>
              <th className="px-3 py-2 border-b border-gray-800">Dettagli</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t border-gray-800 hover:bg-gray-900 transition">
                <td className="px-3 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-3 py-2">
                  {log.result === "success" ? (
                    <span className="text-green-400">✅ Successo</span>
                  ) : (
                    <span className="text-red-400">⚠️ Errore</span>
                  )}
                </td>
                <td className="px-3 py-2">{log.deleted}</td>
                <td className="px-3 py-2 text-sm text-gray-400">
                  {log.details || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- 📈 Grafico --- */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-medium mb-4">Andamento Pulizie Ultimi Giorni</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={logs.map((l) => ({
              name: new Date(l.timestamp).toLocaleDateString(),
              deleted: l.deleted,
              color: l.result === "success" ? "#22c55e" : "#ef4444",
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
              labelStyle={{ color: "#ccc" }}
            />
            <Line
              type="monotone"
              dataKey="deleted"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ stroke: "#22c55e", strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}