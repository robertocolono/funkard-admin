'use client';

import { ToastTestPanel } from '@/components/admin/ToastTestPanel';
import { SupportEventsExample } from '@/components/admin/SupportEventsExample';
import { AdminSSETest } from '@/components/admin/AdminSSETest';
import { AdminSimulator } from '@/components/admin/AdminSimulator';
import { NotificationTest } from '@/components/admin/NotificationTest';
import { useSupportStream } from '@/hooks/useSupportStream';

export default function TestToastPage() {
  // Inizializza il sistema SSE per testare i toast
  useSupportStream();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Test Toast Notifications</h1>
          <p className="text-gray-400">
            Testa il sistema di notifiche toast per eventi SSE del support
          </p>
        </div>

        <ToastTestPanel />

        <div className="mt-8">
          <SupportEventsExample />
        </div>

        <div className="mt-8">
          <AdminSimulator />
        </div>

        <div className="mt-8">
          <AdminSSETest />
        </div>

        <div className="mt-8">
          <NotificationTest />
        </div>

        <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Eventi SSE Supportati</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-yellow-400">Eventi Ticket</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>NEW_TICKET - Nuovo ticket creato</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>TICKET_ASSIGNED - Ticket assegnato</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>TICKET_CLOSED - Ticket chiuso</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>TICKET_STATUS_CHANGED - Stato cambiato</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-yellow-400">Eventi Messaggi</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>NEW_MESSAGE - Nuovo messaggio</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>TICKET_PRIORITY_CHANGED - Priorità cambiata</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>TICKET_UNASSIGNED - Ticket rilasciato</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Filtri per Ruolo</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-red-400">SUPER_ADMIN:</span>
                <span className="ml-2">Vede tutti i toast per tutti i ticket</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-yellow-400">SUPPORT:</span>
                <span className="ml-2">Vede solo toast per ticket assegnati a lui</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
              <div>
                <span className="font-semibold text-blue-400">ADMIN:</span>
                <span className="ml-2">Vede solo toast per ticket assegnati a lui</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
