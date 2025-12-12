"use client"

import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GlobeIcon } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'sv', name: 'Svenska' },
  { code: 'pl', name: 'Polski' },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    // Update HTML lang attribute
    document.documentElement.lang = lang
  }

  return (
    <Select
      value={i18n.language || 'en'}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[140px]">
        <GlobeIcon className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

