"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Archive, 
  Trash2, 
  RefreshCw,
  Download,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useConfirmDialog } from "@/hooks/useConfirm";

interface NotificationsActionsProps {
  onMarkAllRead: () => void;
  onCleanupArchived: () => void;
  onRefresh: () => void;
  onExport: () => void;
  unreadCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export default function NotificationsActions({
  onMarkAllRead,
  onCleanupArchived,
  onRefresh,
  onExport,
  unreadCount,
  totalCount,
  isLoading = false,
}: NotificationsActionsProps) {
  const { confirmDelete, confirmCleanup } = useConfirmDialog();
  const [isExporting, setIsExporting] = useState(false);

  const handleMarkAllRead = async () => {
    const confirmed = await confirmDelete("tutte le notifiche");
    if (confirmed) {
      onMarkAllRead();
    }
  };

  const handleCleanupArchived = async () => {
    const confirmed = await confirmCleanup(30);
    if (confirmed) {
      onCleanupArchived();
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-muted/30 rounded-lg p-4 border"
    >
      {/* Statistiche */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="font-medium">{totalCount}</span>
            <span className="text-muted-foreground"> notifiche totali</span>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} non lette
            </Badge>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-8 w-8 p-0"
          title="Aggiorna"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <Separator className="mb-4" />

      {/* Azioni rapide */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllRead}
          disabled={isLoading || unreadCount === 0}
          className="flex items-center gap-2 text-xs"
        >
          <CheckCircle className="h-3 w-3" />
          Segna tutte lette
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCleanupArchived}
          disabled={isLoading}
          className="flex items-center gap-2 text-xs"
        >
          <Trash2 className="h-3 w-3" />
          Pulisci archiviate
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={isLoading || isExporting}
          className="flex items-center gap-2 text-xs"
        >
          <Download className="h-3 w-3" />
          {isExporting ? "Esportando..." : "Esporta CSV"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {/* TODO: Settings modal */}}
          disabled={isLoading}
          className="flex items-center gap-2 text-xs"
        >
          <Settings className="h-3 w-3" />
          Impostazioni
        </Button>
      </div>

      {/* Info aggiuntive */}
      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          💡 <strong>Suggerimento:</strong> Usa i filtri per trovare notifiche specifiche. 
          Le notifiche archiviate vengono eliminate automaticamente dopo 30 giorni.
        </p>
      </div>
    </motion.div>
  );
}
