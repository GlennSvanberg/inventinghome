import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowRightLeft,
  BadgeCheck,
  Clock,
  FileWarning,
  Fuel,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type DriverStatus = 'onRoad' | 'rest' | 'border' | 'available'

type DispatchRow = {
  id: string
  driver: string
  truck: string
  route: string
  eta: string
  status: DriverStatus
}

function formatPLN(value: number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(value)
}

function StatusBadge({ status }: { status: DriverStatus }) {
  const { t } = useTranslation()

  const config = useMemo(() => {
    switch (status) {
      case 'onRoad':
        return {
          label: t('demos.logisticsPro.status.onRoad'),
          className:
            'bg-sky-500/15 text-sky-200 border border-sky-500/30 hover:bg-sky-500/20',
        }
      case 'rest':
        return {
          label: t('demos.logisticsPro.status.rest'),
          className:
            'bg-amber-500/15 text-amber-200 border border-amber-500/30 hover:bg-amber-500/20',
        }
      case 'border':
        return {
          label: t('demos.logisticsPro.status.borderCross'),
          className:
            'bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-500/30 hover:bg-fuchsia-500/20',
        }
      case 'available':
        return {
          label: t('demos.logisticsPro.status.available'),
          className:
            'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/20',
        }
    }
  }, [status, t])

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        'transition-colors',
        config.className,
      ].join(' ')}
    >
      {config.label}
    </span>
  )
}

function ProgressBar({ value }: { value: number }) {
  const { t } = useTranslation()
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="mt-3">
      <div className="h-2.5 w-full rounded-full bg-white/10">
        <div
          className="h-2.5 rounded-full bg-primary shadow-[0_0_0_1px_rgba(96,165,250,0.35)]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        {clamped}% {clamped >= 85 ? t('demos.logisticsPro.metrics.esgCompliance.ok') : ''}
      </div>
    </div>
  )
}

type ToastState =
  | null
  | {
      phase: 'processing' | 'done'
    }

