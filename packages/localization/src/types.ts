export type Language = {
  code: string
  language: string
  locale: SupportedLocale
  flag: string
}

export type SupportedLocale = 
  | 'en-US' | 'zh-CN' | 'zh-TW' | 'ja-JP' | 'ko-KR' | 'vi-VN' 
  | 'ar-SA' | 'fr-FR' | 'de-DE' | 'es-ES' | 'pt-BR' | 'ru-RU' 
  | 'tr-TR' | 'uk-UA' | 'id-ID' | 'it-IT' | 'nl-NL' | 'fil-PH' 
  | 'pt-PT' | 'hi-IN' | 'bn-BD' | 'ta-IN' | 'ur-PK' | 'th-TH'
  | 'el-GR' | 'sv-SE' | 'da-DK' | 'fi-FI' | 'pl-PL' | 'ro-RO'
  | 'cs-CZ' | 'hu-HU' | 'bg-BG' | 'hr-HR' | 'et-EE' | 'lt-LT'
  | 'lv-LV' | 'sk-SK' | 'sl-SI' | 'sr-SP' | 'ms-MY' | string

export type TranslateFunction = (key: string, data?: Record<string, any>) => string

export type ContextApi = {
  t: TranslateFunction
  setLanguage: (language: Language) => void | Promise<void>
  currentLanguage: Language
  isFetching: boolean
  isLoading?: boolean
}

export type TranslationKey = string
