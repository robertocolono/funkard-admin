"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Portal, 
  Activity, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
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

// Componente per gestione del portal
interface PortalProps {
  children: React.ReactNode
  onPortalChange?: (portal: PortalSettings) => void
  className?: string
}

interface PortalSettings {
  showMetrics: boolean
  showCharts: boolean
  showReports: boolean
  showDashboards: boolean
  showInsights: boolean
  showForecasts: boolean
  showComparisons: boolean
  showTrends: boolean
}

export function Portal({
  children,
  onPortalChange,
  className
}: PortalProps) {
  const [settings, setSettings] = React.useState<PortalSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof PortalSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPortalChange?.(newSettings)
  }

  return (
    <div className={cn("portal", className)}>
      {children}
    </div>
  )
}

// Componente per portal con indicatori visivi
interface PortalWithIndicatorsProps {
  children: React.ReactNode
  onPortalChange?: (portal: PortalSettings) => void
  showIndicators?: boolean
  className?: string
}

export function PortalWithIndicators({
  children,
  onPortalChange,
  showIndicators = false,
  className
}: PortalWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<PortalSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof PortalSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPortalChange?.(newSettings)
  }

  return (
    <div className={cn("portal", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Portal className="h-4 w-4 text-blue-500" />
              <span>Portal</span>
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

// Componente per portal con gestione dello stato
interface StatefulPortalProps {
  children: React.ReactNode
  onPortalChange?: (portal: PortalSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulPortal({
  children,
  onPortalChange,
  onStateChange,
  className
}: StatefulPortalProps) {
  const [settings, setSettings] = React.useState<PortalSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof PortalSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPortalChange?.(newSettings)
    
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
    <div className={cn("stateful-portal", className)}>
      {children}
    </div>
  )
}

// Componente per portal con callback personalizzato
interface CallbackPortalProps {
  children: React.ReactNode
  onPortalChange?: (portal: PortalSettings) => void
  callback?: (portal: PortalSettings) => void
  className?: string
}

export function CallbackPortal({
  children,
  onPortalChange,
  callback,
  className
}: CallbackPortalProps) {
  const [settings, setSettings] = React.useState<PortalSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof PortalSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPortalChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-portal", className)}>
      {children}
    </div>
  )
}

// Componente per portal con gestione del focus
interface FocusPortalProps {
  children: React.ReactNode
  onPortalChange?: (portal: PortalSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusPortal({
  children,
  onPortalChange,
  onFocusChange,
  className
}: FocusPortalProps) {
  const [settings, setSettings] = React.useState<PortalSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof PortalSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPortalChange?.(newSettings)
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
    <div className={cn("focus-portal", className)}>
      {children}
    </div>
  )
}

// Componente per portal con gestione del resize
interface ResizePortalProps {
  children: React.ReactNode
  onPortalChange?: (portal: PortalSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizePortal({
  children,
  onPortalChange,
  onResize,
  className
}: ResizePortalProps) {
  const [settings, setSettings] = React.useState<PortalSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof PortalSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPortalChange?.(newSettings)
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
    <div className={cn("resize-portal", className)}>
      {children}
    </div>
  )
}