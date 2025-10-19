"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NotificationFilters {
  type: string;
  priority: string;
  status: string;
  search: string;
}

interface NotificationsFiltersProps {
  filters: NotificationFilters;
  onFiltersChange: (filters: NotificationFilters) => void;
  onClearFilters: () => void;
  onMarkAllRead: () => void;
  onCleanupArchived: () => void;
  unreadCount: number;
  isLoading?: boolean;
}

export default function NotificationsFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  onMarkAllRead,
  onCleanupArchived,
  unreadCount,
  isLoading = false,
}: NotificationsFiltersProps) {
  const [localFilters, setLocalFilters] = useState<NotificationFilters>(filters);

  // Persistenza filtri in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notificationFilters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalFilters(parsed);
        onFiltersChange(parsed);
      } catch {
        // Ignora errori di parsing
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notificationFilters", JSON.stringify(localFilters));
  }, [localFilters]);

  const handleFilterChange = (key: keyof NotificationFilters, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== "");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "normal": return "bg-blue-500";
      case "low": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
      {/* Header con azioni rapide */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtri Notifiche</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} non lette
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllRead}
            disabled={isLoading || unreadCount === 0}
            className="text-xs"
          >
            Segna tutte come lette
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCleanupArchived}
            disabled={isLoading}
            className="text-xs"
          >
            Pulisci archiviate
          </Button>
        </div>
      </div>

      {/* Filtri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Ricerca testo */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca notifiche..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filtro tipo */}
        <Select
          value={localFilters.type}
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tutti i tipi</SelectItem>
            <SelectItem value="ERROR">Errori</SelectItem>
            <SelectItem value="MARKET">Market</SelectItem>
            <SelectItem value="SUPPORT">Support</SelectItem>
            <SelectItem value="SYSTEM">Sistema</SelectItem>
            <SelectItem value="GRADING">Grading</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro priorità */}
        <Select
          value={localFilters.priority}
          onValueChange={(value) => handleFilterChange("priority", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Priorità" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tutte le priorità</SelectItem>
            <SelectItem value="urgent">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Urgente
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                Alta
              </div>
            </SelectItem>
            <SelectItem value="normal">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Normale
              </div>
            </SelectItem>
            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                Bassa
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro stato */}
        <Select
          value={localFilters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tutti gli stati</SelectItem>
            <SelectItem value="unread">Non lette</SelectItem>
            <SelectItem value="read">Lette</SelectItem>
            <SelectItem value="resolved">Risolte</SelectItem>
            <SelectItem value="archived">Archiviate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filtri attivi */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtri attivi:</span>
          {localFilters.type && (
            <Badge variant="secondary" className="text-xs">
              Tipo: {localFilters.type}
            </Badge>
          )}
          {localFilters.priority && (
            <Badge variant="secondary" className="text-xs">
              Priorità: {localFilters.priority}
            </Badge>
          )}
          {localFilters.status && (
            <Badge variant="secondary" className="text-xs">
              Stato: {localFilters.status}
            </Badge>
          )}
          {localFilters.search && (
            <Badge variant="secondary" className="text-xs">
              Ricerca: "{localFilters.search}"
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs h-6 px-2"
          >
            <X className="h-3 w-3 mr-1" />
            Pulisci
          </Button>
        </div>
      )}
    </div>
  );
}