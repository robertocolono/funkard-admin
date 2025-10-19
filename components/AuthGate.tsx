"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simula controllo autenticazione
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      
      if (token && isLoggedIn) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simula login (in futuro sarà sostituito con JWT reale)
    if (credentials.username === "admin" && credentials.password === "admin") {
      localStorage.setItem("adminToken", "mock-token-" + Date.now());
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      setError("Credenziali non valide");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
    setCredentials({ username: "", password: "" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifica autenticazione...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Funkard Admin</CardTitle>
              <p className="text-muted-foreground">
                Accedi al pannello di amministrazione
              </p>
            </CardHeader>
            
            <CardContent>
              {!showLogin ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Autenticazione richiesta per accedere al pannello admin
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setShowLogin(true)}
                    className="w-full"
                  >
                    Accedi
                  </Button>
                  
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Bypass temporaneo per sviluppo
                        localStorage.setItem("adminToken", "dev-token");
                        localStorage.setItem("isLoggedIn", "true");
                        setIsAuthenticated(true);
                      }}
                      className="text-xs text-muted-foreground"
                    >
                      Modalità sviluppo (bypass)
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="admin"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="admin"
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowLogin(false)}
                      className="flex-1"
                    >
                      Indietro
                    </Button>
                    <Button type="submit" className="flex-1">
                      Accedi
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Credenziali demo: admin / admin
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Logout button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Logout
        </Button>
      </div>
      
      {children}
    </div>
  );
}
