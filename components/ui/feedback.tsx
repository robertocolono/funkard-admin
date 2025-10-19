"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ThumbsUp, 
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

// Componente per gestione del feedback
interface FeedbackProps {
  children: React.ReactNode
  onFeedbackChange?: (feedback: FeedbackSettings) => void
  className?: string
}

interface FeedbackSettings {
  showRatings: boolean
  showComments: boolean
  showSuggestions: boolean
  showReports: boolean
  showReviews: boolean
  showTestimonials: boolean
  showSurveys: boolean
  showPolls: boolean
}

export function Feedback({
  children,
  onFeedbackChange,
  className
}: FeedbackProps) {
  const [settings, setSettings] = React.useState<FeedbackSettings>({
    showRatings: true,
    showComments: true,
    showSuggestions: true,
    showReports: true,
    showReviews: true,
    showTestimonials: true,
    showSurveys: true,
    showPolls: true
  })

  const updateSetting = (key: keyof FeedbackSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFeedbackChange?.(newSettings)
  }

  return (
    <div className={cn("feedback", className)}>
      {children}
    </div>
  )
}

// Componente per feedback con indicatori visivi
interface FeedbackWithIndicatorsProps {
  children: React.ReactNode
  onFeedbackChange?: (feedback: FeedbackSettings) => void
  showIndicators?: boolean
  className?: string
}

export function FeedbackWithIndicators({
  children,
  onFeedbackChange,
  showIndicators = false,
  className
}: FeedbackWithIndicatorsProps) {
  const [settings, setSettings] = React.useState<FeedbackSettings>({
    showRatings: true,
    showComments: true,
    showSuggestions: true,
    showReports: true,
    showReviews: true,
    showTestimonials: true,
    showSurveys: true,
    showPolls: true
  })

  const updateSetting = (key: keyof FeedbackSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFeedbackChange?.(newSettings)
  }

  return (
    <div className={cn("feedback", className)}>
      {children}
      {showIndicators && (
        <div className="fixed top-4 right-4 z-50 bg-background border border-border rounded-md shadow-lg p-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <ThumbsUp className="h-4 w-4 text-blue-500" />
              <span>Feedback</span>
              <Badge variant="outline" className="text-xs">
                {Object.values(settings).filter(Boolean).length} active
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {settings.showRatings && "Ratings "}
              {settings.showComments && "Comments "}
              {settings.showSuggestions && "Suggestions "}
              {settings.showReports && "Reports "}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente per feedback con gestione dello stato
interface StatefulFeedbackProps {
  children: React.ReactNode
  onFeedbackChange?: (feedback: FeedbackSettings) => void
  onStateChange?: (state: any) => void
  className?: string
}

export function StatefulFeedback({
  children,
  onFeedbackChange,
  onStateChange,
  className
}: StatefulFeedbackProps) {
  const [settings, setSettings] = React.useState<FeedbackSettings>({
    showRatings: true,
    showComments: true,
    showSuggestions: true,
    showReports: true,
    showReviews: true,
    showTestimonials: true,
    showSurveys: true,
    showPolls: true
  })

  const updateSetting = (key: keyof FeedbackSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFeedbackChange?.(newSettings)
    
    const newState = {
      showRatings: newSettings.showRatings,
      showComments: newSettings.showComments,
      showSuggestions: newSettings.showSuggestions,
      showReports: newSettings.showReports,
      showReviews: newSettings.showReviews,
      showTestimonials: newSettings.showTestimonials,
      showSurveys: newSettings.showSurveys,
      showPolls: newSettings.showPolls
    }
    
    onStateChange?.(newState)
  }

  return (
    <div className={cn("stateful-feedback", className)}>
      {children}
    </div>
  )
}

// Componente per feedback con callback personalizzato
interface CallbackFeedbackProps {
  children: React.ReactNode
  onFeedbackChange?: (feedback: FeedbackSettings) => void
  callback?: (feedback: FeedbackSettings) => void
  className?: string
}

export function CallbackFeedback({
  children,
  onFeedbackChange,
  callback,
  className
}: CallbackFeedbackProps) {
  const [settings, setSettings] = React.useState<FeedbackSettings>({
    showRatings: true,
    showComments: true,
    showSuggestions: true,
    showReports: true,
    showReviews: true,
    showTestimonials: true,
    showSurveys: true,
    showPolls: true
  })

  const updateSetting = (key: keyof FeedbackSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFeedbackChange?.(newSettings)
    callback?.(newSettings)
  }

  return (
    <div className={cn("callback-feedback", className)}>
      {children}
    </div>
  )
}

// Componente per feedback con gestione del focus
interface FocusFeedbackProps {
  children: React.ReactNode
  onFeedbackChange?: (feedback: FeedbackSettings) => void
  onFocusChange?: (hasFocus: boolean) => void
  className?: string
}

export function FocusFeedback({
  children,
  onFeedbackChange,
  onFocusChange,
  className
}: FocusFeedbackProps) {
  const [settings, setSettings] = React.useState<FeedbackSettings>({
    showRatings: true,
    showComments: true,
    showSuggestions: true,
    showReports: true,
    showReviews: true,
    showTestimonials: true,
    showSurveys: true,
    showPolls: true
  })

  const updateSetting = (key: keyof FeedbackSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFeedbackChange?.(newSettings)
  }

  React.useEffect(() => {
    const handleFocus = () => {
      onFocusChange?.(true)
    }

    const handleBlur = () => {
      onFocusChange?.(false)
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [onFocusChange])

  return (
    <div className={cn("focus-feedback", className)}>
      {children}
    </div>
  )
}

// Componente per feedback con gestione del resize
interface ResizeFeedbackProps {
  children: React.ReactNode
  onFeedbackChange?: (feedback: FeedbackSettings) => void
  onResize?: (size: { width: number; height: number }) => void
  className?: string
}

export function ResizeFeedback({
  children,
  onFeedbackChange,
  onResize,
  className
}: ResizeFeedbackProps) {
  const [settings, setSettings] = React.useState<FeedbackSettings>({
    showRatings: true,
    showComments: true,
    showSuggestions: true,
    showReports: true,
    showReviews: true,
    showTestimonials: true,
    showSurveys: true,
    showPolls: true
  })

  const updateSetting = (key: keyof FeedbackSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onFeedbackChange?.(newSettings)
  }

  React.useEffect(() => {
    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      
      onResize?.(newSize)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onResize])

  return (
    <div className={cn("resize-feedback", className)}>
      {children}
    </div>
  )
}