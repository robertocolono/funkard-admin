"use client";
import { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotificationBell() {
  const [count, setCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const evtRef = useRef<EventSource | null>(null);

  useEffect(() => {
    fetchUnread();

    const evtSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/stream`
    );
    evtRef.current = evtSource;

    evtSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.unreadCount !== undefined) setCount(data.unreadCount);
        if (data.notifications) {
          // Ordina per priorità e poi per data
          const sorted = data.notifications
            .sort((a: any, b: any) => {
              const priorityOrder: { [key: string]: number } = { HIGH: 3, MEDIUM: 2, LOW: 1, INFO: 0 };
              if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              }
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            .slice(0, 5);
          setNotifications(sorted);
        }
      } catch (err) {
        console.warn("Errore parsing SSE notifiche:", err);
      }
    };

    evtSource.onerror = (err) => {
      console.error("Errore SSE notifiche:", err);
      evtSource.close();
    };

    return () => evtSource.close();
  }, []);

  async function fetchUnread() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/unreadLatest`);
      if (!res.ok) return;
      const data = await res.json();
      setCount(data.unreadCount || 0);
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Errore fetch unread:", err);
    }
  }

  const badgeColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500 text-white";
      case "MEDIUM":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-700" />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0 shadow-xl">
        <div className="border-b px-3 py-2 font-medium text-gray-800 flex justify-between items-center">
          Notifiche ({count})
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-blue-600"
            onClick={() => window.location.href = "/dashboard/notifications"}
          >
            Vedi tutte
          </Button>
        </div>

        {notifications.length === 0 ? (
          <div className="text-sm text-gray-500 p-4 text-center">
            Nessuna nuova notifica
          </div>
        ) : (
          <ScrollArea className="h-[280px]">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 border-b hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">{n.title}</div>
                    <div className="text-xs text-gray-600">{n.message}</div>
                  </div>
                  <Badge className={badgeColor(n.priority)}>{n.priority}</Badge>
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
