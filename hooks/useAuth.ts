'use client';

import { useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  role: "support" | "admin" | "super_admin";
  name?: string;
  email?: string;
  token?: string;
}

interface AuthState {
  admin: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula recupero admin da localStorage o API
    const adminData = localStorage.getItem('funkard_admin');
    const token = localStorage.getItem('funkard_token');
    
    if (adminData && token) {
      try {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin({
          ...parsedAdmin,
          token
        });
      } catch (error) {
        console.error('Errore parsing admin data:', error);
        localStorage.removeItem('funkard_admin');
        localStorage.removeItem('funkard_token');
      }
    }
    
    setIsLoading(false);
  }, []);

  return {
    admin,
    isLoading,
    isAuthenticated: !!admin,
  };
}
