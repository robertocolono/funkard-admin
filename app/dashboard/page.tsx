"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ qui metteremo il fetch reale più avanti:
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` } })
    //   .then(res => res.json())
    //   .then(setData)
    //   .finally(() => setLoading(false));

    // Mock temporaneo per testing
    setTimeout(() => {
      setData({
        users: 124,
        products: 512,
        sales: 76,
        tickets: 3,
      });
      setLoading(false);
    }, 800);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-700 cursor-pointer hover:text-yellow-500 transition" />
          <span className="absolute -top-1 -right-1 bg-yellow-400 w-3 h-3 rounded-full"></span>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Caricamento dati...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat label="Utenti" value={data?.users || "—"} />
          <Stat label="Carte" value={data?.products || "—"} />
          <Stat label="Vendite" value={data?.sales || "—"} />
          <Stat label="Ticket aperti" value={data?.tickets || "—"} />
        </div>
      )}

      {/* Placeholder section */}
      <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mt-8">
        <h3 className="text-lg font-medium mb-2">Andamento generale</h3>
        <p className="text-gray-600 text-sm">
          Qui mostreremo grafici, statistiche di mercato e attività recenti.
        </p>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center hover:shadow-md transition">
      <h4 className="text-gray-500 text-sm">{label}</h4>
      <p className="text-3xl font-bold mt-2 text-black">{value}</p>
    </div>
  );
}