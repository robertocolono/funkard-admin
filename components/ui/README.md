# Funkard UI Components

Questa directory contiene i componenti UI personalizzati per il pannello amministrativo Funkard, progettati per offrire un'esperienza utente moderna e fluida.

## Componenti Disponibili

### 1. Analytics (`analytics.tsx`)
Componenti per la gestione delle analytics con indicatori visivi e gestione dello stato.

**Varianti:**
- `Analytics` - Componente base
- `AnalyticsWithIndicators` - Con indicatori visivi
- `StatefulAnalytics` - Con gestione dello stato
- `CallbackAnalytics` - Con callback personalizzati
- `FocusAnalytics` - Con gestione del focus
- `ResizeAnalytics` - Con gestione del resize

**Utilizzo:**
```tsx
import { Analytics } from "@/components/ui/analytics"

<Analytics onAnalyticsChange={(settings) => console.log(settings)}>
  <div>Contenuto analytics</div>
</Analytics>
```

### 2. Performance (`performance.tsx`)
Componenti per la gestione delle performance con monitoraggio in tempo reale.

**Varianti:**
- `Performance` - Componente base
- `PerformanceWithIndicators` - Con indicatori visivi
- `StatefulPerformance` - Con gestione dello stato
- `CallbackPerformance` - Con callback personalizzati
- `FocusPerformance` - Con gestione del focus
- `ResizePerformance` - Con gestione del resize

**Utilizzo:**
```tsx
import { Performance } from "@/components/ui/performance"

<Performance onPerformanceChange={(settings) => console.log(settings)}>
  <div>Contenuto performance</div>
</Performance>
```

### 3. Security (`security.tsx`)
Componenti per la gestione della sicurezza con monitoraggio delle minacce.

**Varianti:**
- `Security` - Componente base
- `SecurityWithIndicators` - Con indicatori visivi
- `StatefulSecurity` - Con gestione dello stato

**Utilizzo:**
```tsx
import { Security } from "@/components/ui/security"

<Security onSecurityChange={(settings) => console.log(settings)}>
  <div>Contenuto sicurezza</div>
</Security>
```

### 4. Monitoring (`monitoring.tsx`)
Componenti per il monitoring del sistema con allerte e notifiche.

**Varianti:**
- `Monitoring` - Componente base
- `MonitoringWithIndicators` - Con indicatori visivi
- `StatefulMonitoring` - Con gestione dello stato

**Utilizzo:**
```tsx
import { Monitoring } from "@/components/ui/monitoring"

<Monitoring onMonitoringChange={(settings) => console.log(settings)}>
  <div>Contenuto monitoring</div>
</Monitoring>
```

### 5. Logs (`logs.tsx`)
Componenti per la gestione dei logs con filtri e visualizzazioni.

**Varianti:**
- `Logs` - Componente base
- `LogsWithIndicators` - Con indicatori visivi
- `StatefulLogs` - Con gestione dello stato

**Utilizzo:**
```tsx
import { Logs } from "@/components/ui/logs"

<Logs onLogsChange={(settings) => console.log(settings)}>
  <div>Contenuto logs</div>
</Logs>
```

### 6. Debug (`debug.tsx`)
Componenti per il debug del sistema con strumenti di sviluppo.

**Varianti:**
- `Debug` - Componente base
- `DebugWithIndicators` - Con indicatori visivi
- `StatefulDebug` - Con gestione dello stato

**Utilizzo:**
```tsx
import { Debug } from "@/components/ui/debug"

<Debug onDebugChange={(settings) => console.log(settings)}>
  <div>Contenuto debug</div>
</Debug>
```

### 7. Dashboard Cards (`dashboard-card.tsx`)
Card accattivanti per il dashboard con varianti e colori personalizzati.

