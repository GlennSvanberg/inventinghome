import { createFileRoute, Link } from '@tanstack/react-router'
import { useAction, useQuery } from 'convex/react'
import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  BadgeCheck,
  DatabaseZap,
  ExternalLink,
  Filter,
  RefreshCcw,
} from 'lucide-react'
import { api } from '../../../convex/_generated/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/admin/leads')({
  component: AdminLeadDiscovery,
})

type Lead = {
  _id: string
  _creationTime: number
  name: string
  email: string
  company?: string
  status: string
  source?: string
  jobUrl?: string
  analysisStatus?: string
  analysisModel?: string
  analysisError?: string
  rawJobDescription?: string
  cleanedJobDescription?: string
  jobTitle?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  closed: 'Closed',
}

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  contacted: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  qualified: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  closed: 'bg-muted text-muted-foreground border-border',
}

const ANALYSIS_BADGE: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  scored: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  missing: 'bg-muted text-muted-foreground border-border',
}

function AdminLeadDiscovery() {
  const leads = useQuery(api.leads.list as any) as Lead[] | undefined
  const runDiscover = useAction(api.hunter.discover as any)
  const runAnalyze = useAction(api.hunter.analyzeScrapedLeads as any)

  const [statusFilter, setStatusFilter] = useState('all')
  const [analysisFilter, setAnalysisFilter] = useState('all')
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [scrapeUrl, setScrapeUrl] = useState('')
  const [analyzeLimit, setAnalyzeLimit] = useState('10')
  const [actionState, setActionState] = useState<{
    kind: 'discover' | 'analyze'
    loading: boolean
    message?: string
    ok?: boolean
  } | null>(null)

  const filteredLeads = useMemo(() => {
    if (!leads) return []
    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === 'all' || lead.status === statusFilter
      const analysisStatus = lead.analysisStatus ?? 'missing'
      const matchesAnalysis =
        analysisFilter === 'all' || analysisStatus === analysisFilter
      return matchesStatus && matchesAnalysis
    })
  }, [leads, statusFilter, analysisFilter])

  const selectedLead = useMemo(() => {
    if (!selectedLeadId) return null
    return filteredLeads.find((lead) => lead._id === selectedLeadId) ?? null
  }, [filteredLeads, selectedLeadId])

  useEffect(() => {
    if (!filteredLeads.length) {
      setSelectedLeadId(null)
      return
    }
    if (!selectedLeadId || !filteredLeads.find((lead) => lead._id === selectedLeadId)) {
      setSelectedLeadId(filteredLeads[0]._id)
    }
  }, [filteredLeads, selectedLeadId])

  const handleDiscover = async () => {
    setActionState({ kind: 'discover', loading: true })
    try {
      const result = await runDiscover({
        url: scrapeUrl.trim() ? scrapeUrl.trim() : undefined,
      })
      setActionState({
        kind: 'discover',
        loading: false,
        ok: true,
        message: `Scrape complete: ${result.leadsSaved ?? 0} saved (${result.leadsFound ?? 0} found).`,
      })
    } catch (error) {
      setActionState({
        kind: 'discover',
        loading: false,
        ok: false,
        message: error instanceof Error ? error.message : 'Scrape failed.',
      })
    }
  }

  const handleAnalyze = async () => {
    setActionState({ kind: 'analyze', loading: true })
    const limit = Number(analyzeLimit)
    try {
      const result = await runAnalyze({
        limit: Number.isFinite(limit) && limit > 0 ? limit : 10,
      })
      setActionState({
        kind: 'analyze',
        loading: false,
        ok: true,
        message: `Analysis complete: ${result.analyzed ?? 0} processed.`,
      })
    } catch (error) {
      setActionState({
        kind: 'analyze',
        loading: false,
        ok: false,
        message: error instanceof Error ? error.message : 'Analysis failed.',
      })
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Link to="/admin" className="hover:text-foreground transition-colors">
            Admin Hub
          </Link>
          <span>/</span>
          <Link to="/admin/contacts" className="hover:text-foreground transition-colors">
            Inbound Contacts
          </Link>
          <span>/</span>
          <span className="text-foreground">Lead Discovery</span>
        </div>
        <div>
          <h1 className="text-4xl font-black font-display tracking-tight text-foreground">
            Lead <span className="text-primary italic">Discovery</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Scrape job ads, review leads, and run AI extraction without re-scraping.
          </p>
        </div>

        <Card className="glass-strong">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-primary">
              Actions
            </CardTitle>
            <CardDescription>
              Run scraping or analysis. Scrape saves raw pages first, analysis runs later.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Optional scrape URL (defaults to configured test URL)
                </label>
                <Input
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  placeholder="https://arbetsformedlingen.se/..."
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleDiscover}
                  disabled={actionState?.loading}
                  className="w-full lg:w-auto"
                >
                  <DatabaseZap className="mr-2 h-4 w-4" />
                  Run Scrape
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Analyze limit
                </label>
                <Input
                  value={analyzeLimit}
                  onChange={(e) => setAnalyzeLimit(e.target.value)}
                  inputMode="numeric"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleAnalyze}
                  disabled={actionState?.loading}
                  variant="secondary"
                  className="w-full lg:w-auto"
                >
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Run AI Extraction
                </Button>
              </div>
              <div className="flex items-end justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setActionState(null)}
                  disabled={!actionState || actionState.loading}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Clear Status
                </Button>
              </div>
            </div>

            {actionState?.message && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  actionState.ok
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-700'
                    : 'border-destructive/20 bg-destructive/10 text-destructive'
                }`}
              >
                {actionState.message}
              </div>
            )}
          </CardContent>
        </Card>
      </header>

      {!leads ? (
        <div className="p-20 border border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center bg-muted/5">
          <p className="text-muted-foreground animate-pulse">
            Loading scraped leads from Convex...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          <Card className="glass-strong">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-primary flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
              <CardDescription>
                {filteredLeads.length} leads · {leads.length} total
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Lead status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Analysis status
                </label>
                <Select value={analysisFilter} onValueChange={setAnalysisFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="scored">Scored</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="missing">Missing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {filteredLeads.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No leads match your filters. Try clearing filters or running a scrape.
                </div>
              ) : (
                <div className="space-y-2 max-h-[520px] overflow-y-auto pr-2">
                  {filteredLeads.map((lead) => {
                    const analysisStatus = lead.analysisStatus ?? 'missing'
                    const isActive = selectedLeadId === lead._id
                    return (
                      <button
                        key={lead._id}
                        onClick={() => setSelectedLeadId(lead._id)}
                        className={`w-full text-left rounded-lg border px-3 py-2 transition-all ${
                          isActive
                            ? 'border-primary/50 bg-primary/5'
                            : 'border-border/40 hover:border-border/70'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-sm text-foreground">
                            {lead.company || lead.name || 'Untitled Lead'}
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-[10px] uppercase font-bold tracking-wider ${ANALYSIS_BADGE[analysisStatus]}`}
                          >
                            {analysisStatus}
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {lead.name}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-primary flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Lead Detail
              </CardTitle>
              <CardDescription>
                Review the selected job ad and analysis status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedLead ? (
                <div className="p-12 border border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center bg-muted/5">
                  <p className="text-muted-foreground">
                    Select a lead from the list to view details.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedLead.jobTitle || selectedLead.name || 'Untitled Lead'}
                      </h2>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase font-bold tracking-wider ${STATUS_BADGE[selectedLead.status] ?? STATUS_BADGE.new}`}
                      >
                        {STATUS_LABELS[selectedLead.status] ?? 'New'}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase font-bold tracking-wider ${
                          ANALYSIS_BADGE[selectedLead.analysisStatus ?? 'missing']
                        }`}
                      >
                        {selectedLead.analysisStatus ?? 'missing'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedLead.company || 'Company pending'} ·{' '}
                      {new Date(selectedLead._creationTime).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {selectedLead.jobUrl ? (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={selectedLead.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Job Post <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        No job URL available
                      </Badge>
                    )}
                    {selectedLead.analysisModel && (
                      <Badge variant="outline" className="text-xs">
                        Model: {selectedLead.analysisModel}
                      </Badge>
                    )}
                    {selectedLead.analysisError && (
                      <Badge variant="outline" className="text-xs text-destructive border-destructive/40">
                        {selectedLead.analysisError}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      Extracted Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="border border-border/40 rounded-lg bg-muted/20 p-3">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">
                          Contact Name
                        </div>
                        <div className="mt-1 text-foreground">
                          {selectedLead.contactName || 'Not found'}
                        </div>
                      </div>
                      <div className="border border-border/40 rounded-lg bg-muted/20 p-3">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">
                          Contact Email
                        </div>
                        <div className="mt-1 text-foreground">
                          {selectedLead.contactEmail || selectedLead.email || 'Not found'}
                        </div>
                      </div>
                      <div className="border border-border/40 rounded-lg bg-muted/20 p-3">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">
                          Contact Phone
                        </div>
                        <div className="mt-1 text-foreground">
                          {selectedLead.contactPhone || 'Not found'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      Cleaned Job Description
                    </h3>
                    <div className="border border-border/40 rounded-lg bg-muted/20 p-4 max-h-[420px] overflow-y-auto">
                      <p className="text-sm whitespace-pre-wrap text-foreground/90 leading-relaxed">
                        {selectedLead.cleanedJobDescription ||
                          'No cleaned job description yet. Run AI extraction.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      Raw Job Description
                    </h3>
                    <div className="border border-border/40 rounded-lg bg-muted/20 p-4 max-h-[420px] overflow-y-auto">
                      <p className="text-sm whitespace-pre-wrap text-foreground/90 leading-relaxed">
                        {selectedLead.rawJobDescription ||
                          'No raw job description stored yet.'}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-xs text-muted-foreground">
                    Source: {selectedLead.source ?? 'unknown'} ·{' '}
                    <Link to="/admin/contacts" className="underline">
                      Review inbound contacts
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
