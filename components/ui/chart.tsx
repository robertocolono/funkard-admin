import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Chart({ title, description, children, className }: ChartProps) {
  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  className?: string
}

export function ChartTooltip({ active, payload, label, className }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)}>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return null
}

interface ChartLegendProps {
  payload?: any[]
  className?: string
}

export function ChartLegend({ payload, className }: ChartLegendProps) {
  if (!payload || payload.length === 0) return null

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}
