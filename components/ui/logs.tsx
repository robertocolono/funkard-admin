"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Warning,
  Error,
  Success
} from "lucide-react"

// Componente per gestione dei logs
interface LogsProps {
  children: React.ReactNode
  onLogsChange?: (logs: LogsSettings) => void
  className?: string
}

interface LogsSettings {
  showErrors: boolean
  showWarnings: boolean
  showInfo: boolean
  showDebug: boolean
  showTrace: boolean
  showFatal: boolean
  showCritical: boolean
  showEmergency: boolean
}

export function Logs({
  children,
  onLogsChange,
  className
}: LogsProps) {
  const [settings, setSettings] = React.useState<LogsSettings>({
    showErrors: true,
    showWarnings: true,
    showInfo: true,
    showDebug: false,
    showTrace: false,
    showFatal: true,
    showCritical: true,
    showEmergency: true
  })

  const updateSetting = (key: keyof LogsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onLogsChange?.(newSettings)
  }

  return (
    <div className={cn("logs", className)}>
      {children}
    </div>
  )
}

// Componente per logs con indicatori visivi
interface LogsWithIndicatorsProps {
  children: React.ReactNode
  onLogsChange?: (logs: LogsSettings) => void
  showIndicators?: boolean
  className?: string
}

export function LogsWithIndicators({
  children,
  onLogsChange,
  showIndicators = false,
  className
}: LogsWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<LogsSettings>({
    showErrors: true,
    showWarnings: true,
    showInfo: true,
    showDebug: false,
    showTrace: false,
    showFatal: true,
    showCritical: true,
    showEmergency: true
  })

  const updateSetting = (key: keyof LogsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onLogsChange?.(newSettings)
  }

  return (
    <div className={cn("logs", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <FileText className="h-4 w-4 text-orange-500" />
              <span>Logs</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showErrors && "Errors "}
              {settings.showWarnings && "Warnings "}
              {settings.showInfo && "Info "}
              {settings.showDebug && "Debug "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per logs con gestione dello stato
interface StatefulLogsProps {
  children: React.ReactNode
  onLogsChange?: (logs: LogsSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulLogs({
  children,
  onLogsChange,
  onStateChange,
  className
}: StatefulLogsProps) {
  const [settings, setSettings] = React.useState<LogsSettings>({
    showErrors: true,
    showWarnings: true,
    showInfo: true,
    showDebug: false,
    showTrace: false,
    showFatal: true,
    showCritical: true,
    showEmergency: true
  })

  const updateSetting = (key: keyof LogsSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onLogsChange?.(newSettings)
    
    const newState = {
      showErrors: newSettings.showErrors,
      showWarnings: newSettings.showWarnings,
      showInfo: newSettings.showInfo,
      showDebug: newSettings.showDebug,
      showTrace: newSettings.showTrace,
      showFatal: newSettings.showFatal,
      showCritical: newSettings.showCritical,
      showEmergency: newSettings.showEmergency
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-logs", className)}>
      {children}
    </div>
  )
}