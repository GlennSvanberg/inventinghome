import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

export function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg tracking-tight">Inventing</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('playground')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.playground')}
          </button>
          <button 
            onClick={() => scrollToSection('logbook')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.logbook')}
          </button>
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.about')}
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => scrollToSection('playground')}>
                {t('nav.playground')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection('logbook')}>
                {t('nav.logbook')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(false)} asChild>
                <Link to="/">{t('nav.about')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
