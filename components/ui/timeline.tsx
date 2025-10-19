import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, AlertTriangle, Info } from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  description?: string
  timestamp: string
  status: "completed" | "failed" | "pending" | "warning" | "info"
  metadata?: Record<string, any>
}

interface TimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function Timeline({ events, className }: TimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed": return <XCircle className="h-4 w-4 text-red-500" />
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />
      case "warning": return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "info": return <Info className="h-4 w-4 text-blue-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success"
      case "failed": return "error"
      case "pending": return "warning"
      case "warning": return "warning"
      case "info": return "info"
      default: return "outline"
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {/* Timeline line */}
          {index < events.length - 1 && (
            <div className="absolute left-4 top-8 w-0.5 h-full bg-border" />
          )}
          
          {/* Event content */}
          <div className="flex items-start space-x-4">
            {/* Status icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
              {getStatusIcon(event.status)}
            </div>
            
            {/* Event details */}
            <div className="flex-1 min-w-0">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Metadata */}
                  {event.metadata && Object.keys(event.metadata).length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(event.metadata).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className="font-medium text-muted-foreground">
                              {key}:
                            </span>
                            <span className="ml-1 text-foreground">
                              {typeof value === "object" ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente per timeline verticale compatta
export function TimelineCompact({ events, className }: TimelineProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
            {getStatusIcon(event.status)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium truncate">
                {event.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {event.timestamp}
              </span>
            </div>
            {event.description && (
              <p className="text-xs text-muted-foreground truncate">
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Helper function per ottenere l'icona dello status
function getStatusIcon(status: string) {
  switch (status) {
    case "completed": return <CheckCircle className="h-3 w-3 text-green-500" />
    case "failed": return <XCircle className="h-3 w-3 text-red-500" />
    case "pending": return <Clock className="h-3 w-3 text-yellow-500" />
    case "warning": return <AlertTriangle className="h-3 w-3 text-orange-500" />
    case "info": return <Info className="h-3 w-3 text-blue-500" />
    default: return <Clock className="h-3 w-3 text-gray-500" />
  }
}