function ReconcileToast({ state }: { state: ToastState }) {
  const { t } = useTranslation()
  if (!state) return null

  const isProcessing = state.phase === 'processing'

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(420px,calc(100vw-3rem))]">
      <div
        className={[
          'rounded-xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70',
          'shadow-[0_16px_48px_rgba(0,0,0,0.55)]',
          'p-4',
          'animate-in fade-in slide-in-from-bottom-2 duration-200',
          'border-primary/25',
        ].join(' ')}
      >
        <div className="flex items-start gap-3">
          <div
            className={[
              'mt-0.5 grid h-9 w-9 place-items-center rounded-lg',
              'bg-primary/15 border border-primary/25 text-primary',
            ].join(' ')}
          >
            {isProcessing ? (
              <ArrowRightLeft className="h-5 w-5 animate-spin [animation-duration:900ms]" />
            ) : (
              <BadgeCheck className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">
              {isProcessing
                ? t('demos.logisticsPro.reconcile.toastTitleProcessing')
                : t('demos.logisticsPro.reconcile.toastTitleDone')}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {isProcessing
                ? t('demos.logisticsPro.reconcile.toastBodyProcessing')
                : t('demos.logisticsPro.reconcile.toastBodyDone')}
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={[
                  'h-full rounded-full bg-primary',
                  isProcessing ? 'animate-[progress_1.2s_ease-out_forwards]' : 'w-full',
                ].join(' ')}
                style={
                  isProcessing
                    ? ({
                        width: '20%',
                      } as const)
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes progress {
            0% { width: 14%; }
            35% { width: 52%; }
            70% { width: 82%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  )
}

export function LogisticsPro() {
  const { t } = useTranslation()

  const [showLegacyBanner, setShowLegacyBanner] = useState(true)
  const [legacyFadingOut, setLegacyFadingOut] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLegacyFadingOut(true)
      window.setTimeout(() => setShowLegacyBanner(false), 550)
    }, 2400)
    return () => window.clearTimeout(timer)
  }, [])

  const dispatchRows: Array<DispatchRow> = useMemo(
    () => [
      {
        id: 'D-014',
        driver: 'K. Nowak',
        truck: 'SCANIA R450 • PL-7K2',
        route: 'Gdańsk → Berlin',
        eta: '02:35',
        status: 'border',
      },
      {
        id: 'D-021',
        driver: 'M. Wiśniewski',
        truck: 'VOLVO FH • PL-1D8',
        route: 'Poznań → Rotterdam',
        eta: '07:10',
        status: 'onRoad',
      },
      {
        id: 'D-033',
        driver: 'A. Kowalczyk',
        truck: 'MAN TGX • PL-9Q4',
        route: 'Łódź → Praha',
        eta: '—',
        status: 'rest',
      },
      {
        id: 'D-038',
        driver: 'P. Zieliński',
        truck: 'DAF XF • PL-3T1',
        route: 'Warszawa → Vilnius',
        eta: '05:25',
        status: 'available',
      },
      {
        id: 'D-041',
        driver: 'J. Lewandowski',
        truck: 'MERCEDES Actros • PL-8H6',
        route: 'Katowice → Vienna',
        eta: '09:40',
        status: 'onRoad',
      },
    ],
    [],
  )

  function handleReconcileFuel() {
    if (toast?.phase === 'processing') return
    setToast({ phase: 'processing' })
    window.setTimeout(() => {
      setToast({ phase: 'done' })
      window.setTimeout(() => setToast(null), 2600)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Blueprint grid + vignette */}
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(96,165,250,0.14)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {showLegacyBanner ? (
          <div
            className={[
              'mb-6 flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5',
              'bg-red-500/10 border-red-500/25 text-red-100',
              'transition-all duration-500',
              legacyFadingOut ? 'opacity-0 -translate-y-2 blur-[1px]' : 'opacity-100',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 text-sm">
              <FileWarning className="h-4 w-4 text-red-300" />
              <span className="font-medium">
                {t('demos.logisticsPro.legacyBanner', {
                  file: 'Fleet-Master-Final-v4.xlsx',
                })}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-red-100/80 hover:text-red-50 hover:bg-red-500/10"
              onClick={() => {
                setLegacyFadingOut(true)
                window.setTimeout(() => setShowLegacyBanner(false), 350)
              }}
              aria-label={t('demos.logisticsPro.dismissBanner')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : null}

        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl tracking-tight sm:text-3xl">
                  {t('demos.logisticsPro.title')}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('demos.logisticsPro.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="glass-primary border-primary/25 text-foreground">
              {t('demos.logisticsPro.badgeSwedishEngineering')}
            </Badge>
            <Badge variant="secondary" className="border border-white/10">
              {t('demos.logisticsPro.badgeLiveOps')}
            </Badge>
          </div>
        </header>

        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-strong glass-hover border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">
                  {t('demos.logisticsPro.metrics.activeDrivers.label')}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">
                  38<span className="text-muted-foreground">/42</span>
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <Truck className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {t('demos.logisticsPro.metrics.activeDrivers.note')}
            </div>
          </Card>

          <Card className="glass-strong glass-hover border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">
                  {t('demos.logisticsPro.metrics.fuelEfficiency.label')}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">
                  31.4<span className="text-muted-foreground">L / 100km</span>
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <Fuel className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {t('demos.logisticsPro.metrics.fuelEfficiency.note')}
            </div>
          </Card>

          <Card className="glass-strong glass-hover border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">
                  {t('demos.logisticsPro.metrics.unallocatedInvoices.label')}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">
                  {formatPLN(142000)}
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <FileWarning className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {t('demos.logisticsPro.metrics.unallocatedInvoices.note')}
            </div>
          </Card>

          <Card className="glass-strong glass-hover border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">
                  {t('demos.logisticsPro.metrics.esgCompliance.label')}
                </div>
                <div className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  88<span className="text-muted-foreground">%</span>
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <ProgressBar value={88} />
          </Card>
        </section>

        <section className="mt-6">
          <Card className="glass-strong border-white/10">
            <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {t('demos.logisticsPro.dispatch.title')}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {t('demos.logisticsPro.dispatch.subtitle')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  className="glass-button glass-button-hover text-primary-foreground"
                  onClick={handleReconcileFuel}
                >
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  {t('demos.logisticsPro.dispatch.reconcileFuel')}
                </Button>
                <Button type="button" variant="secondary" className="border-white/10">
                  <Fuel className="mr-2 h-4 w-4" />
                  {t('demos.logisticsPro.dispatch.quickInsight')}
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="bg-white/5">
                  <tr className="text-xs text-muted-foreground">
                    <th className="px-4 py-3 font-medium">
                      {t('demos.logisticsPro.dispatch.columns.driver')}
                    </th>
                    <th className="px-4 py-3 font-medium">
                      {t('demos.logisticsPro.dispatch.columns.truck')}
                    </th>
                    <th className="px-4 py-3 font-medium">
                      {t('demos.logisticsPro.dispatch.columns.route')}
                    </th>
                    <th className="px-4 py-3 font-medium">
                      {t('demos.logisticsPro.dispatch.columns.eta')}
                    </th>
                    <th className="px-4 py-3 font-medium">
                      {t('demos.logisticsPro.dispatch.columns.status')}
                    </th>
                    <th className="px-4 py-3 font-medium text-right">
                      {t('demos.logisticsPro.dispatch.columns.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dispatchRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{row.driver}</span>
                          <span className="text-xs text-muted-foreground">{row.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.truck}</td>
                      <td className="px-4 py-3">
                        <span className="text-foreground">{row.route}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.eta}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-foreground/80 hover:text-foreground hover:bg-white/5"
                          onClick={handleReconcileFuel}
                        >
                          {t('demos.logisticsPro.dispatch.actionReconcile')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{t('demos.logisticsPro.footerNote')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="border-white/10">
                  <span className="inline-flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    {t('demos.logisticsPro.auditTrail')}
                  </span>
                </Badge>
                <Badge variant="secondary" className="border-white/10">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    {t('demos.logisticsPro.rbac')}
                  </span>
                </Badge>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <ReconcileToast state={toast} />
    </div>
  )
}

