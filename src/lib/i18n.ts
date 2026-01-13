import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from '../locales/en.json'
import svTranslations from '../locales/sv.json'
import plTranslations from '../locales/pl.json'

// Detect language synchronously
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
  } catch {
    // Fallback to 'en' if detection fails
  }

  return 'en'
}

// Initialize i18n SYNCHRONOUSLY - this is critical to prevent flash of translation keys
i18n.use(initReactI18next).init({
  lng: detectLanguage(),
  resources: {
    en: { translation: enTranslations },
    sv: { translation: svTranslations },
    pl: { translation: plTranslations },
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'sv', 'pl'],
  interpolation: {
    escapeValue: false,
  },
  // CRITICAL: Make initialization synchronous since resources are bundled
  initImmediate: false,
  react: {
    useSuspense: false, // Disable suspense since we init synchronously
  },
})

export default i18n
