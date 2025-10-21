'use client';

import Link from 'next/link';
import { useTicketsStore } from '@/store/useTicketsStore';
import { MessageSquare, Bell, Settings, Users, BarChart3 } from 'lucide-react';

export function AdminNavbar() {
  const { unread, resetUnread } = useTicketsStore();

  return (
    <nav className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 px-6 py-3">
      <Link href="/dashboard" className="font-bold text-lg text-yellow-500">
        Funkard Admin
      </Link>
      
      <div className="flex gap-6 items-center">
        <Link href="/dashboard/users" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <Users className="w-4 h-4" />
          <span>Utenti</span>
        </Link>
        
        <Link href="/dashboard/notifications" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span>Notifiche</span>
        </Link>
        
        <Link href="/dashboard/logs" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <BarChart3 className="w-4 h-4" />
          <span>Logs</span>
        </Link>
        
        <Link 
          href="/dashboard/support" 
          onClick={resetUnread} 
          className="relative flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Support</span>
          {unread > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-xs font-bold rounded-full px-2 py-0.5 animate-pulse">
              {unread}
            </span>
          )}
        </Link>
        
        <Link href="/dashboard/settings" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
          <span>Impostazioni</span>
        </Link>
      </div>
    </nav>
  );
}
