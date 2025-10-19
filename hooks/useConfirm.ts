"use client";

import { useState, useCallback } from "react";

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ConfirmState {
  isOpen: boolean;
  options: ConfirmOptions;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    options: {},
  });

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        isOpen: true,
        options: {
          ...options,
          onConfirm: async () => {
            try {
              await options.onConfirm?.();
              resolve(true);
            } catch (error) {
              console.error("Errore durante conferma:", error);
              resolve(false);
            } finally {
              setState(prev => ({ ...prev, isOpen: false }));
            }
          },
          onCancel: () => {
            options.onCancel?.();
            resolve(false);
            setState(prev => ({ ...prev, isOpen: false }));
          },
        },
      });
    });
  }, []);

  const close = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    isOpen: state.isOpen,
    options: state.options,
    confirm,
    close,
  };
}

// Hook per dialoghi di conferma specifici
export function useConfirmDialog() {
  const { isOpen, options, confirm, close } = useConfirm();

  const confirmDelete = useCallback((itemName: string) => {
    return confirm({
      title: "Conferma eliminazione",
      description: `Sei sicuro di voler eliminare "${itemName}"? Questa azione non può essere annullata.`,
      confirmText: "Elimina",
      cancelText: "Annulla",
      variant: "destructive",
    });
  }, [confirm]);

  const confirmCleanup = useCallback((days: number) => {
    return confirm({
      title: "Conferma pulizia",
      description: `Sei sicuro di voler eliminare tutte le notifiche archiviate più vecchie di ${days} giorni? Questa azione non può essere annullata.`,
      confirmText: "Procedi",
      cancelText: "Annulla",
      variant: "destructive",
    });
  }, [confirm]);

  const confirmArchive = useCallback((itemName: string) => {
    return confirm({
      title: "Conferma archiviazione",
      description: `Sei sicuro di voler archiviare "${itemName}"?`,
      confirmText: "Archivia",
      cancelText: "Annulla",
      variant: "default",
    });
  }, [confirm]);

  const confirmResolve = useCallback((itemName: string) => {
    return confirm({
      title: "Conferma risoluzione",
      description: `Sei sicuro di voler segnare "${itemName}" come risolto?`,
      confirmText: "Risolvi",
      cancelText: "Annulla",
      variant: "default",
    });
  }, [confirm]);

  return {
    isOpen,
    options,
    close,
    confirm,
    confirmDelete,
    confirmCleanup,
    confirmArchive,
    confirmResolve,
  };
}
