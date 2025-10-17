"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotificationBell() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Fetch iniziale
    fetchUnread();

    // SSE live updates
    const evtSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/stream`
    );

    evtSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && typeof data.unreadCount === "number") {
          setCount(data.unreadCount);
        }
      } catch {
        console.warn("Errore parsing SSE notifiche");
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/unreadCount`);
      if (!res.ok) return;
      const { unreadCount } = await res.json();
      setCount(unreadCount);
    } catch (err) {
      console.error("Errore fetch unread:", err);
    }
  }

  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5 text-gray-700" />
      {count > 0 && (
        <Badge
          className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full"
        >
          {count}
        </Badge>
      )}
    </Button>
  );
}
