"use client";

import { Bell, Users, ShoppingBag, BarChart3, LifeBuoy, Settings, Shield, Server } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminRole, canAccess } from "@/lib/adminAuth";
import NotificationBell from "@/components/layout/NotificationBell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useAdminRole();

  const nav = [
    { label: "Dashboard", icon: <BarChart3 />, href: "/dashboard" },
    { label: "Utenti", icon: <Users />, href: "/dashboard/users" },
    { label: "Market", icon: <ShoppingBag />, href: "/dashboard/market" },
    { label: "Support", icon: <LifeBuoy />, href: "/dashboard/support" },
    { label: "Notifiche", icon: <Bell />, href: "/dashboard/notifications" },
    { label: "Sistema", icon: <Server />, href: "/dashboard/system" },
    { label: "Impostazioni", icon: <Settings />, href: "/dashboard/settings" },
  ];

  // Mostra "Staff" solo se permesso
  if (canAccess(role, "staff")) {
    nav.push({ label: "Staff", icon: <Shield />, href: "/dashboard/staff" });
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold px-6 py-6 tracking-tight">Funkard Admin</h1>
          <nav className="flex flex-col space-y-1 px-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  pathname === n.href
                    ? "bg-yellow-400 text-black font-medium"
                    : "hover:bg-zinc-800 text-gray-300 hover:text-white"
                }`}
              >
                <span className="w-5 h-5">{n.icon}</span>
                <span>{n.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-center text-xs text-gray-400 py-4">
          v1.0 • Funkard © 2025
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {nav.find(n => n.href === pathname)?.label || "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="text-sm text-gray-500">
                Admin Panel
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
