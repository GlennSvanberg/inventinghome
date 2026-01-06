import { useEffect, useMemo, useState } from 'react'
import {
  Camera,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  FileText,
  PhoneCall,
  Table2,
  Truck,
  Users,
  Workflow,
} from 'lucide-react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type InboxTask = {
  id: string
  title: string
  project: string
  ctaLabel: string
  icon: 'clipboard' | 'truck' | 'camera' | 'phone'
}

type PulseEvent = {
  id: string
  message: string
  meta: string
  icon: 'users' | 'file' | 'truck' | 'clipboard'
}

type ActionCard = {
  id: string
  title: string
  description: string
  cta: string
  icon: 'camera' | 'truck' | 'phone' | 'clipboard' | 'file'
  accent: 'primary' | 'amber' | 'emerald'
}

type ActionToastState =
  | null
  | {
      message: string
    }

type ConfettiPiece = {
  leftPct: number
  delayMs: number
  durationMs: number
  rotateDeg: number
  hue: number
  sizePx: number
}

function IconFor({
  kind,
  className,
}: {
  kind: InboxTask['icon'] | PulseEvent['icon'] | ActionCard['icon']
  className?: string
}) {
  const props = { className: cn('h-4 w-4', className) }
  switch (kind) {
    case 'clipboard':
      return <ClipboardCheck {...props} />
    case 'truck':
      return <Truck {...props} />
    case 'camera':
      return <Camera {...props} />
    case 'phone':
      return <PhoneCall {...props} />
    case 'users':
      return <Users {...props} />
    case 'file':
      return <FileText {...props} />
  }
}

function Donut({
  title,
  value,
  total,
  subtitle,
}: {
  title: string
  value: number
  total: number
  subtitle: string
}) {
  const pct = total <= 0 ? 0 : Math.round((value / total) * 100)
  const radius = 15.5
  const circumference = 2 * Math.PI * radius
  const dash = Math.max(0, Math.min(1, total <= 0 ? 0 : value / total)) * circumference

  return (
    <div className="flex items-center gap-4">
      <div className="relative grid h-[68px] w-[68px] place-items-center">
        <svg viewBox="0 0 42 42" className="h-[68px] w-[68px] -rotate-90">
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="6"
          />
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="rgba(96,165,250,0.95)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-sm font-semibold tabular-nums">{pct}%</div>
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
        <div className="mt-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{value}</span> of{' '}
          <span className="font-medium text-foreground">{total}</span>
        </div>
      </div>
    </div>
  )
}

