import { useTranslation } from 'react-i18next'
import { GraduationCapIcon, TargetIcon, ShieldCheckIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollAnimation } from '@/components/scroll-animation'

export function WhyInventingSection() {
  const { t } = useTranslation()

  const items = [
    {
      icon: GraduationCapIcon,
      title: t('empowerTeam.items.training.title'),
      body: t('empowerTeam.items.training.body'),
    },
    {
      icon: TargetIcon,
      title: t('empowerTeam.items.value.title'),
      body: t('empowerTeam.items.value.body'),
    },
    {
      icon: ShieldCheckIcon,
      title: t('empowerTeam.items.reliability.title'),
      body: t('empowerTeam.items.reliability.body'),
    },
  ] as const

  return (
    <section className="py-20 px-6 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-18 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <ScrollAnimation direction="fade">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-widest text-primary/90 mb-3">
              {t('empowerTeam.kicker')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">
              {t('empowerTeam.heading')}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t('empowerTeam.description')}
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <ScrollAnimation
                key={item.title}
                direction="up"
                delay={idx * 100}
              >
                <Card className="glass glass-hover h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="glass-primary rounded-xl p-2.5 border border-primary/30">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
