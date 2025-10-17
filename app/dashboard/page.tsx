"use client";

import { useState, useEffect } from "react";
import { Bell, Users, ShoppingBag, BarChart3, LifeBuoy, Settings } from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 124,
    products: 512,
    sales: 76,
    tickets: 3,
  });

  useEffect(() => {
    // simulazione fetch per ora
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-700">
        <p>Caricamento dati...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold px-6 py-6 tracking-tight">Funkard Admin</h1>
          <nav className="flex flex-col space-y-1 px-3">
            <NavItem icon={<BarChart3 />} label="Dashboard" active />
            <NavItem icon={<Users />} label="Utenti" href="/dashboard/users" />
            <NavItem icon={<ShoppingBag />} label="Market" href="/dashboard/market" />
            <NavItem icon={<LifeBuoy />} label="Support" href="/dashboard/support" />
            <NavItem icon={<Bell />} label="Notifiche" href="/dashboard/notifications" />
            <NavItem icon={<Settings />} label="Impostazioni" href="/dashboard/settings" />
          </nav>
        </div>
        <div className="text-center text-xs text-gray-400 py-4">
          v1.0 • Funkard © 2025
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-700 cursor-pointer hover:text-yellow-500 transition" />
            <span className="absolute -top-1 -right-1 bg-yellow-400 w-3 h-3 rounded-full"></span>
          </div>
        </header>

        {/* Stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Utenti" value={stats.users} />
          <StatCard label="Carte" value={stats.products} />
          <StatCard label="Vendite" value={stats.sales} />
          <StatCard label="Ticket aperti" value={stats.tickets} />
        </section>

        {/* Placeholder section */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Andamento generale</h3>
          <p className="text-gray-600 text-sm">
            Qui mostreremo grafici, statistiche di mercato e attività recenti.
          </p>
        </section>
      </main>
    </div>
  );
}

/* 🧩 Components */

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
}

function NavItem({ icon, label, href = "#", active = false }: NavItemProps) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
        active
          ? "bg-yellow-400 text-black font-medium"
          : "hover:bg-zinc-800 text-gray-300 hover:text-white"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center hover:shadow-md transition">
      <h4 className="text-gray-500 text-sm">{label}</h4>
      <p className="text-3xl font-bold mt-2 text-black">{value}</p>
    </div>
  );
}