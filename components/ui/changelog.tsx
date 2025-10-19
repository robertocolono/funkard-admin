"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  GitBranch, 
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

// Componente per gestione del changelog
interface ChangelogProps {
  children: React.ReactNode
  onChangelogChange?: (changelog: ChangelogSettings) => void
  className?: string
}

interface ChangelogSettings {
  showCommits: boolean
  showPullRequests: boolean
  showIssues: boolean
  showReleases: boolean
  showTags: boolean
  showBranches: boolean
  showMerges: boolean
  showRebases: boolean
}

export function Changelog({
  children,
  onChangelogChange,
  className
}: ChangelogProps) {
  const [settings, setSettings] = React.useState<ChangelogSettings>({
    showCommits: true,
    showPullRequests: true,
    showIssues: true,
    showReleases: true,
    showTags: true,
    showBranches: true,
    showMerges: true,
    showRebases: true
  })

  const updateSetting = (key: keyof ChangelogSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onChangelogChange?.(newSettings)
  }

  return (
    <div className={cn("changelog", className)}>
      {children}
    </div>
  )
}

// Componente per changelog con indicatori visivi
interface ChangelogWithIndicatorsProps {
  children: React.ReactNode
  onChangelogChange?: (changelog: ChangelogSettings) => void
  showIndicators?: boolean
  className?: string
}

export function ChangelogWithIndicators({
  children,
  onChangelogChange,
  showIndicators = false,
  className
}: ChangelogWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<ChangelogSettings>({
    showCommits: true,
    showPullRequests: true,
    showIssues: true,
    showReleases: true,
    showTags: true,
    showBranches: true,
    showMerges: true,
    showRebases: true
  })

  const updateSetting = (key: keyof ChangelogSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onChangelogChange?.(newSettings)
  }

  return (
    <div className={cn("changelog", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <GitBranch className="h-4 w-4 text-blue-500" />
              <span>Changelog</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showCommits && "Commits "}
              {settings.showPullRequests && "PRs "}
              {settings.showIssues && "Issues "}
              {settings.showReleases && "Releases "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per changelog con gestione dello stato
interface StatefulChangelogProps {
  children: React.ReactNode
  onChangelogChange?: (changelog: ChangelogSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulChangelog({
  children,
  onChangelogChange,
  onStateChange,
  className
}: StatefulChangelogProps) {
  const [settings, setSettings] = React.useState<ChangelogSettings>({
    showCommits: true,
    showPullRequests: true,
    showIssues: true,
    showReleases: true,
    showTags: true,
    showBranches: true,
    showMerges: true,
    showRebases: true
  })

  const updateSetting = (key: keyof ChangelogSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onChangelogChange?.(newSettings)
    
    const newState = {
      showCommits: newSettings.showCommits,
      showPullRequests: newSettings.showPullRequests,
      showIssues: newSettings.showIssues,
      showReleases: newSettings.showReleases,
      showTags: newSettings.showTags,
      showBranches: newSettings.showBranches,
      showMerges: newSettings.showMerges,
      showRebases: newSettings.showRebases
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-changelog", className)}>
      {children}
    </div>
  )
}

// Componente per changelog con callback personalizzato
interface CallbackChangelogProps {
  children: React.ReactNode
  onChangelogChange?: (changelog: ChangelogSettings) => void
  callback?: (changelog: ChangelogSettings) => void
  className?: string
}

export function CallbackChangelog({
  children,
  onChangelogChange,
  callback,
  className
}: CallbackChangelogProps) {
  const [settings, setSettings] = React.useState<ChangelogSettings>({
    showCommits: true,
    showPullRequests: true,
    showIssues: true,
    showReleases: true,
    showTags: true,
    showBranches: true,
    showMerges: true,
    showRebases: true
  })

  const updateSetting = (key: keyof ChangelogSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onChangelogChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-changelog", className)}>
      {children}
    </div>
  )
}

// Componente per changelog con gestione del focus
interface FocusChangelogProps {
  children: React.ReactNode
  onChangelogChange?: (changelog: ChangelogSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusChangelog({
  children,
  onChangelogChange,
  onFocusChange,
  className
}: FocusChangelogProps) {
  const [settings, setSettings] = React.useState<ChangelogSettings>({
    showCommits: true,
    showPullRequests: true,
    showIssues: true,
    showReleases: true,
    showTags: true,
    showBranches: true,
    showMerges: true,
    showRebases: true
  })

  const updateSetting = (key: keyof ChangelogSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onChangelogChange?.(newSettings)
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
    <div className={cn("focus-changelog", className)}>
      {children}
    </div>
  )
}

// Componente per changelog con gestione del resize
interface ResizeChangelogProps {
  children: React.ReactNode
  onChangelogChange?: (changelog: ChangelogSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeChangelog({
  children,
  onChangelogChange,
  onResize,
  className
}: ResizeChangelogProps) {
  const [settings, setSettings] = React.useState<ChangelogSettings>({
    showCommits: true,
    showPullRequests: true,
    showIssues: true,
    showReleases: true,
    showTags: true,
    showBranches: true,
    showMerges: true,
    showRebases: true
  })

  const updateSetting = (key: keyof ChangelogSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onChangelogChange?.(newSettings)
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
    <div className={cn("resize-changelog", className)}>
      {children}
    </div>
  )
}