"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Archive, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { DeleteArchivedModal } from "@/components/notifications/DeleteArchivedModal";

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications`);
      if (!res.ok) throw new Error("Errore nel caricamento notifiche");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Errore fetch notifiche:", err);
    }
    setLoading(false);
  }

  async function archiveNotification(id: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/archive/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`
        }
      });
      if (!res.ok) throw new Error("Errore durante l'archiviazione");
      toast({ title: "Notifica archiviata", description: "La notifica è stata spostata nell'archivio." });
      setNotifications(prev => prev.filter((n: any) => n.id !== id));
    } catch (err) {
      console.error(err);
      toast({ title: "Errore", description: "Impossibile archiviare la notifica.", variant: "destructive" });
    }
  }

  async function deleteArchived() {
    setDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/cleanup`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error("Errore eliminazione archiviate");
      toast({ title: "Archivio pulito", description: "Le notifiche archiviate sono state eliminate." });
      await fetchNotifications(); // ricarica lista
    } catch (err) {
      console.error(err);
      toast({ title: "Errore", description: "Impossibile eliminare le notifiche archiviate.", variant: "destructive" });
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  const filtered = notifications.filter((n: any) =>
    filter === "all" ? true : n.type === filter
  );

  const badgeColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "bg-red-500 text-white";
      case "MEDIUM": return "bg-yellow-500 text-black";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notifiche Admin</h2>
          <div className="flex items-center gap-2">
            <div className="space-x-2">
              {["all", "system", "error", "support"].map((f) => (
                <Button
                  key={f}
                  onClick={() => setFilter(f)}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                >
                  {f === "all" ? "Tutte" : f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="ml-2"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Elimina archiviate
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
          </div>
        ) : (
          <ul className="space-y-3 max-h-[500px] overflow-y-auto">
            {filtered.map((n: any) => (
              <li key={n.id} className="border p-3 rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{n.title}</h3>
                    <p className="text-sm text-gray-600">{n.message}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={badgeColor(n.priority)}>{n.priority}</Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => archiveNotification(n.id)}
                      title="Archivia notifica"
                    >
                      <Archive className="w-4 h-4 text-gray-500 hover:text-black" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      
      {/* Modale conferma eliminazione archiviate */}
      <DeleteArchivedModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteArchived}
        loading={deleting}
      />
    </Card>
  );
}