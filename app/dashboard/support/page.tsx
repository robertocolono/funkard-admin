"use client"

import { useState, useMemo } from "react"
import { TicketTable } from "@/components/ui/ticket-table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const mockTickets = [
  { id: 1, user: "mario.rossi", subject: "Problema login", date: "2025-10-18", status: "open" },
  { id: 2, user: "luca.bianchi", subject: "Errore pagamento", date: "2025-10-17", status: "in_progress" },
  { id: 3, user: "anna.verdi", subject: "Richiesta rimborso", date: "2025-10-15", status: "closed" },
  { id: 4, user: "giulia.neri", subject: "Verifica account", date: "2025-10-14", status: "open" },
  { id: 5, user: "stefano.moro", subject: "Bug sezione collezione", date: "2025-10-12", status: "in_progress" },
  { id: 6, user: "francesca.rossi", subject: "Problema con le notifiche", date: "2025-10-11", status: "open" },
  { id: 7, user: "marco.bianchi", subject: "Richiesta cambio password", date: "2025-10-10", status: "closed" },
  { id: 8, user: "elena.verdi", subject: "Errore durante l'upload", date: "2025-10-09", status: "in_progress" },
]

export default function SupportPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "open" | "in_progress" | "closed">("all")

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((t) => {
      const matchesSearch =
        t.user.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = filter === "all" ? true : t.status === filter

      return matchesSearch && matchesStatus
    })
  }, [search, filter])

  return (
    <section className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Supporto</h1>

        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Cerca utente o oggetto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />

          <div className="flex gap-2">
            {[
              { key: "all", label: "Tutti" },
              { key: "open", label: "Aperti" },
              { key: "in_progress", label: "In corso" },
              { key: "closed", label: "Risolti" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key as any)}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  filter === opt.key
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {filteredTickets.length} ticket trovati
        </span>
        {filter !== "all" && (
          <Badge variant="outline" className="capitalize">
            {filter === "open" && "Aperti"}
            {filter === "in_progress" && "In corso"}
            {filter === "closed" && "Risolti"}
          </Badge>
        )}
      </div>

      <TicketTable tickets={filteredTickets} />
    </section>
  )
}