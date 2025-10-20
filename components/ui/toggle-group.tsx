"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleGroupVariants = cva(
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

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleGroupVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center", className)}
    {...props}
  />
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleGroupVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(toggleGroupVariants({ variant, size, className }))}
    {...props}
  />
))

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem, toggleGroupVariants }

// Componente ToggleGroup personalizzato per Funkard
interface FunkardToggleGroupProps {
  children: React.ReactNode
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: "default" | "outline" | "funkard-primary" | "funkard-secondary" | "funkard-accent" | "funkard-destructive" | "funkard-ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function FunkardToggleGroup({
  children,
  type = "single",
  value,
  onValueChange,
  variant = "default",
  size = "default",
  disabled = false,
  className
}: FunkardToggleGroupProps) {
  return (
    <ToggleGroup
      {...(type === "single"
        ? { type: "single" as const }
        : { type: "multiple" as const })}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className={cn(
        "gap-1",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className
      )}
    >
      {children}
    </ToggleGroup>
  )
}

// Componente ToggleGroupItem personalizzato per Funkard
interface FunkardToggleGroupItemProps {
  children: React.ReactNode
  value: string
  variant?: "default" | "outline" | "funkard-primary" | "funkard-secondary" | "funkard-accent" | "funkard-destructive" | "funkard-ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function FunkardToggleGroupItem({
  children,
  value,
  variant = "default",
  size = "default",
  disabled = false,
  className
}: FunkardToggleGroupItemProps) {
  return (
    <ToggleGroupItem
      value={value}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        "transition-all duration-200",
        "data-[state=on]:shadow-lg data-[state=on]:scale-105",
        "hover:scale-105 active:scale-95",
        "first:rounded-l-md last:rounded-r-md",
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        className
      )}
    >
      {children}
    </ToggleGroupItem>
  )
}

// Componente per toggle group con icona
interface IconToggleGroupProps {
  options: { value: string; icon: React.ReactNode; label?: string }[]
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: "default" | "outline" | "funkard-primary" | "funkard-secondary" | "funkard-accent" | "funkard-destructive" | "funkard-ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function IconToggleGroup({
  options,
  type = "single",
  value,
  onValueChange,
  variant = "default",
  size = "icon",
  disabled = false,
  className
}: IconToggleGroupProps) {
  return (
    <FunkardToggleGroup
      type={type}
      value={value}
      onValueChange={onValueChange}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
    >
      {options.map((option) => (
        <FunkardToggleGroupItem
          key={option.value}
          value={option.value}
          variant={variant}
          size={size}
          disabled={disabled}
        >
          {option.icon}
        </FunkardToggleGroupItem>
      ))}
    </FunkardToggleGroup>
  )
}

// Componente per toggle group con testo
interface TextToggleGroupProps {
  options: { value: string; label: string }[]
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: "default" | "outline" | "funkard-primary" | "funkard-secondary" | "funkard-accent" | "funkard-destructive" | "funkard-ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function TextToggleGroup({
  options,
  type = "single",
  value,
  onValueChange,
  variant = "default",
  size = "default",
  disabled = false,
  className
}: TextToggleGroupProps) {
  return (
    <FunkardToggleGroup
      type={type}
      value={value}
      onValueChange={onValueChange}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
    >
      {options.map((option) => (
        <FunkardToggleGroupItem
          key={option.value}
          value={option.value}
          variant={variant}
          size={size}
          disabled={disabled}
        >
          {option.label}
        </FunkardToggleGroupItem>
      ))}
    </FunkardToggleGroup>
  )
}