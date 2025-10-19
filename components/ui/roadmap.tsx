"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Map, 
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

// Componente per gestione della roadmap
interface RoadmapProps {
  children: React.ReactNode
  onRoadmapChange?: (roadmap: RoadmapSettings) => void
  className?: string
}

interface RoadmapSettings {
  showMilestones: boolean
  showTasks: boolean
  showProgress: boolean
  showTimeline: boolean
  showDependencies: boolean
  showResources: boolean
  showRisks: boolean
  showIssues: boolean
}

export function Roadmap({
  children,
  onRoadmapChange,
  className
}: RoadmapProps) {
  const [settings, setSettings] = React.useState<RoadmapSettings>({
    showMilestones: true,
    showTasks: true,
    showProgress: true,
    showTimeline: true,
    showDependencies: true,
    showResources: true,
    showRisks: true,
    showIssues: true
  })

  const updateSetting = (key: keyof RoadmapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onRoadmapChange?.(newSettings)
  }

  return (
    <div className={cn("roadmap", className)}>
      {children}
    </div>
  )
}

// Componente per roadmap con indicatori visivi
interface RoadmapWithIndicatorsProps {
  children: React.ReactNode
  onRoadmapChange?: (roadmap: RoadmapSettings) => void
  showIndicators?: boolean
  className?: string
}

export function RoadmapWithIndicators({
  children,
  onRoadmapChange,
  showIndicators = false,
  className
}: RoadmapWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<RoadmapSettings>({
    showMilestones: true,
    showTasks: true,
    showProgress: true,
    showTimeline: true,
    showDependencies: true,
    showResources: true,
    showRisks: true,
    showIssues: true
  })

  const updateSetting = (key: keyof RoadmapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onRoadmapChange?.(newSettings)
  }

  return (
    <div className={cn("roadmap", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Map className="h-4 w-4 text-blue-500" />
              <span>Roadmap</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showMilestones && "Milestones "}
              {settings.showTasks && "Tasks "}
              {settings.showProgress && "Progress "}
              {settings.showTimeline && "Timeline "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per roadmap con gestione dello stato
interface StatefulRoadmapProps {
  children: React.ReactNode
  onRoadmapChange?: (roadmap: RoadmapSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulRoadmap({
  children,
  onRoadmapChange,
  onStateChange,
  className
}: StatefulRoadmapProps) {
  const [settings, setSettings] = React.useState<RoadmapSettings>({
    showMilestones: true,
    showTasks: true,
    showProgress: true,
    showTimeline: true,
    showDependencies: true,
    showResources: true,
    showRisks: true,
    showIssues: true
  })

  const updateSetting = (key: keyof RoadmapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onRoadmapChange?.(newSettings)
    
    const newState = {
      showMilestones: newSettings.showMilestones,
      showTasks: newSettings.showTasks,
      showProgress: newSettings.showProgress,
      showTimeline: newSettings.showTimeline,
      showDependencies: newSettings.showDependencies,
      showResources: newSettings.showResources,
      showRisks: newSettings.showRisks,
      showIssues: newSettings.showIssues
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-roadmap", className)}>
      {children}
    </div>
  )
}

// Componente per roadmap con callback personalizzato
interface CallbackRoadmapProps {
  children: React.ReactNode
  onRoadmapChange?: (roadmap: RoadmapSettings) => void
  callback?: (roadmap: RoadmapSettings) => void
  className?: string
}

export function CallbackRoadmap({
  children,
  onRoadmapChange,
  callback,
  className
}: CallbackRoadmapProps) {
  const [settings, setSettings] = React.useState<RoadmapSettings>({
    showMilestones: true,
    showTasks: true,
    showProgress: true,
    showTimeline: true,
    showDependencies: true,
    showResources: true,
    showRisks: true,
    showIssues: true
  })

  const updateSetting = (key: keyof RoadmapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onRoadmapChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-roadmap", className)}>
      {children}
    </div>
  )
}

// Componente per roadmap con gestione del focus
interface FocusRoadmapProps {
  children: React.ReactNode
  onRoadmapChange?: (roadmap: RoadmapSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusRoadmap({
  children,
  onRoadmapChange,
  onFocusChange,
  className
}: FocusRoadmapProps) {
  const [settings, setSettings] = React.useState<RoadmapSettings>({
    showMilestones: true,
    showTasks: true,
    showProgress: true,
    showTimeline: true,
    showDependencies: true,
    showResources: true,
    showRisks: true,
    showIssues: true
  })

  const updateSetting = (key: keyof RoadmapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onRoadmapChange?.(newSettings)
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
    <div className={cn("focus-roadmap", className)}>
      {children}
    </div>
  )
}

// Componente per roadmap con gestione del resize
interface ResizeRoadmapProps {
  children: React.ReactNode
  onRoadmapChange?: (roadmap: RoadmapSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeRoadmap({
  children,
  onRoadmapChange,
  onResize,
  className
}: ResizeRoadmapProps) {
  const [settings, setSettings] = React.useState<RoadmapSettings>({
    showMilestones: true,
    showTasks: true,
    showProgress: true,
    showTimeline: true,
    showDependencies: true,
    showResources: true,
    showRisks: true,
    showIssues: true
  })

  const updateSetting = (key: keyof RoadmapSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onRoadmapChange?.(newSettings)
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
    <div className={cn("resize-roadmap", className)}>
      {children}
    </div>
  )
}