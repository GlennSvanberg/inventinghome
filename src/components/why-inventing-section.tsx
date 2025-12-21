import { useTranslation } from "react-i18next"
import { BadgeCheckIcon, CpuIcon, FactoryIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"

export function WhyInventingSection() {
  const { t } = useTranslation()

  const items = [
    {
      icon: BadgeCheckIcon,
      title: t("whyInventing.items.swedish.title"),
      body: t("whyInventing.items.swedish.body"),
    },
    {
      icon: CpuIcon,
      title: t("whyInventing.items.aiSpeed.title"),
      body: t("whyInventing.items.aiSpeed.body"),
    },
    {
      icon: FactoryIcon,
      title: t("whyInventing.items.b2b.title"),
      body: t("whyInventing.items.b2b.body"),
    },
  ] as const

  return (
    <section className="py-20 px-6 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-35 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <ScrollAnimation direction="fade">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-widest text-primary/90 mb-3">
              {t("whyInventing.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">
              {t("whyInventing.heading")}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("whyInventing.description")}
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <ScrollAnimation key={item.title} direction="up" delay={idx * 100}>
                <Card className="glass glass-hover h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="glass-primary rounded-xl p-2.5 border border-primary/30">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.body}</p>
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

