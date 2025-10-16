"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Bell, BarChart3, Users, LifeBuoy, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type DashboardData = {
  notifications: { active: number; resolved: number; critical: number };
  market: { totalProducts: number; avgValueChange: number; newThisWeek: number };
  grading: { total: number; errors: number; inProgress: number };
  users: { total: number; flagged: number };
  support: { open: number; resolved: number };
  marketTrend: { date: string; value: number }[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Errore caricamento dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );

  if (!data)
    return (
      <div className="text-center text-gray-500 mt-10">
        Nessun dato disponibile. Controlla la connessione API.
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard amministratore</h1>

      {/* Riepilogo rapido */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg flex gap-2 items-center">
              <Bell className="w-5 h-5 text-yellow-500" /> Notifiche
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Attive: <strong>{data.notifications.active}</strong></p>
            <p>Risolte: <strong>{data.notifications.resolved}</strong></p>
            <p className="text-red-600">Critiche: <strong>{data.notifications.critical}</strong></p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={() => (window.location.href = "/admin/notifications")}
            >
              Vai alle notifiche
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg flex gap-2 items-center">
              <BarChart3 className="w-5 h-5 text-sky-500" /> Mercato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Totale prodotti: <strong>{data.market.totalProducts}</strong></p>
            <p>Nuovi (7gg): <strong>{data.market.newThisWeek}</strong></p>
            <p>Variazione valore medio: <strong>{data.market.avgValueChange}%</strong></p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={() => (window.location.href = "/admin/market")}
            >
              Gestisci mercato
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg flex gap-2 items-center">
              <Wrench className="w-5 h-5 text-red-500" /> Grading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Totali: <strong>{data.grading.total}</strong></p>
            <p>In corso: <strong>{data.grading.inProgress}</strong></p>
            <p className="text-red-600">Errori: <strong>{data.grading.errors}</strong></p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={() => (window.location.href = "/admin/grading")}
            >
              Controlla grading
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg flex gap-2 items-center">
              <Users className="w-5 h-5 text-green-500" /> Utenti
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Totali: <strong>{data.users.total}</strong></p>
            <p className="text-orange-500">Segnalati: <strong>{data.users.flagged}</strong></p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={() => (window.location.href = "/admin/users")}
            >
              Gestisci utenti
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg flex gap-2 items-center">
              <LifeBuoy className="w-5 h-5 text-purple-500" /> Supporto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Ticket aperti: <strong>{data.support.open}</strong></p>
            <p>Risolti: <strong>{data.support.resolved}</strong></p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={() => (window.location.href = "/admin/support")}
            >
              Apri supporto
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Grafico valore mercato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-lg">
            <BarChart3 className="w-5 h-5 text-sky-500" />
            Andamento valore medio mercato (ultimi 30 giorni)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.marketTrend}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
