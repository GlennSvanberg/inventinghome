import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, ArrowRight } from 'lucide-react'
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
    <section id="playground" className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-6">{t('playground.title')}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{t('playground.description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors duration-300">
              <div className="grid md:grid-cols-12 gap-0">
                <div className={`md:col-span-8 p-8 md:p-10 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {t(`playground.projects.${project.id}.title`)}
                    </h3>
                    <Badge variant="secondary" className="font-mono text-xs">
                       {t(`playground.projects.${project.id}.tech`)}
                    </Badge>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                    {t(`playground.projects.${project.id}.description`)}
                  </p>
                  
                  <div>
                    <Button asChild variant="outline" className="group">
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
                <div className={`md:col-span-4 bg-muted/50 min-h-[200px] md:min-h-full flex items-center justify-center border-t md:border-t-0 ${index % 2 === 1 ? 'md:border-r md:order-1' : 'md:border-l'}`}>
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
