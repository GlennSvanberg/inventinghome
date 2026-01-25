import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import svTranslations from '../locales/sv.json'

// Initialize i18n SYNCHRONOUSLY
i18n.use(initReactI18next).init({
  lng: 'sv', // Hardcoded to Swedish
  resources: {
    sv: { translation: svTranslations },
  },
  fallbackLng: 'sv',
  supportedLngs: ['sv'],
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
  react: {
    useSuspense: false,
  },
})

export default i18n
