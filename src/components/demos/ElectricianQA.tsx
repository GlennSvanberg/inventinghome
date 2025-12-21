import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  BadgeCheck,
  Bolt,
  Camera,
  CheckCircle2,
  ChevronRight,
  FileText,
  Lock,
  Network,
  RefreshCcw,
  ShieldCheck,
  Signature,
  Zap,
} from 'lucide-react'
import type { ComponentProps } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type InstallationKind = 'new' | 'upgrade'
type InstallationType = 'highVoltage' | 'lowVoltage' | 'dataNetwork' | 'lightingSystem'

type Site = {
  id: string
  title: string
  location: string
  lastSync: string
}

type ToastState =
  | null
  | {
      title: string
      message: string
      variant: 'success' | 'info'
      icon?: 'check' | 'camera' | 'file'
    }

function HapticButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      className={cn(
        'active:scale-[0.985] active:translate-y-[1px] motion-reduce:transform-none',
        'transition-transform duration-75',
        className,
      )}
    />
  )
}

function AppToast({ state }: { state: ToastState }) {
  if (!state) return null

  const icon =
    state.icon === 'camera' ? (
      <Camera className="h-5 w-5" />
    ) : state.icon === 'file' ? (
      <FileText className="h-5 w-5" />
    ) : (
      <CheckCircle2 className="h-5 w-5" />
    )

  const accent =
    state.variant === 'success'
      ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100'
      : 'border-primary/25 bg-primary/10 text-foreground'

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(420px,calc(100vw-2rem))] -translate-x-1/2">
      <div
        className={cn(
          'rounded-xl border backdrop-blur supports-[backdrop-filter]:bg-background/70',
          'bg-background/95 shadow-[0_16px_48px_rgba(0,0,0,0.55)]',
          'p-4',
          'animate-in fade-in slide-in-from-bottom-2 duration-200',
          accent,
        )}
      >
        <div className="flex items-start gap-3">
          <div className={cn('mt-0.5 grid h-9 w-9 place-items-center rounded-lg border', accent)}>
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">{state.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{state.message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PanelPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(70%_65%_at_50%_0%,rgba(96,165,250,0.18)_0%,rgba(0,0,0,0)_70%)]" />
      <div className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Main Panel • Photo Preview</div>
          <Badge className="glass-primary border-primary/25 text-foreground">Uploaded</Badge>
        </div>
        <div className="mt-3 grid place-items-center rounded-lg border border-white/10 bg-black/20 p-4">
          <svg viewBox="0 0 320 160" className="h-auto w-full max-w-[320px]">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.12)" />
              </linearGradient>
            </defs>
            <rect x="10" y="14" width="300" height="132" rx="12" fill="url(#g)" stroke="rgba(255,255,255,0.18)" />
            <rect x="24" y="30" width="88" height="100" rx="10" fill="rgba(0,0,0,0.30)" stroke="rgba(255,255,255,0.12)" />
            <circle cx="68" cy="54" r="11" fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.55)" />
            <rect x="46" y="78" width="44" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
            <rect x="40" y="96" width="56" height="8" rx="4" fill="rgba(255,255,255,0.10)" />
            <rect x="40" y="114" width="56" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
            <rect x="126" y="30" width="170" height="34" rx="10" fill="rgba(0,0,0,0.24)" stroke="rgba(255,255,255,0.12)" />
            <rect x="140" y="42" width="46" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
            <rect x="194" y="42" width="86" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
            <rect x="126" y="74" width="170" height="56" rx="12" fill="rgba(0,0,0,0.24)" stroke="rgba(255,255,255,0.12)" />
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i}>
                <rect
                  x={140 + i * 18}
                  y="86"
                  width="12"
                  height="32"
                  rx="5"
                  fill="rgba(255,255,255,0.10)"
                  stroke="rgba(255,255,255,0.12)"
                />
                <circle cx={146 + i * 18} cy="94" r="2" fill="rgba(34,197,94,0.70)" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

