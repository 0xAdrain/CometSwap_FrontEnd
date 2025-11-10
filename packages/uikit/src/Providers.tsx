import React, { createContext, useContext, useState, useEffect } from 'react'

// Independent Stellar Theme Context - pure implementation
interface StellarThemeContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  colors: typeof StellarColors.light
  shadows: typeof StellarShadows
  toggle: typeof StellarToggle
}

// Shadows definition
const StellarShadows = {
  level1: '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
  active: '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
  success: '0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)',
  warning: '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
  focus: '0px 0px 0px 1px #7645D9, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)',
  inset: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)',
} as const

// Toggle theme definition
const StellarToggle = {
  handleBackground: '#ffffff',
  handleShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
} as const

// Independent color system - optimized performance
const StellarColors = {
  light: {
    // Primary colors
    primary: '#667eea',
    primaryHover: '#5a67d8', 
    primaryPress: '#553c9a',
    
    // Background colors
    background: '#ffffff',
    backgroundAlt: '#f8f9fa',
    backgroundAlt2: '#f1f3f4',
    backgroundDisabled: '#e9ecef',
    
    // Text colors
    text: '#1a202c',
    textSecondary: '#4a5568',
    textSubtle: '#718096',
    textDisabled: '#a0aec0',
    
    // Status colors
    success: '#32CD32',
    warning: '#ffa502', 
    error: '#ff4757',
    
    // Border colors
    border: '#e2e8f0',
    borderHover: '#cbd5e0',
    
    // Input colors
    input: '#edf2f7',
  },
  dark: {
    // Primary colors
    primary: '#667eea',
    primaryHover: '#7c3aed',
    primaryPress: '#553c9a',
    
    // Background colors  
    background: '#1a202c',
    backgroundAlt: '#2d3748',
    backgroundAlt2: '#4a5568',
    backgroundDisabled: '#2d3748',
    
    // Text colors
    text: '#f7fafc',
    textSecondary: '#e2e8f0',
    textSubtle: '#a0aec0',
    textDisabled: '#4a5568',
    
    // Status colors
    success: '#32CD32',
    warning: '#ffa502',
    error: '#ff4757',
    
    // Border colors
    border: '#4a5568',
    borderHover: '#718096',
    
    // Input colors
    input: '#2d3748',
  }
}

const StellarThemeContext = createContext<StellarThemeContextType | undefined>(undefined)

interface UIKitProviderProps {
  children: React.ReactNode
  theme?: 'light' | 'dark'
}

export const UIKitProvider: React.FC<UIKitProviderProps> = ({
  children,
  theme: initialTheme = 'light',
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme)
  
  // Auto-detect system theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? 'dark' : 'light')
      }
      
      // Set initial theme based on system preference if not explicitly set
      if (!initialTheme) {
        setTheme(mediaQuery.matches ? 'dark' : 'light')
      }
      
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [initialTheme])
  
  const colors = StellarColors[theme]
  
  // Apply CSS variables to document root for global theming
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      
      // Set CSS custom properties for theming
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--stellar-${key}`, value)
      })
      
      // Set data attribute for theme
      root.setAttribute('data-theme', theme)
      root.setAttribute('data-stellar-theme', theme)
    }
  }, [theme, colors])
  
  return (
    <StellarThemeContext.Provider value={{ theme, setTheme, colors, shadows: StellarShadows, toggle: StellarToggle }}>
      {children}
    </StellarThemeContext.Provider>
  )
}

// Independent theme hook - pure Stellar implementation
export const useStellarTheme = (): StellarThemeContextType => {
  const context = useContext(StellarThemeContext)
  if (context === undefined) {
    throw new Error('useStellarTheme must be used within a UIKitProvider')
  }
  return context
}

// Backward compatibility aliases
export { UIKitProvider as ThemeProvider }
export { useStellarTheme as useTheme }

export default UIKitProvider