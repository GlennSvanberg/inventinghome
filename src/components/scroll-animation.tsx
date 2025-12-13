import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}

// Simple wrapper that just passes through - animations handled by CSS
export function ScrollAnimation({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollAnimationProps) {
  const animationClass = {
    up: "animate-fade-in-up",
    down: "animate-fade-in-down", 
    left: "animate-fade-in-left",
    right: "animate-fade-in-right",
    fade: "animate-fade-in",
  }[direction]

  return (
    <div 
      className={cn(animationClass, className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

