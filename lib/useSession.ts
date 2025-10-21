'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT' | 'MODERATOR';
  name: string;
  token: string;
}

interface Session {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useSession(): Session {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula recupero sessione da localStorage o API
    const token = localStorage.getItem('funkard_token');
    const userData = localStorage.getItem('funkard_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Errore parsing user data:', error);
        localStorage.removeItem('funkard_token');
        localStorage.removeItem('funkard_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
