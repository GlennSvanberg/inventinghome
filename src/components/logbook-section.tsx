import { useTranslation } from 'react-i18next'

export function LogbookSection() {
  const { t } = useTranslation()

  return (
    <section id="logbook" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('logbook.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('logbook.description')}</p>
        </div>

        <div className="border border-dashed border-border rounded-lg p-12 text-center bg-muted/10">
          <p className="text-muted-foreground italic">
            {t('logbook.empty')}
          </p>
        </div>
      </div>
    </section>
  )
}
