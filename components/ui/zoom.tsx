"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize } from "lucide-react"

interface ZoomProps {
  children: React.ReactNode
  minZoom?: number
  maxZoom?: number
  initialZoom?: number
  step?: number
  className?: string
  showControls?: boolean
  allowFullscreen?: boolean
  onZoomChange?: (zoom: number) => void
}

export function Zoom({
  children,
  minZoom = 0.1,
  maxZoom = 5,
  initialZoom = 1,
  step = 0.1,
  className,
  showControls = true,
  allowFullscreen = true,
  onZoomChange
}: ZoomProps) {
  const [zoom, setZoom] = React.useState(initialZoom)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + step, maxZoom)
    setZoom(newZoom)
    onZoomChange?.(newZoom)
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - step, minZoom)
    setZoom(newZoom)
    onZoomChange?.(newZoom)
  }

  const handleReset = () => {
    setZoom(initialZoom)
    onZoomChange?.(initialZoom)
  }

  const handleFullscreen = () => {
    if (!allowFullscreen) return
    
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        isFullscreen && "fixed inset-0 z-50 bg-background",
        className
      )}
    >
      {/* Zoomed Content */}
      <div
        className="origin-top-left transition-transform duration-200"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left"
        }}
      >
        {children}
      </div>

      {/* Zoom Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= minZoom}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                
                <div className="px-2 py-1 text-sm font-medium min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= maxZoom}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                {allowFullscreen && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Componente per zoom con slider
interface ZoomSliderProps {
  children: React.ReactNode
  minZoom?: number
  maxZoom?: number
  initialZoom?: number
  className?: string
  showControls?: boolean
  allowFullscreen?: boolean
  onZoomChange?: (zoom: number) => void
}

export function ZoomSlider({
  children,
  minZoom = 0.1,
  maxZoom = 5,
  initialZoom = 1,
  className,
  showControls = true,
  allowFullscreen = true,
  onZoomChange
}: ZoomSliderProps) {
  const [zoom, setZoom] = React.useState(initialZoom)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
    onZoomChange?.(newZoom)
  }

  const handleFullscreen = () => {
    if (!allowFullscreen) return
    
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        isFullscreen && "fixed inset-0 z-50 bg-background",
        className
      )}
    >
      {/* Zoomed Content */}
      <div
        className="origin-top-left transition-transform duration-200"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left"
        }}
      >
        {children}
      </div>

      {/* Zoom Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <ZoomOut className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="range"
                    min={minZoom}
                    max={maxZoom}
                    step="0.1"
                    value={zoom}
                    onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                    className="w-24"
                  />
                  <ZoomIn className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="px-2 py-1 text-sm font-medium min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </div>
                
                {allowFullscreen && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
