import { useTranslation } from "react-i18next"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SaaSHeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge variant="secondary" className="glass font-mono text-xs tracking-wide">
                {t("hero.kicker")}
              </Badge>
              <Badge variant="secondary" className="glass font-mono text-xs tracking-wide">
                {t("hero.kickerZeroUpfront")}
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] font-display">
              {t("hero.headline")}
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {t("hero.subheadline")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                size="lg"
                className="h-auto px-8 py-6 text-lg glass-button glass-button-hover"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t("hero.ctaPrimary")}
                <ArrowRightIcon className="ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-auto px-7 py-6 text-lg glass"
                onClick={() => {
                  document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t("hero.ctaSecondary")}
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground font-mono">{t("hero.microProof")}</p>
          </div>

          <div className="hidden lg:block lg:col-span-5 lg:pt-10">
            <Card className="glass-strong overflow-hidden">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="font-mono text-sm">{t("hero.visualTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1">
                  <div className="p-5 border-b border-border/40">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground mb-2">
                      {t("hero.visualBefore")}
                    </p>
                    <div className="glass rounded-xl p-4 border border-border/40">
                      <p className="font-mono text-xs text-muted-foreground mb-2">
                        =IFERROR(VLOOKUP(...),0)
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 rounded-md bg-muted/30" />
                        <div className="h-8 rounded-md bg-muted/30" />
                        <div className="h-8 rounded-md bg-muted/30" />
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground font-mono">
                        FINAL_v3_COPY_DO_NOT_DELETE.xlsx
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="font-mono text-xs tracking-widest text-primary/90 mb-2">
                      {t("hero.visualAfter")}
                    </p>
                    <div className="glass rounded-xl p-4 border border-primary/25">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display font-bold">{t("hero.visualDashboard")}</p>
                        <span className="font-mono text-xs text-primary/90">{t("hero.visualLive")}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border/40 p-3">
                          <p className="font-mono text-[10px] text-muted-foreground">{t("hero.visualMetric1")}</p>
                          <p className="mt-1 font-display text-xl font-black text-foreground">
                            98.4%
                          </p>
                        </div>
                        <div className="rounded-lg border border-border/40 p-3">
                          <p className="font-mono text-[10px] text-muted-foreground">{t("hero.visualMetric2")}</p>
                          <p className="mt-1 font-display text-xl font-black text-foreground">
                            -31%
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-muted/30 overflow-hidden">
                        <div className="h-full w-2/3 bg-primary/70" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

