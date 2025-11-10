/**
 * 🌐 Supported Languages Configuration
 * Multi-language support for CometSwap DeFi platform
 */

import type { Language, SupportedLocale } from './types'

export const SUPPORTED_LANGUAGES: Record<SupportedLocale, Language> = {
  'en-US': {
    locale: 'en-US',
    language: 'English',
    code: 'en',
    flag: '🇺🇸',
  },
  'zh-CN': {
    locale: 'zh-CN', 
    language: '简体中文',
    code: 'zh',
    flag: '🇨🇳',
  },
  'zh-TW': {
    locale: 'zh-TW',
    language: '繁體中文', 
    code: 'zh-TW',
    flag: '🇹🇼',
  },
  'ja-JP': {
    locale: 'ja-JP',
    language: '日本語',
    code: 'ja',
    flag: '🇯🇵',
  },
  'ko-KR': {
    locale: 'ko-KR',
    language: '한국어',
    code: 'ko', 
    flag: '🇰🇷',
  },
  'fr-FR': {
    locale: 'fr-FR',
    language: 'Français',
    code: 'fr',
    flag: '🇫🇷',
  },
  'de-DE': {
    locale: 'de-DE',
    language: 'Deutsch',
    code: 'de',
    flag: '🇩🇪',
  },
  'es-ES': {
    locale: 'es-ES',
    language: 'Español',
    code: 'es',
    flag: '🇪🇸',
  },
  'ru-RU': {
    locale: 'ru-RU',
    language: 'Русский',
    code: 'ru',
    flag: '🇷🇺',
  },
  'ar-SA': {
    locale: 'ar-SA',
    language: 'العربية',
    code: 'ar',
    flag: '🇸🇦',
  },
  'hi-IN': {
    locale: 'hi-IN',
    language: 'हिंदी',
    code: 'hi',
    flag: '🇮🇳',
  },
  'vi-VN': {
    locale: 'vi-VN',
    language: 'Tiếng Việt',
    code: 'vi',
    flag: '🇻🇳',
  },
  'th-TH': {
    locale: 'th-TH',
    language: 'ไทย',
    code: 'th',
    flag: '🇹🇭',
  },
  'tr-TR': {
    locale: 'tr-TR',
    language: 'Türkçe',
    code: 'tr',
    flag: '🇹🇷',
  },
  'pt-BR': {
    locale: 'pt-BR',
    language: 'Português (Brasil)',
    code: 'pt',
    flag: '🇧🇷',
  },
}

export const DEFAULT_LANGUAGE: Language = SUPPORTED_LANGUAGES['en-US']

export const RTL_LANGUAGES: SupportedLocale[] = ['ar-SA']

// Language utility functions
export const getLanguageByLocale = (locale: SupportedLocale): Language => {
  return SUPPORTED_LANGUAGES[locale] || DEFAULT_LANGUAGE
}

export const getLanguageByCode = (code: string): Language | undefined => {
  return Object.values(SUPPORTED_LANGUAGES).find(lang => lang.code === code)
}

export const getAllLanguages = (): Language[] => {
  return Object.values(SUPPORTED_LANGUAGES)
}

export const getSupportedLocales = (): SupportedLocale[] => {
  return Object.keys(SUPPORTED_LANGUAGES) as SupportedLocale[]
}

export const isRTLLanguage = (locale: SupportedLocale): boolean => {
  return RTL_LANGUAGES.includes(locale)
}

export const getLanguageFlag = (locale: SupportedLocale): string => {
  return SUPPORTED_LANGUAGES[locale]?.flag || '🌐'
}

// Export for convenience
export { SUPPORTED_LANGUAGES as languages }
export default SUPPORTED_LANGUAGES