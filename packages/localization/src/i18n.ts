/**
 * 🌐 i18next Configuration
 * Internationalization setup for CometSwap
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import type { Language, SupportedLocale } from './types'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, isRTLLanguage } from './languages'

// Dynamic import for translation resources
const loadTranslationResource = (language: string, namespace: string) => {
  // This would load from locales folder
  // For now, return minimal resources
  return import(`./locales/${language}.json`).catch(() => {
    // Fallback to English if translation not found
    if (language !== 'en-US') {
      return import(`./locales/en-US.json`)
    }
    // Minimal fallback
    return Promise.resolve({
      default: {
        common: {
          loading: 'Loading...',
          error: 'Error occurred',
          success: 'Success',
          cancel: 'Cancel',
          confirm: 'Confirm',
        }
      }
    })
  })
}

// Initialize i18n
export const initializeI18n = (): void => {
  if (i18n.isInitialized) {
    return
  }

  i18n
    .use(resourcesToBackend(loadTranslationResource))
    .use(initReactI18next)
    .init({
      lng: DEFAULT_LANGUAGE.locale,
      fallbackLng: 'en-US',
      
      debug: process.env.NODE_ENV === 'development',
      
      interpolation: {
        escapeValue: false, // React already does escaping
      },
      
      react: {
        useSuspense: false, // Disable suspense for SSR compatibility
      },
      
      backend: {
        loadPath: '/locales/{{lng}}.json',
      },
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: 'cometswap-language',
      },
    })
    .catch((error: any) => {
      console.error('Failed to initialize i18n:', error)
    })
}

// Language change function
export const changeLanguage = async (locale: SupportedLocale): Promise<void> => {
  try {
    await i18n.changeLanguage(locale)
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('cometswap-language', locale)
    }
    
    // Update document direction for RTL languages
    if (typeof document !== 'undefined') {
      document.dir = isRTLLanguage(locale) ? 'rtl' : 'ltr'
      document.documentElement.lang = SUPPORTED_LANGUAGES[locale]?.code || 'en'
    }
  } catch (error) {
    console.error('Failed to change language:', error)
    throw error
  }
}

// Get current language
export const getCurrentLanguage = (): Language => {
  const currentLocale = i18n.language || i18n.options.lng || DEFAULT_LANGUAGE.locale
  return SUPPORTED_LANGUAGES[currentLocale as SupportedLocale] || DEFAULT_LANGUAGE
}

// Get stored language from localStorage
export const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }
  
  const storedLocale = localStorage.getItem('cometswap-language') as SupportedLocale
  return storedLocale && SUPPORTED_LANGUAGES[storedLocale] 
    ? SUPPORTED_LANGUAGES[storedLocale] 
    : DEFAULT_LANGUAGE
}

// Detect browser language
export const detectBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE
  }
  
  // Get browser language
  const browserLang = navigator.language || (navigator as any).userLanguage
  
  // Try exact match first
  if (SUPPORTED_LANGUAGES[browserLang as SupportedLocale]) {
    return SUPPORTED_LANGUAGES[browserLang as SupportedLocale]
  }
  
  // Try language code match (e.g., 'zh' matches 'zh-CN')
  const langCode = browserLang.split('-')[0]
  const matchedLang = Object.values(SUPPORTED_LANGUAGES).find(
    lang => lang.code === langCode
  )
  
  return matchedLang || DEFAULT_LANGUAGE
}

// Utility function to check if language is RTL
export { isRTLLanguage } from './languages'

// Export i18n instance
export default i18n







