import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'

export function PlaygroundGrid() {
  const { t } = useTranslation()

  const projects = [
    { id: 'allaheterglenn', url: 'https://allaheterglenn.se' },
    { id: 'qrbutik', url: 'https://qrbutik.se' },
    { id: 'boario', url: 'https://boario.io' },
    { id: 'trackaton', url: 'https://trackaton.com' },
    { id: 'glennerator', url: 'https://glennerator.se' },
    { id: 'malasidor', url: 'https://målasidor.se' },
    { id: 'grzaniec', url: 'https://grzaniec.se' },
    { id: 'next', url: '#' },
  ]

  return (
    <section id="playground" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('playground.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('playground.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a 
              key={project.id} 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group h-full"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {t(`playground.projects.${project.id}.title`)}
                    </CardTitle>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t(`playground.projects.${project.id}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
