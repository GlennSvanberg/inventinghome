import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from '../locales/en.json'
import svTranslations from '../locales/sv.json'
import plTranslations from '../locales/pl.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

