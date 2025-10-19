"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Accessibility as AccessibilityIcon, 
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
} from "lucide-react"

// Componente per gestione dell'accessibilità
interface AccessibilityProps {
  children: React.ReactNode
  onAccessibilityChange?: (accessibility: AccessibilitySettings) => void
  className?: string
}

interface AccessibilitySettings {
  highContrast: boolean
  reducedMotion: boolean
  largeText: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusVisible: boolean
  colorBlind: boolean
  dyslexia: boolean
}

export function Accessibility({
  children,
  onAccessibilityChange,
  className
}: AccessibilityProps) {
  const [settings, setSettings] = React.useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: false,
    colorBlind: false,
    dyslexia: false
  })

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAccessibilityChange?.(newSettings)
  }

  return (
    <div className={cn("accessibility", className)}>
      {children}
    </div>
  )
}

// Componente per accessibility con indicatori visivi
interface AccessibilityWithIndicatorsProps {
  children: React.ReactNode
  onAccessibilityChange?: (accessibility: AccessibilitySettings) => void
  showIndicators?: boolean
  className?: string
}

export function AccessibilityWithIndicators({
  children,
  onAccessibilityChange,
  showIndicators = false,
  className
}: AccessibilityWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: false,
    colorBlind: false,
    dyslexia: false
  })

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAccessibilityChange?.(newSettings)
  }

  return (
    <div className={cn("accessibility", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <AccessibilityIcon className="h-4 w-4 text-blue-500" />
              <span>Accessibility</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.highContrast && "High Contrast "}
              {settings.reducedMotion && "Reduced Motion "}
              {settings.largeText && "Large Text "}
              {settings.screenReader && "Screen Reader "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per accessibility con gestione dello stato
interface StatefulAccessibilityProps {
  children: React.ReactNode
  onAccessibilityChange?: (accessibility: AccessibilitySettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulAccessibility({
  children,
  onAccessibilityChange,
  onStateChange,
  className
}: StatefulAccessibilityProps) {
  const [settings, setSettings] = React.useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: false,
    colorBlind: false,
    dyslexia: false
  })

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAccessibilityChange?.(newSettings)
    
    const newState = {
      highContrast: newSettings.highContrast,
      reducedMotion: newSettings.reducedMotion,
      largeText: newSettings.largeText,
      screenReader: newSettings.screenReader,
      keyboardNavigation: newSettings.keyboardNavigation,
      focusVisible: newSettings.focusVisible,
      colorBlind: newSettings.colorBlind,
      dyslexia: newSettings.dyslexia
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-accessibility", className)}>
      {children}
    </div>
  )
}

// Componente per accessibility con callback personalizzato
interface CallbackAccessibilityProps {
  children: React.ReactNode
  onAccessibilityChange?: (accessibility: AccessibilitySettings) => void
  callback?: (accessibility: AccessibilitySettings) => void
  className?: string
}

export function CallbackAccessibility({
  children,
  onAccessibilityChange,
  callback,
  className
}: CallbackAccessibilityProps) {
  const [settings, setSettings] = React.useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: false,
    colorBlind: false,
    dyslexia: false
  })

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAccessibilityChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-accessibility", className)}>
      {children}
    </div>
  )
}

// Componente per accessibility con gestione del focus
interface FocusAccessibilityProps {
  children: React.ReactNode
  onAccessibilityChange?: (accessibility: AccessibilitySettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusAccessibility({
  children,
  onAccessibilityChange,
  onFocusChange,
  className
}: FocusAccessibilityProps) {
  const [settings, setSettings] = React.useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: false,
    colorBlind: false,
    dyslexia: false
  })

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAccessibilityChange?.(newSettings)
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
    <div className={cn("focus-accessibility", className)}>
      {children}
    </div>
  )
}

// Componente per accessibility con gestione del resize
interface ResizeAccessibilityProps {
  children: React.ReactNode
  onAccessibilityChange?: (accessibility: AccessibilitySettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeAccessibility({
  children,
  onAccessibilityChange,
  onResize,
  className
}: ResizeAccessibilityProps) {
  const [settings, setSettings] = React.useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: false,
    colorBlind: false,
    dyslexia: false
  })

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onAccessibilityChange?.(newSettings)
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
    <div className={cn("resize-accessibility", className)}>
      {children}
    </div>
  )
}