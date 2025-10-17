"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import NotificationToast from "@/components/NotificationToast";
import { useNotifications } from "@/lib/hooks/useNotifications";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { toastNotifications, removeToast } = useNotifications();

  // Temporaneamente rimosso controllo autenticazione per testing

  return (
    <html lang="it">
      <body className="min-h-screen bg-zinc-950 text-gray-200">
        <div className="min-h-screen bg-zinc-950 text-gray-200">
          {path !== "/login" && <Navbar />}
          <main className="p-6">{children}</main>
          
          {/* Toast Notifications */}
          {toastNotifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onClose={() => removeToast(notification.id)}
            />
          ))}
        </div>
        
        {/* Sonner Toaster */}
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          toastOptions={{
            style: { 
              background: "#121212", 
              color: "#fff", 
              border: "1px solid #333",
              borderRadius: "8px"
            },
          }}
        />
      </body>
    </html>
  );
}
