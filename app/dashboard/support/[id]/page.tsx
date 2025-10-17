"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, MessageSquare, Clock, CheckCircle, XCircle, User, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

interface TicketDetail {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: string;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
  updatedAt: string;
  description: string;
  priority: "low" | "medium" | "high";
  messages: Array<{
    id: string;
    sender: "user" | "admin";
    message: string;
    timestamp: string;
  }>;
}

export default function TicketDetailPage() {
  const params = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // ✅ Fetch reale pronto, da attivare dopo fix backend:
    /*
    apiGet<TicketDetail>(`/api/admin/support/${params.id}`)
      .then(setTicket)
      .catch(err => {
        console.error("Errore nel caricamento ticket:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    */

    // Mock temporaneo per testing UI
    setTimeout(() => {
      setTicket({
        id: params.id as string,
        userEmail: "mario.rossi@email.com",
        userName: "Mario Rossi",
        subject: "Carta non arrivata",
        category: "Ordini",
        status: "open",
        createdAt: "2025-01-12T09:32:00Z",
        updatedAt: "2025-01-13T14:05:00Z",
        description: "Ho ordinato una carta Charizard il 10 gennaio ma non è ancora arrivata. Il tracking mostra che è stata spedita ma non ho ricevuto aggiornamenti da 3 giorni.",
        priority: "high",
        messages: [
          {
            id: "1",
            sender: "user",
            message: "Ho ordinato una carta Charizard il 10 gennaio ma non è ancora arrivata. Il tracking mostra che è stata spedita ma non ho ricevuto aggiornamenti da 3 giorni.",
            timestamp: "2025-01-12T09:32:00Z"
          },
          {
            id: "2",
            sender: "admin",
            message: "Ciao Mario, grazie per la segnalazione. Stiamo verificando lo stato della spedizione con il corriere. Ti aggiorniamo entro 24 ore.",
            timestamp: "2025-01-12T14:20:00Z"
          },
          {
            id: "3",
            sender: "user",
            message: "Grazie per la risposta rapida. Aspetto vostre notizie.",
            timestamp: "2025-01-12T15:45:00Z"
          }
        ]
      });
      setLoading(false);
    }, 600);
  }, [params.id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      // ✅ Qui aggiungeremo la chiamata API per inviare messaggio
      // await apiPost(`/api/admin/support/${params.id}/message`, { message: newMessage });
      
      // Mock temporaneo
      setTimeout(() => {
        if (ticket) {
          setTicket({
            ...ticket,
            messages: [
              ...ticket.messages,
              {
                id: Date.now().toString(),
                sender: "admin",
                message: newMessage,
                timestamp: new Date().toISOString()
              }
            ]
          });
        }
        setNewMessage("");
        setSending(false);
      }, 500);
    } catch (err) {
      console.error("Errore nell'invio messaggio:", err);
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus: "open" | "in_progress" | "closed") => {
    try {
      // ✅ Qui aggiungeremo la chiamata API per cambiare stato
      // await apiPatch(`/api/admin/support/${params.id}/status`, { status: newStatus });
      
      if (ticket) {
        setTicket({
          ...ticket,
          status: newStatus,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Errore nel cambio stato:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Caricamento dettagli ticket...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">Errore: {error}</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <p className="text-yellow-600">Ticket non trovato</p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/dashboard/support"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-semibold">Ticket #{ticket.id}</h2>
          <p className="text-gray-600">{ticket.subject}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informazioni ticket */}
        <div className="lg:col-span-1 space-y-6">
          {/* Dettagli utente */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informazioni Utente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{ticket.userEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{ticket.userName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm">
                  Creato: {new Date(ticket.createdAt).toLocaleString("it-IT")}
                </span>
              </div>
            </div>
          </div>

          {/* Stato e priorità */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Stato Ticket</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stato:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status === "open" ? "Aperto" : 
                   ticket.status === "in_progress" ? "In corso" : "Risolto"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Priorità:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority === "high" ? "Alta" : 
                   ticket.priority === "medium" ? "Media" : "Bassa"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Categoria:</span>
                <span className="text-sm font-medium">{ticket.category}</span>
              </div>
            </div>
          </div>

          {/* Azioni */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Azioni</h3>
            <div className="space-y-2">
              {ticket.status === "open" && (
                <button 
                  onClick={() => handleStatusChange("in_progress")}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                >
                  Prendi in carico
                </button>
              )}
              {ticket.status === "in_progress" && (
                <button 
                  onClick={() => handleStatusChange("closed")}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Segna come risolto
                </button>
              )}
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                Contatta utente
              </button>
            </div>
          </div>
        </div>

        {/* Conversazione */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversazione
            </h3>
            
            {/* Messaggi */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {ticket.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "admin" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "admin" ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {new Date(message.timestamp).toLocaleString("it-IT")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Nuovo messaggio */}
            <div className="border-t pt-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Scrivi una risposta..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Invio..." : "Invia"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
