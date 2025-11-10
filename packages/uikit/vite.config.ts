import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import dts from "vite-plugin-dts";
import stellarBabelPlugin from "./src/stellar/babel-plugin"; // 🔥 Babel plugin for zero-runtime

export default defineConfig({
  esbuild: {
    // 🔥 FIX: Let Babel handle .tsx files (for styled-components + Stellar)
    include: /\.(ts)$/,
    exclude: /\.(tsx|jsx)$/,
    loader: 'ts',
  },
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [
        "react", 
        "react-dom", 
        // Keep styled-components external (will be shimmed by Stellar)
        "styled-components",
        // 🚨 REMOVED: All Tamagui dependencies for true independence
        // Internal packages
        "@comet-swap/hooks",
        "@comet-swap/localization", 
        "@comet-swap/utils",
        // External utilities
        "bignumber.js",
        "lodash",
        /^lodash\//,
        // Date/time utilities
        "dayjs",
        // UI utilities
        "react-popper",
        "sonner",
        "react-device-detect",
        // i18n utilities
        "i18next",
        "react-i18next", 
        "i18next-resources-to-backend",
        // Swap SDK
        "@pancakeswap/swap-sdk-core",
        // Babel dependencies (for Stellar compiler)
        "@babel/core",
        "@babel/traverse",
        "@babel/types",
        "@babel/parser"
      ],
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
  },
  plugins: [
    // 🔥 React plugin with Babel for styled-components + Stellar
    react({
      babel: {
        plugins: [
          // styled-components support
          ['babel-plugin-styled-components', {
            displayName: true,
            fileName: true,
            ssr: false,
            pure: true
          }],
          // 🔥 Stellar zero-runtime compiler
          [stellarBabelPlugin, {
            optimizationLevel: 5,
            targetPlatform: 'web',
            enableDebug: process.env.NODE_ENV === 'development',
            aggressive: true,
            precomputeAll: true
          }]
        ]
      }
    }),
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"]
    })
  ],
  optimizeDeps: {
    include: [
      'react', 
      'react-dom'
      // 🚨 REMOVED: tamagui for true independence
    ],
    exclude: [
      // Prevent pre-bundling of styled-system (handled by Stellar)
      'styled-system',
      '@styled-system/should-forward-prop'
    ]
  },
  define: {
    // Enable Stellar debug mode in development
    'process.env.STELLAR_DEBUG': JSON.stringify(process.env.NODE_ENV === 'development'),
    // Stellar compile target - FIXED: completely independent
    'process.env.STELLAR_TARGET': JSON.stringify('independent')
  },
  resolve: {
    alias: {
      // Stellar redirects (these match our tsconfig paths)
      'styled-system': './src/styled-system/index.ts',
      '@styled-system/should-forward-prop': './src/stellar/runtime/should-forward-prop.ts',
      'styled-components': './src/styled-components/index.ts'
    }
  }
});
