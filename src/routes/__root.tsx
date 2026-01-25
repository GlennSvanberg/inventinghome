import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Suspense } from 'react'
import { ConvexProvider } from 'convex/react'
import { convex } from '@/lib/convex-client'
// Import i18n early to ensure synchronous initialization before any render
import '../lib/i18n'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Inventing — Custom SaaS on Subscription',
      },
      {
        name: 'description',
        content:
          'Custom SaaS on a fixed monthly subscription (no upfront cost). Replace spreadsheet chaos with secure, scalable software tailored to your workflow.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/logo.png',
      },
    ],
    scripts: [
      {
        src: 'https://www.trackaton.com/track.js',
        'data-website-id': 'jd7a48cmq444qk6nqr8pymx11x7ypr7r',
        'data-endpoint': 'https://resolute-orca-949.convex.site/api/e',
        async: true,
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-10">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page Not Found</p>
        <a href="/" className="text-primary hover:underline font-mono">
          Back to Home
        </a>
      </div>
    )
  },
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-10">
        <h1 className="text-3xl font-black mb-4">Something went wrong</h1>
        <pre className="bg-muted p-4 rounded-lg font-mono text-xs max-w-full overflow-auto mb-8">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <button
          onClick={() => window.location.reload()}
          className="text-primary hover:underline font-mono"
        >
          Try Again
        </button>
      </div>
    )
  },
})

import { Header } from '@/components/header'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <Suspense fallback={null}>
          <ConvexProvider client={convex}>
            <Header />
            {children}
          </ConvexProvider>
        </Suspense>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
