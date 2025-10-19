"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Users, ShoppingBag, BarChart3, LifeBuoy, Settings, Shield, Server } from "lucide-react";
import { useAdminRole, canAccess } from "@/lib/adminAuth";
import { useAdminHealth } from "@/providers/AdminHealthProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAdminRole();
  const { lastResult } = useAdminHealth();

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
    <aside className="w-64 bg-black text-white flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold px-6 py-6 tracking-tight">Funkard Admin</h1>
        <nav className="flex flex-col space-y-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition ${
                pathname === n.href
                  ? "bg-yellow-400 text-black font-medium"
                  : "hover:bg-zinc-800 text-gray-300 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5">{n.icon}</span>
                <span>{n.label}</span>
              </div>
              {n.href === "/dashboard/system" && lastResult === "error" && (
                <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-red-500" aria-label="Errore"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="text-center text-xs text-gray-400 py-4">
        v1.0 • Funkard © 2025
      </div>
    </aside>
  );
}