function ActionToast({ state }: { state: ActionToastState }) {
  if (!state) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(420px,calc(100vw-3rem))]">
      <div className="rounded-xl border border-primary/25 bg-background/95 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">Action queued</div>
            <div className="mt-1 text-sm text-muted-foreground">{state.message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function buildConfettiPieces(seed = 12): Array<ConfettiPiece> {
  // Deterministic-ish burst that still feels organic.
  const pieces: Array<ConfettiPiece> = []
  for (let i = 0; i < seed; i++) {
    const leftPct = (i / seed) * 100 + (i % 2 === 0 ? 2.5 : -2.5)
    pieces.push({
      leftPct: Math.max(2, Math.min(98, leftPct)),
      delayMs: (i % 5) * 18,
      durationMs: 650 + (i % 6) * 55,
      rotateDeg: i * 37,
      hue: 200 + ((i * 17) % 70), // blue/teal range
      sizePx: 6 + (i % 4),
    })
  }
  return pieces
}

export function BuildFlow() {
  const inboxTasks: Array<InboxTask> = useMemo(
    () => [
      {
        id: 't1',
        title: 'Approve Kitchen Material Order',
        project: 'Villa Poznań',
        ctaLabel: 'Complete',
        icon: 'clipboard',
      },
      {
        id: 't2',
        title: 'Sign-off on Foundation Inspection',
        project: 'Riverside Build',
        ctaLabel: 'Complete',
        icon: 'clipboard',
      },
      {
        id: 't3',
        title: 'Confirm Delivery Window (Rebar + Cement)',
        project: 'North Site',
        ctaLabel: 'Complete',
        icon: 'truck',
      },
    ],
    [],
  )

  const pulse: Array<PulseEvent> = useMemo(
    () => [
      {
        id: 'p1',
        message: 'Marek uploaded permit scans',
        meta: '2 minutes ago • Compliance',
        icon: 'file',
      },
      {
        id: 'p2',
        message: 'Concrete arrived 10 mins ago',
        meta: 'On-site • Delivery confirmed',
        icon: 'truck',
      },
      {
        id: 'p3',
        message: 'Site manager requested a quick call',
        meta: 'Urgent • Safety checklist',
        icon: 'users',
      },
      {
        id: 'p4',
        message: 'Inspection checklist updated',
        meta: 'Today • Foundation phase',
        icon: 'clipboard',
      },
    ],
    [],
  )

  const actionCards: Array<ActionCard> = useMemo(
    () => [
      {
        id: 'a1',
        title: 'Review Photo',
        description: 'Verify plumbing wall alignment from the latest site photo set.',
        cta: 'Review now',
        icon: 'camera',
        accent: 'primary',
      },
      {
        id: 'a2',
        title: 'Confirm Delivery',
        description: 'Lock the delivery window and notify the crew for unloading.',
        cta: 'Confirm window',
        icon: 'truck',
        accent: 'emerald',
      },
      {
        id: 'a3',
        title: 'Call Site Manager',
        description: 'Quick sync on safety checklist + blocker removal.',
        cta: 'Call now',
        icon: 'phone',
        accent: 'amber',
      },
      {
        id: 'a4',
        title: 'Approve Change Request',
        description: 'Kitchen outlet relocation request is pending your approval.',
        cta: 'Approve',
        icon: 'clipboard',
        accent: 'primary',
      },
      {
        id: 'a5',
        title: 'Send Update',
        description: 'One click summary to stakeholders (no spreadsheet formatting).',
        cta: 'Draft update',
        icon: 'file',
        accent: 'emerald',
      },
    ],
    [],
  )

  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [confetti, setConfetti] = useState<null | { taskId: string; pieces: Array<ConfettiPiece> }>(
    null,
  )
  const [toast, setToast] = useState<ActionToastState>(null)

  const [reportOpen, setReportOpen] = useState(false)
  const [reportPhase, setReportPhase] = useState<'idle' | 'generating' | 'done'>('idle')
  const [reportProgress, setReportProgress] = useState(0)

  const completedCount = Object.values(completed).filter(Boolean).length
  const totalActions = 34
  const completedActions = 27 + Math.min(3, completedCount) // tiny live feedback
  const blockers = 7 - Math.min(2, completedCount)

  useEffect(() => {
    if (!reportOpen) {
      setReportPhase('idle')
      setReportProgress(0)
      return
    }

    setReportPhase('generating')
    setReportProgress(0)

    let progress = 0
    const start = window.setInterval(() => {
      progress = Math.min(100, progress + 9 + Math.round(Math.random() * 6))
      setReportProgress(progress)
      if (progress >= 100) {
        window.clearInterval(start)
        setReportPhase('done')
      }
    }, 220)

    return () => window.clearInterval(start)
  }, [reportOpen])

  function completeTask(taskId: string) {
    if (completed[taskId]) return
    setCompleted((prev) => ({ ...prev, [taskId]: true }))
    setConfetti({ taskId, pieces: buildConfettiPieces(14) })
    window.setTimeout(() => setConfetti(null), 900)
  }

  function queueAction(message: string) {
    setToast({ message })
    window.setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(96,165,250,0.14)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
              <Workflow className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">BuildFlow</span>
                <Badge variant="secondary" className="border-white/10">
                  Workspace
                </Badge>
                <Badge className="glass-primary border-primary/25 text-foreground">Today</Badge>
              </div>
              <h1 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">
                Work Queue
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Tasks needing your input across active projects.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="text-xs font-medium text-muted-foreground">Synced 2 min ago</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="border-white/10">
                Online
              </Badge>
              <Badge className="glass-primary border-primary/25 text-foreground">Auto-save</Badge>
            </div>
          </div>
        </header>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Column 1 */}
          <Card className="glass-strong border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  My Tasks
                </span>
                <Badge variant="secondary" className="border-white/10">
                  priority
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {inboxTasks.map((task) => {
                  const isDone = !!completed[task.id]
                  const isBurst = confetti?.taskId === task.id
                  return (
                    <div
                      key={task.id}
                      className={cn(
                        'relative overflow-hidden rounded-xl border p-4 transition-colors',
                        'border-white/10 bg-white/5 hover:bg-white/7',
                        isDone ? 'border-emerald-500/25 bg-emerald-500/10' : '',
                      )}
                    >
                      {isBurst ? (
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                          {confetti.pieces.map((p, idx) => (
                            <span
                              key={`${p.leftPct}-${p.delayMs}-${p.durationMs}-${idx}`}
                              className="absolute top-0 rounded-[2px]"
                              style={{
                                left: `${p.leftPct}%`,
                                width: `${p.sizePx}px`,
                                height: `${p.sizePx * 0.6}px`,
                                background: `hsl(${p.hue} 90% 65%)`,
                                animation: `confetti-fall ${p.durationMs}ms ease-out ${p.delayMs}ms forwards`,
                                transform: `rotate(${p.rotateDeg}deg)`,
                                filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.15))',
                              }}
                            />
                          ))}
                        </div>
                      ) : null}

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="grid h-8 w-8 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                              <IconFor kind={task.icon} className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold">{task.title}</div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                Project: <span className="text-foreground">{task.project}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="button"
                          size="sm"
                          variant={isDone ? 'secondary' : 'default'}
                          className={cn(
                            'shrink-0',
                            isDone ? 'border-white/10' : 'glass-button glass-button-hover',
                          )}
                          trackaton-on-click={`buildflow-complete-task-${task.id}`}
                          onClick={() => completeTask(task.id)}
                          disabled={isDone}
                        >
                          {isDone ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-300" />
                              Completed
                            </>
                          ) : (
                            task.ctaLabel
                          )}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Column 2 */}
          <Card className="glass-strong border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Pulse
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {pulse.map((evt) => (
                  <li
                    key={evt.id}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                      <IconFor kind={evt.icon} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{evt.message}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{evt.meta}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Column 3 */}
          <Card className="glass-strong border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Project Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-5">
                <Donut
                  title="Completed Actions"
                  value={completedActions}
                  total={totalActions}
                  subtitle="Momentum is visible—every action has an owner."
                />
                <Donut
                  title="Pending Blockers"
                  value={blockers}
                  total={totalActions}
                  subtitle="Blockers are explicit (and measurable)."
                />
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">Daily Summary</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Generate a shareable update for stakeholders.
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="glass-button glass-button-hover text-primary-foreground"
                    trackaton-on-click="buildflow-generate-summary"
                    onClick={() => setReportOpen(true)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Summary
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card className="glass-strong border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-primary" />
                  Quick Actions
                </span>
                <Badge variant="secondary" className="border-white/10">
                  shortcuts
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {actionCards.map((a) => {
                  const accent =
                    a.accent === 'amber'
                      ? 'border-amber-500/25 bg-amber-500/10 text-amber-200'
                      : a.accent === 'emerald'
                        ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200'
                        : 'border-primary/25 bg-primary/10 text-primary'
                  return (
                    <div
                      key={a.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn('grid h-10 w-10 place-items-center rounded-lg border', accent)}>
                          <IconFor kind={a.icon} className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold">{a.title}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{a.description}</div>
                          <div className="mt-4">
                            <Button
                              type="button"
                              size="sm"
                              className="glass-button glass-button-hover text-primary-foreground"
                              trackaton-on-click={`buildflow-quick-action-${a.id}`}
                              onClick={() => queueAction(`${a.cta}: ${a.title}`)}
                            >
                              {a.cta}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <AlertDialog open={reportOpen} onOpenChange={setReportOpen}>
        <AlertDialogContent className="glass-strong border-white/10">
          <AlertDialogHeader>
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
              <FileText className="h-7 w-7" />
            </div>
            <AlertDialogTitle>Generate Daily Summary</AlertDialogTitle>
            <div className="text-sm text-muted-foreground">
              Generating now…
            </div>
          </AlertDialogHeader>

          <div className="mt-4">
            <div className="h-2.5 w-full rounded-full bg-white/10">
              <div
                className="h-2.5 rounded-full bg-primary shadow-[0_0_0_1px_rgba(96,165,250,0.35)] transition-[width] duration-200"
                style={{ width: `${Math.min(100, Math.max(0, reportProgress))}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="tabular-nums">{reportProgress}%</span>
              <span>
                {reportPhase === 'done' ? (
                  <span className="inline-flex items-center gap-1 text-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Done. Sent to stakeholders.
                  </span>
                ) : (
                  'Generating…'
                )}
              </span>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" className="border-white/10" onClick={() => setReportOpen(false)}>
                Close
              </Button>
              <Button
                type="button"
                className="glass-button glass-button-hover text-primary-foreground"
                disabled={reportPhase !== 'done'}
                trackaton-on-click="buildflow-view-summary"
                onClick={() => setReportOpen(false)}
              >
                View summary
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <ActionToast state={toast} />

      <style>
        {`
          @keyframes confetti-fall {
            0% { transform: translateY(-8px) rotate(0deg); opacity: 0.0; }
            12% { opacity: 1; }
            100% { transform: translateY(96px) rotate(240deg); opacity: 0; }
          }
        `}
      </style>
    </div>
  )
}

