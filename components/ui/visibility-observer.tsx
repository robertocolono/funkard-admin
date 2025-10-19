"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Eye, 
  Activity, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
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

// Componente per gestione del visibility observer
interface VisibilityObserverProps {
  children: React.ReactNode
  onVisibilityChange?: (isVisible: boolean) => void
  className?: string
}

export function VisibilityObserver({
  children,
  onVisibilityChange,
  className
}: VisibilityObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onVisibilityChange?.(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onVisibilityChange])

  return (
    <div ref={ref} className={cn("visibility-observer", className)}>
      {children}
    </div>
  )
}

// Componente per visibility observer con indicatori visivi
interface VisibilityObserverWithIndicatorsProps {
  children: React.ReactNode
  onVisibilityChange?: (isVisible: boolean) => void
  showIndicators?: boolean
  className?: string
}

export function VisibilityObserverWithIndicators({
  children,
  onVisibilityChange,
  showIndicators = false,
  className
}: VisibilityObserverWithIndicatorsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const [visibilityCount, setVisibilityCount] = React.useState(0)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting
          setIsVisible(visible)
          if (visible) {
            setVisibilityCount(prev => prev + 1)
          }
          onVisibilityChange?.(visible)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onVisibilityChange])

  return (
    <div ref={ref} className={cn("visibility-observer", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Eye className="h-4 w-4 text-blue-500" />
              <span>Visibility</span>
              <Badge variant="outline" className="text-xs">
                {isVisible ? 'Visible' : 'Hidden'}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {visibilityCount} times visible
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per visibility observer con gestione dello stato
interface StatefulVisibilityObserverProps {
  children: React.ReactNode
  onVisibilityChange?: (isVisible: boolean) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulVisibilityObserver({
  children,
  onVisibilityChange,
  onStateChange,
  className
}: StatefulVisibilityObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const newState = {
            isVisible: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
            rootBounds: entry.rootBounds,
            target: entry.target,
            timestamp: entry.time
          }
          
          setState(newState)
          onStateChange?.(newState)
          onVisibilityChange?.(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onVisibilityChange, onStateChange])

  return (
    <div ref={ref} className={cn("stateful-visibility-observer", className)}>
      {children}
    </div>
  )
}

// Componente per visibility observer con callback personalizzato
interface CallbackVisibilityObserverProps {
  children: React.ReactNode
  onVisibilityChange?: (isVisible: boolean) => void
  callback?: (entry: IntersectionObserverEntry) => void
  className?: string
}

export function CallbackVisibilityObserver({
  children,
  onVisibilityChange,
  callback,
  className
}: CallbackVisibilityObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback?.(entry)
          onVisibilityChange?.(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [onVisibilityChange, callback])

  return (
    <div ref={ref} className={cn("callback-visibility-observer", className)}>
      {children}
    </div>
  )
}

// Componente per visibility observer con gestione del focus
interface FocusVisibilityObserverProps {
  children: React.ReactNode
  onVisibilityChange?: (isVisible: boolean) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusVisibilityObserver({
  children,
  onVisibilityChange,
  onFocusChange,
  className
}: FocusVisibilityObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onVisibilityChange?.(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

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
  }, [onVisibilityChange, onFocusChange])

  return (
    <div ref={ref} className={cn("focus-visibility-observer", className)}>
      {children}
    </div>
  )
}

// Componente per visibility observer con gestione del resize
interface ResizeVisibilityObserverProps {
  children: React.ReactNode
  onVisibilityChange?: (isVisible: boolean) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeVisibilityObserver({
  children,
  onVisibilityChange,
  onResize,
  className
}: ResizeVisibilityObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onVisibilityChange?.(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

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
  }, [onVisibilityChange, onResize])

  return (
    <div ref={ref} className={cn("resize-visibility-observer", className)}>
      {children}
    </div>
  )
}