export function ElectricianQA() {
  const electricianName = 'Jan Kowalski'

  const sites: Array<Site> = useMemo(
    () => [
      {
        id: 'S-1024',
        title: 'New Office Build',
        location: 'Poznań',
        lastSync: 'Synced 6 min ago',
      },
      {
        id: 'S-1041',
        title: 'Factory Upgrade',
        location: 'Wrocław',
        lastSync: 'Synced 21 min ago',
      },
    ],
    [],
  )

  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0)

  const [installationKind, setInstallationKind] = useState<InstallationKind | null>(null)
  const [installationType, setInstallationType] = useState<InstallationType | null>(null)

  const [breakerAccessible, setBreakerAccessible] = useState(false)
  const [labelingCorrect, setLabelingCorrect] = useState(false)
  const [panelPhotoUploaded, setPanelPhotoUploaded] = useState(false)

  const [risoOhms, setRisoOhms] = useState('')
  const [zsOhms, setZsOhms] = useState('')
  const [rcdTripConfirmed, setRcdTripConfirmed] = useState(false)

  const [cableContinuityOk, setCableContinuityOk] = useState(false)
  const [flukeCertified, setFlukeCertified] = useState(false)
  const [flukeReportUploaded, setFlukeReportUploaded] = useState(false)

  const [hvLockout, setHvLockout] = useState(false)
  const [hvMeggerLogged, setHvMeggerLogged] = useState(false)
  const [hvBarriersOk, setHvBarriersOk] = useState(false)

  const [emergencyLightsOk, setEmergencyLightsOk] = useState(false)
  const [luxReadingsLogged, setLuxReadingsLogged] = useState(false)
  const [controlsTested, setControlsTested] = useState(false)

  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const [signatureCaptured, setSignatureCaptured] = useState(false)

  const [toast, setToast] = useState<ToastState>(null)

  const stepCount = 4
  const progressPct = step === 0 ? 0 : Math.round((step / stepCount) * 100)

  const typeLabel = useMemo(() => {
    switch (installationType) {
      case 'highVoltage':
        return 'High Voltage'
      case 'lowVoltage':
        return 'Low Voltage'
      case 'dataNetwork':
        return 'Data Network'
      case 'lightingSystem':
        return 'Lighting System'
      default:
        return '—'
    }
  }, [installationType])

  function pushToast(next: Exclude<ToastState, null>) {
    setToast(next)
    window.setTimeout(() => setToast(null), 2200)
  }

  function resetWizardForSite(site: Site) {
    setSelectedSite(site)
    setStep(1)

    setInstallationKind(null)
    setInstallationType(null)

    setBreakerAccessible(false)
    setLabelingCorrect(false)
    setPanelPhotoUploaded(false)

    setRisoOhms('')
    setZsOhms('')
    setRcdTripConfirmed(false)

    setCableContinuityOk(false)
    setFlukeCertified(false)
    setFlukeReportUploaded(false)

    setHvLockout(false)
    setHvMeggerLogged(false)
    setHvBarriersOk(false)

    setEmergencyLightsOk(false)
    setLuxReadingsLogged(false)
    setControlsTested(false)

    setAllTestsPassed(false)
    setSignatureCaptured(false)
  }

  const canGoNext = useMemo(() => {
    if (step === 1) return !!installationKind && !!installationType
    if (step === 2) return breakerAccessible && labelingCorrect && panelPhotoUploaded
    if (step === 3) {
      if (installationType === 'lowVoltage') {
        const risoOk = risoOhms.trim().length > 0 && Number.isFinite(Number(risoOhms))
        const zsOk = zsOhms.trim().length > 0 && Number.isFinite(Number(zsOhms))
        return risoOk && zsOk && rcdTripConfirmed
      }
      if (installationType === 'dataNetwork') {
        return cableContinuityOk && flukeCertified && flukeReportUploaded
      }
      if (installationType === 'highVoltage') {
        return hvLockout && hvMeggerLogged && hvBarriersOk
      }
      if (installationType === 'lightingSystem') {
        return emergencyLightsOk && luxReadingsLogged && controlsTested
      }
      return false
    }
    if (step === 4) return allTestsPassed && signatureCaptured
    return false
  }, [
    step,
    installationKind,
    installationType,
    breakerAccessible,
    labelingCorrect,
    panelPhotoUploaded,
    risoOhms,
    zsOhms,
    rcdTripConfirmed,
    cableContinuityOk,
    flukeCertified,
    flukeReportUploaded,
    hvLockout,
    hvMeggerLogged,
    hvBarriersOk,
    emergencyLightsOk,
    luxReadingsLogged,
    controlsTested,
    allTestsPassed,
    signatureCaptured,
  ])

  function goNext() {
    if (!canGoNext) return
    setStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev))
  }

  function goBack() {
    setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(96,165,250,0.14)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="relative mx-auto w-full max-w-md px-4 py-6">
        {/* Mobile app chrome */}
        <header className="sticky top-0 z-10 -mx-4 mb-4 border-b border-white/10 bg-background/70 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/50">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="grid h-8 w-8 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Bolt className="h-4 w-4" />
                </div>
                <span className="truncate">Site Commissioning Assistant</span>
              </div>
              <div className="mt-1 truncate text-sm font-semibold">
                {selectedSite ? `${selectedSite.title} — ${selectedSite.location}` : `Welcome back, ${electricianName}`}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge variant="secondary" className="border-white/10">
                {selectedSite ? `Step ${step}/${stepCount}` : 'Ready'}
              </Badge>
              <Badge className="glass-primary border-primary/25 text-foreground">Live</Badge>
            </div>
          </div>

          {selectedSite ? (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Audit trail enabled
                </span>
                <span className="tabular-nums">{progressPct}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-primary shadow-[0_0_0_1px_rgba(96,165,250,0.35)] transition-[width] duration-300 ease-out"
                  style={{ width: `${Math.max(0, Math.min(100, progressPct))}%` }}
                />
              </div>
            </div>
          ) : null}
        </header>

        {/* Login / Site picker */}
        {step === 0 ? (
          <main className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Card className="glass-strong border-white/10">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="flex items-center justify-between gap-3">
                  <span className="font-display">My Active Sites</span>
                  <Badge variant="secondary" className="border-white/10">
                    {sites.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {sites.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => resetWizardForSite(s)}
                      className={cn(
                        'w-full text-left',
                        'rounded-xl border border-white/10 bg-white/5 p-4',
                        'hover:bg-white/7 transition-colors',
                        'active:scale-[0.992] active:translate-y-[1px] motion-reduce:transform-none',
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold">
                            {s.title} — {s.location}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{s.id}</div>
                        </div>
                        <ChevronRight className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                          Commissioning checklist
                        </span>
                        <span>{s.lastSync}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-primary/25 bg-primary/10 p-4">
                  <div className="text-sm font-semibold">This is a real workflow demo</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Touch-first, task-driven, and wizard-based—built to feel like a daily mobile app.
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/demo"
                    className="inline-flex h-9 items-center justify-center rounded-4xl border border-white/15 bg-white/5 px-4 text-sm font-medium hover:bg-white/10 transition-colors w-full"
                  >
                    Back to all demos
                  </Link>
                </div>
              </CardContent>
            </Card>
          </main>
        ) : null}

        {/* Wizard */}
        {selectedSite && step !== 0 ? (
          <main className="space-y-4">
            <Card className="glass-strong border-white/10">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="font-display">Commissioning Checklist</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="border-white/10">
                      {installationType ? typeLabel : 'Select type'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Step 1 */}
                {step === 1 ? (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                    <div className="text-sm font-semibold">Step 1 — Site & Installation Details</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Set the context. The assistant adapts the checklist to the installation type.
                    </div>

                    <div className="mt-5 space-y-5">
                      <div>
                        <div className="text-sm font-medium">Is this a new installation or an upgrade?</div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {([
                            { value: 'new', label: 'New Install', icon: Zap },
                            { value: 'upgrade', label: 'Upgrade', icon: RefreshCcw },
                          ] as const).map((opt) => {
                            const selected = installationKind === opt.value
                            const Icon = opt.icon
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setInstallationKind(opt.value)}
                                className={cn(
                                  'rounded-xl border p-3 text-left transition-colors',
                                  'bg-white/5 hover:bg-white/7 border-white/10',
                                  selected ? 'border-primary/35 bg-primary/10' : '',
                                  'active:scale-[0.992] active:translate-y-[1px] motion-reduce:transform-none',
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold">{opt.label}</div>
                                    <div className="mt-1 text-xs text-muted-foreground">
                                      {opt.value === 'new'
                                        ? 'Fresh commissioning workflow.'
                                        : 'Validate changes + re-test impacted circuits.'}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Type of Installation?</Label>
                        <div className="mt-2">
                          <Select
                            value={installationType ?? ''}
                            onValueChange={(v) => setInstallationType(v as InstallationType)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select installation type…" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Installation Types</SelectLabel>
                                <SelectItem value="highVoltage">High Voltage</SelectItem>
                                <SelectItem value="lowVoltage">Low Voltage</SelectItem>
                                <SelectItem value="dataNetwork">Data Network</SelectItem>
                                <SelectItem value="lightingSystem">Lighting System</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                              {installationType === 'dataNetwork' ? (
                                <Network className="h-5 w-5" />
                              ) : installationType === 'highVoltage' ? (
                                <Lock className="h-5 w-5" />
                              ) : (
                                <Zap className="h-5 w-5" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold">Adaptive checklist</div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                Step 3 will switch to tests specific to{' '}
                                <span className="text-foreground">{installationType ? typeLabel : 'your selection'}</span>.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Step 2 */}
                {step === 2 ? (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                    <div className="text-sm font-semibold">Step 2 — Pre-Test Visual Inspection</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Always applicable. This creates an audit trail (photos + checks).
                    </div>

                    <div className="mt-5 space-y-3">
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-5 w-5 accent-primary"
                          checked={breakerAccessible}
                          onChange={(e) => setBreakerAccessible(e.target.checked)}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold">Verify main breaker accessible.</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Ensure safe access (no obstructions, correct clearance).
                          </div>
                        </div>
                      </label>

                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-5 w-5 accent-primary"
                          checked={labelingCorrect}
                          onChange={(e) => setLabelingCorrect(e.target.checked)}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold">Confirm labeling is clear and correct.</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Circuits, RCDs, and service disconnect labeled to plan.
                          </div>
                        </div>
                      </label>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Take Photo of Main Panel.</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Stored with the commissioning report (simulated).
                            </div>
                          </div>
                          <HapticButton
                            type="button"
                            size="sm"
                            className={cn(
                              'glass-button glass-button-hover text-primary-foreground',
                              panelPhotoUploaded ? 'opacity-80' : '',
                            )}
                            onClick={() => {
                              setPanelPhotoUploaded(true)
                              pushToast({
                                title: 'Photo Uploaded!',
                                message: 'Main panel photo saved to this site record.',
                                variant: 'success',
                                icon: 'camera',
                              })
                            }}
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Upload
                          </HapticButton>
                        </div>

                        {panelPhotoUploaded ? (
                          <div className="mt-4">
                            <PanelPlaceholder />
                          </div>
                        ) : (
                          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
                            No photo yet. Tap <span className="text-foreground">Upload</span> to attach a panel snapshot.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Step 3 */}
                {step === 3 ? (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                    <div className="text-sm font-semibold">Step 3 — Specific Tests</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Conditional. Only the tests relevant to <span className="text-foreground">{typeLabel}</span> appear.
                    </div>

                    {installationType === 'lowVoltage' ? (
                      <div className="mt-5 space-y-3">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <Label className="text-sm font-semibold">Measure Insulation Resistance (RISO).</Label>
                          <div className="mt-2 flex items-center gap-2">
                            <Input
                              inputMode="decimal"
                              placeholder="e.g., 1.2"
                              value={risoOhms}
                              onChange={(e) => setRisoOhms(e.target.value)}
                            />
                            <div className="shrink-0 text-sm text-muted-foreground">MΩ</div>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Enter the measured value from your tester (simulated).
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <Label className="text-sm font-semibold">Measure Loop Impedance (Zs).</Label>
                          <div className="mt-2 flex items-center gap-2">
                            <Input
                              inputMode="decimal"
                              placeholder="e.g., 0.38"
                              value={zsOhms}
                              onChange={(e) => setZsOhms(e.target.value)}
                            />
                            <div className="shrink-0 text-sm text-muted-foreground">Ω</div>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Used to validate disconnection times (audit trail).
                          </div>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={rcdTripConfirmed}
                            onChange={(e) => setRcdTripConfirmed(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Confirm RCD/RCBO trip times.</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Record verified trip performance (simulated).
                            </div>
                          </div>
                        </label>
                      </div>
                    ) : null}

                    {installationType === 'dataNetwork' ? (
                      <div className="mt-5 space-y-3">
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={cableContinuityOk}
                            onChange={(e) => setCableContinuityOk(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Verify Cable Continuity (all pairs).</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Quick pass/fail before certification.
                            </div>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={flukeCertified}
                            onChange={(e) => setFlukeCertified(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Perform Fluke Test / Certify Network.</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Certification results must be archived with the site record.
                            </div>
                          </div>
                        </label>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-sm font-semibold">Upload Fluke Test Report.</div>
                              <div className="mt-1 text-xs text-muted-foreground">PDF/HTML export (simulated).</div>
                            </div>
                            <HapticButton
                              type="button"
                              size="sm"
                              className={cn(
                                'glass-button glass-button-hover text-primary-foreground',
                                flukeReportUploaded ? 'opacity-80' : '',
                              )}
                              onClick={() => {
                                setFlukeReportUploaded(true)
                                pushToast({
                                  title: 'Report Uploaded!',
                                  message: 'Fluke certification report archived to this site.',
                                  variant: 'success',
                                  icon: 'file',
                                })
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Upload
                            </HapticButton>
                          </div>

                          {flukeReportUploaded ? (
                            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold">FlukeReport_S-1041.pdf</div>
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    24 pages • Pass • Archived
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {installationType === 'highVoltage' ? (
                      <div className="mt-5 space-y-3">
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={hvLockout}
                            onChange={(e) => setHvLockout(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Confirm lockout/tagout and HV signage.</div>
                            <div className="mt-1 text-xs text-muted-foreground">Safety-first precondition before any energization.</div>
                          </div>
                        </label>
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={hvMeggerLogged}
                            onChange={(e) => setHvMeggerLogged(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Log insulation test results (Megger).</div>
                            <div className="mt-1 text-xs text-muted-foreground">Simulated entry—stored in the audit log.</div>
                          </div>
                        </label>
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={hvBarriersOk}
                            onChange={(e) => setHvBarriersOk(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Verify barriers and clearances.</div>
                            <div className="mt-1 text-xs text-muted-foreground">Guards, covers, and access restrictions verified.</div>
                          </div>
                        </label>
                      </div>
                    ) : null}

                    {installationType === 'lightingSystem' ? (
                      <div className="mt-5 space-y-3">
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={emergencyLightsOk}
                            onChange={(e) => setEmergencyLightsOk(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Test emergency lighting & battery backup.</div>
                            <div className="mt-1 text-xs text-muted-foreground">Functional test for evacuation readiness.</div>
                          </div>
                        </label>
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={luxReadingsLogged}
                            onChange={(e) => setLuxReadingsLogged(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Record lux readings in key zones.</div>
                            <div className="mt-1 text-xs text-muted-foreground">Simulated entry to meet handover requirements.</div>
                          </div>
                        </label>
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-5 w-5 accent-primary"
                            checked={controlsTested}
                            onChange={(e) => setControlsTested(e.target.checked)}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Verify controls (scenes, sensors, timers).</div>
                            <div className="mt-1 text-xs text-muted-foreground">Commission automation and verify expected behavior.</div>
                          </div>
                        </label>
                      </div>
                    ) : null}

                    {!installationType ? (
                      <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
                        Go back to Step 1 and select an installation type.
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Step 4 */}
                {step === 4 ? (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                    <div className="text-sm font-semibold">Step 4 — Final Sign-off</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Final confirmation + signature capture, then archive the report.
                    </div>

                    <div className="mt-5 space-y-3">
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-5 w-5 accent-primary"
                          checked={allTestsPassed}
                          onChange={(e) => setAllTestsPassed(e.target.checked)}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold">Confirm all tests passed.</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Locks the checklist and enables report generation.
                          </div>
                        </div>
                      </label>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">Client/Supervisor Sign-off.</div>
                            <div className="mt-1 text-xs text-muted-foreground">Simulated e-signature capture.</div>
                          </div>
                          <HapticButton
                            type="button"
                            size="sm"
                            variant="secondary"
                            className={cn('border-white/10', signatureCaptured ? 'opacity-80' : '')}
                            onClick={() => {
                              setSignatureCaptured(true)
                              pushToast({
                                title: 'Signature Captured!',
                                message: 'Sign-off stored with the commissioning record.',
                                variant: 'success',
                                icon: 'check',
                              })
                            }}
                          >
                            <Signature className="mr-2 h-4 w-4" />
                            E-Sign
                          </HapticButton>
                        </div>

                        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs text-muted-foreground">Signature status</div>
                            <Badge className={cn('border', signatureCaptured ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100' : 'border-white/10 bg-white/5 text-foreground')}>
                              {signatureCaptured ? 'Captured' : 'Pending'}
                            </Badge>
                          </div>
                          <div className="mt-3 h-10 w-full rounded-lg border border-white/10 bg-white/5" />
                          <div className="mt-2 text-xs text-muted-foreground">
                            Tap “E-Sign” to simulate drawing a signature.
                          </div>
                        </div>
                      </div>

                      <Separator className="my-1 bg-white/10" />

                      <HapticButton
                        type="button"
                        className={cn('glass-button glass-button-hover text-primary-foreground w-full', !canGoNext ? 'opacity-60' : '')}
                        disabled={!canGoNext}
                        onClick={() => {
                          pushToast({
                            title: 'Report generated and archived!',
                            message: 'Commissioning report saved to the site record (simulated).',
                            variant: 'success',
                            icon: 'file',
                          })
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Commissioning Report
                      </HapticButton>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* In-demo navigation card */}
            <Card className="border border-primary/35 bg-primary/10 text-foreground shadow-[0_0_0_1px_rgba(96,165,250,0.15)]">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">See other demos</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Compare this wizard workflow with the other live experiences.
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      to="/demo/logistics"
                      className={cn(
                        'inline-flex h-9 items-center justify-center rounded-4xl px-4 text-sm font-medium',
                        'bg-primary text-primary-foreground hover:bg-primary/92 transition-colors',
                      )}
                    >
                      <Network className="mr-2 h-4 w-4" />
                      See Logistics Demo
                    </Link>
                    <Link
                      to="/demo/task"
                      className={cn(
                        'inline-flex h-9 items-center justify-center rounded-4xl px-4 text-sm font-medium',
                        'border border-white/15 bg-white/5 hover:bg-white/10 transition-colors',
                      )}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      See BuildFlow Demo
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        ) : null}

        {/* Bottom action bar (mobile-first) */}
        {selectedSite && step !== 0 ? (
          <div className="sticky bottom-4 mt-4">
            <div className="rounded-2xl border border-white/10 bg-background/70 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/50">
              <div className="flex items-center gap-2">
                <HapticButton
                  type="button"
                  variant="secondary"
                  className="border-white/10"
                  onClick={() => {
                    if (step === 1) {
                      setSelectedSite(null)
                      setStep(0)
                      return
                    }
                    goBack()
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {step === 1 ? 'Sites' : 'Back'}
                </HapticButton>

                <HapticButton
                  type="button"
                  className={cn('glass-button glass-button-hover text-primary-foreground flex-1', !canGoNext ? 'opacity-60' : '')}
                  disabled={!canGoNext}
                  onClick={() => {
                    if (step === 4) return
                    goNext()
                    if (step === 1) {
                      pushToast({
                        title: 'Checklist ready',
                        message: 'Next: pre-test inspection + photo capture.',
                        variant: 'info',
                        icon: 'check',
                      })
                    }
                  }}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </HapticButton>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate">{selectedSite.id}</span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Auto-save enabled
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <AppToast state={toast} />
    </div>
  )
}

