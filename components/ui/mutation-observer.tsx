"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Edit, 
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

// Componente per gestione del mutation observer
interface MutationObserverProps {
  children: React.ReactNode
  onMutationChange?: (mutations: MutationRecord[]) => void
  className?: string
}

export function MutationObserver({
  children,
  onMutationChange,
  className
}: MutationObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      onMutationChange?.(mutations)
    })

    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [onMutationChange])

  return (
    <div ref={ref} className={cn("mutation-observer", className)}>
      {children}
    </div>
  )
}

// Componente per mutation observer con indicatori visivi
interface MutationObserverWithIndicatorsProps {
  children: React.ReactNode
  onMutationChange?: (mutations: MutationRecord[]) => void
  showIndicators?: boolean
  className?: string
}

export function MutationObserverWithIndicators({
  children,
  onMutationChange,
  showIndicators = false,
  className
}: MutationObserverWithIndicatorsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [mutationCount, setMutationCount] = React.useState(0)
  const [lastMutation, setLastMutation] = React.useState<MutationRecord | null>(null)

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      setMutationCount(prev => prev + mutations.length)
      setLastMutation(mutations[mutations.length - 1])
      onMutationChange?.(mutations)
    })

    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [onMutationChange])

  return (
    <div ref={ref} className={cn("mutation-observer", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Edit className="h-4 w-4 text-blue-500" />
              <span>Mutation</span>
              <Badge variant="outline" className="text-xs">
                {mutationCount} changes
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {lastMutation ? `Last: ${lastMutation.type}` : 'No changes'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per mutation observer con gestione dello stato
interface StatefulMutationObserverProps {
  children: React.ReactNode
  onMutationChange?: (mutations: MutationRecord[]) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulMutationObserver({
  children,
  onMutationChange,
  onStateChange,
  className
}: StatefulMutationObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<any>(null)

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const newState = {
        mutations: mutations.map(mutation => ({
          type: mutation.type,
          target: mutation.target,
          addedNodes: mutation.addedNodes,
          removedNodes: mutation.removedNodes,
          attributeName: mutation.attributeName,
          oldValue: mutation.oldValue,
          timestamp: Date.now()
        })),
        count: mutations.length,
        timestamp: Date.now()
      }
      
      setState(newState)
      onStateChange?.(newState)
      onMutationChange?.(mutations)
    })

    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [onMutationChange, onStateChange])

  return (
    <div ref={ref} className={cn("stateful-mutation-observer", className)}>
      {children}
    </div>
  )
}

// Componente per mutation observer con callback personalizzato
interface CallbackMutationObserverProps {
  children: React.ReactNode
  onMutationChange?: (mutations: MutationRecord[]) => void
  callback?: (mutations: MutationRecord[]) => void
  className?: string
}

export function CallbackMutationObserver({
  children,
  onMutationChange,
  callback,
  className
}: CallbackMutationObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      callback?.(mutations)
      onMutationChange?.(mutations)
    })

    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [onMutationChange, callback])

  return (
    <div ref={ref} className={cn("callback-mutation-observer", className)}>
      {children}
    </div>
  )
}

// Componente per mutation observer con gestione del focus
interface FocusMutationObserverProps {
  children: React.ReactNode
  onMutationChange?: (mutations: MutationRecord[]) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusMutationObserver({
  children,
  onMutationChange,
  onFocusChange,
  className
}: FocusMutationObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = React.useState(true)

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      onMutationChange?.(mutations)
    })

    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true
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
      observer.disconnect()
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onMutationChange, onFocusChange])

  return (
    <div ref={ref} className={cn("focus-mutation-observer", className)}>
      {children}
    </div>
  )
}

// Componente per mutation observer con gestione del resize
interface ResizeMutationObserverProps {
  children: React.ReactNode
  onMutationChange?: (mutations: MutationRecord[]) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeMutationObserver({
  children,
  onMutationChange,
  onResize,
  className
}: ResizeMutationObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      onMutationChange?.(mutations)
    })

    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true
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
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [onMutationChange, onResize])

  return (
    <div ref={ref} className={cn("resize-mutation-observer", className)}>
      {children}
    </div>
  )
}