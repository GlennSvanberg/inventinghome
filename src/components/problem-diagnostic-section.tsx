'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  RotateCcwIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollAnimation } from '@/components/scroll-animation'

const DIAGNOSTIC_STORAGE_KEY = 'inventing_diagnostic_prefill_message'

type DiagnosticState = {
  hoursPerWeek: string
  peopleDependent: string
  valuePerMonth: string
}

export function ProblemDiagnosticSection() {
  const { t } = useTranslation()
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0)
  const [copied, setCopied] = useState(false)
  const [data, setData] = useState<DiagnosticState>({
    hoursPerWeek: '',
    peopleDependent: '',
    valuePerMonth: '',
  })

  const canGoNext = useMemo(() => {
    if (step === 0) return data.hoursPerWeek.trim().length > 0
    if (step === 1) return data.peopleDependent.trim().length > 0
    if (step === 2) return data.valuePerMonth.trim().length > 0
    return true
  }, [data.hoursPerWeek, data.peopleDependent, data.valuePerMonth, step])

  const summary = useMemo(() => {
    const hours = parseFloat(data.hoursPerWeek || '0')
    const yearlyCostNum = hours * 52 * 450
    const suggestedPriceNum = Math.min(
      5000,
      Math.max(1000, Math.round((yearlyCostNum * 0.1) / 12 / 1000) * 1000),
    )

    return t('diagnostic.summaryTemplate', {
      hours: data.hoursPerWeek || '—',
      people: data.peopleDependent || '—',
      value: data.valuePerMonth || '—',
      yearlyCost: yearlyCostNum.toLocaleString(),
      suggestedPrice: suggestedPriceNum.toLocaleString(),
    })
  }, [data.hoursPerWeek, data.peopleDependent, data.valuePerMonth, t])

  const reset = () => {
    setData({ hoursPerWeek: '', peopleDependent: '', valuePerMonth: '' })
    setCopied(false)
    setStep(0)
  }

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      // ignore (clipboard permissions / unsupported)
    }
  }

  const saveAndScrollToContact = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DIAGNOSTIC_STORAGE_KEY, summary)
      // Dispatch a custom event so the ContactFormSection can update immediately
      window.dispatchEvent(new CustomEvent('inventing-diagnostic-updated'))
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="diagnostic"
      className="py-20 px-6 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <ScrollAnimation direction="fade">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-widest text-primary/90 mb-3">
              {t('diagnostic.kicker')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">
              {t('diagnostic.heading')}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t('diagnostic.description')}
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <ScrollAnimation direction="up">
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  {t('diagnostic.cardTitle')}
                </CardTitle>
                <CardDescription>
                  {t('diagnostic.cardDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 0 && (
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-muted-foreground">
                      {t('diagnostic.q1.label')}
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={data.hoursPerWeek}
                      onChange={(e) =>
                        setData((p) => ({ ...p, hoursPerWeek: e.target.value }))
                      }
                      placeholder={t('diagnostic.q1.placeholder')}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-muted-foreground">
                      {t('diagnostic.q2.label')}
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={data.peopleDependent}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          peopleDependent: e.target.value,
                        }))
                      }
                      placeholder={t('diagnostic.q2.placeholder')}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-muted-foreground">
                      {t('diagnostic.q3.label')}
                    </Label>
                    <Input
                      value={data.valuePerMonth}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          valuePerMonth: e.target.value,
                        }))
                      }
                      placeholder={t('diagnostic.q3.placeholder')}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-10">
                        <ArrowRightIcon className="w-12 h-12 rotate-[-45deg]" />
                      </div>
                      <h4 className="font-display font-bold text-xl mb-2 text-white">
                        {t('diagnostic.result.yearlyCost', {
                          cost: (
                            parseFloat(data.hoursPerWeek || '0') *
                            52 *
                            450
                          ).toLocaleString(),
                        })}
                      </h4>
                      <p className="text-primary/90 font-medium text-lg leading-tight">
                        {t('diagnostic.result.pitch', {
                          price: Math.min(
                            5000,
                            Math.max(
                              1000,
                              Math.round(
                                (parseFloat(data.hoursPerWeek || '0') *
                                  52 *
                                  450 *
                                  0.1) /
                                12 /
                                1000,
                              ) * 1000,
                            ),
                          ),
                        }).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        {t('diagnostic.result.subPitch')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="font-mono text-xs tracking-widest text-muted-foreground">
                        {t('diagnostic.summaryLabel')}
                      </p>
                      <div className="relative rounded-xl border border-white/10 bg-[#0F172A] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                            <span className="ml-2 font-mono text-[11px] tracking-widest text-slate-300">
                              inventing://diagnostic
                            </span>
                          </div>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            onClick={copySummary}
                            trackaton-on-click="diagnostic-copy-summary"
                            className="text-slate-200 hover:text-white"
                            aria-label={
                              copied
                                ? t('diagnostic.copied')
                                : t('diagnostic.copy')
                            }
                            title={
                              copied
                                ? t('diagnostic.copied')
                                : t('diagnostic.copy')
                            }
                          >
                            {copied ? (
                              <CheckIcon className="w-4 h-4" />
                            ) : (
                              <CopyIcon className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <pre className="whitespace-pre-wrap text-sm font-mono text-slate-200 px-4 py-4 leading-relaxed">
                          {summary}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={reset}
                    trackaton-on-click="diagnostic-reset"
                    type="button"
                  >
                    <RotateCcwIcon className="w-4 h-4 mr-2" />
                    {t('diagnostic.reset')}
                  </Button>

                  <div className="flex gap-3">
                    {step > 0 && step < 3 && (
                      <Button
                        variant="outline"
                        className="glass"
                        type="button"
                        trackaton-on-click="diagnostic-back"
                        onClick={() =>
                          setStep((s) => (s === 0 ? 0 : ((s - 1) as 0 | 1 | 2)))
                        }
                      >
                        {t('diagnostic.back')}
                      </Button>
                    )}

                    {step < 2 && (
                      <Button
                        type="button"
                        disabled={!canGoNext}
                        className="glass-button glass-button-hover"
                        trackaton-on-click="diagnostic-next"
                        onClick={() => setStep((s) => (s + 1) as 0 | 1 | 2 | 3)}
                      >
                        {t('diagnostic.next')}
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    {step === 2 && (
                      <Button
                        type="button"
                        disabled={!canGoNext}
                        className="glass-button glass-button-hover"
                        trackaton-on-click="diagnostic-finish"
                        onClick={() => setStep(3)}
                      >
                        {t('diagnostic.finish')}
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    {step === 3 && (
                      <Button
                        type="button"
                        className="glass-button glass-button-hover"
                        trackaton-on-click="diagnostic-cta-contact"
                        onClick={saveAndScrollToContact}
                      >
                        {t('diagnostic.cta')}
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
                <CardTitle className="font-display text-2xl">
                  {t('diagnostic.sideTitle')}
                </CardTitle>
                <CardDescription>
                  {t('diagnostic.sideDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>{t('diagnostic.sideBullet1')}</p>
                <p>{t('diagnostic.sideBullet2')}</p>
                <p>{t('diagnostic.sideBullet3')}</p>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

export { DIAGNOSTIC_STORAGE_KEY }
