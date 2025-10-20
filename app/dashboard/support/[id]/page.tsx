"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, XCircle } from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://funkard-backend.onrender.com"

interface Message {
  from: "user" | "admin"
  text: string
  date: string
}

interface Ticket {
  id: number
  userEmail: string
  subject: string
  category: string
  priority: string
  status: string
  createdAt: string
  messages: Message[]
}

export default function TicketDetailPage() {
  const { id } = useParams()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const [closing, setClosing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTicket = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/support/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      })
      if (!res.ok) throw new Error("Errore nel caricamento del ticket")
      const data = await res.json()
      setTicket(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReply = async () => {
    if (!reply.trim()) return
    try {
      setSending(true)
      const res = await fetch(`${API_BASE}/api/admin/support/reply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
        body: JSON.stringify({ message: reply }),
      })
      if (!res.ok) throw new Error("Errore nell'invio della risposta")
      setReply("")
      await fetchTicket() // ricarica i messaggi aggiornati
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const handleClose = async () => {
    try {
      setClosing(true)
      const res = await fetch(`${API_BASE}/api/admin/support/close/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      })
      if (!res.ok) throw new Error("Errore nella chiusura del ticket")
      await fetchTicket() // aggiorna stato
    } catch (err: any) {
      setError(err.message)
    } finally {
      setClosing(false)
    }
  }

  useEffect(() => {
    fetchTicket()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" size={18} />
        Caricamento ticket...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 bg-red-50 rounded-md border border-red-200">
        {error}
      </div>
    )
  }

  if (!ticket) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{ticket.subject}</h1>
          <div className="text-sm text-gray-500">
            {ticket.userEmail} •{" "}
            {new Date(ticket.createdAt).toLocaleString("it-IT")}
          </div>
        </div>

        <div className="flex gap-2">
          <Badge>{ticket.category}</Badge>
          <Badge
            className={`${
              ticket.priority === "urgent"
                ? "bg-red-100 text-red-800"
                : ticket.priority === "high"
                ? "bg-orange-100 text-orange-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {ticket.priority}
          </Badge>
          <Badge
            className={`${
              ticket.status === "open"
                ? "bg-blue-100 text-blue-800"
                : ticket.status === "in_progress"
                ? "bg-yellow-100 text-yellow-800"
                : ticket.status === "resolved"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {ticket.status}
          </Badge>
        </div>
      </div>

      <div className="border rounded-lg bg-white shadow-sm p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {ticket.messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.from === "admin"
                ? "ml-auto bg-blue-50 border border-blue-100 text-right"
                : "bg-gray-50 border border-gray-200 text-left"
            }`}
          >
            <div className="text-sm">{m.text}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(m.date).toLocaleString("it-IT")}
            </div>
          </div>
        ))}
      </div>

      {ticket.status !== "closed" && (
        <div className="space-y-3">
          <Textarea
            placeholder="Scrivi una risposta..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <div className="flex justify-between">
            <Button
              onClick={handleReply}
              disabled={sending}
              className="flex items-center gap-2"
            >
              {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              Invia risposta
            </Button>
            <Button
              variant="destructive"
              onClick={handleClose}
              disabled={closing}
              className="flex items-center gap-2"
            >
              {closing ? <Loader2 className="animate-spin" size={16} /> : <XCircle size={16} />}
              Chiudi Ticket
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}