import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useTranslation } from 'react-i18next'
import { 
  GlobeIcon, 
  SparklesIcon, 
  BotIcon, 
  ZapIcon 
} from "lucide-react"

export function ServicesSection() {
  const { t } = useTranslation()

  const services = [
    {
      icon: GlobeIcon,
      titleKey: "services.buildWebsite.title",
      descriptionKey: "services.buildWebsite.description",
    },
    {
      icon: SparklesIcon,
      titleKey: "services.customTransformation.title",
      descriptionKey: "services.customTransformation.description",
    },
    {
      icon: BotIcon,
      titleKey: "services.aiAutomation.title",
      descriptionKey: "services.aiAutomation.description",
    },
    {
      icon: ZapIcon,
      titleKey: "services.removingAdmin.title",
      descriptionKey: "services.removingAdmin.description",
    },
  ]

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollAnimation direction="fade">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('services.heading')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <ScrollAnimation
                key={service.titleKey}
                direction="up"
                delay={index * 100}
              >
                <Card className="glass glass-hover group relative overflow-hidden">
                  {/* Glass shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <CardHeader className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl glass-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {t(service.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed">
                      {t(service.descriptionKey)}
                    </CardDescription>
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

