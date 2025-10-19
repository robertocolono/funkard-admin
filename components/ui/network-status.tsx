"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Wifi, 
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

// Componente per gestione dello stato di rete
interface NetworkStatusProps {
  children: React.ReactNode
  onNetworkChange?: (isOnline: boolean) => void
  className?: string
}

export function NetworkStatus({
  children,
  onNetworkChange,
  className
}: NetworkStatusProps) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      onNetworkChange?.(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
      onNetworkChange?.(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onNetworkChange])

  return (
    <div className={cn("network-status", className)}>
      {children}
    </div>
  )
}

// Componente per network status con indicatori visivi
interface NetworkStatusWithIndicatorsProps {
  children: React.ReactNode
  onNetworkChange?: (isOnline: boolean) => void
  showIndicators?: boolean
  className?: string
}

export function NetworkStatusWithIndicators({
  children,
  onNetworkChange,
  showIndicators = false,
  className
}: NetworkStatusWithIndicatorsProps) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)
  const [changeCount, setChangeCount] = React.useState(0)

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setChangeCount(prev => prev + 1)
      onNetworkChange?.(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setChangeCount(prev => prev + 1)
      onNetworkChange?.(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onNetworkChange])

  return (
    <div className={cn("network-status", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Wifi className="h-4 w-4 text-blue-500" />
              <span>Network</span>
              <Badge variant="outline" className="text-xs">
                {isOnline ? 'Online' : 'Offline'}
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

// Componente per network status con gestione dello stato
interface StatefulNetworkStatusProps {
  children: React.ReactNode
  onNetworkChange?: (isOnline: boolean) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulNetworkStatus({
  children,
  onNetworkChange,
  onStateChange,
  className
}: StatefulNetworkStatusProps) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      onNetworkChange?.(true)
      
      const newState = {
        isOnline: true,
        timestamp: Date.now(),
        type: 'online'
      }
      
      setState(newState)
      onStateChange?.(newState)
    }

    const handleOffline = () => {
      setIsOnline(false)
      onNetworkChange?.(false)
      
      const newState = {
        isOnline: false,
        timestamp: Date.now(),
        type: 'offline'
      }
      
      setState(newState)
      onStateChange?.(newState)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onNetworkChange, onStateChange])

  return (
    <div className={cn("stateful-network-status", className)}>
      {children}
    </div>
  )
}

// Componente per network status con callback personalizzato
interface CallbackNetworkStatusProps {
  children: React.ReactNode
  onNetworkChange?: (isOnline: boolean) => void
  callback?: (isOnline: boolean) => void
  className?: string
}

export function CallbackNetworkStatus({
  children,
  onNetworkChange,
  callback,
  className
}: CallbackNetworkStatusProps) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      onNetworkChange?.(true)
      callback?.(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
      onNetworkChange?.(false)
      callback?.(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onNetworkChange, callback])

  return (
    <div className={cn("callback-network-status", className)}>
      {children}
    </div>
  )
}

// Componente per network status con gestione del focus
interface FocusNetworkStatusProps {
  children: React.ReactNode
  onNetworkChange?: (isOnline: boolean) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusNetworkStatus({
  children,
  onNetworkChange,
  onFocusChange,
  className
}: FocusNetworkStatusProps) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      onNetworkChange?.(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
      onNetworkChange?.(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

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
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onNetworkChange, onFocusChange])

  return (
    <div className={cn("focus-network-status", className)}>
      {children}
    </div>
  )
}

// Componente per network status con gestione del resize
interface ResizeNetworkStatusProps {
  children: React.ReactNode
  onNetworkChange?: (isOnline: boolean) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeNetworkStatus({
  children,
  onNetworkChange,
  onResize,
  className
}: ResizeNetworkStatusProps) {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      onNetworkChange?.(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
      onNetworkChange?.(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

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
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('resize', handleResize)
    }
  }, [onNetworkChange, onResize])

  return (
    <div className={cn("resize-network-status", className)}>
      {children}
    </div>
  )
}