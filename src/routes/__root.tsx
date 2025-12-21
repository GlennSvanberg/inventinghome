import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Suspense } from 'react'
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
          'Custom SaaS solutions on a fixed monthly subscription (no upfront cost) for logistics and manufacturing leaders in Poland and Sweden. Replace spreadsheet chaos with secure, scalable software tailored to your workflow.',
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
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Logo - Fixed position top left */}
        <div className="fixed top-4 left-4 z-50">
          <img 
            src="/logo.png" 
            alt="Inventing Logo" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>
        <Suspense fallback={null}>
          {children}
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
