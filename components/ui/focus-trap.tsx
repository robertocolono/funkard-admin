"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Focus, 
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

// Componente per gestione del focus trap
interface FocusTrapProps {
  children: React.ReactNode
  onFocusTrapChange?: (focusTrap: FocusTrapSettings) => void
  className?: string
}

interface FocusTrapSettings {
  showMetrics: boolean
  showCharts: boolean
  showReports: boolean
  showDashboards: boolean
  showInsights: boolean
  showForecasts: boolean
  showComparisons: boolean
  showTrends: boolean
}

export function FocusTrap({
  children,
  onFocusTrapChange,
  className
}: FocusTrapProps) {
  const [settings, setSettings] = React.useState<FocusTrapSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof FocusTrapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFocusTrapChange?.(newSettings)
  }

  return (
    <div className={cn("focus-trap", className)}>
      {children}
    </div>
  )
}

// Componente per focus trap con indicatori visivi
interface FocusTrapWithIndicatorsProps {
  children: React.ReactNode
  onFocusTrapChange?: (focusTrap: FocusTrapSettings) => void
  showIndicators?: boolean
  className?: string
}

export function FocusTrapWithIndicators({
  children,
  onFocusTrapChange,
  showIndicators = false,
  className
}: FocusTrapWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<FocusTrapSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof FocusTrapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFocusTrapChange?.(newSettings)
  }

  return (
    <div className={cn("focus-trap", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Focus className="h-4 w-4 text-blue-500" />
              <span>Focus Trap</span>
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

// Componente per focus trap con gestione dello stato
interface StatefulFocusTrapProps {
  children: React.ReactNode
  onFocusTrapChange?: (focusTrap: FocusTrapSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulFocusTrap({
  children,
  onFocusTrapChange,
  onStateChange,
  className
}: StatefulFocusTrapProps) {
  const [settings, setSettings] = React.useState<FocusTrapSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof FocusTrapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFocusTrapChange?.(newSettings)
    
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
    <div className={cn("stateful-focus-trap", className)}>
      {children}
    </div>
  )
}

// Componente per focus trap con callback personalizzato
interface CallbackFocusTrapProps {
  children: React.ReactNode
  onFocusTrapChange?: (focusTrap: FocusTrapSettings) => void
  callback?: (focusTrap: FocusTrapSettings) => void
  className?: string
}

export function CallbackFocusTrap({
  children,
  onFocusTrapChange,
  callback,
  className
}: CallbackFocusTrapProps) {
  const [settings, setSettings] = React.useState<FocusTrapSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof FocusTrapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFocusTrapChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-focus-trap", className)}>
      {children}
    </div>
  )
}

// Componente per focus trap con gestione del focus
interface FocusFocusTrapProps {
  children: React.ReactNode
  onFocusTrapChange?: (focusTrap: FocusTrapSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusFocusTrap({
  children,
  onFocusTrapChange,
  onFocusChange,
  className
}: FocusFocusTrapProps) {
  const [settings, setSettings] = React.useState<FocusTrapSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof FocusTrapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFocusTrapChange?.(newSettings)
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
    <div className={cn("focus-focus-trap", className)}>
      {children}
    </div>
  )
}

// Componente per focus trap con gestione del resize
interface ResizeFocusTrapProps {
  children: React.ReactNode
  onFocusTrapChange?: (focusTrap: FocusTrapSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeFocusTrap({
  children,
  onFocusTrapChange,
  onResize,
  className
}: ResizeFocusTrapProps) {
  const [settings, setSettings] = React.useState<FocusTrapSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true
  })

  const updateSetting = (key: keyof FocusTrapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFocusTrapChange?.(newSettings)
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
    <div className={cn("resize-focus-trap", className)}>
      {children}
    </div>
  )
}