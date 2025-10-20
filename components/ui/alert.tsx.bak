import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 [&>svg]:text-green-500",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 [&>svg]:text-yellow-500",
        info:
          "border-blue-500/50 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 [&>svg]:text-blue-500",
        funkard:
          "border-primary/50 text-primary bg-gradient-to-r from-primary/10 to-secondary/10 [&>svg]:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

// Pre-configured alert components
const AlertSuccess = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Alert
    ref={ref}
    variant="success"
    className={className}
    {...props}
  >
    <CheckCircle className="h-4 w-4" />
    {children}
  </Alert>
))
AlertSuccess.displayName = "AlertSuccess"

const AlertWarning = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Alert
    ref={ref}
    variant="warning"
    className={className}
    {...props}
  >
    <AlertTriangle className="h-4 w-4" />
    {children}
  </Alert>
))
AlertWarning.displayName = "AlertWarning"

const AlertError = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Alert
    ref={ref}
    variant="destructive"
    className={className}
    {...props}
  >
    <XCircle className="h-4 w-4" />
    {children}
  </Alert>
))
AlertError.displayName = "AlertError"

const AlertInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Alert
    ref={ref}
    variant="info"
    className={className}
    {...props}
  >
    <Info className="h-4 w-4" />
    {children}
  </Alert>
))
AlertInfo.displayName = "AlertInfo"

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertSuccess,
  AlertWarning,
  AlertError,
  AlertInfo,
}
