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
      // Ensure language is correct after initialization
      if (i18n.language !== detectedLang) {
        return i18n.changeLanguage(detectedLang)
      }
    })
    .catch((error) => {
      console.error('i18n initialization error:', error)
      // Return resolved promise even on error to prevent blocking
      return Promise.resolve()
    })
} else {
  // Already initialized, but ensure language is correct
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

