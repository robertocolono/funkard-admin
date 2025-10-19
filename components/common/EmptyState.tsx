"use client";

import { FileX, Search, AlertCircle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: "file" | "search" | "alert" | "inbox";
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon = "file",
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  const getIcon = () => {
    switch (icon) {
      case "search":
        return <Search className="h-12 w-12 text-gray-400" />;
      case "alert":
        return <AlertCircle className="h-12 w-12 text-yellow-400" />;
      case "inbox":
        return <Inbox className="h-12 w-12 text-blue-400" />;
      default:
        return <FileX className="h-12 w-12 text-gray-400" />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="mb-4">
        {getIcon()}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-gray-600 text-center max-w-sm mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <Button
          onClick={action.onClick}
          variant="outline"
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Varianti predefinite per casi comuni
export function EmptyNotifications() {
  return (
    <EmptyState
      icon="inbox"
      title="Nessuna notifica"
      description="Non ci sono notifiche da visualizzare al momento."
    />
  );
}

export function EmptySearchResults() {
  return (
    <EmptyState
      icon="search"
      title="Nessun risultato"
      description="Prova a modificare i filtri di ricerca per trovare quello che stai cercando."
    />
  );
}

export function EmptyData() {
  return (
    <EmptyState
      icon="file"
      title="Nessun dato"
      description="Non ci sono elementi da visualizzare."
    />
  );
}

export function EmptyError() {
  return (
    <EmptyState
      icon="alert"
      title="Errore nel caricamento"
      description="Si è verificato un errore durante il caricamento dei dati."
      action={{
        label: "Riprova",
        onClick: () => window.location.reload(),
      }}
    />
  );
}
