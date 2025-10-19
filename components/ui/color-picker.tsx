import * as React from "react"
import { Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
  color?: string
  onColorChange?: (color: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const predefinedColors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#000080", "#808080", "#000000",
  "#FFFFFF", "#FFB800", "#FF6A00", "#FF3B30", "#00FF00", "#00FFFF"
]

export function ColorPicker({
  color,
  onColorChange,
  placeholder = "Seleziona colore",
  disabled = false,
  className,
}: ColorPickerProps) {
  const [customColor, setCustomColor] = React.useState(color || "")

  React.useEffect(() => {
    if (customColor) {
      onColorChange?.(customColor)
    }
  }, [customColor, onColorChange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !color && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <div
            className="mr-2 h-4 w-4 rounded border"
            style={{ backgroundColor: color || "transparent" }}
          />
          {color ? color : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-color">Colore personalizzato</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="custom-color"
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Colori predefiniti</Label>
            <div className="grid grid-cols-8 gap-2">
              {predefinedColors.map((predefinedColor) => (
                <button
                  key={predefinedColor}
                  className={cn(
                    "h-8 w-8 rounded border-2 transition-all hover:scale-110",
                    color === predefinedColor ? "border-primary" : "border-border"
                  )}
                  style={{ backgroundColor: predefinedColor }}
                  onClick={() => setCustomColor(predefinedColor)}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
