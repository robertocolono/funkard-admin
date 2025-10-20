"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Ticket = {
  id: number
  user: string
  subject: string
  date: string
  status: "open" | "in_progress" | "closed"
}

const statusMap: Record<Ticket["status"], string> = {
  open: "Aperto",
  in_progress: "In corso",
  closed: "Risolto",
}

const statusColor: Record<Ticket["status"], string> = {
  open: "bg-red-100 text-red-600",
  in_progress: "bg-yellow-100 text-yellow-700",
  closed: "bg-green-100 text-green-700",
}

export function TicketTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-gray-700">Utente</th>
            <th className="text-left px-4 py-3 font-medium text-gray-700">Oggetto</th>
            <th className="text-left px-4 py-3 font-medium text-gray-700">Data</th>
            <th className="text-left px-4 py-3 font-medium text-gray-700">Stato</th>
            <th className="text-right px-4 py-3 font-medium text-gray-700">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr
              key={t.id}
              className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="px-4 py-3">{t.user}</td>
              <td className="px-4 py-3">{t.subject}</td>
              <td className="px-4 py-3">{t.date}</td>
              <td className="px-4 py-3">
                <Badge className={cn("capitalize", statusColor[t.status])}>
                  {statusMap[t.status]}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-blue-600 hover:underline text-sm">
                  Dettagli
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
