import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyLoadProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  className?: string
}

export function LazyLoad({
  children,
  fallback,
  threshold = 0.1,
  className,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true)
          setIsLoaded(true)
        }
      },
      {
        threshold,
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold, isLoaded])

  return (
    <div ref={elementRef} className={cn("w-full", className)}>
      {isVisible ? (
        children
      ) : (
        fallback || (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )
      )}
    </div>
  )
}
