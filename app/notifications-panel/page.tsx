import NotificationsPanel from "@/components/notifications/NotificationsPanel";

export default function NotificationsPanelPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Pannello Notifiche</h1>
          <p className="text-gray-600 mt-2">
            Gestione completa delle notifiche admin con cache locale e filtri avanzati
          </p>
        </div>
        
        <NotificationsPanel />
      </div>
    </div>
  );
}
