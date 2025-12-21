import { Link, createFileRoute } from '@tanstack/react-router'
import { getDemoBySlug } from '@/components/demos/registry'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/demo/$slug')({
  component: DemoRoute,
  head: ({ params }) => ({
    meta: [
      {
        title: `Inventing — Demo: ${params.slug}`,
      },
      {
        name: 'robots',
        content: 'noindex',
      },
    ],
  }),
})

function DemoRoute() {
  const { slug } = Route.useParams()
  const demo = getDemoBySlug(slug)

  if (!demo) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-60" />
        <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <Card className="glass-strong border-white/10 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-muted-foreground">Demo Engine</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                  Demo not found
                </h1>
              </div>
              <Badge variant="secondary" className="border-white/10">
                /demo/{slug}
              </Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              This demo slug is not registered.
            </p>
            <div className="mt-5">
              <Link
                to="/demo"
                className={cn(buttonVariants({ variant: 'secondary' }), 'border-white/10')}
              >
                Back to demos
              </Link>
            </div>
          </Card>
        </div>
      </main>
    )
  }

  const Demo = demo.Component
  return <Demo />
}

