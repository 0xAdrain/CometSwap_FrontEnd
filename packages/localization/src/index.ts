/**
 * 🌐 CometSwap Localization Package
 * Internationalization utilities for the DeFi platform
 */

// Re-export everything from main modules
export * from './i18n'
export * from './types'
export * from './languages'

// Re-export the Provider and hooks
export { 
  LanguageProvider, 
  useLanguage, 
  useTranslate,
  useLanguageSelector 
} from './Provider'

// Alias useTranslate as useTranslation for compatibility
export { useTranslate as useTranslation } from './Provider'

// Default export for convenience
export { LanguageProvider as default } from './Provider'




