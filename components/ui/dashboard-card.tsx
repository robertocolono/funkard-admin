"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  Target,
  Award,
  Star,
  Activity,
  Zap,
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Warning,
  Error,
  Success
} from "lucide-react"

// Componente per card dashboard accattivanti
interface DashboardCardProps {
  title: string
  description?: string
  value: string | number
  trend?: {
    value: number
    label: string
  }
  icon?: React.ReactNode
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray" | "funkard"
  variant?: "default" | "compact" | "detailed" | "minimal"
  className?: string
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
}

export function DashboardCard({
  title,
  description,
  value,
  trend,
  icon,
  color = "blue",
  variant = "default",
  className,
  onClick,
  loading = false,
  disabled = false
}: DashboardCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-700 dark:text-green-300",
          icon: "text-green-600 dark:text-green-400",
          value: "text-green-900 dark:text-green-100",
          accent: "bg-green-500"
        }
      case "red":
        return {
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800",
          text: "text-red-700 dark:text-red-300",
          icon: "text-red-600 dark:text-red-400",
          value: "text-red-900 dark:text-red-100",
          accent: "bg-red-500"
        }
      case "yellow":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-900/20",
          border: "border-yellow-200 dark:border-yellow-800",
          text: "text-yellow-700 dark:text-yellow-300",
          icon: "text-yellow-600 dark:text-yellow-400",
          value: "text-yellow-900 dark:text-yellow-100",
          accent: "bg-yellow-500"
        }
      case "purple":
        return {
          bg: "bg-purple-50 dark:bg-purple-900/20",
          border: "border-purple-200 dark:border-purple-800",
          text: "text-purple-700 dark:text-purple-300",
          icon: "text-purple-600 dark:text-purple-400",
          value: "text-purple-900 dark:text-purple-100",
          accent: "bg-purple-500"
        }
      case "gray":
        return {
          bg: "bg-gray-50 dark:bg-gray-900",
          border: "border-gray-200 dark:border-gray-800",
          text: "text-gray-700 dark:text-gray-300",
          icon: "text-gray-600 dark:text-gray-400",
          value: "text-gray-900 dark:text-white",
          accent: "bg-gray-500"
        }
      case "funkard":
        return {
          bg: "bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20",
          border: "border-primary/20 dark:border-primary/30",
          text: "text-primary dark:text-primary",
          icon: "text-primary dark:text-primary",
          value: "text-primary dark:text-primary",
          accent: "bg-primary"
        }
      default: // blue
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-700 dark:text-blue-300",
          icon: "text-blue-600 dark:text-blue-400",
          value: "text-blue-900 dark:text-blue-100",
          accent: "bg-blue-500"
        }
    }
  }

  const getTrendIcon = () => {
    if (!trend) return null
    
    if (trend.value > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (trend.value < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return "text-gray-500"
    
    if (trend.value > 0) return "text-green-600"
    if (trend.value < 0) return "text-red-600"
    return "text-gray-500"
  }

  const colors = getColorClasses()

  if (loading) {
    return (
      <Card className={cn("card-hover glass", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="loading-skeleton h-4 w-24 mb-2"></div>
              <div className="loading-skeleton h-8 w-16 mb-2"></div>
              <div className="loading-skeleton h-3 w-32"></div>
            </div>
            <div className="loading-skeleton h-8 w-8 rounded ml-4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "compact") {
    return (
      <Card 
        className={cn(
          "card-hover glass group cursor-pointer",
          colors.bg,
          colors.border,
          "border-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={cn("text-sm font-medium", colors.text)}>
                {title}
              </p>
              <p className={cn("text-2xl font-bold mt-1", colors.value)}>
                {value}
              </p>
            </div>
            
            {icon && (
              <div className={cn("ml-4 transition-all duration-200 group-hover:scale-110", colors.icon)}>
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "minimal") {
    return (
      <Card 
        className={cn(
          "card-hover glass group cursor-pointer",
          colors.bg,
          colors.border,
          "border-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={cn("text-xs font-medium", colors.text)}>
                {title}
              </p>
              <p className={cn("text-lg font-bold", colors.value)}>
                {value}
              </p>
            </div>
            
            {icon && (
              <div className={cn("ml-2", colors.icon)}>
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "detailed") {
    return (
      <Card 
        className={cn(
          "card-hover glass group cursor-pointer",
          colors.bg,
          colors.border,
          "border-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className={cn("text-lg", colors.text)}>
              {title}
            </CardTitle>
            {icon && (
              <div className={cn("transition-all duration-200 group-hover:scale-110", colors.icon)}>
                {icon}
              </div>
            )}
          </div>
          {description && (
            <CardDescription className={cn("text-sm", colors.text)}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <p className={cn("text-3xl font-bold", colors.value)}>
              {value}
            </p>
            
            {trend && (
              <div className="flex items-center space-x-2">
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card 
      className={cn(
        "card-hover glass group cursor-pointer",
        colors.bg,
        colors.border,
        "border-2",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={cn("text-sm font-medium transition-colors group-hover:text-foreground", colors.text)}>
              {title}
            </p>
            <p className={cn("text-2xl font-bold mt-1", colors.value)}>
              {value}
            </p>
            {description && (
              <p className={cn("text-xs mt-1", colors.text)}>
                {description}
              </p>
            )}
          </div>
          
          {icon && (
            <div className={cn("ml-4 transition-all duration-200 group-hover:scale-110", colors.icon)}>
              {icon}
            </div>
          )}
        </div>
        
        {trend && (
          <div className="flex items-center mt-3">
            {getTrendIcon()}
            <span className={cn("text-xs font-medium ml-1", getTrendColor())}>
              {trend.value > 0 ? "+" : ""}{trend.value}% {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Varianti predefinite per casi comuni
export function NotificationCard({ count, trend }: { count: number; trend?: number }) {
  return (
    <DashboardCard
      title="Notifiche"
      value={count}
      description="Notifiche totali"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="blue"
      icon={<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">🔔</div>}
    />
  )
}

export function UserCard({ count, trend }: { count: number; trend?: number }) {
  return (
    <DashboardCard
      title="Utenti"
      value={count}
      description="Utenti registrati"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="green"
      icon={<div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">👥</div>}
    />
  )
}

export function ErrorCard({ count, trend }: { count: number; trend?: number }) {
  return (
    <DashboardCard
      title="Errori"
      value={count}
      description="Errori rilevati"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="red"
      icon={<div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">⚠️</div>}
    />
  )
}

export function SystemCard({ status, lastUpdate }: { status: string; lastUpdate: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "success":
      case "ok":
        return "green"
      case "error":
      case "failed":
        return "red"
      case "warning":
        return "yellow"
      default:
        return "gray"
    }
  }

  return (
    <DashboardCard
      title="Stato Sistema"
      value={status}
      description={`Ultimo aggiornamento: ${lastUpdate}`}
      color={getStatusColor()}
      icon={<div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">🔧</div>}
    />
  )
}

export function PerformanceCard({ score, trend }: { score: number; trend?: number }) {
  return (
    <DashboardCard
      title="Performance"
      value={`${score}%`}
      description="Score di performance"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="funkard"
      icon={<Zap className="h-8 w-8" />}
    />
  )
}

export function SecurityCard({ threats, trend }: { threats: number; trend?: number }) {
  return (
    <DashboardCard
      title="Sicurezza"
      value={threats}
      description="Minacce rilevate"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="red"
      icon={<Shield className="h-8 w-8" />}
    />
  )
}

export function MonitoringCard({ alerts, trend }: { alerts: number; trend?: number }) {
  return (
    <DashboardCard
      title="Monitoring"
      value={alerts}
      description="Allerte attive"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="yellow"
      icon={<Activity className="h-8 w-8" />}
    />
  )
}
