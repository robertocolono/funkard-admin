'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowLeft, Send, CheckCircle2, AlertTriangle } from 'lucide-react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://funkard-backend.onrender.com'

interface Message {
  id: number
  sender: string
  content: string
  createdAt: string
}

interface Ticket {
  id: number
  subject: string
  userEmail: string
  category: string
  priority: string
  status: string
  createdAt: string
  messages: Message[]
}

export default function AdminSupportChatPage() {
  const { id } = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [wsConnected, setWsConnected] = useState(false)
  const [stompClient, setStompClient] = useState<Client | null>(null)

  const fetchTicket = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/support/tickets/${id}`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
      })
      if (!res.ok) throw new Error('Errore nel caricamento del ticket')
      const data = await res.json()
      setTicket(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const sendReply = async () => {
    if (!reply.trim() || !stompClient || !wsConnected) return
    setSending(true)
    try {
      // Invia messaggio via WebSocket
      stompClient.publish({
        destination: `/app/support/${id}/send`,
        body: JSON.stringify({ sender: 'admin', content: reply }),
      })
      setReply('')
      console.log('Message sent via WebSocket:', { sender: 'admin', content: reply })
    } catch (err) {
      console.error('WebSocket send error:', err)
      alert('Errore durante l'invio della risposta')
    } finally {
      setSending(false)
    }
  }

  const closeTicket = async () => {
    if (!confirm('Vuoi chiudere definitivamente questo ticket?')) return
    try {
      const res = await fetch(`${API_BASE}/api/admin/support/close/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
      })
      if (!res.ok) throw new Error('Errore nella chiusura del ticket')
      await fetchTicket()
    } catch (err) {
      alert('Errore durante la chiusura del ticket')
    }
  }

  useEffect(() => {
    fetchTicket()
    
    // WebSocket per messaggi real-time
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`)
    const client = new Client({
      webSocketFactory: () => socket as any,
      debug: () => {},
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket connected for ticket:', id)
        setWsConnected(true)
        client.subscribe(`/topic/support/${id}`, (message) => {
          const msg = JSON.parse(message.body)
          console.log('New message received:', msg)
          setTicket((prev) =>
            prev
              ? { ...prev, messages: [...prev.messages, msg] }
              : prev
          )
        })
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected')
        setWsConnected(false)
      },
      onStompError: (error) => {
        console.error('STOMP error:', error)
      }
    })

    client.activate()
    setStompClient(client)

    return () => {
      client.deactivate()
      setStompClient(null)
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400 bg-zinc-950">
        <Loader2 className="animate-spin mr-2" /> Caricamento ticket...
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-gray-400">
        Ticket non trovato
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4 bg-zinc-900">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.push('/dashboard/support')}>
            <ArrowLeft size={18} className="text-gray-400" />
          </Button>
          <div>
            <h1 className="font-semibold">{ticket.subject}</h1>
            <p className="text-xs text-gray-400">
              {ticket.userEmail} • {ticket.category} • Priorità: {ticket.priority}
              {wsConnected && <span className="ml-2 text-green-400">● Live</span>}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={closeTicket}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            Chiudi ticket
          </Button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {ticket.messages.length === 0 ? (
          <p className="text-gray-500 text-center">Nessun messaggio ancora.</p>
        ) : (
          ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'admin' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === 'admin'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-zinc-800 text-gray-100 border border-zinc-700'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString('it-IT', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 bg-zinc-900 p-4 flex gap-3 items-center">
        <input
          type="text"
          placeholder="Scrivi una risposta..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendReply()}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <Button
          onClick={sendReply}
          disabled={sending || !reply.trim() || !wsConnected}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
          title={!wsConnected ? 'Connessione WebSocket non disponibile' : ''}
        >
          {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </Button>
      </div>
    </div>
  )
}