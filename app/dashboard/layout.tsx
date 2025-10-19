"use client";

import { usePathname } from "next/navigation";
import NotificationBell from "@/components/layout/NotificationBell";
import SSEStatus from "@/components/layout/SSEStatus";
import { AdminHealthProvider } from "@/providers/AdminHealthProvider";
import { SSENotificationProvider } from "@/providers/SSENotificationProvider";
import Sidebar from "@/components/layout/Sidebar";
import AuthGate from "@/components/AuthGate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthGate>
      <AdminHealthProvider>
        <SSENotificationProvider>
          <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col lg:ml-0">
              {/* Topbar */}
              <header className="bg-card/80 backdrop-blur-sm border-b border-border px-4 lg:px-6 py-4 sticky top-0 z-30">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {pathname === "/dashboard" ? "Dashboard" :
                       pathname === "/dashboard/users" ? "Utenti" :
                       pathname === "/dashboard/market" ? "Market" :
                       pathname === "/dashboard/support" ? "Support" :
                       pathname === "/dashboard/notifications" ? "Notifiche" :
                       pathname === "/dashboard/logs" ? "Logs" :
                       pathname === "/dashboard/system" ? "Sistema" :
                       pathname === "/dashboard/settings" ? "Impostazioni" :
                       pathname === "/dashboard/staff" ? "Staff" :
                       "Dashboard"}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pathname === "/dashboard" ? "Panoramica del sistema" :
                       pathname === "/dashboard/users" ? "Gestione utenti" :
                       pathname === "/dashboard/market" ? "Gestione marketplace" :
                       pathname === "/dashboard/support" ? "Ticket di supporto" :
                       pathname === "/dashboard/notifications" ? "Notifiche di sistema" :
                       pathname === "/dashboard/logs" ? "Log delle attività" :
                       pathname === "/dashboard/system" ? "Monitoraggio sistema" :
                       pathname === "/dashboard/settings" ? "Configurazioni" :
                       pathname === "/dashboard/staff" ? "Gestione staff" :
                       "Amministrazione"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <NotificationBell />
                    <SSEStatus />
                    <div className="hidden lg:block text-sm text-muted-foreground">
                      Admin Panel
                    </div>
                  </div>
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SSENotificationProvider>
      </AdminHealthProvider>
    </AuthGate>
  );
}
