import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '@comet-swap/localization'
import { UIKitProvider } from '@cometswap/uikit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '../config/wagmi'
import { CometThemeProvider, useCometTheme } from '../providers/ThemeProvider'
import GlobalStyle from '../style/Global'
import '../../../../packages/uikit/dist/style.css'

// UIKit适配器 - 让UIKitProvider使用我们的主题
const UIKitThemeAdapter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme: themeMode } = useCometTheme()
  
  return (
    <UIKitProvider theme={themeMode}>
      {children}
    </UIKitProvider>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CometThemeProvider>
          <UIKitThemeAdapter>
            <LanguageProvider>
              <GlobalStyle />
              <Component {...pageProps} />
            </LanguageProvider>
          </UIKitThemeAdapter>
        </CometThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default MyApp














































