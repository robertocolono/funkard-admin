"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Keyboard, 
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

// Componente per gestione delle scorciatoie da tastiera
interface KeyboardShortcutsProps {
  children: React.ReactNode
  onShortcut?: (shortcut: string) => void
  className?: string
}

export function KeyboardShortcuts({
  children,
  onShortcut,
  className
}: KeyboardShortcutsProps) {
  const [shortcuts, setShortcuts] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = getShortcutString(event)
      setShortcuts(prev => ({ ...prev, [shortcut]: shortcut }))
      onShortcut?.(shortcut)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onShortcut])

  const getShortcutString = (event: KeyboardEvent) => {
    const parts = []
    if (event.ctrlKey) parts.push('Ctrl')
    if (event.altKey) parts.push('Alt')
    if (event.shiftKey) parts.push('Shift')
    if (event.metaKey) parts.push('Cmd')
    parts.push(event.key)
    return parts.join('+')
  }

  return (
    <div className={cn("keyboard-shortcuts", className)}>
      {children}
    </div>
  )
}

// Componente per scorciatoie con indicatori visivi
interface ShortcutsWithIndicatorsProps {
  children: React.ReactNode
  onShortcut?: (shortcut: string) => void
  showIndicators?: boolean
  className?: string
}

export function ShortcutsWithIndicators({
  children,
  onShortcut,
  showIndicators = false,
  className
}: ShortcutsWithIndicatorsProps) {
  const [shortcuts, setShortcuts] = React.useState<Record<string, string>>({})
  const [lastShortcut, setLastShortcut] = React.useState<string>("")

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = getShortcutString(event)
      setShortcuts(prev => ({ ...prev, [shortcut]: shortcut }))
      setLastShortcut(shortcut)
      onShortcut?.(shortcut)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onShortcut])

  const getShortcutString = (event: KeyboardEvent) => {
    const parts = []
    if (event.ctrlKey) parts.push('Ctrl')
    if (event.altKey) parts.push('Alt')
    if (event.shiftKey) parts.push('Shift')
    if (event.metaKey) parts.push('Cmd')
    parts.push(event.key)
    return parts.join('+')
  }

  return (
    <div className={cn("keyboard-shortcuts", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Keyboard className="h-4 w-4 text-blue-500" />
              <span>Shortcuts</span>
              <Badge variant="outline" className="text-xs">
                {Object.keys(shortcuts).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Last: {lastShortcut}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per scorciatoie con gestione dello stato
interface StatefulShortcutsProps {
  children: React.ReactNode
  onShortcut?: (shortcut: string) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulShortcuts({
  children,
  onShortcut,
  onStateChange,
  className
}: StatefulShortcutsProps) {
  const [shortcuts, setShortcuts] = React.useState<Record<string, string>>({})
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = getShortcutString(event)
      setShortcuts(prev => ({ ...prev, [shortcut]: shortcut }))
      onShortcut?.(shortcut)
      
      const newState = {
        shortcut,
        timestamp: Date.now(),
        key: event.key,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey
      }
      
      setState(newState)
      onStateChange?.(newState)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onShortcut, onStateChange])

  const getShortcutString = (event: KeyboardEvent) => {
    const parts = []
    if (event.ctrlKey) parts.push('Ctrl')
    if (event.altKey) parts.push('Alt')
    if (event.shiftKey) parts.push('Shift')
    if (event.metaKey) parts.push('Cmd')
    parts.push(event.key)
    return parts.join('+')
  }

  return (
    <div className={cn("stateful-shortcuts", className)}>
      {children}
    </div>
  )
}

// Componente per scorciatoie con callback personalizzato
interface CallbackShortcutsProps {
  children: React.ReactNode
  onShortcut?: (shortcut: string) => void
  callback?: (shortcut: string) => void
  className?: string
}

export function CallbackShortcuts({
  children,
  onShortcut,
  callback,
  className
}: CallbackShortcutsProps) {
  const [shortcuts, setShortcuts] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = getShortcutString(event)
      setShortcuts(prev => ({ ...prev, [shortcut]: shortcut }))
      onShortcut?.(shortcut)
      callback?.(shortcut)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onShortcut, callback])

  const getShortcutString = (event: KeyboardEvent) => {
    const parts = []
    if (event.ctrlKey) parts.push('Ctrl')
    if (event.altKey) parts.push('Alt')
    if (event.shiftKey) parts.push('Shift')
    if (event.metaKey) parts.push('Cmd')
    parts.push(event.key)
    return parts.join('+')
  }

  return (
    <div className={cn("callback-shortcuts", className)}>
      {children}
    </div>
  )
}

// Componente per scorciatoie con gestione del focus
interface FocusShortcutsProps {
  children: React.ReactNode
  onShortcut?: (shortcut: string) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusShortcuts({
  children,
  onShortcut,
  onFocusChange,
  className
}: FocusShortcutsProps) {
  const [shortcuts, setShortcuts] = React.useState<Record<string, string>>({})
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = getShortcutString(event)
      setShortcuts(prev => ({ ...prev, [shortcut]: shortcut }))
      onShortcut?.(shortcut)
    }

    document.addEventListener('keydown', handleKeyDown)

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
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onShortcut, onFocusChange])

  const getShortcutString = (event: KeyboardEvent) => {
    const parts = []
    if (event.ctrlKey) parts.push('Ctrl')
    if (event.altKey) parts.push('Alt')
    if (event.shiftKey) parts.push('Shift')
    if (event.metaKey) parts.push('Cmd')
    parts.push(event.key)
    return parts.join('+')
  }

  return (
    <div className={cn("focus-shortcuts", className)}>
      {children}
    </div>
  )
}

// Componente per scorciatoie con gestione del resize
interface ResizeShortcutsProps {
  children: React.ReactNode
  onShortcut?: (shortcut: string) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeShortcuts({
  children,
  onShortcut,
  onResize,
  className
}: ResizeShortcutsProps) {
  const [shortcuts, setShortcuts] = React.useState<Record<string, string>>({})
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = getShortcutString(event)
      setShortcuts(prev => ({ ...prev, [shortcut]: shortcut }))
      onShortcut?.(shortcut)
    }

    document.addEventListener('keydown', handleKeyDown)

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
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [onShortcut, onResize])

  const getShortcutString = (event: KeyboardEvent) => {
    const parts = []
    if (event.ctrlKey) parts.push('Ctrl')
    if (event.altKey) parts.push('Alt')
    if (event.shiftKey) parts.push('Shift')
    if (event.metaKey) parts.push('Cmd')
    parts.push(event.key)
    return parts.join('+')
  }

  return (
    <div className={cn("resize-shortcuts", className)}>
      {children}
    </div>
  )
}