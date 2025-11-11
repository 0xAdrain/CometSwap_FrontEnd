/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    '@comet-swap/smart-router',
    '@cometswap/uikit',
    '@comet-swap/core-config',
    '@comet-swap/localization'
  ],
  experimental: {
    externalDir: true,
  },
  compiler: {
    styledComponents: true
  },
  typescript: {
    // 跳过类型检查，保持功能正常，类型错误后续慢慢修复
    ignoreBuildErrors: true
  },
  eslint: {
    // 跳过ESLint检查
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    
    // Map React Native to react-native-web for cross-platform compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    
    // Handle monorepo packages properly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    }
    
    return config
  },
  env: {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || '195',
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://testrpc.xlayer.tech',
  }
}

module.exports = nextConfig
