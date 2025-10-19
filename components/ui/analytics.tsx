"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Activity, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  LineChart,
  PieChart,
  Gauge,
  Eye,
  EyeOff,
  Users,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Key,
  KeyRound,
  KeySquare,
  LockKeyhole,
  UnlockKeyhole,
  LockKeyholeOpen,
  UnlockKeyholeOpen,
  LockKeyholeRound,
  UnlockKeyholeRound,
  LockKeyholeSquare,
  UnlockKeyholeSquare,
  LockKeyholeOpenRound,
  UnlockKeyholeOpenRound,
  LockKeyholeOpenSquare,
  UnlockKeyholeOpenSquare
} from "lucide-react"

// Componente per gestione delle analytics
interface AnalyticsProps {
  children: React.ReactNode
  onAnalyticsChange?: (analytics: AnalyticsSettings) => void
  className?: string
}

interface AnalyticsSettings {
  showMetrics: boolean
  showCharts: boolean
  showReports: boolean
  showDashboards: boolean
  showInsights: boolean
  showForecasts: boolean
  showComparisons: boolean
  showTrends: boolean
}

export function Analytics({
  children,
  onAnalyticsChange,
  className
}: AnalyticsProps) {
  const [settings, setSettings] = React.useState<AnalyticsSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof AnalyticsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAnalyticsChange?.(newSettings)
  }

  return (
    <div className={cn("analytics", className)}>
      {children}
    </div>
  )
}

// Componente per analytics con indicatori visivi
interface AnalyticsWithIndicatorsProps {
  children: React.ReactNode
  onAnalyticsChange?: (analytics: AnalyticsSettings) => void
  showIndicators?: boolean
  className?: string
}

export function AnalyticsWithIndicators({
  children,
  onAnalyticsChange,
  showIndicators = false,
  className
}: AnalyticsWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<AnalyticsSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof AnalyticsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAnalyticsChange?.(newSettings)
  }

  return (
    <div className={cn("analytics", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span>Analytics</span>
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

// Componente per analytics con gestione dello stato
interface StatefulAnalyticsProps {
  children: React.ReactNode
  onAnalyticsChange?: (analytics: AnalyticsSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulAnalytics({
  children,
  onAnalyticsChange,
  onStateChange,
  className
}: StatefulAnalyticsProps) {
  const [settings, setSettings] = React.useState<AnalyticsSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof AnalyticsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAnalyticsChange?.(newSettings)
    
    const newState = {
      showMetrics: newSettings.showMetrics,
      showCharts: newSettings.showCharts,
      showReports: newSettings.showReports,
      showDashboards: newSettings.showDashboards,
      showInsights: newSettings.showInsights,
      showForecasts: newSettings.showForecasts,
      showComparisons: newSettings.showComparisons,
      showTrends: newSettings.showTrends
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-analytics", className)}>
      {children}
    </div>
  )
}

// Componente per analytics con callback personalizzato
interface CallbackAnalyticsProps {
  children: React.ReactNode
  onAnalyticsChange?: (analytics: AnalyticsSettings) => void
  callback?: (analytics: AnalyticsSettings) => void
  className?: string
}

export function CallbackAnalytics({
  children,
  onAnalyticsChange,
  callback,
  className
}: CallbackAnalyticsProps) {
  const [settings, setSettings] = React.useState<AnalyticsSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof AnalyticsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAnalyticsChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-analytics", className)}>
      {children}
    </div>
  )
}

// Componente per analytics con gestione del focus
interface FocusAnalyticsProps {
  children: React.ReactNode
  onAnalyticsChange?: (analytics: AnalyticsSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusAnalytics({
  children,
  onAnalyticsChange,
  onFocusChange,
  className
}: FocusAnalyticsProps) {
  const [settings, setSettings] = React.useState<AnalyticsSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof AnalyticsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAnalyticsChange?.(newSettings)
  }

  React.useEffect(() => {
    const handleFocus = () => {
      onFocusChange?.(true)
    }

    const handleBlur = () => {
      onFocusChange?.(false)
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onFocusChange])

  return (
    <div className={cn("focus-analytics", className)}>
      {children}
    </div>
  )
}

// Componente per analytics con gestione del resize
interface ResizeAnalyticsProps {
  children: React.ReactNode
  onAnalyticsChange?: (analytics: AnalyticsSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeAnalytics({
  children,
  onAnalyticsChange,
  onResize,
  className
}: ResizeAnalyticsProps) {
  const [settings, setSettings] = React.useState<AnalyticsSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof AnalyticsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAnalyticsChange?.(newSettings)
  }

  React.useEffect(() => {
    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      
      onResize?.(newSize)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onResize])

  return (
    <div className={cn("resize-analytics", className)}>
      {children}
    </div>
  )
}