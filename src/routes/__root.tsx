import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, Suspense } from 'react'
import i18n, { waitForI18n } from '../lib/i18n'

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
              // #region agent log
              const log1 = {location:'__root.tsx:blocking-script',message:'Blocking script start',data:{time:Date.now(),hasDocument:typeof document!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'};
              console.log('[DEBUG]', log1);
              fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log1)}).catch(()=>{});
              // #endregion
              
              // Hide body initially to prevent flickering using a class
              document.documentElement.classList.add('i18n-loading');
              
              // Apply theme synchronously before React renders
              const savedTheme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = savedTheme || (prefersDark ? 'dark' : 'light');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              
              // Set language attribute synchronously
              const savedLang = localStorage.getItem('i18nextLng');
              const browserLang = navigator.language.split('-')[0];
              const supportedLangs = ['en', 'sv', 'pl'];
              const lang = savedLang && supportedLangs.includes(savedLang) 
                ? savedLang 
                : (supportedLangs.includes(browserLang) ? browserLang : 'en');
              document.documentElement.lang = lang;
              
              // #region agent log
              const log2 = {location:'__root.tsx:blocking-script',message:'Blocking script complete',data:{time:Date.now(),lang:lang,theme:theme,savedLang:savedLang,browserLang:browserLang,hasLoadingClass:document.documentElement.classList.contains('i18n-loading'),hasDarkClass:document.documentElement.classList.contains('dark')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'};
              console.log('[DEBUG]', log2);
              fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log2)}).catch(()=>{});
              // #endregion
            } catch (e) {
              // #region agent log
              const logErr = {location:'__root.tsx:blocking-script',message:'Blocking script error',data:{error:String(e),time:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'};
              console.error('[DEBUG]', logErr);
              fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logErr)}).catch(()=>{});
              // #endregion
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

  // Ensure language matches what blocking script set and show page (client-side only)
  useEffect(() => {
    if (typeof document === 'undefined') return
    
    // #region agent log
    const log3 = {location:'__root.tsx:useEffect',message:'RootDocument useEffect start',data:{time:Date.now(),i18nInitialized:i18n.isInitialized,i18nLanguage:i18n.language,docLang:document.documentElement.lang,hasLoadingClass:document.documentElement.classList.contains('i18n-loading')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'};
    console.log('[DEBUG]', log3);
    fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log3)}).catch(()=>{});
    // #endregion
    
    const showPage = () => {
      // #region agent log
      const log4 = {location:'__root.tsx:showPage',message:'Removing i18n-loading class',data:{time:Date.now(),i18nLanguage:i18n.language,docLang:document.documentElement.lang,hasResourceBundle:i18n.hasResourceBundle(i18n.language,'translation')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'};
      console.log('[DEBUG]', log4);
      fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log4)}).catch(()=>{});
      // #endregion
      document.documentElement.classList.remove('i18n-loading')
      // #region agent log
      const log5 = {location:'__root.tsx:showPage',message:'Page visible',data:{time:Date.now(),hasLoadingClass:document.documentElement.classList.contains('i18n-loading')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'};
      console.log('[DEBUG]', log5);
      fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log5)}).catch(()=>{});
      // #endregion
    }
    
    // Ensure language matches using the actual i18n instance
    if (i18n.isInitialized) {
      const expectedLang = document.documentElement.lang
      // #region agent log
      const log6 = {location:'__root.tsx:useEffect',message:'i18n already initialized',data:{time:Date.now(),i18nLanguage:i18n.language,expectedLang:expectedLang,matches:expectedLang===i18n.language,hasResourceBundle:i18n.hasResourceBundle(i18n.language,'translation')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'};
      console.log('[DEBUG]', log6);
      fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log6)}).catch(()=>{});
      // #endregion
      if (expectedLang && i18n.language !== expectedLang) {
        // #region agent log
        const log7 = {location:'__root.tsx:useEffect',message:'Language mismatch, changing',data:{time:Date.now(),from:i18n.language,to:expectedLang},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'};
        console.log('[DEBUG]', log7);
        fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log7)}).catch(()=>{});
        // #endregion
        i18n.changeLanguage(expectedLang).then(() => {
          // #region agent log
          const log8 = {location:'__root.tsx:useEffect',message:'Language changed',data:{time:Date.now(),newLang:i18n.language,hasResourceBundle:i18n.hasResourceBundle(i18n.language,'translation')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'};
          console.log('[DEBUG]', log8);
          fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log8)}).catch(()=>{});
          // #endregion
          showPage()
        })
      } else {
        showPage()
      }
    } else {
      // #region agent log
      const log9 = {location:'__root.tsx:useEffect',message:'i18n not initialized, waiting',data:{time:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'};
      console.log('[DEBUG]', log9);
      fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log9)}).catch(()=>{});
      // #endregion
      // Wait for initialization using the actual i18n instance
      const handleInit = () => {
        // #region agent log
        const log10 = {location:'__root.tsx:handleInit',message:'i18n initialized event',data:{time:Date.now(),i18nLanguage:i18n.language,docLang:document.documentElement.lang,hasResourceBundle:i18n.hasResourceBundle(i18n.language,'translation')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'};
        console.log('[DEBUG]', log10);
        fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log10)}).catch(()=>{});
        // #endregion
        const expectedLang = document.documentElement.lang
        if (expectedLang && i18n.language !== expectedLang) {
          // #region agent log
          const log11 = {location:'__root.tsx:handleInit',message:'Language mismatch after init, changing',data:{time:Date.now(),from:i18n.language,to:expectedLang},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'};
          console.log('[DEBUG]', log11);
          fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log11)}).catch(()=>{});
          // #endregion
          i18n.changeLanguage(expectedLang).then(() => {
            // #region agent log
            const log12 = {location:'__root.tsx:handleInit',message:'Language changed after init',data:{time:Date.now(),newLang:i18n.language,hasResourceBundle:i18n.hasResourceBundle(i18n.language,'translation')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'};
            console.log('[DEBUG]', log12);
            fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log12)}).catch(()=>{});
            // #endregion
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
