import { Link, Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getAllDemos } from '@/components/demos/registry'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/demo')({
  component: DemoLayout,
  head: () => ({
    meta: [
      { title: 'Inventing — Demo Engine' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
})

function DemoLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isIndex = pathname === '/demo' || pathname === '/demo/'

  if (!isIndex) {
    return <Outlet />
  }

  return <DemoIndex />
}

function DemoIndex() {
  const demos = getAllDemos()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(96,165,250,0.14)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Demo Engine</span>
              <Badge variant="secondary" className="border-white/10">
                live demos
              </Badge>
            </div>
            <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
              Live SaaS demos
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Explore live, clickable demo environments—open a link and let clients experience real flows.
            </p>
          </div>
        </header>

        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <Card key={demo.slug} className="glass-strong glass-hover border-white/10">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="flex items-center justify-between gap-3">
                  <span className="font-display">{demo.title}</span>
                  <Badge className="glass-primary border-primary/25 text-foreground">
                    /demo/{demo.slug}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{demo.description}</p>
                <div className="mt-5">
                  <Link
                    to="/demo/$slug"
                    params={{ slug: demo.slug }}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'glass-button glass-button-hover',
                    )}
                  >
                    Open demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}

