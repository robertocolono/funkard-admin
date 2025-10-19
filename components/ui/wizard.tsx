"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from "lucide-react"

interface WizardStep {
  id: string
  title: string
  description?: string
  status: "completed" | "current" | "upcoming"
  content: React.ReactNode
}

interface WizardProps {
  steps: WizardStep[]
  currentStep: string
  onStepChange: (stepId: string) => void
  onComplete?: () => void
  className?: string
  showProgress?: boolean
  allowBackNavigation?: boolean
}

export function Wizard({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  className,
  showProgress = true,
  allowBackNavigation = true
}: WizardProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)
  const isLastStep = currentStepIndex === steps.length - 1
  const isFirstStep = currentStepIndex === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.()
    } else {
      const nextStep = steps[currentStepIndex + 1]
      onStepChange(nextStep.id)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep && allowBackNavigation) {
      const previousStep = steps[currentStepIndex - 1]
      onStepChange(previousStep.id)
    }
  }

  const getStepStatus = (step: WizardStep, index: number) => {
    if (step.status === "completed") return "completed"
    if (step.status === "current") return "current"
    if (index < currentStepIndex) return "completed"
    if (index === currentStepIndex) return "current"
    return "upcoming"
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Header */}
      {showProgress && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const status = getStepStatus(step, index)
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        status === "completed" && "bg-green-500 text-white",
                        status === "current" && "bg-primary text-primary-foreground",
                        status === "upcoming" && "bg-muted text-muted-foreground"
                      )}
                    >
                      {status === "completed" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium">{step.title}</p>
                      {step.description && (
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      )}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-muted mx-4" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStepIndex]?.title}</CardTitle>
          {steps[currentStepIndex]?.description && (
            <CardDescription>{steps[currentStepIndex].description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {steps[currentStepIndex]?.content}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!allowBackNavigation || isFirstStep}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Indietro
        </Button>

        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            Passo {currentStepIndex + 1} di {steps.length}
          </Badge>
        </div>

        <Button onClick={handleNext}>
          {isLastStep ? "Completa" : "Avanti"}
          {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}

// Componente per wizard step
interface WizardStepProps {
  children: React.ReactNode
  className?: string
}

export function WizardStep({ children, className }: WizardStepProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  )
}

// Componente per wizard step header
interface WizardStepHeaderProps {
  title: string
  description?: string
  className?: string
}

export function WizardStepHeader({ title, description, className }: WizardStepHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// Componente per wizard step content
interface WizardStepContentProps {
  children: React.ReactNode
  className?: string
}

export function WizardStepContent({ children, className }: WizardStepContentProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  )
}

// Componente per wizard step footer
interface WizardStepFooterProps {
  children: React.ReactNode
  className?: string
}

export function WizardStepFooter({ children, className }: WizardStepFooterProps) {
  return (
    <div className={cn("flex items-center justify-between pt-4 border-t", className)}>
      {children}
    </div>
  )
}