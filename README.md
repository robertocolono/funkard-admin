# Funkard Admin

Dashboard amministrativa per Funkard - Sistema di gestione carte digitali.

## Struttura

```
app/
 ├── login/page.tsx      # Pagina di login protetta da SECRET
 ├── dashboard/page.tsx  # Dashboard principale con statistiche
 ├── market/page.tsx     # Gestione carte del marketplace
 ├── support/page.tsx    # Sistema di supporto clienti
 └── layout.tsx          # Layout con protezione rotte e navigazione
```

## Setup

1. Installa le dipendenze:
```bash
npm install
```

2. Configura le variabili d'ambiente:
```bash
NEXT_PUBLIC_API_URL=https://funkard-api.onrender.com
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

## Deploy su Vercel

1. Crea un nuovo progetto su [vercel.com/new](https://vercel.com/new)
2. Importa il repository `funkard-admin`
3. Imposta le variabili d'ambiente:
   - `NEXT_PUBLIC_API_URL`: `https://funkard-api.onrender.com`
4. Configura il dominio personalizzato: `admin.funkard.com`

## Funzionalità

- **Login Sicuro**: Accesso protetto tramite SECRET admin
- **Dashboard**: Statistiche e overview del sistema
- **Gestione Market**: CRUD per le carte del marketplace
- **Supporto**: Sistema di gestione ticket clienti
- **Protezione Rotte**: Tutte le pagine sono protette tranne `/login`

## Architettura

- **Frontend**: Next.js 14 con App Router
- **Styling**: Tailwind CSS con tema scuro
- **Autenticazione**: Token-based con localStorage
- **API**: Integrazione con backend Funkard esistente
