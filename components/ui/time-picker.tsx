import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TimePickerProps {
  time?: string
  onTimeChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder = "Seleziona orario",
  disabled = false,
  className,
}: TimePickerProps) {
  const [hours, setHours] = React.useState(time?.split(":")[0] || "")
  const [minutes, setMinutes] = React.useState(time?.split(":")[1] || "")

  React.useEffect(() => {
    if (hours && minutes) {
      onTimeChange?.(`${hours}:${minutes}`)
    }
  }, [hours, minutes, onTimeChange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !time && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Ore</Label>
            <Input
              id="hours"
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(e.target.value.padStart(2, "0"))}
              placeholder="00"
              className="w-20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minuti</Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value.padStart(2, "0"))}
              placeholder="00"
              className="w-20"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
