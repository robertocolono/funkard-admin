"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Gauge, 
  Activity, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  LineChart,
  PieChart,
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

// Componente per gestione del performance observer
interface PerformanceObserverProps {
  children: React.ReactNode
  onPerformanceChange?: (entries: PerformanceEntry[]) => void
  className?: string
}

export function PerformanceObserver({
  children,
  onPerformanceChange,
  className
}: PerformanceObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      onPerformanceChange?.(list.getEntries())
    })

    observer.observe({ entryTypes: ['measure', 'mark', 'navigation', 'resource'] })

    return () => {
      observer.disconnect()
    }
  }, [onPerformanceChange])

  return (
    <div ref={ref} className={cn("performance-observer", className)}>
      {children}
    </div>
  )
}

// Componente per performance observer con indicatori visivi
interface PerformanceObserverWithIndicatorsProps {
  children: React.ReactNode
  onPerformanceChange?: (entries: PerformanceEntry[]) => void
  showIndicators?: boolean
  className?: string
}

export function PerformanceObserverWithIndicators({
  children,
  onPerformanceChange,
  showIndicators = false,
  className
}: PerformanceObserverWithIndicatorsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [performanceCount, setPerformanceCount] = React.useState(0)
  const [lastEntry, setLastEntry] = React.useState<PerformanceEntry | null>(null)

  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      setPerformanceCount(prev => prev + entries.length)
      setLastEntry(entries[entries.length - 1])
      onPerformanceChange?.(entries)
    })

    observer.observe({ entryTypes: ['measure', 'mark', 'navigation', 'resource'] })

    return () => {
      observer.disconnect()
    }
  }, [onPerformanceChange])

  return (
    <div ref={ref} className={cn("performance-observer", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Gauge className="h-4 w-4 text-blue-500" />
              <span>Performance</span>
              <Badge variant="outline" className="text-xs">
                {performanceCount} entries
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {lastEntry ? `Last: ${lastEntry.name}` : 'No entries'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per performance observer con gestione dello stato
interface StatefulPerformanceObserverProps {
  children: React.ReactNode
  onPerformanceChange?: (entries: PerformanceEntry[]) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulPerformanceObserver({
  children,
  onPerformanceChange,
  onStateChange,
  className
}: StatefulPerformanceObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const newState = {
        entries: entries.map(entry => ({
          name: entry.name,
          entryType: entry.entryType,
          startTime: entry.startTime,
          duration: entry.duration,
          timestamp: Date.now()
        })),
        count: entries.length,
        timestamp: Date.now()
      }
      
      setState(newState)
      onStateChange?.(newState)
      onPerformanceChange?.(entries)
    })

    observer.observe({ entryTypes: ['measure', 'mark', 'navigation', 'resource'] })

    return () => {
      observer.disconnect()
    }
  }, [onPerformanceChange, onStateChange])

  return (
    <div ref={ref} className={cn("stateful-performance-observer", className)}>
      {children}
    </div>
  )
}

// Componente per performance observer con callback personalizzato
interface CallbackPerformanceObserverProps {
  children: React.ReactNode
  onPerformanceChange?: (entries: PerformanceEntry[]) => void
  callback?: (entries: PerformanceEntry[]) => void
  className?: string
}

export function CallbackPerformanceObserver({
  children,
  onPerformanceChange,
  callback,
  className
}: CallbackPerformanceObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      callback?.(entries)
      onPerformanceChange?.(entries)
    })

    observer.observe({ entryTypes: ['measure', 'mark', 'navigation', 'resource'] })

    return () => {
      observer.disconnect()
    }
  }, [onPerformanceChange, callback])

  return (
    <div ref={ref} className={cn("callback-performance-observer", className)}>
      {children}
    </div>
  )
}

// Componente per performance observer con gestione del focus
interface FocusPerformanceObserverProps {
  children: React.ReactNode
  onPerformanceChange?: (entries: PerformanceEntry[]) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusPerformanceObserver({
  children,
  onPerformanceChange,
  onFocusChange,
  className
}: FocusPerformanceObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      onPerformanceChange?.(list.getEntries())
    })

    observer.observe({ entryTypes: ['measure', 'mark', 'navigation', 'resource'] })

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
  }, [onPerformanceChange, onFocusChange])

  return (
    <div ref={ref} className={cn("focus-performance-observer", className)}>
      {children}
    </div>
  )
}

// Componente per performance observer con gestione del resize
interface ResizePerformanceObserverProps {
  children: React.ReactNode
  onPerformanceChange?: (entries: PerformanceEntry[]) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizePerformanceObserver({
  children,
  onPerformanceChange,
  onResize,
  className
}: ResizePerformanceObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      onPerformanceChange?.(list.getEntries())
    })

    observer.observe({ entryTypes: ['measure', 'mark', 'navigation', 'resource'] })

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
  }, [onPerformanceChange, onResize])

  return (
    <div ref={ref} className={cn("resize-performance-observer", className)}>
      {children}
    </div>
  )
}