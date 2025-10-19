import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface InfiniteScrollProps {
  children: React.ReactNode
  hasMore: boolean
  isLoading: boolean
  onLoadMore: () => void
  threshold?: number
  className?: string
}

export function InfiniteScroll({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 100,
  className,
}: InfiniteScrollProps) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const observerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: `${threshold}px`,
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, isLoading, onLoadMore, threshold])

  return (
    <div className={cn("space-y-4", className)}>
      {children}
      
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-4">
          {isLoading ? (
            <div className="space-y-2 w-full max-w-md">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Scroll per caricare più contenuti...
            </div>
          )}
        </div>
      )}
    </div>
  )
}
