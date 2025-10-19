import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface StepperStep {
  id: string
  title: string
  description?: string
  completed?: boolean
  current?: boolean
  disabled?: boolean
}

interface StepperProps {
  steps: StepperStep[]
  onStepClick?: (step: StepperStep) => void
  className?: string
}

export function Stepper({ steps, onStepClick, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div className="flex items-center">
              <button
                onClick={() => onStepClick?.(step)}
                disabled={step.disabled}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  step.completed && "bg-primary border-primary text-primary-foreground",
                  step.current && "border-primary bg-primary/10 text-primary",
                  !step.completed && !step.current && "border-muted-foreground text-muted-foreground",
                  step.disabled && "opacity-50 cursor-not-allowed",
                  !step.disabled && "hover:border-primary/50"
                )}
              >
                {step.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>
            </div>
            
            {/* Step content */}
            <div className="ml-4 min-w-0 flex-1">
              <h3 className={cn(
                "text-sm font-medium",
                step.completed && "text-primary",
                step.current && "text-primary",
                !step.completed && !step.current && "text-muted-foreground"
              )}>
                {step.title}
              </h3>
              {step.description && (
                <p className="text-xs text-muted-foreground">{step.description}</p>
              )}
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="ml-4 h-0.5 w-8 bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
