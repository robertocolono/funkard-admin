# 📁 Frontend Structure - Funkard Admin

## 🏗️ Nuova Organizzazione Modulare

### **📂 Directory Principali**

```
funkard-admin/
├── 📱 app/                          # Next.js App Router
├── 🧩 components/                   # Componenti React
├── 🎣 hooks/                        # Custom Hooks
├── 📚 lib/                         # Utilities e servizi
├── 🎯 types/                       # TypeScript interfaces
├── 🔧 providers/                   # Context providers
└── 🖥️ backend/                     # Backend Java Spring Boot
```

---

## **🎣 `/hooks/` - Custom Hooks**

### **🔗 useSSE.ts**
```typescript
// Hook robusto per Server-Sent Events
export function useSSE({
  url,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
  timeout = 30000,
  onMessage,
  onError,
  onReconnect,
  onMaxReconnectAttempts,
})
```

**Funzionalità:**
- ✅ Reconnect automatico con backoff
- ✅ Timeout configurabile
- ✅ Gestione errori robusta
- ✅ Cleanup automatico
- ✅ Stato connessione in tempo reale

### **✅ useConfirm.ts**
```typescript
// Hook per dialoghi di conferma
export function useConfirm()
export function useConfirmDialog()
```

**Funzionalità:**
- ✅ Dialoghi di conferma universali
- ✅ Varianti predefinite (delete, cleanup, archive, resolve)
- ✅ Gestione loading states
- ✅ Promise-based API

### **🔔 useNotificationSSE.ts**
```typescript
// Hook specializzato per notifiche real-time
export function useNotificationSSE()
```

**Funzionalità:**
- ✅ Connessione SSE dedicata
- ✅ Contatore non lette in tempo reale
- ✅ Notifiche recenti
- ✅ Gestione errori e reconnessione

---

## **🧩 `/components/common/` - Componenti Riutilizzabili**

### **✅ ConfirmDialog.tsx**
```typescript
// Dialog universale per conferme
<ConfirmDialog
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={onConfirm}
  title="Conferma eliminazione"
  description="Sei sicuro di voler procedere?"
  variant="destructive"
  isLoading={false}
/>
```

**Funzionalità:**
- ✅ Icone dinamiche per tipo azione
- ✅ Varianti (default, destructive)
- ✅ Loading states
- ✅ Styling coerente

### **📭 EmptyState.tsx**
```typescript
// Placeholder per stati vuoti
<EmptyState
  icon="inbox"
  title="Nessuna notifica"
  description="Non ci sono notifiche da visualizzare."
  action={{ label: "Riprova", onClick: handleRetry }}
/>
```

**Varianti Predefinite:**
- `EmptyNotifications()` - Nessuna notifica
- `EmptySearchResults()` - Nessun risultato ricerca
- `EmptyData()` - Nessun dato
- `EmptyError()` - Errore caricamento

### **📊 StatCard.tsx**
```typescript
// Card statistiche con colori dinamici
<StatCard
  title="Notifiche"
  value={42}
  description="Notifiche totali"
  trend={{ value: 12, label: "vs scorsa settimana" }}
  color="blue"
  icon={<BellIcon />}
/>
```

**Varianti Predefinite:**
- `NotificationStatCard()` - Statistiche notifiche
- `UserStatCard()` - Statistiche utenti
- `ErrorStatCard()` - Statistiche errori
- `SystemStatCard()` - Stato sistema

---

## **📚 `/lib/` - Utilities e Servizi**

### **🔧 API Client Centralizzato**
```typescript
// lib/api.ts - Tutte le chiamate API consolidate
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T>
export function apiGet<T>(endpoint: string): Promise<T>
export function apiPost<T>(endpoint: string, body?: any): Promise<T>
export function apiPatch<T>(endpoint: string, body?: any): Promise<T>
export function apiDelete<T>(endpoint: string): Promise<T>
export function apiPut<T>(endpoint: string, body?: any): Promise<T>
```

### **🔔 Notifiche Admin**
```typescript
// Funzioni notifiche consolidate
export async function getNotifications(filters?: NotificationFilters)
export async function getArchivedNotifications()
export async function getNotification(id: number)
export async function markNotificationAsRead(id: number)
export async function resolveNotification(id: number, note?: string)
export async function archiveNotification(id: number, note?: string)
export async function getUnreadCount()
export async function getRecentNotifications()
export async function cleanupArchivedNotifications(days?: number)
```

### **🎣 Hooks Aggiornati**
```typescript
// lib/hooks/useNotifications.ts - Hook notifiche refactored
export function useNotifications(filters?: NotificationFilters) {
  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    resolve,
    archive,
    refresh,
  };
}
```

---

## **🎯 Migrazione e Refactor**

### **✅ Completato**
- ✅ Directory `/hooks/` con hook robusti
- ✅ Directory `/components/common/` con componenti riutilizzabili
- ✅ API client centralizzato in `/lib/api.ts`
- ✅ Hook `useNotifications` refactored
- ✅ Hook SSE dedicato per notifiche
- ✅ Rimozione file duplicati
- ✅ Consolidamento servizi

### **🔄 Da Migrare**
- 🔄 Aggiornare componenti per usare nuovi hook
- 🔄 Sostituire dialoghi nativi con `ConfirmDialog`
- 🔄 Implementare `EmptyState` nelle liste
- 🔄 Usare `StatCard` nel dashboard
- 🔄 Integrare `useNotificationSSE` nel `NotificationBell`

---

## **🚀 Vantaggi Nuova Struttura**

### **📊 Modularità**
- **Hook specializzati**: `useSSE`, `useConfirm`, `useNotificationSSE`
- **Componenti riutilizzabili**: `ConfirmDialog`, `EmptyState`, `StatCard`
- **API centralizzata**: Tutte le chiamate in `/lib/api.ts`

### **🔧 Manutenibilità**
- **Nessuna duplicazione**: File consolidati
- **Type safety**: Interfaces TypeScript
- **Error handling**: Gestione errori centralizzata
- **Loading states**: Stati di caricamento uniformi

### **⚡ Performance**
- **SSE ottimizzato**: Reconnect automatico
- **Caching**: Gestione cache intelligente
- **Lazy loading**: Caricamento on-demand
- **Bundle splitting**: Codice modulare

### **🎨 UX/UI**
- **Consistenza**: Componenti uniformi
- **Accessibilità**: ARIA labels e keyboard navigation
- **Responsive**: Design mobile-first
- **Dark mode**: Supporto tema scuro

---

## **📋 Prossimi Passi**

### **🔧 Implementazione**
1. **Aggiornare componenti esistenti** per usare nuovi hook
2. **Sostituire dialoghi nativi** con `ConfirmDialog`
3. **Implementare `EmptyState`** nelle liste vuote
4. **Usare `StatCard`** nel dashboard
5. **Integrare `useNotificationSSE`** nel sistema notifiche

### **🧪 Testing**
1. **Unit tests** per hook personalizzati
2. **Integration tests** per componenti
3. **E2E tests** per flussi completi
4. **Performance tests** per SSE

### **📚 Documentazione**
1. **Storybook** per componenti
2. **API documentation** per hook
3. **Migration guide** per sviluppatori
4. **Best practices** per nuovi componenti

**🎯 La nuova struttura è modulare, scalabile e pronta per lo sviluppo futuro!**
