"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        "funkard-primary": "bg-primary text-primary-foreground hover:bg-primary/90",
        "funkard-secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        "funkard-accent": "bg-accent text-accent-foreground hover:bg-accent/90",
        "funkard-destructive": "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "funkard-ghost": "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

// Componente Toggle personalizzato per Funkard
interface FunkardToggleProps {
  children: React.ReactNode
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: "default" | "outline" | "funkard-primary" | "funkard-secondary" | "funkard-accent" | "funkard-destructive" | "funkard-ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function FunkardToggle({
  children,
  pressed = false,
  onPressedChange,
  variant = "default",
  size = "default",
  disabled = false,
  className
}: FunkardToggleProps) {
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={onPressedChange}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        "transition-all duration-200",
        "data-[state=on]:shadow-lg data-[state=on]:scale-105",
        "hover:scale-105 active:scale-95",
        className
      )}
    >
      {children}
    </Toggle>
  )
}

// Componente Toggle con icona
interface IconToggleProps {
  icon: React.ReactNode
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: "default" | "outline" | "funkard-primary" | "funkard-secondary" | "funkard-accent" | "funkard-destructive" | "funkard-ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function IconToggle({
  icon,
  pressed = false,
  onPressedChange,
  variant = "default",
  size = "icon",
  disabled = false,
  className
}: IconToggleProps) {
  return (
    <FunkardToggle
      pressed={pressed}
      onPressedChange={onPressedChange}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        "rounded-full",
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        "data-[state=on]:shadow-lg data-[state=on]:scale-110",
        className
      )}
    >
      {icon}
    </FunkardToggle>
  )
}

// Componente Toggle con testo
interface TextToggleProps {
  text: string
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: "default" | "outline" | "funkard-primary" | "funkard-secondary" | "funkard-accent" | "funkard-destructive" | "funkard-ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function TextToggle({
  text,
  pressed = false,
  onPressedChange,
  variant = "default",
  size = "default",
  disabled = false,
  className
}: TextToggleProps) {
  return (
    <FunkardToggle
      pressed={pressed}
      onPressedChange={onPressedChange}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        "font-medium",
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        "data-[state=on]:shadow-lg",
        className
      )}
    >
      {text}
    </FunkardToggle>
  )
}