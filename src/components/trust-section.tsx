import { ArrowRightIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"

export function TrustSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10 pointer-events-none" />
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <ScrollAnimation direction="fade">
          <Card className="glass-strong p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-3xl">
                <p className="font-mono text-xs tracking-widest text-primary/90 mb-3">
                  {t("trust.kicker")}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-display">
                  {t("trust.heading")}
                </h2>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                  {t("trust.description")}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="font-mono text-xs tracking-wide bg-primary/15 text-primary border border-primary/30">
                    {t("trust.badgeScarcity")}
                  </Badge>
                  <Badge variant="secondary" className="glass font-mono text-xs tracking-wide">
                    {t("trust.badgeLine")}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="h-auto px-8 py-6 text-lg glass-button glass-button-hover"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t("trust.cta")}
                  <ArrowRightIcon className="ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground font-mono">{t("trust.micro")}</p>
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  )
}

