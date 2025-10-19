#!/bin/bash

# Test script per endpoint AdminNotifications
# Assicurati che il backend sia in esecuzione su https://funkard-api.onrender.com

BASE_URL="https://funkard-api.onrender.com"
ADMIN_TOKEN="your-admin-token-here"

echo "🧪 Test AdminNotifications Endpoints"
echo "====================================="

echo ""
echo "1️⃣ Lista notifiche attive (cronologica)"
curl -s "$BASE_URL/api/admin/notifications" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.[0:3]' || echo "❌ Errore lista notifiche"

echo ""
echo "2️⃣ Filtri notifiche"
echo "   - Status: risolta, Priority: alta"
curl -s "$BASE_URL/api/admin/notifications?status=risolta&priority=alta" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.[0:2]' || echo "❌ Errore filtri"

echo ""
echo "3️⃣ Dettaglio notifica (ID: 1)"
curl -s "$BASE_URL/api/admin/notifications/1" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.' || echo "❌ Errore dettaglio"

echo ""
echo "4️⃣ Segna come letta (ID: 1)"
curl -s -X POST "$BASE_URL/api/admin/notifications/1/read" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  | jq '.readStatus' || echo "❌ Errore segna letta"

echo ""
echo "5️⃣ Risolvi notifica (ID: 1) con nota"
curl -s -X POST "$BASE_URL/api/admin/notifications/1/resolve" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"note":"Verificato e risolto dal team"}' \
  | jq '.resolvedAt' || echo "❌ Errore risolvi"

echo ""
echo "6️⃣ Archivia notifica (ID: 2)"
curl -s -X POST "$BASE_URL/api/admin/notifications/2/archive" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"note":"Spostata in archivio per pulizia"}' \
  | jq '.archived' || echo "❌ Errore archivia"

echo ""
echo "7️⃣ Conta notifiche non lette"
curl -s "$BASE_URL/api/admin/notifications/unreadCount" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.unreadCount' || echo "❌ Errore conteggio"

echo ""
echo "8️⃣ Notifiche recenti"
curl -s "$BASE_URL/api/admin/notifications/recent" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.[0:3] | .[].title' || echo "❌ Errore recenti"

echo ""
echo "9️⃣ Cleanup manuale (30 giorni)"
curl -s -X DELETE "$BASE_URL/api/admin/notifications/cleanup?days=30" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.deleted' || echo "❌ Errore cleanup"

echo ""
echo "✅ Test completati!"
echo ""
echo "📋 Endpoint disponibili:"
echo "   GET    /api/admin/notifications                    - Lista notifiche"
echo "   GET    /api/admin/notifications/{id}              - Dettaglio"
echo "   POST   /api/admin/notifications/{id}/read          - Segna letta"
echo "   POST   /api/admin/notifications/{id}/resolve       - Risolvi"
echo "   POST   /api/admin/notifications/{id}/archive       - Archivia"
echo "   DELETE /api/admin/notifications/cleanup            - Cleanup"
echo "   GET    /api/admin/notifications/unreadCount        - Conta non lette"
echo "   GET    /api/admin/notifications/recent             - Recenti"
