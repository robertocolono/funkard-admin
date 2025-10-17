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

      // Stream SSE globale per notifiche real-time
      useEffect(() => {
        const { connectNotificationStream } = require("@/services/adminService");
        
        const source = connectNotificationStream((data: any) => {
          console.log("🔔 Notifica in arrivo:", data);
          // Qui puoi aggiornare lo stato globale o mostrare un toast
          // Per ora logghiamo solo, ma potresti integrare con un context globale
        });

        return () => source.close();
      }, []);

  // Temporaneamente rimosso controllo autenticazione per testing

  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="min-h-screen">
          {children}
          
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
          theme="light"
          richColors
          toastOptions={{
            style: { 
              background: "#ffffff", 
              color: "#000", 
              border: "1px solid #e5e7eb",
              borderRadius: "8px"
            },
          }}
        />
      </body>
    </html>
  );
}
