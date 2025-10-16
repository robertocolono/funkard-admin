# 🧹 Sistema Cleanup Notifiche - Setup Completo

## 📋 Panoramica

Il sistema di cleanup automatico elimina le notifiche archiviate più vecchie di 30 giorni per mantenere il database ottimizzato.

## 🔧 Configurazione

### 1. Variabili d'Ambiente

Aggiungi al file `.env.local` (o variabili Vercel):

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://funkard-api.onrender.com
NEXT_PUBLIC_ADMIN_TOKEN=your_admin_token_here

# CRON Secret Token (per cleanup automatico)
CRON_SECRET_TOKEN=your_cron_secret_token_here
```

### 2. Endpoint API Creati

#### `/api/cleanup/notifications` (DELETE)
- **Scopo**: Cleanup automatico via cron job
- **Autenticazione**: Bearer Token
- **Funzione**: Elimina notifiche > 30 giorni

#### `/api/cleanup/test` (POST)
- **Scopo**: Test manuale del cleanup
- **Autenticazione**: Bearer Token
- **Funzione**: Testa il sistema di pulizia

## ⏰ Setup Cron Job (Vercel)

### 1. Configurazione Vercel Cron

Crea il file `vercel.json` nella root del progetto:

```json
{
  "crons": [
    {
      "path": "/api/cleanup/notifications",
      "schedule": "0 2 * * *"
    }
  ]
}
```

### 2. Variabili Vercel

Imposta queste variabili nell'ambiente Vercel:

```
CRON_SECRET_TOKEN=your_secure_random_token
NEXT_PUBLIC_API_URL=https://funkard-api.onrender.com
NEXT_PUBLIC_ADMIN_TOKEN=your_admin_token
```

## 🧪 Test del Sistema

### 1. Test Manuale

Visita: `https://your-app.vercel.app/cleanup`

- Clicca "Testa Cleanup"
- Verifica i risultati
- Controlla i log

### 2. Test API Diretto

```bash
# Test cleanup
curl -X POST https://your-app.vercel.app/api/cleanup/test \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN" \
  -H "Content-Type: application/json"

# Cleanup automatico
curl -X DELETE https://your-app.vercel.app/api/cleanup/notifications \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
```

## 🔒 Sicurezza

### 1. Token di Autenticazione
- **CRON_SECRET_TOKEN**: Token sicuro per cron job
- **NEXT_PUBLIC_ADMIN_TOKEN**: Token per API backend
- Entrambi devono essere segreti e unici

### 2. Controlli di Sicurezza
- ✅ Solo metodi DELETE/POST consentiti
- ✅ Autenticazione Bearer Token obbligatoria
- ✅ Logging completo delle operazioni
- ✅ Gestione errori robusta

## 📊 Monitoraggio

### 1. Log Vercel
- Controlla i log delle funzioni serverless
- Monitora gli errori di cleanup
- Verifica la frequenza di esecuzione

### 2. Log Backend
- Controlla i log dell'API backend
- Monitora le eliminazioni
- Verifica le performance

## 🚀 Deployment

### 1. Deploy su Vercel
```bash
# Deploy automatico
git push origin main

# Deploy manuale
vercel --prod
```

### 2. Verifica Post-Deploy
1. Controlla che le variabili d'ambiente siano impostate
2. Testa l'endpoint `/api/cleanup/test`
3. Verifica che il cron job sia attivo
4. Monitora i log per 24-48 ore

## 🛠️ Troubleshooting

### Problemi Comuni

#### 1. "Unauthorized" Error
- ✅ Verifica che `CRON_SECRET_TOKEN` sia impostato
- ✅ Controlla che il token sia corretto
- ✅ Verifica che l'header Authorization sia presente

#### 2. "Backend API Error"
- ✅ Verifica che `NEXT_PUBLIC_API_URL` sia corretto
- ✅ Controlla che `NEXT_PUBLIC_ADMIN_TOKEN` sia valido
- ✅ Verifica che l'endpoint backend esista

#### 3. Cron Job Non Funziona
- ✅ Verifica la configurazione `vercel.json`
- ✅ Controlla che il path sia corretto
- ✅ Verifica che le variabili d'ambiente siano impostate

### Debug Steps

1. **Test Manuale**: Usa `/cleanup` page per testare
2. **Log Vercel**: Controlla i log delle funzioni
3. **Log Backend**: Verifica i log dell'API
4. **Variabili**: Controlla che tutte le env siano impostate

## 📈 Performance

### 1. Ottimizzazioni
- Cleanup giornaliero alle 02:00 (basso traffico)
- Eliminazione batch per performance
- Logging minimo per ridurre overhead

### 2. Monitoraggio
- Monitora la durata delle operazioni
- Controlla l'uso della memoria
- Verifica la frequenza di esecuzione

## 🎯 Risultato Finale

Dopo il setup completo avrai:

- ✅ **Cleanup automatico** ogni giorno alle 02:00
- ✅ **Test manuale** disponibile in `/cleanup`
- ✅ **Sicurezza robusta** con token di autenticazione
- ✅ **Monitoraggio completo** con logging
- ✅ **Performance ottimizzate** con eliminazione batch

Il sistema manterrà automaticamente il database pulito eliminando le notifiche archiviate più vecchie di 30 giorni! 🚀
