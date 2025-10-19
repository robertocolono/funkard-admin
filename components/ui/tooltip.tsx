"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

// Componente Tooltip personalizzato per Funkard
interface FunkardTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
  className?: string
}

export function FunkardTooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 200,
  className
}: FunkardTooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(
            "bg-neutral-900 border-neutral-700 text-white shadow-lg",
            className
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Componente per tooltip con icona
interface IconTooltipProps {
  icon: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function IconTooltip({
  icon,
  content,
  side = "top",
  className
}: IconTooltipProps) {
  return (
    <FunkardTooltip content={content} side={side} className={className}>
      <div className="inline-flex items-center justify-center w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help">
        {icon}
      </div>
    </FunkardTooltip>
  )
}

// Componente per tooltip con badge
interface BadgeTooltipProps {
  badge: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function BadgeTooltip({
  badge,
  content,
  side = "top",
  className
}: BadgeTooltipProps) {
  return (
    <FunkardTooltip content={content} side={side} className={className}>
      <div className="inline-block">
        {badge}
      </div>
    </FunkardTooltip>
  )
}