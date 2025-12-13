import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useTranslation } from 'react-i18next'
import { useEffect, Suspense } from 'react'
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
  const { i18n: i18nInstance } = useTranslation()
  
  // Get language
  const currentLang = i18nInstance.language || 'en'

  // Show page after React hydration
  useEffect(() => {
    document.body.classList.add('ready')
  }, [])

  return (
    <html lang={currentLang} className="dark">
      <head>
        {/* Critical CSS - inline to prevent flash */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { opacity: 0; }
          body.ready { opacity: 1; transition: opacity 0.15s ease-in; }
        `}} />
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
