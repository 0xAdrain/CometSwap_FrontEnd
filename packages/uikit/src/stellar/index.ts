/**
 * 🌟 STELLAR UI SYSTEM 🌟
 * Next-generation compile-time style system
 * 
 * The future of styled-system with zero runtime overhead,
 * advanced optimizations, and complete independence.
 */

// Core compiler (used at build time)
export { StellarCompiler, createStellarCompiler } from './core/compiler'
export type { StellarCompilationResult } from './core/compiler'

// Babel plugin for build integration
export { default as stellarBabelPlugin, stellarPlugin } from './babel-plugin'

// Zero-runtime API (styled-system replacement)
import { space, layout, typography, flexbox, variant, compose } from './runtime'
import shouldForwardProp from './runtime/should-forward-prop'
import { StellarCompiler, createStellarCompiler } from './core/compiler'
import stellarBabelPlugin from './babel-plugin'
import { stellarPlugin } from './vite-plugin'

export {
  space,
  layout, 
  typography,
  flexbox,
  variant,
  compose,
  getStellarStatus,
  isCompiled,
  markCompiled
} from './runtime'

// Should-forward-prop replacement
export { default as shouldForwardProp } from './runtime/should-forward-prop'

// Complete type system
export type {
  // Core types
  SpaceProps,
  LayoutProps,
  TypographyProps,
  FlexboxProps,
  ColorProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  AllSystemProps,
  ResponsiveValue,
  TLengthStyledSystem,
  VariantArgs,
  StyleFunction,
  Theme,
  
  // Compilation types
  StellarContext,
  ComponentAnalysis,
  StyleProperty,
  StyleValue,
  PerformanceMetrics,
  OptimizationResult,
  StellarStyleObject
} from './types'

// Version and metadata
export const STELLAR_VERSION = '1.0.0-alpha'
export const STELLAR_BUILD_TARGET = 'independent' // 🔥 Pure Stellar implementation

/**
 * Stellar configuration helper
 */
export interface StellarConfig {
  /** Optimization level (0-3, default: 3) */
  optimizationLevel?: number
  /** Target platform */
  targetPlatform?: 'web' | 'native' | 'universal'
  /** Enable debug logging */
  enableDebug?: boolean
  /** Enable performance metrics */
  enableMetrics?: boolean
  /** Custom breakpoints */
  breakpoints?: string[]
  /** Custom space scale */
  spaceScale?: (string | number)[]
}

/**
 * Create Stellar configuration for Babel
 */
export function createStellarConfig(config: StellarConfig = {}): [string, StellarConfig] {
  return ['stellar-ui-transform', {
    optimizationLevel: 3,
    targetPlatform: 'universal',
    enableDebug: process.env.NODE_ENV === 'development',
    enableMetrics: true,
    ...config
  }]
}

/**
 * Get Stellar runtime status
 */
function getStellarStatus() {
  return {
    compiled: !!(space as any).STELLAR_COMPILED,
    version: STELLAR_VERSION,
    mode: process.env.NODE_ENV || 'production'
  }
}

/**
 * Development helper to check Stellar status
 */
export function checkStellarHealth(): {
  version: string
  buildTarget: string
  runtimeStatus: any
  recommendations: string[]
} {
  const runtimeStatus = getStellarStatus()
  const recommendations: string[] = []
  
  if (!runtimeStatus.compiled) {
    recommendations.push(
      'Enable Stellar compiler in your build process for zero-runtime performance',
      'Add stellar-babel-plugin to your Babel configuration',
      'Ensure styled-system imports are redirected to Stellar runtime'
    )
  }
  
  if (process.env.NODE_ENV === 'production' && !runtimeStatus.compiled) {
    recommendations.push('WARNING: Running uncompiled Stellar in production - performance impact expected')
  }
  
  return {
    version: STELLAR_VERSION,
    buildTarget: STELLAR_BUILD_TARGET,
    runtimeStatus,
    recommendations
  }
}

/**
 * Default export with complete Stellar API
 */
export default {
  // Compiler
  StellarCompiler,
  createStellarCompiler,
  
  // Plugins
  stellarBabelPlugin,
  stellarPlugin,
  
  // Runtime
  space,
  layout,
  typography,
  flexbox,
  variant,
  compose,
  shouldForwardProp: shouldForwardProp as any,
  
  // Utils
  getStellarStatus,
  isCompiled: ((fn: any) => !!(fn as any).STELLAR_COMPILED) as any,
  markCompiled: ((fn: any) => { (fn as any).STELLAR_COMPILED = true }) as any,
  
  // Config
  createStellarConfig,
  checkStellarHealth,
  
  // Meta
  version: STELLAR_VERSION,
  buildTarget: STELLAR_BUILD_TARGET
} as any







