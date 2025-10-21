'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Users, MessageSquare } from 'lucide-react';

export function AdminSimulator() {
  const [selectedRole, setSelectedRole] = useState<string>('support');
  const [adminName, setAdminName] = useState<string>('Mario Rossi');
  const [adminEmail, setAdminEmail] = useState<string>('mario.rossi@funkard.com');

  const simulateLogin = (role: string) => {
    const adminData = {
      id: `admin_${Date.now()}`,
      role: role,
      name: adminName,
      email: adminEmail,
      token: `token_${Date.now()}`
    };

    // Salva in localStorage per simulare login
    localStorage.setItem('funkard_admin', JSON.stringify(adminData));
    localStorage.setItem('funkard_token', adminData.token);

    // Ricarica la pagina per applicare i cambiamenti
    window.location.reload();
  };

  const clearLogin = () => {
    localStorage.removeItem('funkard_admin');
    localStorage.removeItem('funkard_token');
    window.location.reload();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="w-4 h-4" />;
      case 'admin':
        return <Users className="w-4 h-4" />;
      case 'support':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Accesso completo a tutti gli eventi e funzionalità di sistema';
      case 'admin':
        return 'Gestione ticket e assegnazioni, accesso a eventi amministrativi';
      case 'support':
        return 'Gestione ticket assegnati, notifiche per messaggi utenti';
      default:
        return 'Ruolo non riconosciuto';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getRoleIcon(selectedRole)}
          Admin Simulator
        </CardTitle>
        <CardDescription>
          Simula login con diversi ruoli admin per testare il sistema SSE
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Selezione ruolo */}
          <div className="space-y-2">
            <Label htmlFor="role">Ruolo Admin</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona ruolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Super Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="support">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Support</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">{getRoleDescription(selectedRole)}</p>
          </div>

          {/* Dati admin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Admin</Label>
              <Input
                id="name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Nome admin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Admin</Label>
              <Input
                id="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@funkard.com"
              />
            </div>
          </div>

          {/* Azioni */}
          <div className="flex gap-2">
            <Button 
              onClick={() => simulateLogin(selectedRole)}
              className="flex-1"
            >
              Simula Login
            </Button>
            <Button 
              onClick={clearLogin}
              variant="outline"
            >
              Logout
            </Button>
          </div>

          {/* Info */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Come funziona:</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Seleziona un ruolo admin</li>
              <li>• Inserisci nome e email</li>
              <li>• Clicca "Simula Login"</li>
              <li>• Il sistema SSE si attiverà automaticamente</li>
              <li>• Riceverai notifiche basate sul ruolo selezionato</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
