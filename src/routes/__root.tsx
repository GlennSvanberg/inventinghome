import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useTranslation } from 'react-i18next'
import { useEffect, Suspense } from 'react'
import i18n from '../lib/i18n'

import appCss from '../styles.css?url'

// Extend Window interface for TypeScript
declare global {
  interface Window {
    __i18nReady?: boolean
  }
}

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
    scripts: [
      {
        children: `
          (function() {
            try {
              // Hide body initially to prevent flickering using a class
              document.documentElement.classList.add('i18n-loading');
              
              // Always apply dark theme
              document.documentElement.classList.add('dark');
              
              // Set language attribute synchronously
              const savedLang = localStorage.getItem('i18nextLng');
              const browserLang = navigator.language.split('-')[0];
              const supportedLangs = ['en', 'sv', 'pl'];
              const lang = savedLang && supportedLangs.includes(savedLang) 
                ? savedLang 
                : (supportedLangs.includes(browserLang) ? browserLang : 'en');
              document.documentElement.lang = lang;
            } catch (e) {
              // Silently handle errors
            }
          })();
        `,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { i18n: i18nInstance } = useTranslation()
  
  // Get language - use i18n language, fallback to DOM lang attribute
  const currentLang = i18nInstance.language || (typeof document !== 'undefined' ? document.documentElement.lang : 'en') || 'en'
  
  // Always use dark theme
  const htmlClassName = 'i18n-loading dark'

  // Ensure language matches what blocking script set and show page (client-side only)
  useEffect(() => {
    if (typeof document === 'undefined') return
    
    const showPage = () => {
      document.documentElement.classList.remove('i18n-loading')
    }
    
    // Ensure language matches using the actual i18n instance
    if (i18n.isInitialized) {
      const expectedLang = document.documentElement.lang
      if (expectedLang && i18n.language !== expectedLang) {
        i18n.changeLanguage(expectedLang).then(() => {
          showPage()
        })
      } else {
        showPage()
      }
    } else {
      // Wait for initialization using the actual i18n instance
      const handleInit = () => {
        const expectedLang = document.documentElement.lang
        if (expectedLang && i18n.language !== expectedLang) {
          i18n.changeLanguage(expectedLang).then(() => {
            showPage()
          })
        } else {
          showPage()
        }
        i18n.off('initialized', handleInit)
      }
      i18n.on('initialized', handleInit)
      return () => {
        i18n.off('initialized', handleInit)
      }
    }
  }, [])

  return (
    <html lang={currentLang} className={htmlClassName}>
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
