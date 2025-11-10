# CometSwap

A decentralized exchange platform with intelligent routing and multi-chain support.

## Features

- Multi-protocol routing algorithm for optimal trade execution
- Interactive route visualization
- Support for X Layer Testnet and Mainnet
- Modular architecture built with Nx monorepo
- Comprehensive internationalization support

## Project Structure

```
comet-swap-nx/
├── apps/
│   └── web/               # Trading interface
├── packages/
│   ├── smart-router/      # Routing engine
│   ├── uikit/             # Component library
│   ├── localization/      # i18n support
│   ├── core-config/       # Chain and token configuration
│   └── hooks/             # Shared React hooks
```

## Getting Started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run web
```

Build for production:
```bash
npm run web:build
```

## Tech Stack

- Next.js 14.2
- React 18.3
- TypeScript 5.3
- Styled Components 6.1
- Wagmi 2.12 & Viem 2.30
- Nx 19

## License

MIT












































