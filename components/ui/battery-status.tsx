"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Battery, 
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

// Componente per gestione dello stato della batteria
interface BatteryStatusProps {
  children: React.ReactNode
  onBatteryChange?: (battery: BatteryManager) => void
  className?: string
}

export function BatteryStatus({
  children,
  onBatteryChange,
  className
}: BatteryStatusProps) {
  const [battery, setBattery] = React.useState<BatteryManager | null>(null)

  React.useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: BatteryManager) => {
        setBattery(battery)
        onBatteryChange?.(battery)
      })
    }
  }, [onBatteryChange])

  return (
    <div className={cn("battery-status", className)}>
      {children}
    </div>
  )
}

// Componente per battery status con indicatori visivi
interface BatteryStatusWithIndicatorsProps {
  children: React.ReactNode
  onBatteryChange?: (battery: BatteryManager) => void
  showIndicators?: boolean
  className?: string
}

export function BatteryStatusWithIndicators({
  children,
  onBatteryChange,
  showIndicators = false,
  className
}: BatteryStatusWithIndicatorsProps) {
  const [battery, setBattery] = React.useState<BatteryManager | null>(null)
  const [changeCount, setChangeCount] = React.useState(0)

  React.useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: BatteryManager) => {
        setBattery(battery)
        setChangeCount(prev => prev + 1)
        onBatteryChange?.(battery)
      })
    }
  }, [onBatteryChange])

  return (
    <div className={cn("battery-status", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Battery className="h-4 w-4 text-blue-500" />
              <span>Battery</span>
              <Badge variant="outline" className="text-xs">
                {battery ? `${Math.round(battery.level * 100)}%` : 'Unknown'}
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

// Componente per battery status con gestione dello stato
interface StatefulBatteryStatusProps {
  children: React.ReactNode
  onBatteryChange?: (battery: BatteryManager) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulBatteryStatus({
  children,
  onBatteryChange,
  onStateChange,
  className
}: StatefulBatteryStatusProps) {
  const [battery, setBattery] = React.useState<BatteryManager | null>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: BatteryManager) => {
        setBattery(battery)
        onBatteryChange?.(battery)
        
        const newState = {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
          timestamp: Date.now()
        }
        
        setState(newState)
        onStateChange?.(newState)
      })
    }
  }, [onBatteryChange, onStateChange])

  return (
    <div className={cn("stateful-battery-status", className)}>
      {children}
    </div>
  )
}

// Componente per battery status con callback personalizzato
interface CallbackBatteryStatusProps {
  children: React.ReactNode
  onBatteryChange?: (battery: BatteryManager) => void
  callback?: (battery: BatteryManager) => void
  className?: string
}

export function CallbackBatteryStatus({
  children,
  onBatteryChange,
  callback,
  className
}: CallbackBatteryStatusProps) {
  const [battery, setBattery] = React.useState<BatteryManager | null>(null)

  React.useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: BatteryManager) => {
        setBattery(battery)
        onBatteryChange?.(battery)
        callback?.(battery)
      })
    }
  }, [onBatteryChange, callback])

  return (
    <div className={cn("callback-battery-status", className)}>
      {children}
    </div>
  )
}

// Componente per battery status con gestione del focus
interface FocusBatteryStatusProps {
  children: React.ReactNode
  onBatteryChange?: (battery: BatteryManager) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusBatteryStatus({
  children,
  onBatteryChange,
  onFocusChange,
  className
}: FocusBatteryStatusProps) {
  const [battery, setBattery] = React.useState<BatteryManager | null>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: BatteryManager) => {
        setBattery(battery)
        onBatteryChange?.(battery)
      })
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
  }, [onBatteryChange, onFocusChange])

  return (
    <div className={cn("focus-battery-status", className)}>
      {children}
    </div>
  )
}

// Componente per battery status con gestione del resize
interface ResizeBatteryStatusProps {
  children: React.ReactNode
  onBatteryChange?: (battery: BatteryManager) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeBatteryStatus({
  children,
  onBatteryChange,
  onResize,
  className
}: ResizeBatteryStatusProps) {
  const [battery, setBattery] = React.useState<BatteryManager | null>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: BatteryManager) => {
        setBattery(battery)
        onBatteryChange?.(battery)
      })
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
  }, [onBatteryChange, onResize])

  return (
    <div className={cn("resize-battery-status", className)}>
      {children}
    </div>
  )
}