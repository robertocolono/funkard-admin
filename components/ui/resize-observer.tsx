"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Resize, 
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

// Componente per gestione del resize observer
interface ResizeObserverProps {
  children: React.ReactNode
  onResizeChange?: (entries: ResizeObserverEntry[]) => void
  className?: string
}

export function ResizeObserver({
  children,
  onResizeChange,
  className
}: ResizeObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      onResizeChange?.(entries)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onResizeChange])

  return (
    <div ref={ref} className={cn("resize-observer", className)}>
      {children}
    </div>
  )
}

// Componente per resize observer con indicatori visivi
interface ResizeObserverWithIndicatorsProps {
  children: React.ReactNode
  onResizeChange?: (entries: ResizeObserverEntry[]) => void
  showIndicators?: boolean
  className?: string
}

export function ResizeObserverWithIndicators({
  children,
  onResizeChange,
  showIndicators = false,
  className
}: ResizeObserverWithIndicatorsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [resizeCount, setResizeCount] = React.useState(0)
  const [lastSize, setLastSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setResizeCount(prev => prev + 1)
      const entry = entries[0]
      if (entry) {
        setLastSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        })
      }
      onResizeChange?.(entries)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onResizeChange])

  return (
    <div ref={ref} className={cn("resize-observer", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Resize className="h-4 w-4 text-blue-500" />
              <span>Resize</span>
              <Badge variant="outline" className="text-xs">
                {resizeCount} changes
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {lastSize.width}x{lastSize.height}px
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per resize observer con gestione dello stato
interface StatefulResizeObserverProps {
  children: React.ReactNode
  onResizeChange?: (entries: ResizeObserverEntry[]) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulResizeObserver({
  children,
  onResizeChange,
  onStateChange,
  className
}: StatefulResizeObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const newState = {
        entries: entries.map(entry => ({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
          top: entry.contentRect.top,
          left: entry.contentRect.left,
          target: entry.target,
          timestamp: Date.now()
        })),
        count: entries.length,
        timestamp: Date.now()
      }
      
      setState(newState)
      onStateChange?.(newState)
      onResizeChange?.(entries)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onResizeChange, onStateChange])

  return (
    <div ref={ref} className={cn("stateful-resize-observer", className)}>
      {children}
    </div>
  )
}

// Componente per resize observer con callback personalizzato
interface CallbackResizeObserverProps {
  children: React.ReactNode
  onResizeChange?: (entries: ResizeObserverEntry[]) => void
  callback?: (entries: ResizeObserverEntry[]) => void
  className?: string
}

export function CallbackResizeObserver({
  children,
  onResizeChange,
  callback,
  className
}: CallbackResizeObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      callback?.(entries)
      onResizeChange?.(entries)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onResizeChange, callback])

  return (
    <div ref={ref} className={cn("callback-resize-observer", className)}>
      {children}
    </div>
  )
}

// Componente per resize observer con gestione del focus
interface FocusResizeObserverProps {
  children: React.ReactNode
  onResizeChange?: (entries: ResizeObserverEntry[]) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusResizeObserver({
  children,
  onResizeChange,
  onFocusChange,
  className
}: FocusResizeObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      onResizeChange?.(entries)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

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
      observer.disconnect()
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onResizeChange, onFocusChange])

  return (
    <div ref={ref} className={cn("focus-resize-observer", className)}>
      {children}
    </div>
  )
}

// Componente per resize observer con gestione del resize
interface ResizeResizeObserverProps {
  children: React.ReactNode
  onResizeChange?: (entries: ResizeObserverEntry[]) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeResizeObserver({
  children,
  onResizeChange,
  onResize,
  className
}: ResizeResizeObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      onResizeChange?.(entries)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

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
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [onResizeChange, onResize])

  return (
    <div ref={ref} className={cn("resize-resize-observer", className)}>
      {children}
    </div>
  )
}