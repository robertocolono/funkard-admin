"use client"

import { useEffect, useState } from "react"
import { Loader2, BarChart2, Clock, Inbox, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://funkard-backend.onrender.com"

interface SupportStats {
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  avgResponseTime: string
  chartData: { day: string; count: number }[]
}

export default function SupportStats() {
  const [stats, setStats] = useState<SupportStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/admin/support/stats`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      })
      if (!res.ok) throw new Error("Errore nel caricamento delle statistiche")
      const data = await res.json()
      setStats(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        <Loader2 className="animate-spin mr-2" size={18} />
        Caricamento statistiche...
      </div>
    )

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
        {error}
      </div>
    )

  if (!stats) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* KPI */}
      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Totale Ticket</CardTitle>
          <Inbox size={18} className="text-gray-400" />
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{stats.totalTickets}</CardContent>
      </Card>

      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Ticket Aperti</CardTitle>
          <BarChart2 size={18} className="text-blue-500" />
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-blue-700">
          {stats.openTickets}
        </CardContent>
      </Card>

      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Risolti</CardTitle>
          <CheckCircle2 size={18} className="text-green-500" />
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-green-700">
          {stats.resolvedTickets}
        </CardContent>
      </Card>

      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Tempo Medio</CardTitle>
          <Clock size={18} className="text-orange-500" />
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-orange-700">
          {stats.avgResponseTime}
        </CardContent>
      </Card>

      {/* Grafico */}
      <Card className="col-span-1 md:col-span-4 mt-2 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-gray-700">
            Andamento Ticket (ultimi 30 giorni)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorTickets)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
