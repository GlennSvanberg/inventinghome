import { useTranslation } from "react-i18next"
import { ClipboardListIcon, TrendingUpIcon, WrenchIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"

export function PartnershipModelSection() {
  const { t } = useTranslation()

  const steps = [
    {
      icon: ClipboardListIcon,
      title: t("partnership.steps.extraction.title"),
      body: t("partnership.steps.extraction.body"),
    },
    {
      icon: WrenchIcon,
      title: t("partnership.steps.engineering.title"),
      body: t("partnership.steps.engineering.body"),
    },
    {
      icon: TrendingUpIcon,
      title: t("partnership.steps.optimization.title"),
      body: t("partnership.steps.optimization.body"),
    },
  ] as const

  return (
    <section className="py-20 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-22 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <ScrollAnimation direction="fade">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-widest text-primary/90 mb-3">
              {t("partnership.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">
              {t("partnership.heading")}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("partnership.description")}
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const title = step.title
            const titleMatch = title.match(/^(\d+\)\s*)(.*)$/)
            const stepNumber = titleMatch?.[1]?.trim() ?? ""
            const stepTitle = titleMatch?.[2] ?? title
            return (
              <ScrollAnimation key={step.title} direction="up" delay={idx * 100}>
                <Card className="glass glass-hover h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="glass-primary rounded-xl p-2.5 border border-primary/30">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold">
                        {stepNumber ? (
                          <>
                            <span className="text-slate-200">{stepNumber}</span>{" "}
                            <span className="text-foreground">{stepTitle}</span>
                          </>
                        ) : (
                          step.title
                        )}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{step.body}</p>
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

