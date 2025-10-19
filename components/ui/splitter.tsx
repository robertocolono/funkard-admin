import * as React from "react"
import { cn } from "@/lib/utils"

interface SplitterProps {
  children: [React.ReactNode, React.ReactNode]
  direction?: "horizontal" | "vertical"
  defaultSize?: number
  minSize?: number
  maxSize?: number
  className?: string
}

export function Splitter({
  children,
  direction = "horizontal",
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  className,
}: SplitterProps) {
  const [size, setSize] = React.useState(defaultSize)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const container = document.querySelector("[data-splitter-container]") as HTMLElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      const newSize = direction === "horizontal"
        ? ((e.clientX - rect.left) / rect.width) * 100
        : ((e.clientY - rect.top) / rect.height) * 100

      const clampedSize = Math.min(Math.max(newSize, minSize), maxSize)
      setSize(clampedSize)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, direction, minSize, maxSize])

  return (
    <div
      data-splitter-container
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
    >
      <div
        className={cn(
          "flex-shrink-0",
          direction === "horizontal" ? "w-full" : "h-full"
        )}
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${size}%`,
        }}
      >
        {children[0]}
      </div>
      
      <div
        className={cn(
          "flex-shrink-0 bg-border hover:bg-primary/20 transition-colors",
          direction === "horizontal" ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"
        )}
        onMouseDown={handleMouseDown}
      />
      
      <div
        className={cn(
          "flex-shrink-0",
          direction === "horizontal" ? "w-full" : "h-full"
        )}
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${100 - size}%`,
        }}
      >
        {children[1]}
      </div>
    </div>
  )
}
