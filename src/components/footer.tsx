import { useTranslation } from 'react-i18next'
import { LanguageSelector } from './language-selector'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-14 px-6 border-t border-border/50 bg-background relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-18 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Inventing Logo" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="text-2xl font-black leading-none">
                  <span className="font-display">Inventing</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{t('footer.tagline')}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-start md:items-end gap-4">
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

