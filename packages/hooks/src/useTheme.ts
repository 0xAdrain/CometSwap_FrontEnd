import { useContext, useCallback, useMemo } from 'react'
import { useTheme as tamaguiUseTheme } from 'tamagui'
import type { DefaultTheme } from '../../uikit/src/styled-components'

// Temporary next-themes fallback for quick frontend startup
const useNextTheme = () => ({
  resolvedTheme: 'light',
  setTheme: (theme: string) => {
    // Fallback theme setter
    console.log('Theme set to:', theme);
  }
});

// Temporary js-cookie fallback for quick frontend startup
const Cookie = {
  set: (key: string, value: string, options?: any) => {
    if (typeof document !== 'undefined') {
      try {
        const domain = options?.domain ? `; domain=${options.domain}` : '';
        document.cookie = `${key}=${value}${domain}; path=/`;
      } catch (err) {
        console.warn('Failed to set cookie:', err);
      }
    }
  },
  get: (key: string) => {
    if (typeof document !== 'undefined') {
      try {
        const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
        return match ? match[2] : undefined;
      } catch (err) {
        console.warn('Failed to get cookie:', err);
        return undefined;
      }
    }
    return undefined;
  }
};

export const COOKIE_THEME_KEY = 'theme'
export const THEME_DOMAIN = '.cometswap.io' // Updated for CometSwap

const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme()
  const tamaguiTheme = tamaguiUseTheme()

  // Convert Tamagui theme to DefaultTheme compatible format
  const theme: DefaultTheme = {
    colors: tamaguiTheme as any,
    mediaQueries: {
      sm: '@media (min-width: 576px)',
      md: '@media (min-width: 768px)', 
      lg: '@media (min-width: 992px)',
      xl: '@media (min-width: 1200px)',
    },
    shadows: tamaguiTheme as any,
    radii: tamaguiTheme as any,
    zIndices: {
      modal: 1000,
      dropdown: 1001,
      tooltip: 1002,
      ribbon: 9,
    },
    isDark: resolvedTheme === 'dark'
  } as DefaultTheme

  const handleSwitchTheme = useCallback(
    (themeValue: 'light' | 'dark') => {
      try {
        setTheme(themeValue)
        Cookie.set(COOKIE_THEME_KEY, themeValue, { domain: THEME_DOMAIN })
      } catch (err) {
        // ignore set cookie error for perp theme
      }
    },
    [setTheme],
  )

  return useMemo(
    () => ({ isDark: resolvedTheme === 'dark', theme, setTheme: handleSwitchTheme }),
    [theme, resolvedTheme, handleSwitchTheme],
  )
}

export default useTheme
