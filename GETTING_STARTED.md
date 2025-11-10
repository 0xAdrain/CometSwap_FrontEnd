# CometSwap - Getting Started

> 🚀 Advanced DeFi Trading Platform built with Nx Monorepo Architecture

## 📋 Prerequisites

- **Bun**: `>=1.2.21` (recommended package manager)
- **Node.js**: `>=18.17.0`
- **Git**: Latest version

## ⚡ Quick Start

### 1. Install Dependencies
```bash
bun install
```

### 2. Start Development
```bash
# Start all packages in development mode
bun g:dev

# Or start specific packages
bun smart-router dev
bun ui dev  
bun swap-interface dev
```

### 3. Build Everything
```bash
bun g:build
```

## 🏗️ Architecture Overview

```
comet-swap-nx/
├── apps/
│   └── web/               # Main trading interface (Next.js)
├── packages/
│   ├── smart-router/       # Core routing algorithm
│   ├── ui/                 # UI components library
│   └── contracts/          # Blockchain interactions (TODO)
```

## 📦 Package Commands

### Global Commands (run from root)
- `bun g:dev` - Start all packages in development
- `bun g:build` - Build all packages
- `bun g:lint` - Lint all packages
- `bun g:test` - Test all packages
- `bun g:typecheck` - Type check all packages

### Package-Specific Commands
- `bun smart-router <command>` - Smart router package
- `bun ui <command>` - UI components package
- `bun swap-interface <command>` - Main application

## 🔧 Development Workflow

### Adding New Packages
```bash
# Generate new library package
nx g @nx/js:lib new-package --directory=packages/new-package

# Generate new app
nx g @nx/next:app new-app --directory=apps/new-app
```

### Code Quality
- **Formatting**: Biome (replaces Prettier)
- **Linting**: Biome + TypeScript
- **Git Hooks**: Lefthook for pre-commit checks

### Testing
```bash
# Run tests for specific package
bun smart-router test
bun ui test

# Run all tests
bun g:test
```

## 🚀 Migration Status

- ✅ **Project Structure**: Nx workspace configured
- ✅ **Smart Router**: Base package created
- ✅ **UI Components**: Theme system and base components
- ✅ **Swap Interface**: Basic Next.js app setup
- 🚧 **Migration**: Ready for code migration from existing CometSwap
- 🚧 **Contract Integration**: TODO - migrate existing contracts
- 🚧 **Route Visualization**: TODO - migrate Thena-style visualization

## 🔄 Next Steps

1. **Migrate Smart Router Logic**
   ```bash
   # Copy existing useSmartRouterCallback logic
   # Copy existing useOnChainRouting logic  
   # Copy existing route calculation utilities
   ```

2. **Migrate UI Components**
   ```bash
   # Copy RouteVisualizationThena component
   # Copy SwapForm components
   # Copy token selection components
   ```

3. **Setup Contract Integration**
   ```bash
   # Create contracts package
   # Migrate existing contract hooks
   # Migrate ABI files
   ```

## 🛠️ Advanced Commands

### Dependency Management
```bash
# Check for outdated dependencies
bun outdated

# Update dependencies
bun update

# Clean install
bun clean && bun install
```

### Nx Commands
```bash
# Show project graph
nx graph

# Show affected projects
nx affected:projects

# Run command on affected projects only
nx affected -t build
```

## 📚 Resources

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)

## 🐛 Troubleshooting

### Common Issues

**Build fails with module resolution errors:**
```bash
bun clean && bun install && bun g:build
```

**TypeScript errors:**
```bash
bun g:typecheck
```

**Linting issues:**
```bash
bun g:lint:fix
```

## 📞 Support

For questions about the architecture or migration process, refer to the project documentation or create an issue in the repository.












































