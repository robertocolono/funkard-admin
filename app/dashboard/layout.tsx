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
            <div className="flex-1 flex flex-col">
              {/* Topbar */}
              <header className="bg-card border-b border-border px-6 py-4">
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
                  </div>
                  <div className="flex items-center space-x-4">
                    <NotificationBell />
                    <SSEStatus />
                    <div className="text-sm text-muted-foreground">
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
        </SSENotificationProvider>
      </AdminHealthProvider>
    </AuthGate>
  );
}
