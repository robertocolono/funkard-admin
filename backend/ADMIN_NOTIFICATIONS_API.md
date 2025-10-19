# 📋 AdminNotifications API - Documentazione Completa

## 🏗️ Architettura Backend

### Entity: AdminNotification
```java
@Entity
@Table(name = "admin_notifications")
public class AdminNotification {
  private Long id;
  private String type;           // errore | segnalazione | supporto | mercato
  private String priority;       // bassa | media | alta | critica
  private String title;
  private String message;
  private boolean readStatus;
  private Instant readAt;
  private Instant createdAt;
  
  // ✅ Nuovi campi
  private boolean archived;
  private Instant resolvedAt;
  private String resolvedBy;
  private String history;        // JSON array con storico azioni
}
```

### Repository: AdminNotificationRepository
```java
public interface AdminNotificationRepository extends JpaRepository<AdminNotification, Long> {
  List<AdminNotification> findByArchivedFalseOrderByCreatedAtAsc();
  
  @Query("select n from AdminNotification n where (:type is null or n.type = :type) and ...")
  List<AdminNotification> filter(String type, String priority, String status);
  
  long deleteByArchivedTrueAndResolvedAtBefore(Instant olderThan);
  long countByReadStatusFalseAndArchivedFalse();
}
```

### Service: AdminNotificationService
```java
@Service
public class AdminNotificationService {
  public List<AdminNotification> listActiveChrono();
  public List<AdminNotification> filter(String type, String priority, String status);
  public Optional<AdminNotification> get(Long id);
  public AdminNotification resolve(Long id, String userName, String note);
  public AdminNotification archive(Long id, String userName, String note);
  public AdminNotification markRead(Long id, String userName);
  public long cleanupArchivedOlderThanDays(int days);
}
```

## 🔗 Endpoint API

### 1️⃣ Lista Notifiche
```http
GET /api/admin/notifications?type=&priority=&status=
```

**Parametri Query:**
- `type` (optional): errore, segnalazione, supporto, mercato
- `priority` (optional): bassa, media, alta, critica  
- `status` (optional): attiva, risolta, archiviata

**Response:**
```json
[
  {
    "id": 12,
    "type": "errore",
    "priority": "alta",
    "title": "Errore grading",
    "message": "Timeout GradeLens",
    "readStatus": false,
    "readAt": null,
    "createdAt": "2025-10-17T10:01:00Z",
    "archived": false,
    "resolvedAt": null,
    "resolvedBy": null,
    "history": "[{\"user\":\"admin\",\"action\":\"read\",\"at\":\"2025-10-17T10:30:00Z\"}]"
  }
]
```

### 2️⃣ Dettaglio Notifica
```http
GET /api/admin/notifications/{id}
```

**Response:** Stesso oggetto della lista

### 3️⃣ Segna Come Letta
```http
POST /api/admin/notifications/{id}/read
```

**Response:**
```json
{
  "id": 12,
  "readStatus": true,
  "readAt": "2025-10-17T10:30:00Z",
  "history": "[{\"user\":\"admin\",\"action\":\"read\",\"at\":\"2025-10-17T10:30:00Z\"}]"
}
```

### 4️⃣ Risolvi Notifica
```http
POST /api/admin/notifications/{id}/resolve
Content-Type: application/json

{
  "note": "Fixato dal worker"
}
```

**Response:**
```json
{
  "id": 12,
  "resolvedAt": "2025-10-17T12:00:00Z",
  "resolvedBy": "admin",
  "history": "[{\"user\":\"admin\",\"action\":\"resolve\",\"at\":\"2025-10-17T12:00:00Z\",\"note\":\"Fixato dal worker\"}]"
}
```

### 5️⃣ Archivia Notifica
```http
POST /api/admin/notifications/{id}/archive
Content-Type: application/json

{
  "note": "Spostata in archivio"
}
```

**Response:**
```json
{
  "id": 12,
  "archived": true,
  "history": "[{\"user\":\"admin\",\"action\":\"archive\",\"at\":\"2025-10-17T12:05:00Z\",\"note\":\"Spostata in archivio\"}]"
}
```

### 6️⃣ Cleanup Manuale
```http
DELETE /api/admin/notifications/cleanup?days=30
```

**Response:**
```json
{
  "deleted": 23,
  "olderThanDays": 30
}
```

### 7️⃣ Conta Non Lette
```http
GET /api/admin/notifications/unreadCount
```

**Response:**
```json
{
  "unreadCount": 5
}
```

### 8️⃣ Notifiche Recenti
```http
GET /api/admin/notifications/recent
```

**Response:** Array delle ultime 5 notifiche attive

## 🧪 Test con cURL

### Lista Attive Cronologica
```bash
curl https://funkard-api.onrender.com/api/admin/notifications \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Filtri
```bash
curl "https://funkard-api.onrender.com/api/admin/notifications?status=risolta&priority=alta" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Dettaglio
```bash
curl https://funkard-api.onrender.com/api/admin/notifications/12 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Segna Letta
```bash
curl -X POST https://funkard-api.onrender.com/api/admin/notifications/12/read \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Risolvi con Nota
```bash
curl -X POST https://funkard-api.onrender.com/api/admin/notifications/12/resolve \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"note":"Verificato e risolto"}'
```

### Archivia
```bash
curl -X POST https://funkard-api.onrender.com/api/admin/notifications/12/archive \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"note":"Spostata in archivio"}'
```

### Cleanup
```bash
curl -X DELETE "https://funkard-api.onrender.com/api/admin/notifications/cleanup?days=30" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## 📊 Storia Azioni (History)

### Formato JSON
```json
[
  {
    "user": "admin",
    "action": "read",
    "at": "2025-10-17T10:30:00Z"
  },
  {
    "user": "admin", 
    "action": "resolve",
    "at": "2025-10-17T12:00:00Z",
    "note": "Fixato dal worker"
  },
  {
    "user": "admin",
    "action": "archive", 
    "at": "2025-10-17T12:05:00Z",
    "note": "Spostata in archivio"
  }
]
```

### Azioni Supportate
- `read`: Notifica letta
- `resolve`: Notifica risolta
- `archive`: Notifica archiviata

## 🔄 Integrazione Frontend

### Hook React
```typescript
const { notifications, loading, error } = useAdminNotifications({
  type: 'errore',
  priority: 'alta',
  status: 'attiva'
});
```

### Azioni Frontend
```typescript
// Segna come letta
await markAsRead(notificationId);

// Risolvi con nota
await resolveNotification(notificationId, "Fixato dal team");

// Archivia
await archiveNotification(notificationId, "Spostata in archivio");
```

## 🚀 Vantaggi Implementazione

### 📊 Gestione Completa
- **Stato**: Attiva, Risolta, Archiviata
- **Azioni**: Leggi, Risolvi, Archivia
- **Storico**: JSON compatto con tutte le azioni
- **Filtri**: Per tipo, priorità, stato

### 🔧 Performance
- **Query ottimizzate**: Indici su campi critici
- **Paginazione**: Per liste grandi
- **Cleanup**: Automatico per notifiche vecchie
- **Caching**: Per conteggi frequenti

### 🎨 UX Frontend
- **Tabella ordinata**: Cronologica (dalla più vecchia)
- **Filtri dinamici**: Tipo, priorità, stato
- **Modale dettaglio**: Con storico azioni
- **Azioni rapide**: Pulsanti per leggere/risolvere/archiviare

### 🔒 Sicurezza
- **Autenticazione**: Bearer token admin
- **Autorizzazione**: Solo admin autorizzati
- **Validazione**: Input sanitizzati
- **Audit**: Storico completo azioni
