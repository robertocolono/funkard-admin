"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Archive, 
  AlertTriangle, 
  Clock, 
  User,
  MessageSquare,
  Eye,
  EyeOff
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";

interface AdminNotification {
  id: number;
  type: string;
  priority: string;
  title: string;
  message: string;
  readStatus: boolean;
  readAt: string | null;
  createdAt: string;
  archived: boolean;
  resolvedAt: string | null;
  resolvedBy: string | null;
  history: string;
}

interface NotificationCardProps {
  notification: AdminNotification;
  onMarkAsRead: (id: number) => void;
  onResolve: (id: number, note?: string) => void;
  onArchive: (id: number, note?: string) => void;
  isLoading?: boolean;
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onResolve,
  onArchive,
  isLoading = false,
}: NotificationCardProps) {
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [resolveNote, setResolveNote] = useState("");
  const [archiveNote, setArchiveNote] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "normal": return "bg-blue-500";
      case "low": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent": return "Urgente";
      case "high": return "Alta";
      case "normal": return "Normale";
      case "low": return "Bassa";
      default: return priority;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ERROR": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "SYSTEM": return <Clock className="h-4 w-4 text-blue-500" />;
      case "SUPPORT": return <MessageSquare className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('it-IT', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(dateString));
  };

  const handleResolve = () => {
    onResolve(notification.id, resolveNote);
    setResolveNote("");
    setShowResolveDialog(false);
  };

  const handleArchive = () => {
    onArchive(notification.id, archiveNote);
    setArchiveNote("");
    setShowArchiveDialog(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`p-4 transition-all duration-200 hover:shadow-md ${
        notification.readStatus 
          ? "bg-muted/30 border-muted" 
          : "bg-background border-primary/20 shadow-sm"
      }`}>
        <div className="flex items-start justify-between gap-3">
          {/* Contenuto principale */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {getTypeIcon(notification.type)}
              <h3 className="font-semibold text-sm truncate">
                {notification.title}
              </h3>
              <Badge 
                className={`text-white text-xs ${getPriorityColor(notification.priority)}`}
              >
                {getPriorityLabel(notification.priority)}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {notification.message}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(notification.createdAt)}
              </span>
              
              {notification.readStatus && notification.readAt && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Letta {formatDate(notification.readAt)}
                </span>
              )}
              
              {notification.resolvedAt && (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Risolta {formatDate(notification.resolvedAt)}
                </span>
              )}
            </div>
          </div>

          {/* Azioni */}
          <div className="flex items-center gap-1">
            {!notification.readStatus && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                disabled={isLoading}
                className="h-8 w-8 p-0"
                title="Segna come letta"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            
            {!notification.resolvedAt && (
              <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                    title="Risolvi"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Risolvi Notifica</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Nota (opzionale)</label>
                      <Textarea
                        placeholder="Aggiungi una nota per la risoluzione..."
                        value={resolveNote}
                        onChange={(e) => setResolveNote}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowResolveDialog(false)}
                      >
                        Annulla
                      </Button>
                      <Button onClick={handleResolve}>
                        Risolvi
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                  title="Archivia"
                >
                  <Archive className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Archivia Notifica</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nota (opzionale)</label>
                    <Textarea
                      placeholder="Aggiungi una nota per l'archiviazione..."
                      value={archiveNote}
                      onChange={(e) => setArchiveNote(archiveNote)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowArchiveDialog(false)}
                    >
                      Annulla
                    </Button>
                    <Button onClick={handleArchive}>
                      Archivia
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
