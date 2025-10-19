"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
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

// Componente per gestione delle media query
interface MediaQueryProps {
  children: React.ReactNode
  onMediaQueryChange?: (matches: boolean) => void
  className?: string
}

export function MediaQuery({
  children,
  onMediaQueryChange,
  className
}: MediaQueryProps) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
      onMediaQueryChange?.(e.matches)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [onMediaQueryChange])

  return (
    <div className={cn("media-query", className)}>
      {children}
    </div>
  )
}

// Componente per media query con indicatori visivi
interface MediaQueryWithIndicatorsProps {
  children: React.ReactNode
  onMediaQueryChange?: (matches: boolean) => void
  showIndicators?: boolean
  className?: string
}

export function MediaQueryWithIndicators({
  children,
  onMediaQueryChange,
  showIndicators = false,
  className
}: MediaQueryWithIndicatorsProps) {
  const [matches, setMatches] = React.useState(false)
  const [changeCount, setChangeCount] = React.useState(0)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
      setChangeCount(prev => prev + 1)
      onMediaQueryChange?.(e.matches)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [onMediaQueryChange])

  return (
    <div className={cn("media-query", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Monitor className="h-4 w-4 text-blue-500" />
              <span>Media Query</span>
              <Badge variant="outline" className="text-xs">
                {matches ? 'Mobile' : 'Desktop'}
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

// Componente per media query con gestione dello stato
interface StatefulMediaQueryProps {
  children: React.ReactNode
  onMediaQueryChange?: (matches: boolean) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulMediaQuery({
  children,
  onMediaQueryChange,
  onStateChange,
  className
}: StatefulMediaQueryProps) {
  const [matches, setMatches] = React.useState(false)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
      onMediaQueryChange?.(e.matches)
      
      const newState = {
        matches: e.matches,
        media: e.media,
        timestamp: Date.now()
      }
      
      setState(newState)
      onStateChange?.(newState)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [onMediaQueryChange, onStateChange])

  return (
    <div className={cn("stateful-media-query", className)}>
      {children}
    </div>
  )
}

// Componente per media query con callback personalizzato
interface CallbackMediaQueryProps {
  children: React.ReactNode
  onMediaQueryChange?: (matches: boolean) => void
  callback?: (matches: boolean) => void
  className?: string
}

export function CallbackMediaQuery({
  children,
  onMediaQueryChange,
  callback,
  className
}: CallbackMediaQueryProps) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
      onMediaQueryChange?.(e.matches)
      callback?.(e.matches)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [onMediaQueryChange, callback])

  return (
    <div className={cn("callback-media-query", className)}>
      {children}
    </div>
  )
}

// Componente per media query con gestione del focus
interface FocusMediaQueryProps {
  children: React.ReactNode
  onMediaQueryChange?: (matches: boolean) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusMediaQuery({
  children,
  onMediaQueryChange,
  onFocusChange,
  className
}: FocusMediaQueryProps) {
  const [matches, setMatches] = React.useState(false)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
      onMediaQueryChange?.(e.matches)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

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
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onMediaQueryChange, onFocusChange])

  return (
    <div className={cn("focus-media-query", className)}>
      {children}
    </div>
  )
}

// Componente per media query con gestione del resize
interface ResizeMediaQueryProps {
  children: React.ReactNode
  onMediaQueryChange?: (matches: boolean) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeMediaQuery({
  children,
  onMediaQueryChange,
  onResize,
  className
}: ResizeMediaQueryProps) {
  const [matches, setMatches] = React.useState(false)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
      onMediaQueryChange?.(e.matches)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

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
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [onMediaQueryChange, onResize])

  return (
    <div className={cn("resize-media-query", className)}>
      {children}
    </div>
  )
}