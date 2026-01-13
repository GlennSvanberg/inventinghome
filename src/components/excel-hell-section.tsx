import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollAnimation } from '@/components/scroll-animation'

function SpreadsheetMock({ title, meta }: { title: string; meta: string }) {
  const rows: Array<Array<string>> = [
    [
      'Owner',
      'Process',
      'Status',
      'Updated',
      'Notes',
      'Value',
      'Source',
      'Version',
      'Link',
      'Sheet',
      'ID',
      'Flags',
    ],
    [
      'Sara',
      'Onboarding',
      'OK',
      'Today',
      'manual step',
      '12',
      'email',
      'v7',
      '—',
      'Leads',
      '1042',
      '',
    ],
    [
      '—',
      'Billing',
      '??',
      '3 days',
      'who changed?',
      '#REF!',
      'copy/paste',
      'v5',
      '—',
      'Finance',
      '889',
      '⚠',
    ],
    [
      'Alex',
      'Reporting',
      'OK',
      'Yesterday',
      'needs filter',
      '98',
      'CSV',
      'v6',
      '—',
      'KPI',
      '771',
      '',
    ],
    [
      'Sara',
      'Onboarding',
      'OK',
      'Today',
      'duplicate row',
      '12',
      'email',
      'v7',
      '—',
      'Leads',
      '1042',
      'dup',
    ],
    [
      '—',
      'Scheduling',
      'Late',
      '2 days',
      'missing data',
      '#N/A',
      'manual',
      'v3',
      '—',
      'Ops',
      '552',
      '⚠',
    ],
    [
      'Mika',
      'Support',
      'OK',
      'Today',
      '—',
      '7',
      'form',
      'v4',
      '—',
      'Tickets',
      '301',
      '',
    ],
    [
      '—',
      'Approvals',
      'Blocked',
      '1 week',
      'waiting',
      '—',
      'slack',
      'v2',
      '—',
      'Admin',
      '120',
      '⚠',
    ],
    [
      'Jo',
      'Inventory',
      'OK',
      'Today',
      '—',
      '44',
      'API?',
      'v1',
      '—',
      'Stock',
      '44',
      '',
    ],
    [
      '—',
      'Sales',
      'OK',
      'Today',
      'formula fragile',
      '=IFERROR(...)',
      'sheet',
      'v9',
      '—',
      'Deals',
      '9',
      '',
    ],
  ]

  return (
    <Card className="glass-strong overflow-hidden">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="font-mono text-sm flex items-center justify-between gap-3">
          <span className="truncate">{title}</span>
          <span className="text-muted-foreground text-xs">{meta}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* On mobile the 12-col grid collapses into unreadable tiny cells.
            Give it a min-width and allow horizontal scroll only below md. */}
        <div className="overflow-x-auto md:overflow-visible overscroll-x-contain">
          <div className="grid grid-cols-12 gap-px bg-border/40 min-w-[920px] md:min-w-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="bg-[#0F172A]/70 text-[11px] md:text-[10px] text-slate-300 font-mono px-2 py-1"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {rows.map((row, r) =>
              row.map((value, c) => {
                const isHeaderRow = r === 0
                const isError =
                  typeof value === 'string' &&
                  (value.includes('#REF!') ||
                    value.includes('#N/A') ||
                    value.includes('??'))
                const isFormula =
                  typeof value === 'string' && value.startsWith('=')
                return (
                  <div
                    key={`c-${r}-${c}`}
                    className={[
                      'bg-[#0B1220] px-2 py-2 font-mono text-[11px] md:text-[10px] text-slate-200/90',
                      'min-h-[28px] md:min-h-[26px]',
                      isHeaderRow ? 'bg-[#0F172A]/80 text-slate-300' : '',
                      isFormula ? 'text-primary/90' : '',
                      isError ? 'text-amber-300' : '',
                    ].join(' ')}
                  >
                    <span className="block truncate">{value}</span>
                  </div>
                )
              }),
            )}
          </div>
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
                {t('excelHell.kicker')}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">
                {t('excelHell.heading')}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {t('excelHell.copy')}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up">
            <SpreadsheetMock
              title={t('excelHell.mockTitle')}
              meta={t('excelHell.mockMeta')}
            />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
