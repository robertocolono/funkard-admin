"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldOff,
  Lock,
  Unlock,
  Key,
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

// Componente per gestione della sicurezza
interface SecurityProps {
  children: React.ReactNode
  onSecurityChange?: (security: SecuritySettings) => void
  className?: string
}

interface SecuritySettings {
  showAlerts: boolean
  showThreats: boolean
  showVulnerabilities: boolean
  showIncidents: boolean
  showCompliance: boolean
  showAudit: boolean
  showAccess: boolean
  showEncryption: boolean
}

export function Security({
  children,
  onSecurityChange,
  className
}: SecurityProps) {
  const [settings, setSettings] = React.useState<SecuritySettings>({
    showAlerts: true,
    showThreats: true,
    showVulnerabilities: true,
    showIncidents: true,
    showCompliance: true,
    showAudit: true,
    showAccess: true,
    showEncryption: true
  })

  const updateSetting = (key: keyof SecuritySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSecurityChange?.(newSettings)
  }

  return (
    <div className={cn("security", className)}>
      {children}
    </div>
  )
}

// Componente per sicurezza con indicatori visivi
interface SecurityWithIndicatorsProps {
  children: React.ReactNode
  onSecurityChange?: (security: SecuritySettings) => void
  showIndicators?: boolean
  className?: string
}

export function SecurityWithIndicators({
  children,
  onSecurityChange,
  showIndicators = false,
  className
}: SecurityWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<SecuritySettings>({
    showAlerts: true,
    showThreats: true,
    showVulnerabilities: true,
    showIncidents: true,
    showCompliance: true,
    showAudit: true,
    showAccess: true,
    showEncryption: true
  })

  const updateSetting = (key: keyof SecuritySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSecurityChange?.(newSettings)
  }

  return (
    <div className={cn("security", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Security</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showAlerts && "Alerts "}
              {settings.showThreats && "Threats "}
              {settings.showVulnerabilities && "Vulnerabilities "}
              {settings.showIncidents && "Incidents "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per sicurezza con gestione dello stato
interface StatefulSecurityProps {
  children: React.ReactNode
  onSecurityChange?: (security: SecuritySettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulSecurity({
  children,
  onSecurityChange,
  onStateChange,
  className
}: StatefulSecurityProps) {
  const [settings, setSettings] = React.useState<SecuritySettings>({
    showAlerts: true,
    showThreats: true,
    showVulnerabilities: true,
    showIncidents: true,
    showCompliance: true,
    showAudit: true,
    showAccess: true,
    showEncryption: true
  })

  const updateSetting = (key: keyof SecuritySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSecurityChange?.(newSettings)
    
    const newState = {
      showAlerts: newSettings.showAlerts,
      showThreats: newSettings.showThreats,
      showVulnerabilities: newSettings.showVulnerabilities,
      showIncidents: newSettings.showIncidents,
      showCompliance: newSettings.showCompliance,
      showAudit: newSettings.showAudit,
      showAccess: newSettings.showAccess,
      showEncryption: newSettings.showEncryption
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-security", className)}>
      {children}
    </div>
  )
}