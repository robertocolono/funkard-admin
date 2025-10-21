# Support Events SSE System

Sistema di notifiche real-time per eventi support ticket tramite Server-Sent Events (SSE).

## 🚀 Quick Start

### 1. Importa il hook

```typescript
import { useSupportEvents } from '@/hooks/useSupportEvents';
import { useSession } from '@/lib/useSession';
```

### 2. Usa nel tuo componente

```typescript
export default function MyPage() {
  const { user } = useSession();
  
  // Inizializza eventi SSE per notifiche real-time
  useSupportEvents(user?.role, user?.id);
  
  return (
    <div>
      {/* La tua UI qui */}
    </div>
  );
}
```

## 📡 Eventi Supportati

### Eventi Ticket
- **`ticket-update`** - Aggiornamento stato ticket
- **`ticket-assigned`** - Ticket assegnato a support
- **`ticket-unassigned`** - Ticket rilasciato
- **`ticket-resolved`** - Ticket risolto/chiuso
- **`new-ticket`** - Nuovo ticket creato

### Eventi Messaggi
- **`new-message`** - Nuovo messaggio ricevuto

## 🎭 Filtri per Ruolo

### SUPER_ADMIN
- ✅ Vede tutti gli eventi
- ✅ Riceve notifiche per tutti i ticket
- ✅ Accesso completo al sistema

### ADMIN
- ✅ Vede aggiornamenti e assegnazioni
- ✅ Riceve notifiche per ticket assegnati
- ✅ Può gestire ticket

### SUPPORT
- ✅ Riceve solo eventi relativi ai ticket assegnati
- ✅ Notifiche per messaggi nei suoi ticket
- ✅ Gestione limitata ai propri ticket

## 🔧 Configurazione

### Variabili Ambiente
```env
NEXT_PUBLIC_API_URL=https://funkard-api.onrender.com
```

### Endpoint SSE
```
GET /admin/support/stream
```

## 📱 Esempi di Toast

### Nuovo Ticket
```
🎫 Nuovo ticket
#123 da mario.rossi@email.com: Problema pagamento
```

### Nuovo Messaggio
```
💬 Nuovo messaggio
Ticket #123 — Mario Rossi: Ho ancora problemi con il pagamento
```

### Ticket Assegnato
```
🎧 Ticket assegnato
Il ticket #123 è stato assegnato a support@funkard.com
```

### Ticket Risolto
```
✅ Ticket risolto
Il ticket #123 è stato chiuso con successo
```

## 🛠️ Implementazione Avanzata

### Hook Personalizzato
```typescript
export function useSupportEvents(userRole?: string, userId?: string) {
  const { toast } = useToast();

  useEffect(() => {
    const es = new EventSource(`${API_URL}/admin/support/stream`);
    
    es.addEventListener("ticket-update", (event) => {
      const data = JSON.parse(event.data);
      // Logica filtri per ruolo
      if (shouldShowNotification(userRole, userId, data)) {
        toast({
          title: "📬 Ticket aggiornato",
          description: `Il ticket #${data.id} è ora in stato "${data.status}".`,
        });
      }
    });
    
    return () => es.close();
  }, [toast, userRole, userId]);
}
```

### Gestione Errori
```typescript
es.onerror = (error) => {
  console.warn("⚠️ Connessione SSE interrotta, riconnessione tra 5s...", error);
  es.close();
  setTimeout(() => {
    // Riconnessione automatica
    setupNewConnection();
  }, 5000);
};
```

## 🧪 Testing

### Pagina di Test
Visita `/dashboard/test-toast` per testare tutti i tipi di notifiche.

### Componente di Test
```typescript
import { SupportEventsExample } from '@/components/admin/SupportEventsExample';

export default function TestPage() {
  return <SupportEventsExample />;
}
```

## 📊 Monitoraggio

### Log Console
```typescript
console.log('📡 Ticket update event:', data);
console.log('🔗 SSE connesso per support events');
console.log('⚠️ Connessione SSE interrotta');
```

### Debug Mode
Abilita i log dettagliati per debugging:
```typescript
const DEBUG_SSE = process.env.NODE_ENV === 'development';
if (DEBUG_SSE) {
  console.log('SSE Event:', event);
}
```

## 🔒 Sicurezza

### Autenticazione
- Token Bearer nell'header Authorization
- Controllo ruoli lato frontend
- Filtri per accesso ai dati

### Validazione
- Parsing sicuro JSON
- Gestione errori robusta
- Timeout e riconnessione automatica

## 🚀 Performance

### Ottimizzazioni
- Connessione SSE singola per pagina
- Filtri intelligenti per ridurre notifiche
- Cleanup automatico al unmount
- Riconnessione automatica su errore

### Best Practices
- Usa il hook solo nelle pagine che necessitano notifiche
- Evita multiple connessioni SSE
- Implementa cleanup corretto
- Testa i filtri per ruolo

## 📝 Note

- Il sistema è completamente compatibile con il backend Funkard
- Le notifiche sono filtrate in base al ruolo utente
- La riconnessione è automatica in caso di errori
- Il sistema è ottimizzato per performance
