"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MousePointer, 
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

// Componente per gestione del click outside
interface ClickOutsideProps {
  children: React.ReactNode
  onClickOutside?: () => void
  className?: string
}

export function ClickOutside({
  children,
  onClickOutside,
  className
}: ClickOutsideProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  return (
    <div ref={ref} className={cn("click-outside", className)}>
      {children}
    </div>
  )
}

// Componente per click outside con indicatori visivi
interface ClickOutsideWithIndicatorsProps {
  children: React.ReactNode
  onClickOutside?: () => void
  showIndicators?: boolean
  className?: string
}

export function ClickOutsideWithIndicators({
  children,
  onClickOutside,
  showIndicators = false,
  className
}: ClickOutsideWithIndicatorsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [clickCount, setClickCount] = React.useState(0)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setClickCount(prev => prev + 1)
        onClickOutside?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  return (
    <div ref={ref} className={cn("click-outside", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <MousePointer className="h-4 w-4 text-blue-500" />
              <span>Click Outside</span>
              <Badge variant="outline" className="text-xs">
                {clickCount} clicks
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Click outside to trigger
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per click outside con gestione dello stato
interface StatefulClickOutsideProps {
  children: React.ReactNode
  onClickOutside?: () => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulClickOutside({
  children,
  onClickOutside,
  onStateChange,
  className
}: StatefulClickOutsideProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        const newState = {
          clickedOutside: true,
          timestamp: Date.now(),
          target: event.target
        }
        
        setState(newState)
        onStateChange?.(newState)
        onClickOutside?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside, onStateChange])

  return (
    <div ref={ref} className={cn("stateful-click-outside", className)}>
      {children}
    </div>
  )
}

// Componente per click outside con callback personalizzato
interface CallbackClickOutsideProps {
  children: React.ReactNode
  onClickOutside?: () => void
  callback?: (event: MouseEvent) => void
  className?: string
}

export function CallbackClickOutside({
  children,
  onClickOutside,
  callback,
  className
}: CallbackClickOutsideProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback?.(event)
        onClickOutside?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside, callback])

  return (
    <div ref={ref} className={cn("callback-click-outside", className)}>
      {children}
    </div>
  )
}

// Componente per click outside con gestione del focus
interface FocusClickOutsideProps {
  children: React.ReactNode
  onClickOutside?: () => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusClickOutside({
  children,
  onClickOutside,
  onFocusChange,
  className
}: FocusClickOutsideProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setHasFocus(false)
        onFocusChange?.(false)
        onClickOutside?.()
      }
    }

    const handleFocus = () => {
      setHasFocus(true)
      onFocusChange?.(true)
    }

    const handleBlur = () => {
      setHasFocus(false)
      onFocusChange?.(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onClickOutside, onFocusChange])

  return (
    <div ref={ref} className={cn("focus-click-outside", className)}>
      {children}
    </div>
  )
}

// Componente per click outside con gestione del resize
interface ResizeClickOutsideProps {
  children: React.ReactNode
  onClickOutside?: () => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeClickOutside({
  children,
  onClickOutside,
  onResize,
  className
}: ResizeClickOutsideProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside?.()
      }
    }

    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      
      setSize(newSize)
      onResize?.(newSize)
    }

    document.addEventListener('mousedown', handleClickOutside)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [onClickOutside, onResize])

  return (
    <div ref={ref} className={cn("resize-click-outside", className)}>
      {children}
    </div>
  )
}