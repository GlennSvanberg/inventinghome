import { Link, createFileRoute } from '@tanstack/react-router'
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
          Manage your business operations and data.
        </p>
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
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black group-hover:text-primary transition-colors">12 New Contacts</div>
              <p className="text-xs text-muted-foreground mt-2">
                In the last 24 hours.
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
