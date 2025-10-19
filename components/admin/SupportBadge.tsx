'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSSE } from '@/hooks/useSSE';
import { cn } from '@/lib/utils';
import { LifeBuoy } from 'lucide-react';

export default function SupportBadge() {
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  // 🔸 Reset badge se l'admin apre la pagina support
  useEffect(() => {
    if (pathname?.includes('/dashboard/support')) {
      setCount(0);
    }
  }, [pathname]);

  // 🔸 SSE per notifiche support
  useSSE({
    url: `${process.env.NEXT_PUBLIC_API_BASE}/api/admin/notifications/stream`,
    onMessage: (notif) => {
      if (notif.type === 'support_ticket' || notif.type === 'support_message') {
        console.log('🔔 Nuova notifica support:', notif);
        setCount((prev) => prev + 1);
      }
    }
  });

  return (
    <Link
      href="/dashboard/support"
      className={cn(
        'relative flex items-center justify-between px-4 py-2 rounded-lg transition',
        pathname?.includes('/dashboard/support')
          ? 'bg-yellow-400 text-black font-medium'
          : 'hover:bg-zinc-800 text-gray-300 hover:text-white'
      )}
    >
      <div className="flex items-center gap-3">
        <span className="w-5 h-5">
          <LifeBuoy />
        </span>
        <span>Support</span>
      </div>
      {count > 0 && (
        <span className="ml-auto bg-orange-600 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">
          {count}
        </span>
      )}
    </Link>
  );
}