**Varianti:**
- `DashboardCard` - Card base con molte opzioni
- `NotificationCard` - Card per notifiche
- `UserCard` - Card per utenti
- `ErrorCard` - Card per errori
- `SystemCard` - Card per stato sistema
- `PerformanceCard` - Card per performance
- `SecurityCard` - Card per sicurezza
- `MonitoringCard` - Card per monitoring

**Utilizzo:**
```tsx
import { DashboardCard, NotificationCard } from "@/components/ui/dashboard-card"

<DashboardCard
  title="Notifiche"
  value={42}
  description="Notifiche totali"
  trend={{ value: 12, label: "vs scorsa settimana" }}
  color="blue"
  icon={<Bell className="h-8 w-8" />}
/>

<NotificationCard count={42} trend={12} />
```

### 8. Animations (`animations.tsx`)
Componenti per animazioni fluide e transizioni eleganti.

**Varianti:**
- `Animation` - Animazione base
- `AnimatedPresence` - Con presenza/assenza
- `HoverAnimation` - Animazioni al hover
- `LoadingAnimation` - Animazioni di loading
- `TransitionAnimation` - Animazioni di transizione
- `StaggerAnimation` - Animazioni a cascata

**Utilizzo:**
```tsx
import { Animation, AnimatedPresence, HoverAnimation } from "@/components/ui/animations"

<Animation variant="fade" duration={0.3}>
  <div>Contenuto animato</div>
</Animation>

<AnimatedPresence show={isVisible} variant="slide">
  <div>Contenuto con presenza</div>
</AnimatedPresence>

<HoverAnimation variant="scale" intensity={1.05}>
  <div>Contenuto con hover</div>
</HoverAnimation>
```

### 9. Responsive (`responsive.tsx`)
Componenti per layout responsive ottimizzati per mobile e tablet.

**Varianti:**
- `Responsive` - Layout responsive base
- `ResponsiveGrid` - Grid responsive
- `ResponsiveFlex` - Flex responsive
- `ResponsiveText` - Testo responsive
- `ResponsiveSpacing` - Spacing responsive
- `ResponsiveVisibility` - Visibilità responsive
- `ResponsiveContainer` - Container responsive

**Utilizzo:**
```tsx
import { ResponsiveGrid, ResponsiveFlex, ResponsiveText } from "@/components/ui/responsive"

<ResponsiveGrid
  cols={{
    default: 1,
    sm: 2,
    md: 3,
    lg: 4
  }}
  gap={4}
>
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</ResponsiveGrid>

<ResponsiveFlex
  direction={{
    default: "column",
    md: "row"
  }}
  align={{
    default: "start",
    md: "center"
  }}
  gap={4}
>
  <div>Item 1</div>
  <div>Item 2</div>
</ResponsiveFlex>

<ResponsiveText
  size={{
    default: "sm",
    md: "base",
    lg: "lg"
  }}
  weight={{
    default: "normal",
    md: "medium",
    lg: "semibold"
  }}
>
  Testo responsive
</ResponsiveText>
```

## Stili CSS

I componenti utilizzano il tema Funkard definito in `globals.css` con:

- **Colori principali**: `#FFB800` (primary), `#FF6A00` (secondary)
- **Tema scuro**: Background `#0D0D0D`, Foreground `#FFFFFF`
- **Gradienti**: Funzioni per gradienti personalizzati
- **Animazioni**: Keyframes per animazioni fluide
- **Responsive**: Breakpoints ottimizzati per mobile e tablet

## Esempi di Utilizzo

Vedi `example.tsx` per esempi completi di utilizzo di tutti i componenti.

## Dipendenze

- `framer-motion` - Per animazioni
- `lucide-react` - Per icone
- `@/lib/utils` - Per utility functions
- `@/components/ui/*` - Per componenti ShadCN UI

## Note

- Tutti i componenti sono ottimizzati per il tema Funkard
- Supporto completo per responsive design
- Animazioni fluide e transizioni eleganti
- Gestione dello stato avanzata
- Callback personalizzati per eventi
- Indicatori visivi per feedback utente
