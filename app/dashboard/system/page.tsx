"use client";

import { useEffect, useState } from "react";
import { getCleanupLogs } from "@/lib/api/system";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function SystemPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCleanupLogs()
      .then((data) => setLogs(data.reverse())) // Mostra in ordine cronologico
      .catch((err) => console.error("Errore logs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Caricamento...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-2">🧹 Log Sistema</h1>

      {/* 📊 Tabella log */}
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

      {/* 📈 Grafico andamento cleanup */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-medium mb-4">Andamento Pulizie Ultimi Giorni</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={logs.map((l) => ({
            name: new Date(l.timestamp).toLocaleDateString(),
            deleted: l.deleted,
            color: l.result === "success" ? "#22c55e" : "#ef4444",
          }))}>
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