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

// Componente per gestione dell'intersection observer
interface IntersectionObserverProps {
  children: React.ReactNode
  onIntersectionChange?: (isIntersecting: boolean) => void
  className?: string
}

export function IntersectionObserver({
  children,
  onIntersectionChange,
  className
}: IntersectionObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onIntersectionChange?.(entry.isIntersecting)
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
  }, [onIntersectionChange])

  return (
    <div ref={ref} className={cn("intersection-observer", className)}>
      {children}
    </div>
  )
}

// Componente per intersection observer con indicatori visivi
interface IntersectionObserverWithIndicatorsProps {
  children: React.ReactNode
  onIntersectionChange?: (isIntersecting: boolean) => void
  showIndicators?: boolean
  className?: string
}

export function IntersectionObserverWithIndicators({
  children,
  onIntersectionChange,
  showIndicators = false,
  className
}: IntersectionObserverWithIndicatorsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [intersectionCount, setIntersectionCount] = React.useState(0)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting
          setIsIntersecting(intersecting)
          if (intersecting) {
            setIntersectionCount(prev => prev + 1)
          }
          onIntersectionChange?.(intersecting)
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
  }, [onIntersectionChange])

  return (
    <div ref={ref} className={cn("intersection-observer", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Eye className="h-4 w-4 text-blue-500" />
              <span>Intersection</span>
              <Badge variant="outline" className="text-xs">
                {isIntersecting ? 'Visible' : 'Hidden'}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {intersectionCount} intersections
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per intersection observer con gestione dello stato
interface StatefulIntersectionObserverProps {
  children: React.ReactNode
  onIntersectionChange?: (isIntersecting: boolean) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulIntersectionObserver({
  children,
  onIntersectionChange,
  onStateChange,
  className
}: StatefulIntersectionObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const newState = {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
            rootBounds: entry.rootBounds,
            target: entry.target,
            timestamp: entry.time
          }
          
          setState(newState)
          onStateChange?.(newState)
          onIntersectionChange?.(entry.isIntersecting)
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
  }, [onIntersectionChange, onStateChange])

  return (
    <div ref={ref} className={cn("stateful-intersection-observer", className)}>
      {children}
    </div>
  )
}

// Componente per intersection observer con callback personalizzato
interface CallbackIntersectionObserverProps {
  children: React.ReactNode
  onIntersectionChange?: (isIntersecting: boolean) => void
  callback?: (entry: IntersectionObserverEntry) => void
  className?: string
}

export function CallbackIntersectionObserver({
  children,
  onIntersectionChange,
  callback,
  className
}: CallbackIntersectionObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback?.(entry)
          onIntersectionChange?.(entry.isIntersecting)
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
  }, [onIntersectionChange, callback])

  return (
    <div ref={ref} className={cn("callback-intersection-observer", className)}>
      {children}
    </div>
  )
}

// Componente per intersection observer con gestione del focus
interface FocusIntersectionObserverProps {
  children: React.ReactNode
  onIntersectionChange?: (isIntersecting: boolean) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusIntersectionObserver({
  children,
  onIntersectionChange,
  onFocusChange,
  className
}: FocusIntersectionObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onIntersectionChange?.(entry.isIntersecting)
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
  }, [onIntersectionChange, onFocusChange])

  return (
    <div ref={ref} className={cn("focus-intersection-observer", className)}>
      {children}
    </div>
  )
}

// Componente per intersection observer con gestione del resize
interface ResizeIntersectionObserverProps {
  children: React.ReactNode
  onIntersectionChange?: (isIntersecting: boolean) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeIntersectionObserver({
  children,
  onIntersectionChange,
  onResize,
  className
}: ResizeIntersectionObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onIntersectionChange?.(entry.isIntersecting)
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
  }, [onIntersectionChange, onResize])

  return (
    <div ref={ref} className={cn("resize-intersection-observer", className)}>
      {children}
    </div>
  )
}