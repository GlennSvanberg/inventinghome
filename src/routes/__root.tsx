import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTranslation } from 'react-i18next'
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
        title: 'Inventing',
      },
      {
        name: 'description',
        content: 'We are developers at the forefront helping small businesses step into 2026 already today. Build a website, custom transformation, company chatbot or just removing all your admin.',
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
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'en'

  return (
    <html lang={currentLang}>
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
        {/* Theme Toggle - Fixed position */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {children}
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
