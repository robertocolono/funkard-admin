'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchAdminLogs } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

// 🔹 Mappa colori per le azioni
const ACTION_COLOR: Record<string, string> = {
  NOTIFICATION_READ: 'bg-blue-500/20 text-blue-400',
  NOTIFICATION_RESOLVE: 'bg-green-500/20 text-green-400',
  NOTIFICATION_ARCHIVE: 'bg-gray-500/20 text-gray-300',
  TICKET_CREATE: 'bg-amber-500/20 text-amber-400',
  TICKET_RESOLVE: 'bg-emerald-500/20 text-emerald-400',
  PRICE_UPDATE: 'bg-purple-500/20 text-purple-400',
  SYSTEM_CLEANUP: 'bg-red-500/20 text-red-400',
  SYSTEM_LOGIN: 'bg-orange-500/20 text-orange-400',
  SYSTEM_LOGOUT: 'bg-orange-800/20 text-orange-300',
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ action: 'all', q: '', limit: 50 });
  const [page, setPage] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminLogs({
        page,
        size: filters.limit,
        ...(filters.action !== 'all' ? { action: filters.action } : {}),
      });
      setLogs(data.content ?? data);
    } catch (e) {
      console.error('Errore caricamento logs:', e);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    return logs.filter((l) =>
      filters.q
        ? l.actorEmail?.toLowerCase().includes(filters.q.toLowerCase()) ||
          l.targetType?.toLowerCase().includes(filters.q.toLowerCase()) ||
          l.action?.toLowerCase().includes(filters.q.toLowerCase())
        : true
    );
  }, [logs, filters]);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-semibold text-white">
          Logs Admin
        </h1>
        <div className="text-sm text-neutral-400">
          {filtered.length} log{filtered.length !== 1 ? 's' : ''} trovati
        </div>
      </motion.div>

      {/* FILTRI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3"
      >
        <Select
          value={filters.action}
          onValueChange={(v) => setFilters((f) => ({ ...f, action: v }))}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Azione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le azioni</SelectItem>
            {Object.keys(ACTION_COLOR).map((act) => (
              <SelectItem key={act} value={act}>
                {act.replaceAll('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Cerca per admin o target..."
          className="w-64"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />

        <Button onClick={load} disabled={loading}>
          {loading ? 'Caricamento...' : 'Aggiorna'}
        </Button>

        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            ←
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
          >
            →
          </Button>
        </div>
      </motion.div>

      {/* LISTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {loading ? (
          <p className="text-neutral-400">Caricamento logs...</p>
        ) : filtered.length === 0 ? (
          <p className="text-neutral-400">Nessun log trovato.</p>
        ) : (
          <div className="grid gap-3">
            {filtered.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-neutral-900 border-neutral-800 p-4 flex justify-between items-start hover:border-orange-500/40 transition-colors">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Badge className={ACTION_COLOR[log.action] ?? 'bg-gray-700 text-white'}>
                        {log.action.replaceAll('_', ' ')}
                      </Badge>
                      {log.targetType && (
                        <Badge variant="outline" className="text-neutral-300 border-neutral-700">
                          {log.targetType}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-neutral-300">
                      <span className="text-white font-medium">{log.actorEmail}</span>{' '}
                      ha eseguito un'azione su{' '}
                      <span className="font-medium text-amber-400">
                        {log.targetId || 'sistema'}
                      </span>
                    </p>

                    {log.note && (
                      <p className="text-xs italic text-neutral-500 border-l pl-2 border-neutral-700">
                        "{log.note}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <p className="text-xs text-neutral-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('it-IT')}
                    </p>
                    <Link href={`/dashboard/logs/${log.id}`}>
                      <Button size="sm" variant="outline" className="text-xs">
                        Dettagli
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
