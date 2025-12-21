import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"

function SpreadsheetMock() {
  return (
    <Card className="glass-strong overflow-hidden">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="font-mono text-sm flex items-center justify-between gap-3">
          <span className="truncate">FINAL_v3_COPY_DO_NOT_DELETE.xlsx</span>
          <span className="text-muted-foreground text-xs">50 columns</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-px bg-border/40">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="bg-[#0F172A]/70 text-[10px] text-slate-300 font-mono px-2 py-1"
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 12 }).map((__, c) => {
              const isFormula = (r === 2 && c === 5) || (r === 6 && c === 8) || (r === 8 && c === 3)
              const value = isFormula ? "=IFERROR(VLOOKUP(...),0)" : ""
              return (
                <div
                  key={`c-${r}-${c}`}
                  className={[
                    "bg-[#0B1220] px-2 py-2 font-mono text-[10px] text-slate-200/90",
                    "min-h-[26px]",
                    isFormula ? "text-primary/90" : "",
                  ].join(" ")}
                >
                  <span className="block truncate">{value}</span>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function ExcelHellSection() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollAnimation direction="fade">
            <div>
              <p className="font-mono text-xs tracking-widest text-primary/90 mb-3">
                {t("excelHell.kicker")}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">
                {t("excelHell.heading")}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {t("excelHell.copy")}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up">
            <SpreadsheetMock />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

