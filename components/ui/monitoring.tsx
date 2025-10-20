"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Monitor, 
  Eye, 
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  Target,
  Award,
  Star
} from "lucide-react"

// Componente per gestione del monitoring
interface MonitoringProps {
  children: React.ReactNode
  onMonitoringChange?: (monitoring: MonitoringSettings) => void
  className?: string
}

interface MonitoringSettings {
  showMetrics: boolean
  showCharts: boolean
  showReports: boolean
  showDashboards: boolean
  showInsights: boolean
  showForecasts: boolean
  showComparisons: boolean
  showTrends: boolean
  showAlerts: boolean
  showNotifications: boolean
  showLogs: boolean
  showEvents: boolean
}

export function Monitoring({
  children,
  onMonitoringChange,
  className
}: MonitoringProps) {
  const [settings, setSettings] = React.useState<MonitoringSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showAlerts: true,
    showNotifications: true,
    showLogs: true,
    showEvents: true
  })

  const updateSetting = (key: keyof MonitoringSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onMonitoringChange?.(newSettings)
  }

  return (
    <div className={cn("monitoring", className)}>
      {children}
    </div>
  )
}

// Componente per monitoring con indicatori visivi
interface MonitoringWithIndicatorsProps {
  children: React.ReactNode
  onMonitoringChange?: (monitoring: MonitoringSettings) => void
  showIndicators?: boolean
  className?: string
}

export function MonitoringWithIndicators({
  children,
  onMonitoringChange,
  showIndicators = false,
  className
}: MonitoringWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<MonitoringSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showAlerts: true,
    showNotifications: true,
    showLogs: true,
    showEvents: true
  })

  const updateSetting = (key: keyof MonitoringSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onMonitoringChange?.(newSettings)
  }

  return (
    <div className={cn("monitoring", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Activity className="h-4 w-4 text-blue-500" />
              <span>Monitoring</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showMetrics && "Metrics "}
              {settings.showCharts && "Charts "}
              {settings.showReports && "Reports "}
              {settings.showDashboards && "Dashboards "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per monitoring con gestione dello stato
interface StatefulMonitoringProps {
  children: React.ReactNode
  onMonitoringChange?: (monitoring: MonitoringSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulMonitoring({
  children,
  onMonitoringChange,
  onStateChange,
  className
}: StatefulMonitoringProps) {
  const [settings, setSettings] = React.useState<MonitoringSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showAlerts: true,
    showNotifications: true,
    showLogs: true,
    showEvents: true
  })

  const updateSetting = (key: keyof MonitoringSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onMonitoringChange?.(newSettings)
    
    const newState = {
      showMetrics: newSettings.showMetrics,
      showCharts: newSettings.showCharts,
      showReports: newSettings.showReports,
      showDashboards: newSettings.showDashboards,
      showInsights: newSettings.showInsights,
      showForecasts: newSettings.showForecasts,
      showComparisons: newSettings.showComparisons,
      showTrends: newSettings.showTrends,
      showAlerts: newSettings.showAlerts,
      showNotifications: newSettings.showNotifications,
      showLogs: newSettings.showLogs,
      showEvents: newSettings.showEvents
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-monitoring", className)}>
      {children}
    </div>
  )
}