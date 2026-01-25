import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg tracking-tight">Inventing</span>
        </Link>

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
      </div>
    </header>
  )
}
