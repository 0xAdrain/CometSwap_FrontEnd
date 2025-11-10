/**
 * ☄️ CometSwap Theme Provider
 * 
 * 借鉴PancakeSwap的架构设计，为CometSwap提供主题切换功能
 */

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { StellarTheme, LIGHT_COLORS, DARK_COLORS } from '@cometswap/uikit/stellar/theme'
import { initializeTheme, ThemeMode, COOKIE_THEME_KEY } from '../hooks/useTheme'

// 主题上下文
interface ThemeContextValue {
  isDark: boolean
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// 创建主题对象 - 借鉴PancakeSwap的架构，但用我们的StellarTheme
const createTheme = (isDark: boolean) => ({
  ...StellarTheme,
  colors: isDark ? DARK_COLORS : LIGHT_COLORS,
  isDark,
  // 确保所有必要的属性都存在
  zIndices: StellarTheme.zIndices || {
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1800
  }
})

/**
 * CometSwap主题提供者
 * 
 * 类似PancakeSwap的StyledUIKitProvider + NextThemeProvider组合
 */
export const CometThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light')
  const [isInitialized, setIsInitialized] = useState(false)

  // 初始化主题 - 从localStorage读取
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = (localStorage.getItem(COOKIE_THEME_KEY) as ThemeMode) || 'light'
      setCurrentTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
      initializeTheme()
      setIsInitialized(true)
    }
  }, [])

  // 设置主题函数
  const setTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_THEME_KEY, theme)
      document.documentElement.setAttribute('data-theme', theme)
      
      // 应用全局CSS变量
      const root = document.documentElement
      const colors = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS
      
      // 设置CSS变量供原生CSS使用
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--comet-${key}`, value)
      })
    }
  }

  // 切换主题
  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // 创建styled-components主题对象
  const styledTheme = createTheme(currentTheme === 'dark')

  const contextValue: ThemeContextValue = {
    isDark: currentTheme === 'dark',
    theme: currentTheme,
    setTheme,
    toggleTheme
  }

  // 等待初始化完成再渲染，避免主题闪烁
  if (!isInitialized) {
    return null
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={styledTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

// Hook to use theme context
export const useCometTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useCometTheme must be used within a CometThemeProvider')
  }
  return context
}

export default CometThemeProvider
