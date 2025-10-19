"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
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

// Componente per gestione della geolocalizzazione
interface GeolocationProps {
  children: React.ReactNode
  onLocationChange?: (position: GeolocationPosition) => void
  className?: string
}

export function Geolocation({
  children,
  onLocationChange,
  className
}: GeolocationProps) {
  const [position, setPosition] = React.useState<GeolocationPosition | null>(null)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos)
          onLocationChange?.(pos)
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }, [onLocationChange])

  return (
    <div className={cn("geolocation", className)}>
      {children}
    </div>
  )
}

// Componente per geolocation con indicatori visivi
interface GeolocationWithIndicatorsProps {
  children: React.ReactNode
  onLocationChange?: (position: GeolocationPosition) => void
  showIndicators?: boolean
  className?: string
}

export function GeolocationWithIndicators({
  children,
  onLocationChange,
  showIndicators = false,
  className
}: GeolocationWithIndicatorsProps) {
  const [position, setPosition] = React.useState<GeolocationPosition | null>(null)
  const [changeCount, setChangeCount] = React.useState(0)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos)
          setChangeCount(prev => prev + 1)
          onLocationChange?.(pos)
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }, [onLocationChange])

  return (
    <div className={cn("geolocation", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>Location</span>
              <Badge variant="outline" className="text-xs">
                {position ? 'Located' : 'Unknown'}
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

// Componente per geolocation con gestione dello stato
interface StatefulGeolocationProps {
  children: React.ReactNode
  onLocationChange?: (position: GeolocationPosition) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulGeolocation({
  children,
  onLocationChange,
  onStateChange,
  className
}: StatefulGeolocationProps) {
  const [position, setPosition] = React.useState<GeolocationPosition | null>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos)
          onLocationChange?.(pos)
          
          const newState = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            heading: pos.coords.heading,
            speed: pos.coords.speed,
            timestamp: pos.timestamp
          }
          
          setState(newState)
          onStateChange?.(newState)
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }, [onLocationChange, onStateChange])

  return (
    <div className={cn("stateful-geolocation", className)}>
      {children}
    </div>
  )
}

// Componente per geolocation con callback personalizzato
interface CallbackGeolocationProps {
  children: React.ReactNode
  onLocationChange?: (position: GeolocationPosition) => void
  callback?: (position: GeolocationPosition) => void
  className?: string
}

export function CallbackGeolocation({
  children,
  onLocationChange,
  callback,
  className
}: CallbackGeolocationProps) {
  const [position, setPosition] = React.useState<GeolocationPosition | null>(null)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos)
          onLocationChange?.(pos)
          callback?.(pos)
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }, [onLocationChange, callback])

  return (
    <div className={cn("callback-geolocation", className)}>
      {children}
    </div>
  )
}

// Componente per geolocation con gestione del focus
interface FocusGeolocationProps {
  children: React.ReactNode
  onLocationChange?: (position: GeolocationPosition) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusGeolocation({
  children,
  onLocationChange,
  onFocusChange,
  className
}: FocusGeolocationProps) {
  const [position, setPosition] = React.useState<GeolocationPosition | null>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos)
          onLocationChange?.(pos)
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
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
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onLocationChange, onFocusChange])

  return (
    <div className={cn("focus-geolocation", className)}>
      {children}
    </div>
  )
}

// Componente per geolocation con gestione del resize
interface ResizeGeolocationProps {
  children: React.ReactNode
  onLocationChange?: (position: GeolocationPosition) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeGeolocation({
  children,
  onLocationChange,
  onResize,
  className
}: ResizeGeolocationProps) {
  const [position, setPosition] = React.useState<GeolocationPosition | null>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(pos)
          onLocationChange?.(pos)
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
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
      window.removeEventListener('resize', handleResize)
    }
  }, [onLocationChange, onResize])

  return (
    <div className={cn("resize-geolocation", className)}>
      {children}
    </div>
  )
}