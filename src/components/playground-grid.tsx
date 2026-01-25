import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PlaygroundGrid() {
  const { t } = useTranslation()

  const projects = [
    { id: 'allaheterglenn', url: 'https://allaheterglenn.se' },
    { id: 'qrbutik', url: 'https://qrbutik.se' },
    { id: 'boardio', url: 'https://boardio.io' },
    { id: 'trackaton', url: 'https://trackaton.com' },
    { id: 'glennerator', url: 'https://glennsvanberg.se' },
    { id: 'malasidor', url: 'https://målasidor.se' },
    { id: 'grzaniec', url: 'https://grzaniec.se' },
    { id: 'next', url: '#' },
  ]

  return (
    <section id="playground" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 break-words">{t('playground.title')}</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed break-words">{t('playground.description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors duration-300">
              <div className="flex flex-col md:grid md:grid-cols-12 gap-0">
                <div className={`p-6 md:p-10 flex flex-col justify-center order-2 md:col-span-8 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold break-words leading-tight">
                      {t(`playground.projects.${project.id}.title`)}
                    </h3>
                    <div className="flex">
                      <Badge variant="secondary" className="font-mono text-xs whitespace-nowrap">
                         {t(`playground.projects.${project.id}.tech`)}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl break-words">
                    {t(`playground.projects.${project.id}.description`)}
                  </p>
                  
                  <div>
                    <Button asChild variant="outline" className="group w-full sm:w-auto justify-center">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        Besök projektet
                        <ExternalLink className="w-4 h-4 group-hover:text-primary transition-colors" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                {/* Decorative placeholder for project screenshot/preview */}
                <div className={`order-1 md:col-span-4 bg-muted/50 h-[180px] md:h-auto flex items-center justify-center border-b md:border-b-0 md:border-t-0 ${index % 2 === 1 ? 'md:border-r md:order-1' : 'md:order-2 md:border-l'}`}>
                   <div className="text-muted-foreground/20 font-black text-6xl select-none">
                     {index + 1}
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
