"use client";
import { useEffect, useState } from 'react';

interface NotificationToastProps {
  notification: {
    id: string;
    message: string;
    productId: string;
    type: 'warning' | 'info' | 'error';
  };
  onClose: () => void;
}

export default function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Aspetta l'animazione di uscita
    }, 5000); // Auto-close dopo 5 secondi

    return () => clearTimeout(timer);
  }, [onClose]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-400 text-black';
      case 'error': return 'bg-red-400 text-black';
      case 'info': return 'bg-blue-400 text-black';
      default: return 'bg-gray-400 text-black';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`${getTypeColor(notification.type)} p-4 rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-start gap-3">
          <span className="text-lg">{getTypeIcon(notification.type)}</span>
          <div className="flex-1">
            <p className="font-semibold text-sm">{notification.message}</p>
            <p className="text-xs opacity-75 mt-1">ID: {notification.productId}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-black hover:text-gray-600 text-lg"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
