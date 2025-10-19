'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useSSE } from '@/hooks/useSSE';
import {
  fetchNotifications,
  markRead,
  resolveNotification,
  archiveNotification,
  cleanupArchived,
} from '@/lib/api';
import type { AdminNotificationDTO } from '@/types/Notification';

// 🔸 Mappa colori priorità
const PRIORITY_COLOR: Record<string, string> = {
  urgent: 'bg-red-600 text-white',
  high: 'bg-orange-500 text-white',
  normal: 'bg-blue-500 text-white',
  low: 'bg-neutral-500 text-white',
};

// 🔸 Stili badge tipo
const TYPE_COLOR: Record<string, string> = {
  new_card: 'bg-amber-500/20 text-amber-400',
  new_user: 'bg-blue-500/20 text-blue-400',
  new_sale: 'bg-green-500/20 text-green-400',
  system_alert: 'bg-red-500/20 text-red-400',
  market_event: 'bg-purple-500/20 text-purple-400',
  product_update: 'bg-cyan-500/20 text-cyan-400',
  grading_error: 'bg-pink-500/20 text-pink-400',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotificationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('funkard_filters');
      return saved ? JSON.parse(saved) : { type: 'all', priority: 'all', state: 'all', q: '' };
    }
    return { type: 'all', priority: 'all', state: 'all', q: '' };
  });
  const [confirmCleanup, setConfirmCleanup] = useState(false);

  // 🔁 Persistenza filtri
  useEffect(() => {
    localStorage.setItem('funkard_filters', JSON.stringify(filters));
  }, [filters]);

  // 🔎 Fetch
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchNotifications(filters);
      setNotifications(data.content ?? data);
    } catch (err) {
      console.error('Errore fetch notifiche', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  // 🔴 SSE
  useSSE({
    url: `${process.env.NEXT_PUBLIC_API_BASE}/api/admin/notifications/stream`,
    onMessage: (msg) => {
      console.log('Nuovo evento SSE:', msg);
      load();
    },
  });

  // 🧹 Cleanup
  const handleCleanup = async () => {
    await cleanupArchived();
    await load();
  };

  const handleResolve = async (id: string) => {
    const note = prompt('Aggiungi una nota (opzionale):');
    await resolveNotification(id, note || undefined);
    await load();
  };

  // 🔧 Filtraggio client (eventuale)
  const filtered = useMemo(() => {
    return notifications
      .filter((n) => (filters.q ? n.title.toLowerCase().includes(filters.q.toLowerCase()) : true))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [notifications, filters]);

  return (
    <div className="p-6 space-y-6">
      {/* FILTRI */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={filters.type} onValueChange={(v) => setFilters((f) => ({ ...f, type: v }))}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i tipi</SelectItem>
            {Object.keys(TYPE_COLOR).map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(v) => setFilters((f) => ({ ...f, priority: v }))}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priorità" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.state}
          onValueChange={(v) => setFilters((f) => ({ ...f, state: v }))}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti</SelectItem>
            <SelectItem value="unread">Non letti</SelectItem>
            <SelectItem value="archived">Archiviati</SelectItem>
            <SelectItem value="active">Attivi</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Cerca titolo..."
          className="w-64"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />

        <Button onClick={load} disabled={loading}>
          {loading ? 'Caricamento...' : 'Aggiorna'}
        </Button>

        <div className="ml-auto flex gap-2">
          <Button variant="outline" onClick={() => load()}>
            ↻
          </Button>
          <Button variant="destructive" onClick={() => setConfirmCleanup(true)}>
            Pulisci archiviate
          </Button>
        </div>
      </div>

      {/* LISTA NOTIFICHE */}
      {loading ? (
        <p className="text-neutral-400">Caricamento notifiche...</p>
      ) : filtered.length === 0 ? (
        <p className="text-neutral-400">Nessuna notifica trovata.</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-neutral-900 border-neutral-800 p-4 flex items-start justify-between hover:border-orange-500/40 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <Badge className={PRIORITY_COLOR[n.priority]}>{n.priority}</Badge>
                    <Badge className={TYPE_COLOR[n.type]}>{n.type.replace('_', ' ')}</Badge>
                    {!n.read && <Badge variant="outline">NUOVA</Badge>}
                  </div>

                  <h3 className="font-semibold text-white text-lg">{n.title}</h3>
                  <p className="text-sm text-neutral-400">{n.message}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(n.createdAt).toLocaleString('it-IT')}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  {!n.read && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={async () => {
                        await markRead(n.id);
                        await load();
                      }}
                    >
                      Segna letta
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleResolve(n.id)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Risolvi
                  </Button>
                  {!n.archivedAt && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        await archiveNotification(n.id);
                        await load();
                      }}
                    >
                      Archivia
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODALE CLEANUP */}
      <ConfirmDialog
        open={confirmCleanup}
        onOpenChange={setConfirmCleanup}
        title="Confermi la pulizia delle notifiche archiviate (>30gg)?"
        description="L'operazione è irreversibile. Libera spazio nel database."
        confirmText="Pulisci"
        onConfirm={handleCleanup}
      />
    </div>
  );
}