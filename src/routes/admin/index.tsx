import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-black font-display tracking-tight text-foreground">
          Admin <span className="text-primary italic">Backoffice</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose a workflow to manage inbound contacts or discover new leads.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/admin/contacts">Inbound Contacts</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/leads">Lead Discovery</Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-strong">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-primary">
              Overall Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">All Systems Nominal</div>
            <p className="text-xs text-muted-foreground mt-2">
              All services are currently running within expected parameters.
            </p>
          </CardContent>
        </Card>

        <Link
          to="/admin/contacts"
          className="block group"
        >
          <Card className="glass-strong h-full border-primary/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-primary group-hover:text-primary-foreground transition-colors">
                Inbound Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black group-hover:text-primary transition-colors">Review Inbox</div>
              <p className="text-xs text-muted-foreground mt-2">
                Triage form submissions and manage outreach status.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link
          to="/admin/leads"
          className="block group"
        >
          <Card className="glass-strong h-full border-primary/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-primary group-hover:text-primary-foreground transition-colors">
                Lead Discovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black group-hover:text-primary transition-colors">
                Find Leads
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Scrape job ads and enrich companies with AI extraction.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="glass-strong">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-primary">
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">5 Actions Required</div>
            <p className="text-xs text-muted-foreground mt-2">
              Items needing your immediate attention.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 p-10 border border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center bg-muted/5">
        <p className="text-muted-foreground font-mono">
          Backoffice modules are being initialized...
        </p>
      </div>
    </>
  )
}
