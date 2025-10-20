"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, ArrowUpDown } from "lucide-react"
import SupportStats from "./stats"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://funkard-backend.onrender.com"

interface Ticket {
  id: number
  userEmail: string
  subject: string
  category: string
  priority: string
  status: string
  createdAt: string
}

export default function SupportPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Legge i parametri dall'URL
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")
  const [priority, setPriority] = useState(searchParams.get("priority") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "desc")

  const updateQuery = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (status) params.set("status", status)
    if (priority) params.set("priority", priority)
    if (category) params.set("category", category)
    if (sort) params.set("sort", sort)
    router.replace(`?${params.toString()}`)
  }

  const fetchTickets = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (status) params.append("status", status)
      if (priority) params.append("priority", priority)
      if (category) params.append("category", category)
      if (sort) params.append("sort", sort)

      const res = await fetch(`${API_BASE}/api/admin/support/tickets?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      })

      if (!res.ok) throw new Error("Errore nel caricamento ticket")
      const data = await res.json()
      setTickets(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    updateQuery()
    fetchTickets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, priority, category, sort])

  return (
    <div className="space-y-8">
      {/* STATISTICHE */}
      <SupportStats />

      {/* HEADER E CONTROLLI */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Ticket di Supporto</h1>
          <Button onClick={fetchTickets} variant="outline" className="gap-2">
            <Loader2 size={16} className={loading ? "animate-spin" : ""} />
            Aggiorna
          </Button>
        </div>

        {/* FILTRI AVANZATI */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <Input
              placeholder="Cerca per email o soggetto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Tutti gli stati</option>
            <option value="open">Aperti</option>
            <option value="in_progress">In corso</option>
            <option value="resolved">Risolti</option>
            <option value="closed">Chiusi</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Tutte le priorità</option>
            <option value="low">Bassa</option>
            <option value="normal">Normale</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Tutte le categorie</option>
            <option value="technical">Tecnico</option>
            <option value="billing">Pagamenti</option>
            <option value="general">Generale</option>
            <option value="grading">Grading</option>
          </select>

          <Button
            variant="secondary"
            onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2"
          >
            <ArrowUpDown size={14} />
            {sort === "desc" ? "Data ↓" : "Data ↑"}
          </Button>
        </div>

        {/* LISTA TICKET */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={18} />
            Caricamento in corso...
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-2">ID</th>
                  <th className="text-left px-4 py-2">Utente</th>
                  <th className="text-left px-4 py-2">Soggetto</th>
                  <th className="text-left px-4 py-2">Categoria</th>
                  <th className="text-left px-4 py-2">Priorità</th>
                  <th className="text-left px-4 py-2">Stato</th>
                  <th className="text-left px-4 py-2">Data</th>
                  <th className="text-right px-4 py-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-500">
                      Nessun ticket trovato
                    </td>
                  </tr>
                ) : (
                  tickets.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t hover:bg-gray-50 cursor-pointer transition"
                      onClick={() =>
                        window.location.assign(`/dashboard/support/${t.id}`)
                      }
                    >
                      <td className="px-4 py-2">{t.id}</td>
                      <td className="px-4 py-2">{t.userEmail}</td>
                      <td className="px-4 py-2">{t.subject}</td>
                      <td className="px-4 py-2 capitalize">{t.category}</td>
                      <td className="px-4 py-2">
                        <Badge
                          className={`${
                            t.priority === "urgent"
                              ? "bg-red-100 text-red-800"
                              : t.priority === "high"
                              ? "bg-orange-100 text-orange-800"
                              : t.priority === "normal"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {t.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 capitalize">
                        <Badge
                          className={`${
                            t.status === "open"
                              ? "bg-blue-100 text-blue-800"
                              : t.status === "in_progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : t.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {t.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(t.createdAt).toLocaleDateString("it-IT")}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button 
                          className="text-blue-600 hover:underline text-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.assign(`/dashboard/support/${t.id}`)
                          }}
                        >
                          Dettagli
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}