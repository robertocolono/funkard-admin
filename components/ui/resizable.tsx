import * as React from "react"
import { cn } from "@/lib/utils"

interface ResizableProps {
  children: React.ReactNode
  className?: string
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  defaultWidth?: number
  defaultHeight?: number
  onResize?: (width: number, height: number) => void
}

export function Resizable({
  children,
  className,
  minWidth = 100,
  maxWidth = 800,
  minHeight = 100,
  maxHeight = 600,
  defaultWidth = 300,
  defaultHeight = 200,
  onResize,
}: ResizableProps) {
  const [dimensions, setDimensions] = React.useState({
    width: defaultWidth,
    height: defaultHeight,
  })
  const [isResizing, setIsResizing] = React.useState(false)
  const [resizeHandle, setResizeHandle] = React.useState<string | null>(null)

  const handleMouseDown = (handle: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    setResizeHandle(handle)
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeHandle) return

      const newDimensions = { ...dimensions }

      if (resizeHandle.includes("right")) {
        newDimensions.width = Math.min(
          Math.max(e.clientX - 100, minWidth),
          maxWidth
        )
      }
      if (resizeHandle.includes("left")) {
        newDimensions.width = Math.min(
          Math.max(100 - e.clientX, minWidth),
          maxWidth
        )
      }
      if (resizeHandle.includes("bottom")) {
        newDimensions.height = Math.min(
          Math.max(e.clientY - 100, minHeight),
          maxHeight
        )
      }
      if (resizeHandle.includes("top")) {
        newDimensions.height = Math.min(
          Math.max(100 - e.clientY, minHeight),
          maxHeight
        )
      }

      setDimensions(newDimensions)
      onResize?.(newDimensions.width, newDimensions.height)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeHandle(null)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, resizeHandle, dimensions, minWidth, maxWidth, minHeight, maxHeight, onResize])

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {children}
      
      {/* Resize handles */}
      <div
        className="absolute top-0 right-0 w-2 h-2 cursor-se-resize bg-primary/50 hover:bg-primary"
        onMouseDown={handleMouseDown("bottom-right")}
      />
      <div
        className="absolute top-0 left-0 w-2 h-2 cursor-sw-resize bg-primary/50 hover:bg-primary"
        onMouseDown={handleMouseDown("bottom-left")}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-2 cursor-ne-resize bg-primary/50 hover:bg-primary"
        onMouseDown={handleMouseDown("top-right")}
      />
      <div
        className="absolute bottom-0 left-0 w-2 h-2 cursor-nw-resize bg-primary/50 hover:bg-primary"
        onMouseDown={handleMouseDown("top-left")}
      />
    </div>
  )
}
