"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
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

// Componente per gestione del toggle della lingua
interface LanguageToggleProps {
  children: React.ReactNode
  onLanguageChange?: (language: string) => void
  className?: string
}

export function LanguageToggle({
  children,
  onLanguageChange,
  className
}: LanguageToggleProps) {
  const [language, setLanguage] = React.useState('en')

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'it' : 'en'
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
  }

  return (
    <div className={cn("language-toggle", className)}>
      <Button onClick={toggleLanguage} variant="outline" size="icon">
        <Globe className="h-4 w-4" />
      </Button>
      {children}
    </div>
  )
}

// Componente per language toggle con indicatori visivi
interface LanguageToggleWithIndicatorsProps {
  children: React.ReactNode
  onLanguageChange?: (language: string) => void
  showIndicators?: boolean
  className?: string
}

export function LanguageToggleWithIndicators({
  children,
  onLanguageChange,
  showIndicators = false,
  className
}: LanguageToggleWithIndicatorsProps) {
  const [language, setLanguage] = React.useState('en')
  const [changeCount, setChangeCount] = React.useState(0)

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'it' : 'en'
    setLanguage(newLanguage)
    setChangeCount(prev => prev + 1)
    onLanguageChange?.(newLanguage)
  }

  return (
    <div className={cn("language-toggle", className)}>
      <Button onClick={toggleLanguage} variant="outline" size="icon">
        <Globe className="h-4 w-4" />
      </Button>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>Language</span>
              <Badge variant="outline" className="text-xs">
                {language}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {changeCount} changes
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per language toggle con gestione dello stato
interface StatefulLanguageToggleProps {
  children: React.ReactNode
  onLanguageChange?: (language: string) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulLanguageToggle({
  children,
  onLanguageChange,
  onStateChange,
  className
}: StatefulLanguageToggleProps) {
  const [language, setLanguage] = React.useState('en')
  const [state, setState] = React.useState<any>(null)

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'it' : 'en'
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
    
    const newState = {
      language: newLanguage,
      timestamp: Date.now(),
      type: 'language_change'
    }
    
    setState(newState)
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-language-toggle", className)}>
      <Button onClick={toggleLanguage} variant="outline" size="icon">
        <Globe className="h-4 w-4" />
      </Button>
      {children}
    </div>
  )
}

// Componente per language toggle con callback personalizzato
interface CallbackLanguageToggleProps {
  children: React.ReactNode
  onLanguageChange?: (language: string) => void
  callback?: (language: string) => void
  className?: string
}

export function CallbackLanguageToggle({
  children,
  onLanguageChange,
  callback,
  className
}: CallbackLanguageToggleProps) {
  const [language, setLanguage] = React.useState('en')

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'it' : 'en'
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
    callback?.(newLanguage)
  }

  return (
    <div className={cn("callback-language-toggle", className)}>
      <Button onClick={toggleLanguage} variant="outline" size="icon">
        <Globe className="h-4 w-4" />
      </Button>
      {children}
    </div>
  )
}

// Componente per language toggle con gestione del focus
interface FocusLanguageToggleProps {
  children: React.ReactNode
  onLanguageChange?: (language: string) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusLanguageToggle({
  children,
  onLanguageChange,
  onFocusChange,
  className
}: FocusLanguageToggleProps) {
  const [language, setLanguage] = React.useState('en')
  const [hasFocus, setHasFocus] = React.useState(true)

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'it' : 'en'
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
  }

  React.useEffect(() => {
    const handleFocus = () => {
      setHasFocus(true)
      onFocusChange?.(true)
    }

    const handleBlur = () => {
      setHasFocus(false)
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
    <div className={cn("focus-language-toggle", className)}>
      <Button onClick={toggleLanguage} variant="outline" size="icon">
        <Globe className="h-4 w-4" />
      </Button>
      {children}
    </div>
  )
}

// Componente per language toggle con gestione del resize
interface ResizeLanguageToggleProps {
  children: React.ReactNode
  onLanguageChange?: (language: string) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeLanguageToggle({
  children,
  onLanguageChange,
  onResize,
  className
}: ResizeLanguageToggleProps) {
  const [language, setLanguage] = React.useState('en')
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'it' : 'en'
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)
  }

  React.useEffect(() => {
    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      
      setSize(newSize)
      onResize?.(newSize)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onResize])

  return (
    <div className={cn("resize-language-toggle", className)}>
      <Button onClick={toggleLanguage} variant="outline" size="icon">
        <Globe className="h-4 w-4" />
      </Button>
      {children}
    </div>
  )
}