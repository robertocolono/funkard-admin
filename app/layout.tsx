"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { Toaster as ToastToaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import NotificationToast from "@/components/NotificationToast";
import { useSupportStream } from "@/hooks/useSupportStream";
import { useAdminSupportEvents } from "@/hooks/useAdminSupportEvents";
import { useAuth } from "@/hooks/useAuth";
import { NotificationProvider } from "@/context/NotificationContext";
// import { useNotifications } from "@/lib/hooks/useNotifications";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  // const { toastNotifications, removeToast } = useNotifications();

  // Inizializza SSE stream globale per notifiche real-time
  useSupportStream();

  // Inizializza SSE per admin support events
  const { admin } = useAuth();
  useAdminSupportEvents(admin);

      // Stream SSE globale per notifiche real-time
      useEffect(() => {
        // SSE stream è ora gestito dal useSupportStream hook
        console.log("🔔 Layout SSE stream inizializzato");
      }, []);

  // Temporaneamente rimosso controllo autenticazione per testing

  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <NotificationProvider>
          <div className="min-h-screen">
            {children}
          
          {/* Toast Notifications - Temporaneamente disabilitato */}
          {/* {toastNotifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onClose={() => removeToast(notification.id)}
            />
          ))} */}
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
            
            {/* ShadCN Toast Toaster */}
            <ToastToaster />
            
            {/* React Hot Toast Toaster */}
            <HotToaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid #333',
                },
              }}
            />
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
