"use client";
import { toast } from "sonner";

export default function ToastTest() {
  const showSuccessToast = () => {
    toast("✅ Operazione completata!", {
      description: "La carta è stata caricata con successo",
      duration: 4000,
      style: {
        background: "linear-gradient(135deg, #16a34a, #15803d)",
        border: "1px solid #16a34a",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)",
        fontWeight: "500"
      }
    });
  };

  const showWarningToast = () => {
    toast("⚠️ Attenzione!", {
      description: "Prodotto senza storico rilevato",
      duration: 5000,
      style: {
        background: "linear-gradient(135deg, #d97706, #92400e)",
        border: "1px solid #d97706",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(217, 119, 6, 0.3)",
        fontWeight: "500"
      }
    });
  };

  const showErrorToast = () => {
    toast("❌ Errore critico!", {
      description: "Impossibile processare la richiesta",
      duration: 6000,
      style: {
        background: "linear-gradient(135deg, #dc2626, #991b1b)",
        border: "1px solid #dc2626",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
        fontWeight: "500"
      }
    });
  };

  const showInfoToast = () => {
    toast("ℹ️ Nuova notifica", {
      description: "Utente @bobbojr ha caricato una nuova carta",
      duration: 4000,
      style: {
        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        border: "1px solid #2563eb",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
        fontWeight: "500"
      }
    });
  };

  const showCustomToast = () => {
    toast("⚡ Nuova carta caricata", {
      description: "Utente @bobbojr ha caricato 'Charizard EX'",
      duration: 6000,
      style: {
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        border: "1px solid #f59e0b",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
        fontWeight: "500"
      }
    });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-yellow-400 mb-3">🧪 Test Toast Notifications</h3>
      <p className="text-sm text-gray-400 mb-4">
        Clicca i pulsanti per testare diversi tipi di toast notifications.
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={showSuccessToast}
          className="bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors"
        >
          ✅ CheckCircle2
        </button>
        
        <button
          onClick={showWarningToast}
          className="bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-yellow-700 transition-colors"
        >
          ⚠️ AlertTriangle
        </button>
        
        <button
          onClick={showErrorToast}
          className="bg-red-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
        >
          ❌ Error
        </button>
        
        <button
          onClick={showInfoToast}
          className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          ℹ️ Info
        </button>
        
        <button
          onClick={showCustomToast}
          className="bg-orange-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-orange-700 transition-colors col-span-2"
        >
          ⚡ Custom Toast
        </button>
      </div>
    </div>
  );
}
