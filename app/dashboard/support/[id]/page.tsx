"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Loader2, MessageSquare } from "lucide-react"

const mockTickets = [
  {
    id: 1,
    user: "mario.rossi",
    subject: "Problema login",
    date: "2025-10-18",
    status: "open",
    messages: [
      { from: "utente", text: "Non riesco ad accedere al mio account.", date: "2025-10-18 14:22" },
      { from: "admin", text: "Hai provato a resettare la password?", date: "2025-10-18 15:01" },
    ],
  },
  {
    id: 2,
    user: "luca.bianchi",
    subject: "Errore pagamento",
    date: "2025-10-17",
    status: "in_progress",
    messages: [
      { from: "utente", text: "Il pagamento con carta fallisce sempre.", date: "2025-10-17 11:10" },
      { from: "admin", text: "Verifica che la carta sia abilitata per e-commerce.", date: "2025-10-17 12:44" },
    ],
  },
  {
    id: 3,
    user: "anna.verdi",
    subject: "Richiesta rimborso",
    date: "2025-10-15",
    status: "closed",
    messages: [
      { from: "utente", text: "Vorrei richiedere un rimborso per l'ordine #12345.", date: "2025-10-15 09:30" },
      { from: "admin", text: "Ho verificato l'ordine e procedo con il rimborso.", date: "2025-10-15 10:15" },
      { from: "admin", text: "Rimborso processato con successo. Arriverà in 3-5 giorni lavorativi.", date: "2025-10-15 10:45" },
    ],
  },
  {
    id: 4,
    user: "giulia.neri",
    subject: "Verifica account",
    date: "2025-10-14",
    status: "open",
    messages: [
      { from: "utente", text: "Il mio account non è stato verificato dopo 24 ore.", date: "2025-10-14 16:20" },
    ],
  },
  {
    id: 5,
    user: "stefano.moro",
    subject: "Bug sezione collezione",
    date: "2025-10-12",
    status: "in_progress",
    messages: [
      { from: "utente", text: "La sezione collezione non carica le immagini.", date: "2025-10-12 14:30" },
      { from: "admin", text: "Sto investigando il problema. Puoi inviarmi uno screenshot?", date: "2025-10-12 15:00" },
      { from: "utente", text: "Ecco lo screenshot allegato.", date: "2025-10-12 15:15" },
      { from: "admin", text: "Grazie, ho identificato il problema. La fix sarà disponibile domani.", date: "2025-10-12 16:30" },
    ],
  },
]

export default function TicketDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [ticket, setTicket] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const found = mockTickets.find((t) => t.id === Number(id))
    setTimeout(() => {
      setTicket(found)
      setLoading(false)
    }, 400)
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" size={18} />
        Caricamento ticket...
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Ticket non trovato</h2>
        <p className="text-gray-500 mb-4">Il ticket richiesto non esiste o è stato rimosso.</p>
        <Button onClick={() => router.back()} className="gap-2">
          <ArrowLeft size={16} /> Torna alla lista
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Ticket #{ticket.id}</h1>
          <p className="text-sm text-gray-500">Utente: {ticket.user}</p>
        </div>
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <ArrowLeft size={16} /> Indietro
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          className={`capitalize ${
            ticket.status === "open"
              ? "bg-blue-100 text-blue-800"
              : ticket.status === "in_progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {ticket.status === "open"
            ? "Aperto"
            : ticket.status === "in_progress"
            ? "In corso"
            : "Risolto"}
        </Badge>
        <span className="text-sm text-gray-500">Creato il {ticket.date}</span>
      </div>

      <div className="border rounded-lg bg-white p-4 space-y-3">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <MessageSquare size={18} />
          Conversazione
        </h2>

        <div className="space-y-3">
          {ticket.messages.map((m: any, idx: number) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${
                m.from === "admin"
                  ? "bg-gray-50 border border-gray-200"
                  : "bg-blue-50 border border-blue-100"
              }`}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{m.from === "admin" ? "Admin" : ticket.user}</span>
                <span className="text-gray-400">{m.date}</span>
              </div>
              <p className="text-gray-700">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Rispondi</h3>
        <textarea
          placeholder="Scrivi una risposta..."
          className="w-full border rounded-md p-3 text-sm resize-none focus:ring-2 focus:ring-black outline-none"
          rows={4}
        />
        <div className="flex justify-end mt-2">
          <Button>Invia risposta</Button>
        </div>
      </div>
    </div>
  )
}