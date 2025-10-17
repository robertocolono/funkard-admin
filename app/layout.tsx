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
    const source = new EventSource("https://funkard-api.onrender.com/api/admin/notifications/stream", {
      withCredentials: false,
    });

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🔔 Notifica in arrivo:", data);
        // Qui puoi aggiornare lo stato globale o mostrare un toast
        // Per ora logghiamo solo, ma potresti integrare con un context globale
      } catch (err) {
        console.error("Errore parsing notifica SSE:", err);
      }
    };

    source.onerror = (err) => {
      console.error("❌ Errore SSE:", err);
      source.close();
    };

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
