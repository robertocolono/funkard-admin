"use client";

import { usePathname } from "next/navigation";
import NotificationBell from "@/components/layout/NotificationBell";
import { AdminHealthProvider } from "@/providers/AdminHealthProvider";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AdminHealthProvider>
      <div className="flex h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {pathname === "/dashboard" ? "Dashboard" :
                 pathname === "/dashboard/users" ? "Utenti" :
                 pathname === "/dashboard/market" ? "Market" :
                 pathname === "/dashboard/support" ? "Support" :
                 pathname === "/dashboard/notifications" ? "Notifiche" :
                 pathname === "/dashboard/system" ? "Sistema" :
                 pathname === "/dashboard/settings" ? "Impostazioni" :
                 pathname === "/dashboard/staff" ? "Staff" :
                 "Dashboard"}
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
    </AdminHealthProvider>
  );
}
