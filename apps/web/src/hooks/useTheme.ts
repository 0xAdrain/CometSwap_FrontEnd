/**
 * ☄️ CometSwap Theme Hook
 * 
 * 借鉴PancakeSwap的主题架构，适配我们的StellarTheme系统
 */

import { useCallback, useContext, useMemo } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'

export const COOKIE_THEME_KEY = 'comet-swap-theme'

// 主题类型
export type ThemeMode = 'light' | 'dark'

// 模拟next-themes的基础功能 (简化版)
let currentTheme: ThemeMode = 'light'
const themeListeners = new Set<(theme: ThemeMode) => void>()

// 简单的主题管理器
const themeManager = {
  getTheme(): ThemeMode {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(COOKIE_THEME_KEY) as ThemeMode) || 'light'
    }
    return currentTheme
  },
  
  setTheme(theme: ThemeMode) {
    currentTheme = theme
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_THEME_KEY, theme)
      // 应用CSS变量到root
      document.documentElement.setAttribute('data-theme', theme)
      
      // 通知所有监听器
      themeListeners.forEach(listener => listener(theme))
    }
  },
  
  subscribe(listener: (theme: ThemeMode) => void) {
    themeListeners.add(listener)
    return () => themeListeners.delete(listener)
  }
}

/**
 * CometSwap主题Hook
 * 
 * 借鉴PancakeSwap的API设计，但使用我们自己的实现
 */
export const useTheme = () => {
  const styledTheme = useContext(StyledThemeContext)
  
  // 获取当前主题状态
  const resolvedTheme = useMemo(() => {
    return themeManager.getTheme()
  }, [])
  
  // 主题切换函数
  const setTheme = useCallback((newTheme: ThemeMode) => {
    themeManager.setTheme(newTheme)
  }, [])
  
  // 切换主题的便捷函数
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [resolvedTheme, setTheme])
  
  return useMemo(() => ({
    // 当前是否为深色模式
    isDark: resolvedTheme === 'dark',
    
    // 当前解析的主题
    resolvedTheme,
    
    // styled-components主题对象
    theme: styledTheme,
    
    // 设置主题函数
    setTheme,
    
    // 切换主题函数
    toggleTheme
  }), [resolvedTheme, styledTheme, setTheme, toggleTheme])
}

// 主题提供者组件的辅助函数
export const initializeTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = themeManager.getTheme()
    document.documentElement.setAttribute('data-theme', savedTheme)
    currentTheme = savedTheme
  }
}

export default useTheme
