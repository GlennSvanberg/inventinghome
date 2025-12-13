interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}

// Disabled animations to fix mobile flicker - just render children
export function ScrollAnimation({ children }: ScrollAnimationProps) {
  return <>{children}</>
}

