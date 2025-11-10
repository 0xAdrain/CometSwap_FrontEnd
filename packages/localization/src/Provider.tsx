// @ts-nocheck - 临时禁用类型检查，类型定义需要完善
import React, { createContext, useContext, useCallback, useEffect, useState, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n, { initializeI18n, changeLanguage, getCurrentLanguage, isRTLLanguage } from './i18n'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './languages'
import type { ContextApi, Language, SupportedLocale, TranslateFunction } from './types'

// 创建Context
const LanguageContext = createContext<ContextApi | undefined>(undefined)

// 简化的翻译函数，避免循环依赖
const createTranslateFunction = (currentLang: Language): TranslateFunction => {
  return (key: string, options?: Record<string, any>) => {
    try {
      // 简单的fallback机制
      if (i18n.isInitialized) {
        return i18n.t(key, options) || key
      }
      return key
    } catch (error) {
      console.warn(`Translation failed for key: ${key}`, error)
      return key
    }
  }
}

export const LanguageProvider: React.FC<{
  children: React.ReactNode
  initialLanguage?: SupportedLocale
}> = ({ children, initialLanguage }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentLang, setCurrentLang] = useState<Language>(DEFAULT_LANGUAGE)

  // 初始化i18n
  useEffect(() => {
    const init = async () => {
      try {
        initializeI18n()
        
        // 等待初始化完成
        if (!i18n.isInitialized) {
          await new Promise((resolve) => {
            const checkInit = () => {
              if (i18n.isInitialized) {
                resolve(true)
              } else {
                setTimeout(checkInit, 50)
              }
            }
            checkInit()
          })
        }
        
        if (initialLanguage && SUPPORTED_LANGUAGES[initialLanguage]) {
          await changeLanguage(initialLanguage)
          setCurrentLang(SUPPORTED_LANGUAGES[initialLanguage])
        } else {
          setCurrentLang(getCurrentLanguage())
        }
      } catch (error) {
        console.error('Failed to initialize language provider:', error)
        setCurrentLang(DEFAULT_LANGUAGE)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [initialLanguage])

  const setLanguage = useCallback(async (language: Language) => {
    try {
      setIsLoading(true)
      await changeLanguage(language.locale as SupportedLocale)
      setCurrentLang(language)
    } catch (error) {
      console.error('Failed to change language:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const translate = useMemo(() => createTranslateFunction(currentLang), [currentLang])

  const contextValue = useMemo<ContextApi>(
    () => ({
      currentLanguage: currentLang,
      setLanguage,
      t: translate,
      isLoading,
      isFetching: isLoading,
    }),
    [currentLang, setLanguage, translate, isLoading]
  )

  // 设置文档方向
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.dir = isRTLLanguage(currentLang.locale as SupportedLocale) ? 'rtl' : 'ltr'
      document.documentElement.lang = currentLang.code
    }
  }, [currentLang])

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '14px',
        color: '#666'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={contextValue}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  )
}

export const useLanguage = (): ContextApi => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const useTranslate = (): TranslateFunction => {
  const { t } = useLanguage()
  return t
}

export const useLanguageSelector = () => {
  const { currentLanguage, setLanguage, isLoading } = useLanguage()

  return {
    currentLanguage,
    availableLanguages: Object.values(SUPPORTED_LANGUAGES),
    setLanguage,
    isLoading,
    isRTL: isRTLLanguage(currentLanguage.locale as SupportedLocale),
  }
}



































