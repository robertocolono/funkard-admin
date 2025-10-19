"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// Componente per layout responsive
interface ResponsiveProps {
  children: React.ReactNode
  breakpoints?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  className?: string
}

export function Responsive({
  children,
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  },
  className
}: ResponsiveProps) {
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`)
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px)`)
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`)
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`)

  return (
    <div className={cn("responsive", className)}>
      {children}
    </div>
  )
}

// Componente per grid responsive
interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: number
  className?: string
}

export function ResponsiveGrid({
  children,
  cols = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  },
  gap = 4,
  className
}: ResponsiveGridProps) {
  const getGridClasses = () => {
    const classes = []
    
    if (cols.default) classes.push(`grid-cols-${cols.default}`)
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`)
    
    return classes.join(" ")
  }

  return (
    <div className={cn("grid", getGridClasses(), `gap-${gap}`, className)}>
      {children}
    </div>
  )
}

// Componente per flex responsive
interface ResponsiveFlexProps {
  children: React.ReactNode
  direction?: {
    default?: "row" | "column"
    sm?: "row" | "column"
    md?: "row" | "column"
    lg?: "row" | "column"
    xl?: "row" | "column"
  }
  align?: {
    default?: "start" | "center" | "end" | "stretch"
    sm?: "start" | "center" | "end" | "stretch"
    md?: "start" | "center" | "end" | "stretch"
    lg?: "start" | "center" | "end" | "stretch"
    xl?: "start" | "center" | "end" | "stretch"
  }
  justify?: {
    default?: "start" | "center" | "end" | "between" | "around" | "evenly"
    sm?: "start" | "center" | "end" | "between" | "around" | "evenly"
    md?: "start" | "center" | "end" | "between" | "around" | "evenly"
    lg?: "start" | "center" | "end" | "between" | "around" | "evenly"
    xl?: "start" | "center" | "end" | "between" | "around" | "evenly"
  }
  gap?: number
  className?: string
}

export function ResponsiveFlex({
  children,
  direction = {
    default: "row",
    sm: "row",
    md: "row",
    lg: "row",
    xl: "row"
  },
  align = {
    default: "start",
    sm: "start",
    md: "start",
    lg: "start",
    xl: "start"
  },
  justify = {
    default: "start",
    sm: "start",
    md: "start",
    lg: "start",
    xl: "start"
  },
  gap = 4,
  className
}: ResponsiveFlexProps) {
  const getFlexClasses = () => {
    const classes = []
    
    // Direction
    if (direction.default) classes.push(`flex-${direction.default}`)
    if (direction.sm) classes.push(`sm:flex-${direction.sm}`)
    if (direction.md) classes.push(`md:flex-${direction.md}`)
    if (direction.lg) classes.push(`lg:flex-${direction.lg}`)
    if (direction.xl) classes.push(`xl:flex-${direction.xl}`)
    
    // Align
    if (align.default) classes.push(`items-${align.default}`)
    if (align.sm) classes.push(`sm:items-${align.sm}`)
    if (align.md) classes.push(`md:items-${align.md}`)
    if (align.lg) classes.push(`lg:items-${align.lg}`)
    if (align.xl) classes.push(`xl:items-${align.xl}`)
    
    // Justify
    if (justify.default) classes.push(`justify-${justify.default}`)
    if (justify.sm) classes.push(`sm:justify-${justify.sm}`)
    if (justify.md) classes.push(`md:justify-${justify.md}`)
    if (justify.lg) classes.push(`lg:justify-${justify.lg}`)
    if (justify.xl) classes.push(`xl:justify-${justify.xl}`)
    
    return classes.join(" ")
  }

  return (
    <div className={cn("flex", getFlexClasses(), `gap-${gap}`, className)}>
      {children}
    </div>
  )
}

// Componente per text responsive
interface ResponsiveTextProps {
  children: React.ReactNode
  size?: {
    default?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
    sm?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
    md?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
    lg?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
    xl?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
  }
  weight?: {
    default?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
    sm?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
    md?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
    lg?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
    xl?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
  }
  className?: string
}

export function ResponsiveText({
  children,
  size = {
    default: "base",
    sm: "base",
    md: "base",
    lg: "base",
    xl: "base"
  },
  weight = {
    default: "normal",
    sm: "normal",
    md: "normal",
    lg: "normal",
    xl: "normal"
  },
  className
}: ResponsiveTextProps) {
  const getTextClasses = () => {
    const classes = []
    
    // Size
    if (size.default) classes.push(`text-${size.default}`)
    if (size.sm) classes.push(`sm:text-${size.sm}`)
    if (size.md) classes.push(`md:text-${size.md}`)
    if (size.lg) classes.push(`lg:text-${size.lg}`)
    if (size.xl) classes.push(`xl:text-${size.xl}`)
    
    // Weight
    if (weight.default) classes.push(`font-${weight.default}`)
    if (weight.sm) classes.push(`sm:font-${weight.sm}`)
    if (weight.md) classes.push(`md:font-${weight.md}`)
    if (weight.lg) classes.push(`lg:font-${weight.lg}`)
    if (weight.xl) classes.push(`xl:font-${weight.xl}`)
    
    return classes.join(" ")
  }

  return (
    <span className={cn(getTextClasses(), className)}>
      {children}
    </span>
  )
}

// Componente per spacing responsive
interface ResponsiveSpacingProps {
  children: React.ReactNode
  padding?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  margin?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  className?: string
}

export function ResponsiveSpacing({
  children,
  padding = {
    default: 4,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10
  },
  margin = {
    default: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0
  },
  className
}: ResponsiveSpacingProps) {
  const getSpacingClasses = () => {
    const classes = []
    
    // Padding
    if (padding.default) classes.push(`p-${padding.default}`)
    if (padding.sm) classes.push(`sm:p-${padding.sm}`)
    if (padding.md) classes.push(`md:p-${padding.md}`)
    if (padding.lg) classes.push(`lg:p-${padding.lg}`)
    if (padding.xl) classes.push(`xl:p-${padding.xl}`)
    
    // Margin
    if (margin.default) classes.push(`m-${margin.default}`)
    if (margin.sm) classes.push(`sm:m-${margin.sm}`)
    if (margin.md) classes.push(`md:m-${margin.md}`)
    if (margin.lg) classes.push(`lg:m-${margin.lg}`)
    if (margin.xl) classes.push(`xl:m-${margin.xl}`)
    
    return classes.join(" ")
  }

  return (
    <div className={cn(getSpacingClasses(), className)}>
      {children}
    </div>
  )
}

// Componente per visibility responsive
interface ResponsiveVisibilityProps {
  children: React.ReactNode
  show?: {
    default?: boolean
    sm?: boolean
    md?: boolean
    lg?: boolean
    xl?: boolean
  }
  hide?: {
    default?: boolean
    sm?: boolean
    md?: boolean
    lg?: boolean
    xl?: boolean
  }
  className?: string
}

export function ResponsiveVisibility({
  children,
  show = {
    default: true,
    sm: true,
    md: true,
    lg: true,
    xl: true
  },
  hide = {
    default: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
  },
  className
}: ResponsiveVisibilityProps) {
  const getVisibilityClasses = () => {
    const classes = []
    
    // Show
    if (!show.default) classes.push("hidden")
    if (!show.sm) classes.push("sm:hidden")
    if (!show.md) classes.push("md:hidden")
    if (!show.lg) classes.push("lg:hidden")
    if (!show.xl) classes.push("xl:hidden")
    
    // Hide
    if (hide.default) classes.push("hidden")
    if (hide.sm) classes.push("sm:hidden")
    if (hide.md) classes.push("md:hidden")
    if (hide.lg) classes.push("lg:hidden")
    if (hide.xl) classes.push("xl:hidden")
    
    return classes.join(" ")
  }

  return (
    <div className={cn(getVisibilityClasses(), className)}>
      {children}
    </div>
  )
}

// Componente per container responsive
interface ResponsiveContainerProps {
  children: React.ReactNode
  maxWidth?: {
    default?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
    sm?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
    md?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
    lg?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
    xl?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
  }
  center?: boolean
  className?: string
}

export function ResponsiveContainer({
  children,
  maxWidth = {
    default: "full",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl"
  },
  center = true,
  className
}: ResponsiveContainerProps) {
  const getContainerClasses = () => {
    const classes = []
    
    // Max width
    if (maxWidth.default) classes.push(`max-w-${maxWidth.default}`)
    if (maxWidth.sm) classes.push(`sm:max-w-${maxWidth.sm}`)
    if (maxWidth.md) classes.push(`md:max-w-${maxWidth.md}`)
    if (maxWidth.lg) classes.push(`lg:max-w-${maxWidth.lg}`)
    if (maxWidth.xl) classes.push(`xl:max-w-${maxWidth.xl}`)
    
    // Center
    if (center) classes.push("mx-auto")
    
    return classes.join(" ")
  }

  return (
    <div className={cn("w-full", getContainerClasses(), className)}>
      {children}
    </div>
  )
}
