"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { SunIcon, MoonIcon } from "lucide-react"

export function ThemeToggle() {
  // Initialize theme from already-applied class (set by blocking script)
  // Use lazy initializer to avoid calling getInitialTheme on every render
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    return document.documentElement.classList.contains("dark") ? "dark" : "light"
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Sync state with actual DOM state (already set by blocking script)
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    setTheme(currentTheme)
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement
    if (newTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9"
        aria-label="Toggle theme"
      >
        <SunIcon className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </Button>
  )
}

