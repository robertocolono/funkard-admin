"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/common/StatCard";
import SystemStatusCard from "./SystemStatusCard";
import RecentNotifications from "./RecentNotifications";
import ActivityFeed from "./ActivityFeed";

export default function DashboardGrid() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Funkard Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitoraggio e gestione del sistema Funkard
        </p>
      </motion.div>

      {/* Statistiche principali */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Notifiche"
          value={42}
          description="Notifiche totali"
          trend={{ value: 12, label: "vs scorsa settimana" }}
          color="blue"
          icon={<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">🔔</div>}
        />
        
        <StatCard
          title="Utenti"
          value={1250}
          description="Utenti registrati"
          trend={{ value: 8, label: "vs scorsa settimana" }}
          color="green"
          icon={<div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">👥</div>}
        />
        
        <StatCard
          title="Errori"
          value={3}
          description="Errori rilevati"
          trend={{ value: -25, label: "vs scorsa settimana" }}
          color="red"
          icon={<div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">⚠️</div>}
        />
        
        <StatCard
          title="Sistema"
          value="Online"
          description="Stato operativo"
          color="green"
          icon={<div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">✅</div>}
        />
      </motion.div>

      {/* Grid principale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Colonna sinistra - Sistema */}
        <div className="lg:col-span-1 space-y-6">
          <SystemStatusCard />
        </div>

        {/* Colonna centrale - Notifiche recenti */}
        <div className="lg:col-span-1 space-y-6">
          <RecentNotifications />
        </div>

        {/* Colonna destra - Attività */}
        <div className="lg:col-span-1 space-y-6">
          <ActivityFeed />
        </div>
      </motion.div>
    </div>
  );
}
