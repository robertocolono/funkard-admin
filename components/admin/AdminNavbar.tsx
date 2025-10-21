'use client';

import Link from 'next/link';
import { useNotifications } from '@/context/NotificationContext';
import { LayoutDashboard, Bell, Settings, Users, MessageSquare, BarChart3, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

export default function AdminNavbar() {
  const { unreadCount, resetUnread } = useNotifications();
  const { admin } = useAuth();

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return 'text-red-400';
      case 'admin':
        return 'text-blue-400';
      case 'support':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="w-4 h-4" />;
      case 'admin':
        return <Users className="w-4 h-4" />;
      case 'support':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-zinc-950 border-b border-zinc-800 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-yellow-400 font-bold text-lg hover:text-yellow-300 transition-colors">
          <LayoutDashboard className="w-5 h-5 text-yellow-400" />
          <span>Funkard Admin</span>
        </Link>
        
        {/* Info ruolo admin */}
        {admin && (
          <div className="flex items-center gap-2 text-sm">
            {getRoleIcon(admin.role)}
            <span className={`font-medium ${getRoleColor(admin.role)}`}>
              {admin.name || admin.email}
            </span>
            <Badge className={`text-xs ${getRoleColor(admin.role)} border-current`} variant="outline">
              {admin.role?.toUpperCase()}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Dashboard */}
        <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </Link>

        {/* Utenti */}
        <Link href="/dashboard/users" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">Utenti</span>
        </Link>

        {/* Notifiche con badge */}
        <Link 
          href="/dashboard/notifications" 
          onClick={resetUnread}
          className="relative text-gray-300 hover:text-white transition-colors flex items-center gap-2"
        >
          <Bell className="w-4 h-4" />
          <span className="text-sm">Notifiche</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Support */}
        <Link href="/dashboard/support" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm">Support</span>
        </Link>

        {/* Logs */}
        <Link href="/dashboard/logs" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm">Logs</span>
        </Link>

        {/* Impostazioni */}
        <Link href="/dashboard/settings" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Impostazioni</span>
        </Link>
      </div>
    </nav>
  );
}
