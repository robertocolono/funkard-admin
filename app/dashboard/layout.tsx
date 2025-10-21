'use client';

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
} from 'lucide-react';
import NotificationDrawer from '@/components/admin/NotificationDrawer';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

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
            onClick={() => {
              localStorage.removeItem('funkard_admin_token');
              localStorage.removeItem('isLoggedIn');
              window.location.href = '/login';
            }}
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