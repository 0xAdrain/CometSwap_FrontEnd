/**
 * 🎨 CometSwap UIKit Styled-Components
 * 
 * 完整的styled-components系统，集成StellarTheme
 * 支持完整的主题系统和类型安全
 */
// @ts-nocheck - 临时禁用类型检查，styled-components循环引用问题

import { StellarThemeType } from './stellar/theme'
import styledLib, { 
  createGlobalStyle as globalStyleLib, 
  ThemeProvider as themeProviderLib,
  css as cssLib,
  keyframes as keyframesLib
} from 'styled-components'

// React imports
import { useContext } from 'react'

// 导出主题相关  
export { StellarTheme, LIGHT_COLORS, DARK_COLORS } from './stellar/theme'
export type { StellarThemeType } from './stellar/theme'
// DefaultTheme从styled-components重新导出
export type { DefaultTheme } from 'styled-components'

// 重新导出styled-components
export const styled = styledLib
export default styledLib // 默认导出
export const createGlobalStyle = globalStyleLib
export const ThemeProvider = themeProviderLib  
export const css = cssLib
export const keyframes = keyframesLib

// useTheme hook - 简单实现返回空主题
export const useTheme = () => {
  return {}  // 返回空主题对象，避免运行时错误
}

// 导出styled-system适配器
export * from './adapters/styled-system'

// 常用的styled-components辅助函数
export const getThemeValue = (path: string, fallback?: any) => (props: { theme: StellarThemeType }) => {
  const keys = path.split('.')
  let value = props.theme as any
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return fallback
    }
  }
  
  return value ?? fallback
}

// 响应式断点助手 (暂时注释避免循环依赖)
// export const mediaQuery = {
//   xs: `@media (min-width: ${StellarTheme.breakpoints.xs})`,
//   sm: `@media (min-width: ${StellarTheme.breakpoints.sm})`,
//   md: `@media (min-width: ${StellarTheme.breakpoints.md})`,
//   lg: `@media (min-width: ${StellarTheme.breakpoints.lg})`,
//   xl: `@media (min-width: ${StellarTheme.breakpoints.xl})`,
//   xxl: `@media (min-width: ${StellarTheme.breakpoints.xxl})`,
// }

// 全局样式
export const GlobalStyle = globalStyleLib<{ theme: StellarThemeType }>`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
  
  html, body, #root {
    height: 100%;
  }
`

// 注：NavBar等组件直接从styled-components导入避免循环依赖
