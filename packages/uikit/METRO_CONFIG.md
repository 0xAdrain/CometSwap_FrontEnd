# Metro Bundler Configuration for React Native

## Overview

The Stellar compiler can also work with React Native's Metro bundler. To enable zero-runtime compilation for React Native, you need to configure Metro to use the Stellar Babel plugin.

## Setup

1. Install dependencies (already done):
```json
{
  "@babel/core": "^7.23.0",
  "@babel/parser": "^7.23.0",
  "@babel/traverse": "^7.23.0",
  "@babel/types": "^7.23.0"
}
```

2. Create or update `babel.config.js` in your React Native project root:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('./packages/uikit/src/stellar/babel-plugin'),
      {
        optimizationLevel: 5,
        targetPlatform: 'native', // Important: set to 'native' for React Native
        enableDebug: __DEV__,
        aggressive: true,
        precomputeAll: true
      }
    ]
  ]
}
```

## How It Works

- **Web (Vite)**: Uses `vite-plugin.ts` → wraps Babel plugin → runs during Vite build
- **React Native (Metro)**: Uses `babel.config.js` → directly uses Babel plugin → runs during Metro bundling

Both achieve the same goal: zero-runtime compilation at build time.

## Current Status

- ✅ **Web**: Vite plugin configured and ready
- ⚠️ **React Native**: Requires Metro bundler configuration (see above)
- ✅ **Runtime Fallback**: Works without compiler (uses runtime functions)

