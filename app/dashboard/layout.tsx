'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Home,
  Bell,
  Store,
  Shield,
  Wifi,
  WifiOff,
} from 'lucide-react';
import NotificationDrawer from '@/components/admin/NotificationDrawer';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<string>('guest');
  const [sseStatus, setSseStatus] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('funkard_admin_role') || 'guest';
      setRole(storedRole);

      // Connessione SSE test
      const adminId = localStorage.getItem('funkard_admin_id') || 'test';
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/support/stream?userId=${adminId}&role=${storedRole}`;
      const es = new EventSource(url);

      setSseStatus('online');

      es.onmessage = () => {
        setSseStatus('online');
      };

      es.onerror = () => {
        setSseStatus('offline');
      };

      const timer = setInterval(() => {
        if (es.readyState === EventSource.CLOSED) setSseStatus('offline');
      }, 30000);

      return () => {
        es.close();
        clearInterval(timer);
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('funkard_admin_token');
    localStorage.removeItem('funkard_admin_role');
    localStorage.removeItem('funkard_admin_id');
    window.location.href = '/login';
  };

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/support', label: 'Supporto', icon: MessageSquare },
    { href: '/dashboard/users', label: 'Utenti', icon: Users },
    { href: '/dashboard/market', label: 'Market', icon: Store },
    { href: '/dashboard/notifications', label: 'Notifiche', icon: Bell },
    { href: '/dashboard/logs', label: 'Logs', icon: BarChart3 },
    { href: '/dashboard/system', label: 'Sistema', icon: Shield },
    { href: '/dashboard/settings', label: 'Impostazioni', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-gray-100">
      {/* Sidebar */}
      <aside className="admin-sidebar flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-neutral-800 text-lg font-semibold text-yellow-500">
          Funkard Admin
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 admin-scrollbar">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`admin-nav-link ${
                  active ? 'admin-nav-link-active' : 'admin-nav-link-inactive'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-neutral-800 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="admin-header flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white">
              {pathname === '/dashboard' && 'Dashboard'}
              {pathname === '/dashboard/support' && 'Gestione Supporto'}
              {pathname === '/dashboard/users' && 'Gestione Utenti'}
              {pathname === '/dashboard/market' && 'Gestione Market'}
              {pathname === '/dashboard/notifications' && 'Notifiche Admin'}
              {pathname === '/dashboard/logs' && 'Logs Sistema'}
              {pathname === '/dashboard/system' && 'Sistema'}
              {pathname === '/dashboard/settings' && 'Impostazioni'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Role + SSE Status */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-800 border border-neutral-700">
              <Shield size={14} className="text-yellow-500" />
              <span
                className={`uppercase font-medium ${
                  role === 'super_admin'
                    ? 'text-yellow-400'
                    : role === 'admin'
                    ? 'text-blue-400'
                    : role === 'support'
                    ? 'text-green-400'
                    : 'text-gray-500'
                }`}
              >
                {role}
              </span>

              {sseStatus === 'online' ? (
                <div className="flex items-center text-green-400 text-xs gap-1">
                  <Wifi size={12} /> Online
                </div>
              ) : (
                <div className="flex items-center text-red-400 text-xs gap-1">
                  <WifiOff size={12} /> Offline
                </div>
              )}
            </div>

            {/* Notifiche Drawer */}
            <NotificationDrawer />
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content admin-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}