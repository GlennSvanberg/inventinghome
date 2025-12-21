"use client"

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowRightIcon, RotateCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollAnimation } from "@/components/scroll-animation"

const DIAGNOSTIC_STORAGE_KEY = "inventing_diagnostic_prefill_message"

type DiagnosticState = {
  hoursPerWeek: string
  peopleDependent: string
  valuePerMonth: string
}

export function ProblemDiagnosticSection() {
  const { t } = useTranslation()
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0)
  const [data, setData] = useState<DiagnosticState>({
    hoursPerWeek: "",
    peopleDependent: "",
    valuePerMonth: "",
  })

  const canGoNext = useMemo(() => {
    if (step === 0) return data.hoursPerWeek.trim().length > 0
    if (step === 1) return data.peopleDependent.trim().length > 0
    if (step === 2) return data.valuePerMonth.trim().length > 0
    return true
  }, [data.hoursPerWeek, data.peopleDependent, data.valuePerMonth, step])

  const summary = useMemo(() => {
    return t("diagnostic.summaryTemplate", {
      hours: data.hoursPerWeek || "—",
      people: data.peopleDependent || "—",
      value: data.valuePerMonth || "—",
    })
  }, [data.hoursPerWeek, data.peopleDependent, data.valuePerMonth, t])

  const reset = () => {
    setData({ hoursPerWeek: "", peopleDependent: "", valuePerMonth: "" })
    setStep(0)
  }

  const saveAndScrollToContact = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(DIAGNOSTIC_STORAGE_KEY, summary)
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="diagnostic" className="py-20 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-45 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <ScrollAnimation direction="fade">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-widest text-primary/90 mb-3">
              {t("diagnostic.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">
              {t("diagnostic.heading")}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("diagnostic.description")}
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <ScrollAnimation direction="up">
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="font-display text-2xl">{t("diagnostic.cardTitle")}</CardTitle>
                <CardDescription>{t("diagnostic.cardDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 0 && (
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-muted-foreground">
                      {t("diagnostic.q1.label")}
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={data.hoursPerWeek}
                      onChange={(e) => setData((p) => ({ ...p, hoursPerWeek: e.target.value }))}
                      placeholder={t("diagnostic.q1.placeholder")}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-muted-foreground">
                      {t("diagnostic.q2.label")}
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={data.peopleDependent}
                      onChange={(e) => setData((p) => ({ ...p, peopleDependent: e.target.value }))}
                      placeholder={t("diagnostic.q2.placeholder")}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-muted-foreground">
                      {t("diagnostic.q3.label")}
                    </Label>
                    <Input
                      value={data.valuePerMonth}
                      onChange={(e) => setData((p) => ({ ...p, valuePerMonth: e.target.value }))}
                      placeholder={t("diagnostic.q3.placeholder")}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground">
                      {t("diagnostic.summaryLabel")}
                    </p>
                    <div className="glass rounded-xl p-4 border border-border/40">
                      <pre className="whitespace-pre-wrap text-sm font-mono text-foreground/90">
                        {summary}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={reset}
                    type="button"
                  >
                    <RotateCcwIcon className="w-4 h-4 mr-2" />
                    {t("diagnostic.reset")}
                  </Button>

                  <div className="flex gap-3">
                    {step > 0 && step < 3 && (
                      <Button
                        variant="outline"
                        className="glass"
                        type="button"
                        onClick={() => setStep((s) => (s === 0 ? 0 : ((s - 1) as 0 | 1 | 2)))}
                      >
                        {t("diagnostic.back")}
                      </Button>
                    )}

                    {step < 2 && (
                      <Button
                        type="button"
                        disabled={!canGoNext}
                        className="glass-button glass-button-hover"
                        onClick={() => setStep((s) => ((s + 1) as 0 | 1 | 2 | 3))}
                      >
                        {t("diagnostic.next")}
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    {step === 2 && (
                      <Button
                        type="button"
                        disabled={!canGoNext}
                        className="glass-button glass-button-hover"
                        onClick={() => setStep(3)}
                      >
                        {t("diagnostic.finish")}
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    {step === 3 && (
                      <Button
                        type="button"
                        className="glass-button glass-button-hover"
                        onClick={saveAndScrollToContact}
                      >
                        {t("diagnostic.cta")}
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="fade">
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle className="font-display text-2xl">{t("diagnostic.sideTitle")}</CardTitle>
                <CardDescription>{t("diagnostic.sideDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>{t("diagnostic.sideBullet1")}</p>
                <p>{t("diagnostic.sideBullet2")}</p>
                <p>{t("diagnostic.sideBullet3")}</p>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

export { DIAGNOSTIC_STORAGE_KEY }

