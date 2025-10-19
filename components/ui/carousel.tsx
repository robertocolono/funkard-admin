import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
}

export function Carousel({
  children,
  className,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)

  React.useEffect(() => {
    if (isPlaying && children.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % children.length)
      }, interval)
      return () => clearInterval(timer)
    }
  }, [isPlaying, interval, children.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Carousel container */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && children.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && children.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/50"
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Play/Pause button */}
      {autoPlay && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
          >
            {isPlaying ? "Pausa" : "Riproduci"}
          </Button>
        </div>
      )}
    </div>
  )
}
