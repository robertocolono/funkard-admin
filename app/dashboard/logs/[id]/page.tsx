'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fetchAdminLogById } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// 🔸 Colori coerenti con la lista logs
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

export default function LogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [log, setLog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAdminLogById(id as string);
        setLog(data);
      } catch (e) {
        console.error('Errore caricamento log:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="p-6 text-neutral-400">Caricamento log...</p>;
  if (!log)
    return (
      <div className="p-6">
        <p className="text-neutral-400 mb-4">Log non trovato o eliminato.</p>
        <Button variant="outline" onClick={() => router.back()}>
          ← Torna ai log
        </Button>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Dettaglio Log <span className="text-neutral-500">#{log.id}</span>
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          ← Torna alla lista
        </Button>
      </div>

      <Card className="bg-neutral-900 border-neutral-800 p-6 space-y-4">
        <div className="flex gap-2 items-center">
          <Badge className={ACTION_COLOR[log.action] ?? 'bg-gray-700 text-white'}>
            {log.action.replaceAll('_', ' ')}
          </Badge>
          {log.targetType && (
            <Badge variant="outline" className="border-neutral-700 text-neutral-300">
              {log.targetType}
            </Badge>
          )}
        </div>

        <Separator className="my-2 bg-neutral-800" />

        <div className="grid gap-2 text-sm">
          <p>
            <span className="text-neutral-500">Eseguita da: </span>
            <span className="font-medium text-white">{log.actorEmail}</span>
          </p>

          <p>
            <span className="text-neutral-500">Oggetto: </span>
            <span className="font-medium text-amber-400">
              {log.targetId || '—'}
            </span>
          </p>

          <p>
            <span className="text-neutral-500">Tipo oggetto: </span>
            {log.targetType || '—'}
          </p>

          <p>
            <span className="text-neutral-500">Data: </span>
            {new Date(log.createdAt).toLocaleString('it-IT')}
          </p>

          {log.ip && (
            <p>
              <span className="text-neutral-500">IP: </span>
              {log.ip}
            </p>
          )}
        </div>

        {log.note && (
          <>
            <Separator className="my-3 bg-neutral-800" />
            <div>
              <p className="text-neutral-500 mb-1">Nota:</p>
              <p className="italic text-neutral-300 border-l border-neutral-700 pl-3">
                "{log.note}"
              </p>
            </div>
          </>
        )}
      </Card>

      <Card className="bg-neutral-950 border-neutral-900 p-5">
        <p className="text-xs text-neutral-500">
          Log generato automaticamente dal sistema di auditing di Funkard.
          <br />
          I dati sono conservati per 60 giorni, salvo azioni di manutenzione.
        </p>
      </Card>
    </motion.div>
  );
}
