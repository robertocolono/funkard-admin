"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Activity, 
  Gauge, 
  Clock, 
  Timer, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  LineChart,
  PieChart,
  Target,
  Award,
  Star,
  StarOff,
  StarHalf,
  StarIcon,
  StarFilled,
  StarEmpty,
  StarOutline,
  StarSolid,
  StarRegular,
  StarBold,
  StarLight,
  StarMedium,
  StarHeavy,
  StarThin,
  StarThick,
  StarWide,
  StarNarrow,
  StarShort,
  StarTall,
  StarSmall,
  StarLarge,
  StarMini,
  StarMaxi,
  StarMicro,
  StarMacro,
  StarNano,
  StarPico,
  StarFemto,
  StarAtto,
  StarZepto,
  StarYocto,
  StarKilo,
  StarMega,
  StarGiga,
  StarTera,
  StarPeta,
  StarExa,
  StarZetta,
  StarYotta
} from "lucide-react"

// Componente per gestione delle performance
interface PerformanceProps {
  children: React.ReactNode
  onPerformanceChange?: (performance: PerformanceSettings) => void
  className?: string
}

interface PerformanceSettings {
  showMetrics: boolean
  showCharts: boolean
  showReports: boolean
  showDashboards: boolean
  showInsights: boolean
  showForecasts: boolean
  showComparisons: boolean
  showTrends: boolean
  showOptimizations: boolean
  showBottlenecks: boolean
  showRecommendations: boolean
  showAlerts: boolean
}

export function Performance({
  children,
  onPerformanceChange,
  className
}: PerformanceProps) {
  const [settings, setSettings] = React.useState<PerformanceSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showOptimizations: true,
    showBottlenecks: true,
    showRecommendations: true,
    showAlerts: true
  })

  const updateSetting = (key: keyof PerformanceSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPerformanceChange?.(newSettings)
  }

  return (
    <div className={cn("performance", className)}>
      {children}
    </div>
  )
}

// Componente per performance con indicatori visivi
interface PerformanceWithIndicatorsProps {
  children: React.ReactNode
  onPerformanceChange?: (performance: PerformanceSettings) => void
  showIndicators?: boolean
  className?: string
}

export function PerformanceWithIndicators({
  children,
  onPerformanceChange,
  showIndicators = false,
  className
}: PerformanceWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<PerformanceSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showOptimizations: true,
    showBottlenecks: true,
    showRecommendations: true,
    showAlerts: true
  })

  const updateSetting = (key: keyof PerformanceSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPerformanceChange?.(newSettings)
  }

  return (
    <div className={cn("performance", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Performance</span>
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

// Componente per performance con gestione dello stato
interface StatefulPerformanceProps {
  children: React.ReactNode
  onPerformanceChange?: (performance: PerformanceSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulPerformance({
  children,
  onPerformanceChange,
  onStateChange,
  className
}: StatefulPerformanceProps) {
  const [settings, setSettings] = React.useState<PerformanceSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showOptimizations: true,
    showBottlenecks: true,
    showRecommendations: true,
    showAlerts: true
  })

  const updateSetting = (key: keyof PerformanceSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPerformanceChange?.(newSettings)
    
    const newState = {
      showMetrics: newSettings.showMetrics,
      showCharts: newSettings.showCharts,
      showReports: newSettings.showReports,
      showDashboards: newSettings.showDashboards,
      showInsights: newSettings.showInsights,
      showForecasts: newSettings.showForecasts,
      showComparisons: newSettings.showComparisons,
      showTrends: newSettings.showTrends,
      showOptimizations: newSettings.showOptimizations,
      showBottlenecks: newSettings.showBottlenecks,
      showRecommendations: newSettings.showRecommendations,
      showAlerts: newSettings.showAlerts
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-performance", className)}>
      {children}
    </div>
  )
}

// Componente per performance con callback personalizzato
interface CallbackPerformanceProps {
  children: React.ReactNode
  onPerformanceChange?: (performance: PerformanceSettings) => void
  callback?: (performance: PerformanceSettings) => void
  className?: string
}

export function CallbackPerformance({
  children,
  onPerformanceChange,
  callback,
  className
}: CallbackPerformanceProps) {
  const [settings, setSettings] = React.useState<PerformanceSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showOptimizations: true,
    showBottlenecks: true,
    showRecommendations: true,
    showAlerts: true
  })

  const updateSetting = (key: keyof PerformanceSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPerformanceChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-performance", className)}>
      {children}
    </div>
  )
}

// Componente per performance con gestione del focus
interface FocusPerformanceProps {
  children: React.ReactNode
  onPerformanceChange?: (performance: PerformanceSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusPerformance({
  children,
  onPerformanceChange,
  onFocusChange,
  className
}: FocusPerformanceProps) {
  const [settings, setSettings] = React.useState<PerformanceSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showOptimizations: true,
    showBottlenecks: true,
    showRecommendations: true,
    showAlerts: true
  })

  const updateSetting = (key: keyof PerformanceSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPerformanceChange?.(newSettings)
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
    <div className={cn("focus-performance", className)}>
      {children}
    </div>
  )
}

// Componente per performance con gestione del resize
interface ResizePerformanceProps {
  children: React.ReactNode
  onPerformanceChange?: (performance: PerformanceSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizePerformance({
  children,
  onPerformanceChange,
  onResize,
  className
}: ResizePerformanceProps) {
  const [settings, setSettings] = React.useState<PerformanceSettings>({
    showMetrics: true,
    showCharts: true,
    showReports: true,
    showDashboards: true,
    showInsights: true,
    showForecasts: true,
    showComparisons: true,
    showTrends: true,
    showOptimizations: true,
    showBottlenecks: true,
    showRecommendations: true,
    showAlerts: true
  })

  const updateSetting = (key: keyof PerformanceSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onPerformanceChange?.(newSettings)
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
    <div className={cn("resize-performance", className)}>
      {children}
    </div>
  )
}