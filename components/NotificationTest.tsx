"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function NotificationTest() {
  const [isLoading, setIsLoading] = useState(false);

  const sendTestNotification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": localStorage.getItem("funkard_admin_token") || ""
        },
        body: JSON.stringify({
          title: "Test Notifica",
          message: "Questa è una notifica di test per verificare il sistema SSE",
          type: "WARNING"
        })
      });

      if (response.ok) {
        console.log("✅ Notifica di test inviata");
        toast("✅ Notifica di test inviata!", {
          description: "Controlla la campanella per vedere la notifica",
          duration: 3000,
          style: {
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            border: "1px solid #16a34a",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)",
            fontWeight: "500"
          }
        });
      } else {
        console.error("❌ Errore nell'invio della notifica");
        toast("❌ Errore nell'invio della notifica", {
          description: "Controlla la connessione al backend",
          duration: 4000,
          style: {
            background: "linear-gradient(135deg, #dc2626, #991b1b)",
            border: "1px solid #dc2626",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
            fontWeight: "500"
          }
        });
      }
    } catch (error) {
      console.error("❌ Errore:", error);
      toast("❌ Errore di connessione", {
        description: "Impossibile inviare la notifica di test",
        duration: 4000,
        style: {
          background: "linear-gradient(135deg, #dc2626, #991b1b)",
          border: "1px solid #dc2626",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
          fontWeight: "500"
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-yellow-400 mb-3">🧪 Test Notifiche</h3>
      <p className="text-sm text-gray-400 mb-4">
        Clicca il pulsante per inviare una notifica di test e verificare il funzionamento del sistema SSE.
      </p>
      <button
        onClick={sendTestNotification}
        disabled={isLoading}
        className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Invio..." : "Invia Notifica Test"}
      </button>
    </div>
  );
}
