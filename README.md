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
bun install
```

Run development server:
```bash
bun web dev
```

Build for production:
```bash
bun web build
```

## Development

Built with:
- Bun 1.2.21+
- Next.js 14
- TypeScript
- Styled Components
- Viem & Wagmi v2

## License

MIT












































