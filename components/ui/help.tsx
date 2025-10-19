"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle, 
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

// Componente per gestione dell'aiuto
interface HelpProps {
  children: React.ReactNode
  onHelpChange?: (help: HelpSettings) => void
  className?: string
}

interface HelpSettings {
  showTooltips: boolean
  showHints: boolean
  showGuides: boolean
  showTutorials: boolean
  showFAQs: boolean
  showSupport: boolean
  showDocumentation: boolean
  showVideos: boolean
}

export function Help({
  children,
  onHelpChange,
  className
}: HelpProps) {
  const [settings, setSettings] = React.useState<HelpSettings>({
    showTooltips: true,
    showHints: true,
    showGuides: true,
    showTutorials: true,
    showFAQs: true,
    showSupport: true,
    showDocumentation: true,
    showVideos: true
  })

  const updateSetting = (key: keyof HelpSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onHelpChange?.(newSettings)
  }

  return (
    <div className={cn("help", className)}>
      {children}
    </div>
  )
}

// Componente per aiuto con indicatori visivi
interface HelpWithIndicatorsProps {
  children: React.ReactNode
  onHelpChange?: (help: HelpSettings) => void
  showIndicators?: boolean
  className?: string
}

export function HelpWithIndicators({
  children,
  onHelpChange,
  showIndicators = false,
  className
}: HelpWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<HelpSettings>({
    showTooltips: true,
    showHints: true,
    showGuides: true,
    showTutorials: true,
    showFAQs: true,
    showSupport: true,
    showDocumentation: true,
    showVideos: true
  })

  const updateSetting = (key: keyof HelpSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onHelpChange?.(newSettings)
  }

  return (
    <div className={cn("help", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <HelpCircle className="h-4 w-4 text-blue-500" />
              <span>Help</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showTooltips && "Tooltips "}
              {settings.showHints && "Hints "}
              {settings.showGuides && "Guides "}
              {settings.showTutorials && "Tutorials "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per aiuto con gestione dello stato
interface StatefulHelpProps {
  children: React.ReactNode
  onHelpChange?: (help: HelpSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulHelp({
  children,
  onHelpChange,
  onStateChange,
  className
}: StatefulHelpProps) {
  const [settings, setSettings] = React.useState<HelpSettings>({
    showTooltips: true,
    showHints: true,
    showGuides: true,
    showTutorials: true,
    showFAQs: true,
    showSupport: true,
    showDocumentation: true,
    showVideos: true
  })

  const updateSetting = (key: keyof HelpSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onHelpChange?.(newSettings)
    
    const newState = {
      showTooltips: newSettings.showTooltips,
      showHints: newSettings.showHints,
      showGuides: newSettings.showGuides,
      showTutorials: newSettings.showTutorials,
      showFAQs: newSettings.showFAQs,
      showSupport: newSettings.showSupport,
      showDocumentation: newSettings.showDocumentation,
      showVideos: newSettings.showVideos
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-help", className)}>
      {children}
    </div>
  )
}

// Componente per aiuto con callback personalizzato
interface CallbackHelpProps {
  children: React.ReactNode
  onHelpChange?: (help: HelpSettings) => void
  callback?: (help: HelpSettings) => void
  className?: string
}

export function CallbackHelp({
  children,
  onHelpChange,
  callback,
  className
}: CallbackHelpProps) {
  const [settings, setSettings] = React.useState<HelpSettings>({
    showTooltips: true,
    showHints: true,
    showGuides: true,
    showTutorials: true,
    showFAQs: true,
    showSupport: true,
    showDocumentation: true,
    showVideos: true
  })

  const updateSetting = (key: keyof HelpSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onHelpChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-help", className)}>
      {children}
    </div>
  )
}

// Componente per aiuto con gestione del focus
interface FocusHelpProps {
  children: React.ReactNode
  onHelpChange?: (help: HelpSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusHelp({
  children,
  onHelpChange,
  onFocusChange,
  className
}: FocusHelpProps) {
  const [settings, setSettings] = React.useState<HelpSettings>({
    showTooltips: true,
    showHints: true,
    showGuides: true,
    showTutorials: true,
    showFAQs: true,
    showSupport: true,
    showDocumentation: true,
    showVideos: true
  })

  const updateSetting = (key: keyof HelpSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onHelpChange?.(newSettings)
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
    <div className={cn("focus-help", className)}>
      {children}
    </div>
  )
}

// Componente per aiuto con gestione del resize
interface ResizeHelpProps {
  children: React.ReactNode
  onHelpChange?: (help: HelpSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeHelp({
  children,
  onHelpChange,
  onResize,
  className
}: ResizeHelpProps) {
  const [settings, setSettings] = React.useState<HelpSettings>({
    showTooltips: true,
    showHints: true,
    showGuides: true,
    showTutorials: true,
    showFAQs: true,
    showSupport: true,
    showDocumentation: true,
    showVideos: true
  })

  const updateSetting = (key: keyof HelpSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onHelpChange?.(newSettings)
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
    <div className={cn("resize-help", className)}>
      {children}
    </div>
  )
}