import * as React from "react"
import { cn } from "@/lib/utils"

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

// Skeleton variants
const skeletonVariants = {
  text: "h-4 w-full",
  title: "h-6 w-3/4",
  subtitle: "h-4 w-1/2",
  avatar: "h-10 w-10 rounded-full",
  button: "h-10 w-24",
  card: "h-32 w-full",
  line: "h-1 w-full",
  circle: "h-8 w-8 rounded-full",
}

export { Skeleton, skeletonVariants }
