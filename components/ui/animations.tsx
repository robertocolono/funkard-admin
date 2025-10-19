"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Componente per animazioni fluide
interface AnimationProps {
  children: React.ReactNode
  variant?: "fade" | "slide" | "scale" | "rotate" | "bounce" | "pulse" | "shake" | "glow"
  duration?: number
  delay?: number
  className?: string
  onAnimationComplete?: () => void
}

export function Animation({
  children,
  variant = "fade",
  duration = 0.3,
  delay = 0,
  className,
  onAnimationComplete
}: AnimationProps) {
  const getVariant = () => {
    switch (variant) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
      case "slide":
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 }
        }
      case "rotate":
        return {
          initial: { opacity: 0, rotate: -180 },
          animate: { opacity: 1, rotate: 0 },
          exit: { opacity: 0, rotate: 180 }
        }
      case "bounce":
        return {
          initial: { opacity: 0, y: -20 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          },
          exit: { opacity: 0, y: -20 }
        }
      case "pulse":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15
            }
          },
          exit: { opacity: 0, scale: 0.8 }
        }
      case "shake":
        return {
          initial: { opacity: 0, x: -10 },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          },
          exit: { opacity: 0, x: 10 }
        }
      case "glow":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: 1, 
            scale: 1,
            boxShadow: "0 0 20px rgba(255, 184, 0, 0.3)"
          },
          exit: { opacity: 0, scale: 0.8 }
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
    }
  }

  const animationVariant = getVariant()

  return (
    <motion.div
      initial={animationVariant.initial}
      animate={animationVariant.animate}
      exit={animationVariant.exit}
      transition={{
        duration,
        delay,
        ease: "easeInOut"
      }}
      onAnimationComplete={onAnimationComplete}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// Componente per animazioni con presenza
interface AnimatedPresenceProps {
  children: React.ReactNode
  show: boolean
  variant?: "fade" | "slide" | "scale" | "rotate" | "bounce" | "pulse" | "shake" | "glow"
  duration?: number
  delay?: number
  className?: string
  onAnimationComplete?: () => void
}

export function AnimatedPresence({
  children,
  show,
  variant = "fade",
  duration = 0.3,
  delay = 0,
  className,
  onAnimationComplete
}: AnimatedPresenceProps) {
  return (
    <AnimatePresence>
      {show && (
        <Animation
          variant={variant}
          duration={duration}
          delay={delay}
          className={className}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </Animation>
      )}
    </AnimatePresence>
  )
}

// Componente per animazioni di hover
interface HoverAnimationProps {
  children: React.ReactNode
  variant?: "scale" | "rotate" | "glow" | "bounce" | "pulse"
  intensity?: number
  className?: string
}

export function HoverAnimation({
  children,
  variant = "scale",
  intensity = 1.05,
  className
}: HoverAnimationProps) {
  const getHoverVariant = () => {
    switch (variant) {
      case "scale":
        return {
          whileHover: { scale: intensity },
          whileTap: { scale: 0.95 }
        }
      case "rotate":
        return {
          whileHover: { rotate: 5 },
          whileTap: { rotate: -5 }
        }
      case "glow":
        return {
          whileHover: { 
            scale: intensity,
            boxShadow: "0 0 20px rgba(255, 184, 0, 0.3)"
          },
          whileTap: { scale: 0.95 }
        }
      case "bounce":
        return {
          whileHover: { 
            y: -5,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          },
          whileTap: { y: 0 }
        }
      case "pulse":
        return {
          whileHover: { 
            scale: intensity,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15
            }
          },
          whileTap: { scale: 0.95 }
        }
      default:
        return {
          whileHover: { scale: intensity },
          whileTap: { scale: 0.95 }
        }
    }
  }

  const hoverVariant = getHoverVariant()

  return (
    <motion.div
      {...hoverVariant}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// Componente per animazioni di loading
interface LoadingAnimationProps {
  children: React.ReactNode
  loading: boolean
  variant?: "spin" | "pulse" | "bounce" | "wave" | "dots"
  className?: string
}

export function LoadingAnimation({
  children,
  loading,
  variant = "spin",
  className
}: LoadingAnimationProps) {
  const getLoadingVariant = () => {
    switch (variant) {
      case "spin":
        return {
          animate: { rotate: 360 },
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }
        }
      case "pulse":
        return {
          animate: { 
            scale: [1, 1.1, 1],
            opacity: [1, 0.5, 1]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      case "bounce":
        return {
          animate: { 
            y: [0, -10, 0]
          },
          transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      case "wave":
        return {
          animate: { 
            x: [0, 10, 0]
          },
          transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      case "dots":
        return {
          animate: { 
            scale: [1, 1.2, 1]
          },
          transition: {
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      default:
        return {
          animate: { rotate: 360 },
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }
        }
    }
  }

  const loadingVariant = getLoadingVariant()

  if (!loading) {
    return <>{children}</>
  }

  return (
    <motion.div
      {...loadingVariant}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// Componente per animazioni di transizione
interface TransitionAnimationProps {
  children: React.ReactNode
  show: boolean
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  className?: string
}

export function TransitionAnimation({
  children,
  show,
  direction = "up",
  duration = 0.3,
  className
}: TransitionAnimationProps) {
  const getDirectionVariant = () => {
    switch (direction) {
      case "up":
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }
      case "down":
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 }
        }
      case "left":
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 }
        }
      case "right":
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20 }
        }
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }
    }
  }

  const directionVariant = getDirectionVariant()

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={directionVariant.initial}
          animate={directionVariant.animate}
          exit={directionVariant.exit}
          transition={{
            duration,
            ease: "easeInOut"
          }}
          className={cn(className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente per animazioni di stagger
interface StaggerAnimationProps {
  children: React.ReactNode[]
  stagger?: number
  duration?: number
  className?: string
}

export function StaggerAnimation({
  children,
  stagger = 0.1,
  duration = 0.3,
  className
}: StaggerAnimationProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.1
          }
        }
      }}
      className={cn(className)}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration,
                ease: "easeOut"
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
