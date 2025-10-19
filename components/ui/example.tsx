"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Analytics,
  Performance,
  Security,
  Monitoring,
  Logs,
  Debug
} from "@/components/ui/analytics"
import { 
  DashboardCard,
  NotificationCard,
  UserCard,
  ErrorCard,
  SystemCard,
  PerformanceCard,
  SecurityCard,
  MonitoringCard
} from "@/components/ui/dashboard-card"
import { 
  Animation,
  AnimatedPresence,
  HoverAnimation,
  LoadingAnimation,
  TransitionAnimation,
  StaggerAnimation
} from "@/components/ui/animations"
import { 
  Responsive,
  ResponsiveGrid,
  ResponsiveFlex,
  ResponsiveText,
  ResponsiveSpacing,
  ResponsiveVisibility,
  ResponsiveContainer
} from "@/components/ui/responsive"

// Componente di esempio per dimostrare l'uso dei nuovi componenti UI
export function UIExample() {
  const [showAnimation, setShowAnimation] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  return (
    <ResponsiveContainer className="space-y-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Funkard UI Components</h1>
        <p className="text-muted-foreground">
          Esempi di utilizzo dei nuovi componenti UI per il pannello amministrativo Funkard.
        </p>
      </div>

      {/* Analytics Components */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Components</CardTitle>
          <CardDescription>
            Componenti per gestione analytics, performance, sicurezza, monitoring, logs e debug.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Analytics>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">Componente per gestione analytics</p>
            </div>
          </Analytics>

          <Performance>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Performance</h3>
              <p className="text-sm text-muted-foreground">Componente per gestione performance</p>
            </div>
          </Performance>

          <Security>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">Componente per gestione sicurezza</p>
            </div>
          </Security>

          <Monitoring>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Monitoring</h3>
              <p className="text-sm text-muted-foreground">Componente per gestione monitoring</p>
            </div>
          </Monitoring>

          <Logs>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Logs</h3>
              <p className="text-sm text-muted-foreground">Componente per gestione logs</p>
            </div>
          </Logs>

          <Debug>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Debug</h3>
              <p className="text-sm text-muted-foreground">Componente per gestione debug</p>
            </div>
          </Debug>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Cards</CardTitle>
          <CardDescription>
            Card accattivanti per il dashboard con varianti e colori personalizzati.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveGrid
            cols={{
              default: 1,
              sm: 2,
              md: 3,
              lg: 4
            }}
            gap={4}
          >
            <NotificationCard count={42} trend={12} />
            <UserCard count={1250} trend={8} />
            <ErrorCard count={3} trend={-2} />
            <SystemCard status="OK" lastUpdate="2 min fa" />
            <PerformanceCard score={95} trend={5} />
            <SecurityCard threats={0} trend={-1} />
            <MonitoringCard alerts={2} trend={0} />
          </ResponsiveGrid>
        </CardContent>
      </Card>

      {/* Animations */}
      <Card>
        <CardHeader>
          <CardTitle>Animations</CardTitle>
          <CardDescription>
            Componenti per animazioni fluide e transizioni eleganti.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Animation variant="fade">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <h4 className="font-semibold">Fade</h4>
              </div>
            </Animation>

            <Animation variant="slide">
              <div className="p-4 bg-secondary/10 rounded-lg text-center">
                <h4 className="font-semibold">Slide</h4>
              </div>
            </Animation>

            <Animation variant="scale">
              <div className="p-4 bg-accent/10 rounded-lg text-center">
                <h4 className="font-semibold">Scale</h4>
              </div>
            </Animation>

            <Animation variant="rotate">
              <div className="p-4 bg-muted rounded-lg text-center">
                <h4 className="font-semibold">Rotate</h4>
              </div>
            </Animation>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setShowAnimation(!showAnimation)}>
              Toggle Animation
            </Button>
            <Button onClick={() => setLoading(!loading)}>
              Toggle Loading
            </Button>
          </div>

          <AnimatedPresence show={showAnimation}>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold">Animated Presence</h4>
              <p className="text-sm text-muted-foreground">
                Questo elemento appare e scompare con animazione.
              </p>
            </div>
          </AnimatedPresence>

          <LoadingAnimation loading={loading}>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold">Loading Animation</h4>
              <p className="text-sm text-muted-foreground">
                Questo elemento mostra un'animazione di loading.
              </p>
            </div>
          </LoadingAnimation>
        </CardContent>
      </Card>

      {/* Responsive Design */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Design</CardTitle>
          <CardDescription>
            Componenti per layout responsive ottimizzati per mobile e tablet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveGrid
            cols={{
              default: 1,
              sm: 2,
              md: 3,
              lg: 4
            }}
            gap={4}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Item {i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  Responsive grid item
                </p>
              </div>
            ))}
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
            justify={{
              default: "start",
              md: "between"
            }}
            gap={4}
          >
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold">Flex Item 1</h4>
            </div>
            <div className="p-4 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold">Flex Item 2</h4>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg">
              <h4 className="font-semibold">Flex Item 3</h4>
            </div>
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
            Questo testo si adatta alle dimensioni dello schermo.
          </ResponsiveText>

          <ResponsiveSpacing
            padding={{
              default: 2,
              sm: 4,
              md: 6,
              lg: 8
            }}
            margin={{
              default: 0,
              sm: 2,
              md: 4,
              lg: 6
            }}
          >
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold">Responsive Spacing</h4>
              <p className="text-sm text-muted-foreground">
                Questo elemento ha padding e margin responsive.
              </p>
            </div>
          </ResponsiveSpacing>

          <ResponsiveVisibility
            show={{
              default: true,
              sm: true,
              md: false,
              lg: true
            }}
          >
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold">Responsive Visibility</h4>
              <p className="text-sm text-muted-foreground">
                Questo elemento è visibile su mobile e desktop, ma nascosto su tablet.
              </p>
            </div>
          </ResponsiveVisibility>
        </CardContent>
      </Card>

      {/* Stagger Animation */}
      <Card>
        <CardHeader>
          <CardTitle>Stagger Animation</CardTitle>
          <CardDescription>
            Animazione a cascata per elementi multipli.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StaggerAnimation stagger={0.1}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg mb-2">
                <h4 className="font-semibold">Stagger Item {i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  Questo elemento appare con un delay progressivo.
                </p>
              </div>
            ))}
          </StaggerAnimation>
        </CardContent>
      </Card>
    </ResponsiveContainer>
  )
}
