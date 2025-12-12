import { useTranslation } from 'react-i18next'
import { LanguageSelector } from './language-selector'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <img 
              src="/logo.png" 
              alt="Inventing Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h3 className="text-2xl font-black mb-1">
                <span className="font-futuristic">Inventing</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('footer.tagline')}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <LanguageSelector />
            <div className="text-sm text-muted-foreground">
              © {currentYear} Inventing. {t('footer.copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

