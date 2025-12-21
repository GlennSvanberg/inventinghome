import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getDemoBySlug } from '@/components/demos/registry'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

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
  const { t } = useTranslation()
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
                <div className="text-sm text-muted-foreground">
                  {t('demos.notFound.kicker')}
                </div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                  {t('demos.notFound.title')}
                </h1>
              </div>
              <Badge variant="secondary" className="border-white/10">
                /demo/{slug}
              </Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('demos.notFound.body')}
            </p>
          </Card>
        </div>
      </main>
    )
  }

  const Demo = demo.Component
  return <Demo />
}

