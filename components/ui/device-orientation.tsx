"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  RotateCcw, 
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

// Componente per gestione dell'orientamento del dispositivo
interface DeviceOrientationProps {
  children: React.ReactNode
  onOrientationChange?: (orientation: DeviceOrientationEvent) => void
  className?: string
}

export function DeviceOrientation({
  children,
  onOrientationChange,
  className
}: DeviceOrientationProps) {
  const [orientation, setOrientation] = React.useState<DeviceOrientationEvent | null>(null)

  React.useEffect(() => {
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      setOrientation(event)
      onOrientationChange?.(event)
    }

    window.addEventListener('deviceorientation', handleOrientationChange)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange)
    }
  }, [onOrientationChange])

  return (
    <div className={cn("device-orientation", className)}>
      {children}
    </div>
  )
}

// Componente per device orientation con indicatori visivi
interface DeviceOrientationWithIndicatorsProps {
  children: React.ReactNode
  onOrientationChange?: (orientation: DeviceOrientationEvent) => void
  showIndicators?: boolean
  className?: string
}

export function DeviceOrientationWithIndicators({
  children,
  onOrientationChange,
  showIndicators = false,
  className
}: DeviceOrientationWithIndicatorsProps) {
  const [orientation, setOrientation] = React.useState<DeviceOrientationEvent | null>(null)
  const [changeCount, setChangeCount] = React.useState(0)

  React.useEffect(() => {
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      setOrientation(event)
      setChangeCount(prev => prev + 1)
      onOrientationChange?.(event)
    }

    window.addEventListener('deviceorientation', handleOrientationChange)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange)
    }
  }, [onOrientationChange])

  return (
    <div className={cn("device-orientation", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <RotateCcw className="h-4 w-4 text-blue-500" />
              <span>Orientation</span>
              <Badge variant="outline" className="text-xs">
                {orientation ? `${Math.round(orientation.alpha || 0)}°` : 'Unknown'}
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

// Componente per device orientation con gestione dello stato
interface StatefulDeviceOrientationProps {
  children: React.ReactNode
  onOrientationChange?: (orientation: DeviceOrientationEvent) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulDeviceOrientation({
  children,
  onOrientationChange,
  onStateChange,
  className
}: StatefulDeviceOrientationProps) {
  const [orientation, setOrientation] = React.useState<DeviceOrientationEvent | null>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      setOrientation(event)
      onOrientationChange?.(event)
      
      const newState = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        absolute: event.absolute,
        timestamp: Date.now()
      }
      
      setState(newState)
      onStateChange?.(newState)
    }

    window.addEventListener('deviceorientation', handleOrientationChange)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange)
    }
  }, [onOrientationChange, onStateChange])

  return (
    <div className={cn("stateful-device-orientation", className)}>
      {children}
    </div>
  )
}

// Componente per device orientation con callback personalizzato
interface CallbackDeviceOrientationProps {
  children: React.ReactNode
  onOrientationChange?: (orientation: DeviceOrientationEvent) => void
  callback?: (orientation: DeviceOrientationEvent) => void
  className?: string
}

export function CallbackDeviceOrientation({
  children,
  onOrientationChange,
  callback,
  className
}: CallbackDeviceOrientationProps) {
  const [orientation, setOrientation] = React.useState<DeviceOrientationEvent | null>(null)

  React.useEffect(() => {
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      setOrientation(event)
      onOrientationChange?.(event)
      callback?.(event)
    }

    window.addEventListener('deviceorientation', handleOrientationChange)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange)
    }
  }, [onOrientationChange, callback])

  return (
    <div className={cn("callback-device-orientation", className)}>
      {children}
    </div>
  )
}

// Componente per device orientation con gestione del focus
interface FocusDeviceOrientationProps {
  children: React.ReactNode
  onOrientationChange?: (orientation: DeviceOrientationEvent) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusDeviceOrientation({
  children,
  onOrientationChange,
  onFocusChange,
  className
}: FocusDeviceOrientationProps) {
  const [orientation, setOrientation] = React.useState<DeviceOrientationEvent | null>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      setOrientation(event)
      onOrientationChange?.(event)
    }

    window.addEventListener('deviceorientation', handleOrientationChange)

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
      window.removeEventListener('deviceorientation', handleOrientationChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onOrientationChange, onFocusChange])

  return (
    <div className={cn("focus-device-orientation", className)}>
      {children}
    </div>
  )
}

// Componente per device orientation con gestione del resize
interface ResizeDeviceOrientationProps {
  children: React.ReactNode
  onOrientationChange?: (orientation: DeviceOrientationEvent) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeDeviceOrientation({
  children,
  onOrientationChange,
  onResize,
  className
}: ResizeDeviceOrientationProps) {
  const [orientation, setOrientation] = React.useState<DeviceOrientationEvent | null>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      setOrientation(event)
      onOrientationChange?.(event)
    }

    window.addEventListener('deviceorientation', handleOrientationChange)

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
      window.removeEventListener('deviceorientation', handleOrientationChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [onOrientationChange, onResize])

  return (
    <div className={cn("resize-device-orientation", className)}>
      {children}
    </div>
  )
}