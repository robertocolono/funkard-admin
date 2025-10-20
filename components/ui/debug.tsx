"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bug, 
  Search, 
  Filter, 
  Download,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  AlertCircle,
  Code,
  Terminal,
  Settings,
  Wrench
} from "lucide-react"

// Componente per gestione del debug
interface DebugProps {
  children: React.ReactNode
  onDebugChange?: (debug: DebugSettings) => void
  className?: string
}

interface DebugSettings {
  showConsole: boolean
  showNetwork: boolean
  showPerformance: boolean
  showMemory: boolean
  showStorage: boolean
  showCache: boolean
  showCookies: boolean
  showLocalStorage: boolean
}

export function Debug({
  children,
  onDebugChange,
  className
}: DebugProps) {
  const [settings, setSettings] = React.useState<DebugSettings>({
    showConsole: true,
    showNetwork: true,
    showPerformance: true,
    showMemory: true,
    showStorage: true,
    showCache: true,
    showCookies: true,
    showLocalStorage: true
  })

  const updateSetting = (key: keyof DebugSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onDebugChange?.(newSettings)
  }

  return (
    <div className={cn("debug", className)}>
      {children}
    </div>
  )
}

// Componente per debug con indicatori visivi
interface DebugWithIndicatorsProps {
  children: React.ReactNode
  onDebugChange?: (debug: DebugSettings) => void
  showIndicators?: boolean
  className?: string
}

export function DebugWithIndicators({
  children,
  onDebugChange,
  showIndicators = false,
  className
}: DebugWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<DebugSettings>({
    showConsole: true,
    showNetwork: true,
    showPerformance: true,
    showMemory: true,
    showStorage: true,
    showCache: true,
    showCookies: true,
    showLocalStorage: true
  })

  const updateSetting = (key: keyof DebugSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onDebugChange?.(newSettings)
  }

  return (
    <div className={cn("debug", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Bug className="h-4 w-4 text-red-500" />
              <span>Debug</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showConsole && "Console "}
              {settings.showNetwork && "Network "}
              {settings.showPerformance && "Performance "}
              {settings.showMemory && "Memory "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per debug con gestione dello stato
interface StatefulDebugProps {
  children: React.ReactNode
  onDebugChange?: (debug: DebugSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulDebug({
  children,
  onDebugChange,
  onStateChange,
  className
}: StatefulDebugProps) {
  const [settings, setSettings] = React.useState<DebugSettings>({
    showConsole: true,
    showNetwork: true,
    showPerformance: true,
    showMemory: true,
    showStorage: true,
    showCache: true,
    showCookies: true,
    showLocalStorage: true
  })

  const updateSetting = (key: keyof DebugSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onDebugChange?.(newSettings)
    
    const newState = {
      showConsole: newSettings.showConsole,
      showNetwork: newSettings.showNetwork,
      showPerformance: newSettings.showPerformance,
      showMemory: newSettings.showMemory,
      showStorage: newSettings.showStorage,
      showCache: newSettings.showCache,
      showCookies: newSettings.showCookies,
      showLocalStorage: newSettings.showLocalStorage
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-debug", className)}>
      {children}
    </div>
  )
}