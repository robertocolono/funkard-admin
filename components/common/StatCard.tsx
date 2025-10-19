"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray" | "funkard";
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  description,
  trend,
  color = "blue",
  icon,
  className = "",
  loading = false,
}: StatCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: "text-green-600",
          value: "text-green-900",
        };
      case "red":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: "text-red-600",
          value: "text-red-900",
        };
      case "yellow":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-700",
          icon: "text-yellow-600",
          value: "text-yellow-900",
        };
      case "purple":
        return {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-700",
          icon: "text-purple-600",
          value: "text-purple-900",
        };
      case "gray":
        return {
          bg: "bg-gray-50 dark:bg-gray-900",
          border: "border-gray-200 dark:border-gray-800",
          text: "text-gray-700 dark:text-gray-300",
          icon: "text-gray-600 dark:text-gray-400",
          value: "text-gray-900 dark:text-white",
        };
      case "funkard":
        return {
          bg: "bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20",
          border: "border-primary/20 dark:border-primary/30",
          text: "text-primary dark:text-primary",
          icon: "text-primary dark:text-primary",
          value: "text-primary dark:text-primary",
        };
      default: // blue
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-700 dark:text-blue-300",
          icon: "text-blue-600 dark:text-blue-400",
          value: "text-blue-900 dark:text-blue-100",
        };
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.value > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend.value < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return "text-gray-500";
    
    if (trend.value > 0) return "text-green-600";
    if (trend.value < 0) return "text-red-600";
    return "text-gray-500";
  };

  const colors = getColorClasses();

  if (loading) {
    return (
      <Card className={cn("card-hover glass", className)}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="loading-skeleton h-4 w-24 mb-2"></div>
              <div className="loading-skeleton h-8 w-16 mb-2"></div>
              <div className="loading-skeleton h-3 w-32"></div>
            </div>
            <div className="loading-skeleton h-8 w-8 rounded ml-4"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={cn("card-hover glass group", colors.bg, colors.border, "border-2", className)}>
        <div className="p-6">
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
        </div>
      </Card>
    </motion.div>
  );
}

// Varianti predefinite per casi comuni
export function NotificationStatCard({ count, trend }: { count: number; trend?: number }) {
  return (
    <StatCard
      title="Notifiche"
      value={count}
      description="Notifiche totali"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="blue"
      icon={<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">🔔</div>}
    />
  );
}

export function UserStatCard({ count, trend }: { count: number; trend?: number }) {
  return (
    <StatCard
      title="Utenti"
      value={count}
      description="Utenti registrati"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="green"
      icon={<div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">👥</div>}
    />
  );
}

export function ErrorStatCard({ count, trend }: { count: number; trend?: number }) {
  return (
    <StatCard
      title="Errori"
      value={count}
      description="Errori rilevati"
      trend={trend ? { value: trend, label: "vs scorsa settimana" } : undefined}
      color="red"
      icon={<div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">⚠️</div>}
    />
  );
}

export function SystemStatCard({ status, lastUpdate }: { status: string; lastUpdate: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "success":
      case "ok":
        return "green";
      case "error":
      case "failed":
        return "red";
      case "warning":
        return "yellow";
      default:
        return "gray";
    }
  };

  return (
    <StatCard
      title="Stato Sistema"
      value={status}
      description={`Ultimo aggiornamento: ${lastUpdate}`}
      color={getStatusColor()}
      icon={<div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">🔧</div>}
    />
  );
}
