# 📋 Modulo Storico Azioni - Admin Panel

Sistema modulare e riutilizzabile per visualizzare lo storico delle azioni amministrative.

## 🏗️ Struttura

```
/components/admin/history/
├── useHistory.ts          # Hook personalizzato per fetch storico
├── HistorySection.tsx     # Componente UI per visualizzazione
└── README.md             # Documentazione
```

## 🔧 Utilizzo

### 1. Hook useHistory

```typescript
import { useHistory } from "@/components/admin/history/useHistory";

function MyComponent() {
  const { history, loading } = useHistory("NOTIFICATION", 123);
  
  // history: array di azioni
  // loading: boolean per stato caricamento
}
```

### 2. Componente HistorySection

```typescript
import HistorySection from "@/components/admin/history/HistorySection";

function MyPage() {
  return (
    <div>
      {/* ... contenuto pagina */}
      <HistorySection type="NOTIFICATION" targetId={123} />
    </div>
  );
}
```

## 📡 Endpoint Backend

Il sistema si connette automaticamente all'endpoint:

```
GET /api/admin/history/{type}/{id}
```

### Tipi supportati:
- `NOTIFICATION` - Notifiche admin
- `TICKET` - Ticket supporto  
- `USER` - Utenti
- `MARKET` - Item marketplace
- `PRICE` - Prezzi carte

## 🎨 UI/UX

- **Loading state**: Spinner durante caricamento
- **Empty state**: Messaggio quando nessuna azione
- **Formato azione**: `performedBy (role) → action — notes`
- **Timestamp**: Formattato in locale italiano
- **Layout**: Card con bordi e padding

## 🔄 Esempi di Integrazione

### Notifiche
```typescript
<HistorySection type="NOTIFICATION" targetId={notificationId} />
```

### Ticket Supporto
```typescript
<HistorySection type="TICKET" targetId={ticketId} />
```

### Utenti
```typescript
<HistorySection type="USER" targetId={userId} />
```

### Item Marketplace
```typescript
<HistorySection type="MARKET" targetId={itemId} />
```

## 🚀 Vantaggi

- **Modulare**: Riutilizzabile in qualsiasi pagina
- **Leggero**: Hook ottimizzato con useEffect
- **Scalabile**: Supporto per tutti i tipi di oggetti
- **Consistente**: UI uniforme in tutto il pannello
- **Performante**: Caricamento solo quando necessario
