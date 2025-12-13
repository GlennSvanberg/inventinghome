import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from '../locales/en.json'
import svTranslations from '../locales/sv.json'
import plTranslations from '../locales/pl.json'

// Detect language synchronously before initialization
const detectLanguage = (): string => {
  if (typeof window === 'undefined') return 'en'
  
  try {
    const savedLang = localStorage.getItem('i18nextLng')
    const browserLang = navigator.language.split('-')[0]
    const supportedLangs = ['en', 'sv', 'pl']
    
    if (savedLang && supportedLangs.includes(savedLang)) {
      return savedLang
    }
    if (supportedLangs.includes(browserLang)) {
      return browserLang
    }
  } catch (e) {
    // Fallback to 'en' if detection fails
  }
  
  return 'en'
}

// Initialize with detected language immediately
const detectedLang = detectLanguage()

// Create a promise that resolves when i18n is ready with the correct language
let initPromise: Promise<void>

// Initialize i18n WITHOUT LanguageDetector to prevent async language changes
if (!i18n.isInitialized) {
  // #region agent log
  let t0 = 0;
  if (typeof window !== 'undefined') {
    t0 = performance.now();
    const log13 = {location:'i18n.ts:init',message:'i18n init start',data:{time:t0,detectedLang:detectedLang},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'};
    console.log('[DEBUG]', log13);
    fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log13)}).catch(()=>{});
  }
  // #endregion
  
  initPromise = i18n
    .use(initReactI18next)
    .init({
      lng: detectedLang, // Set language immediately - no detector to override it
      resources: {
        en: {
          translation: enTranslations,
        },
        sv: {
          translation: svTranslations,
        },
        pl: {
          translation: plTranslations,
        },
      },
      fallbackLng: 'en',
      supportedLngs: ['en', 'sv', 'pl'],
      interpolation: {
        escapeValue: false,
      },
      // Enable Suspense to wait for translations
      react: {
        useSuspense: true,
      },
    })
    .then(() => {
      // #region agent log
      if (typeof window !== 'undefined') {
        const t1 = performance.now();
        const log14 = {location:'i18n.ts:init',message:'i18n init complete',data:{time:t1,elapsed:t1-t0,i18nLanguage:i18n.language,detectedLang:detectedLang,matches:i18n.language===detectedLang,hasResourceBundle:i18n.hasResourceBundle(i18n.language,'translation')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'};
        console.log('[DEBUG]', log14);
        fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log14)}).catch(()=>{});
      }
      // #endregion
      // Ensure language is correct after initialization
      if (i18n.language !== detectedLang) {
        // #region agent log
        if (typeof window !== 'undefined') {
          const log15 = {location:'i18n.ts:init',message:'Language mismatch in init, fixing',data:{time:performance.now(),from:i18n.language,to:detectedLang},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'};
          console.log('[DEBUG]', log15);
          fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log15)}).catch(()=>{});
        }
        // #endregion
        return i18n.changeLanguage(detectedLang).then(() => {
          // #region agent log
          if (typeof window !== 'undefined') {
            const log16 = {location:'i18n.ts:init',message:'Language fixed after init',data:{time:performance.now(),newLang:i18n.language,hasResourceBundle:i18n.hasResourceBundle(i18n.language,'translation')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'};
            console.log('[DEBUG]', log16);
            fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log16)}).catch(()=>{});
          }
          // #endregion
        })
      }
    })
    .catch((error) => {
      // #region agent log
      if (typeof window !== 'undefined') {
        const log17 = {location:'i18n.ts:init',message:'i18n init error',data:{time:performance.now(),error:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'};
        console.error('[DEBUG]', log17);
        fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log17)}).catch(()=>{});
      }
      // #endregion
      console.error('i18n initialization error:', error)
      // Return resolved promise even on error to prevent blocking
      return Promise.resolve()
    })
} else {
  // Already initialized, but ensure language is correct
  // #region agent log
  if (typeof window !== 'undefined') {
    const log18 = {location:'i18n.ts:init',message:'i18n already initialized',data:{time:performance.now(),i18nLanguage:i18n.language,detectedLang:detectedLang},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'};
    console.log('[DEBUG]', log18);
    fetch('http://127.0.0.1:7245/ingest/007ed69a-6782-478e-aedb-41d4db522a3c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(log18)}).catch(()=>{});
  }
  // #endregion
  if (i18n.language !== detectedLang) {
    initPromise = i18n.changeLanguage(detectedLang).catch(() => Promise.resolve())
  } else {
    initPromise = Promise.resolve()
  }
}

// Export a function to wait for i18n to be ready
export const waitForI18n = () => {
  return initPromise || Promise.resolve()
}

export default i18n

