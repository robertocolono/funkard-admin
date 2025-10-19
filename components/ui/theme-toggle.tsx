"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sun, 
  Moon, 
  Monitor,
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

// Componente per gestione del toggle del tema
interface ThemeToggleProps {
  children: React.ReactNode
  onThemeChange?: (theme: string) => void
  className?: string
}

export function ThemeToggle({
  children,
  onThemeChange,
  className
}: ThemeToggleProps) {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    onThemeChange?.(newTheme)
  }

  return (
    <div className={cn("theme-toggle", className)}>
      <Button onClick={toggleTheme} variant="outline" size="icon">
        {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {children}
    </div>
  )
}

// Componente per theme toggle con indicatori visivi
interface ThemeToggleWithIndicatorsProps {
  children: React.ReactNode
  onThemeChange?: (theme: string) => void
  showIndicators?: boolean
  className?: string
}

export function ThemeToggleWithIndicators({
  children,
  onThemeChange,
  showIndicators = false,
  className
}: ThemeToggleWithIndicatorsProps) {
  const [theme, setTheme] = React.useState('light')
  const [changeCount, setChangeCount] = React.useState(0)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setChangeCount(prev => prev + 1)
    onThemeChange?.(newTheme)
  }

  return (
    <div className={cn("theme-toggle", className)}>
      <Button onClick={toggleTheme} variant="outline" size="icon">
        {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Monitor className="h-4 w-4 text-blue-500" />
              <span>Theme</span>
              <Badge variant="outline" className="text-xs">
                {theme}
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

// Componente per theme toggle con gestione dello stato
interface StatefulThemeToggleProps {
  children: React.ReactNode
  onThemeChange?: (theme: string) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulThemeToggle({
  children,
  onThemeChange,
  onStateChange,
  className
}: StatefulThemeToggleProps) {
  const [theme, setTheme] = React.useState('light')
  const [state, setState] = React.useState<any>(null)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    onThemeChange?.(newTheme)
    
    const newState = {
      theme: newTheme,
      timestamp: Date.now(),
      type: 'theme_change'
    }
    
    setState(newState)
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-theme-toggle", className)}>
      <Button onClick={toggleTheme} variant="outline" size="icon">
        {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {children}
    </div>
  )
}

// Componente per theme toggle con callback personalizzato
interface CallbackThemeToggleProps {
  children: React.ReactNode
  onThemeChange?: (theme: string) => void
  callback?: (theme: string) => void
  className?: string
}

export function CallbackThemeToggle({
  children,
  onThemeChange,
  callback,
  className
}: CallbackThemeToggleProps) {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    onThemeChange?.(newTheme)
    callback?.(newTheme)
  }

  return (
    <div className={cn("callback-theme-toggle", className)}>
      <Button onClick={toggleTheme} variant="outline" size="icon">
        {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {children}
    </div>
  )
}

// Componente per theme toggle con gestione del focus
interface FocusThemeToggleProps {
  children: React.ReactNode
  onThemeChange?: (theme: string) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusThemeToggle({
  children,
  onThemeChange,
  onFocusChange,
  className
}: FocusThemeToggleProps) {
  const [theme, setTheme] = React.useState('light')
  const [hasFocus, setHasFocus] = React.useState(true)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    onThemeChange?.(newTheme)
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
    <div className={cn("focus-theme-toggle", className)}>
      <Button onClick={toggleTheme} variant="outline" size="icon">
        {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {children}
    </div>
  )
}

// Componente per theme toggle con gestione del resize
interface ResizeThemeToggleProps {
  children: React.ReactNode
  onThemeChange?: (theme: string) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeThemeToggle({
  children,
  onThemeChange,
  onResize,
  className
}: ResizeThemeToggleProps) {
  const [theme, setTheme] = React.useState('light')
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    onThemeChange?.(newTheme)
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
    <div className={cn("resize-theme-toggle", className)}>
      <Button onClick={toggleTheme} variant="outline" size="icon">
        {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {children}
    </div>
  )
}