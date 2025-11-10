/**
 * STELLAR VITE PLUGIN
 * Wraps the Babel plugin to integrate with Vite's build system
 * 
 * This plugin enables zero-runtime compilation during Vite builds
 */

import type { Plugin } from 'vite'
import stellarBabelPlugin from './babel-plugin'
import type { StellarPluginOptions } from './babel-plugin'
import { transform } from '@babel/core'

/**
 * Stellar Vite Plugin
 * Integrates Stellar compiler with Vite build process
 */
export function stellarVitePlugin(options: StellarPluginOptions = {}): Plugin {
  return {
    name: 'stellar-ui-transform',
    enforce: 'pre', // Run before other plugins
    
    async transform(code: string, id: string) {
      // Only process TypeScript/JavaScript files
      if (!/\.(ts|tsx|js|jsx)$/.test(id)) {
        return null
      }
      
      // Skip node_modules
      if (id.includes('node_modules')) {
        return null
      }
      
      // Skip if no styled-system imports detected
      if (!code.includes('styled-system') && !code.includes('styled-components')) {
        return null
      }
      
      try {
        // Transform with Stellar Babel plugin
        const babelPlugin = stellarBabelPlugin()
        babelPlugin.pre?.({
          opts: options,
          filename: id
        } as any)
        
        const result = await transform(code, {
          filename: id,
          plugins: [[babelPlugin, options]],
          parserOpts: {
            plugins: ['jsx', 'typescript', 'decorators-legacy', 'classProperties']
          }
        })
        
        if (result && result.code) {
          return {
            code: result.code,
            map: result.map || null
          }
        }
        
        return null
      } catch (error) {
        if (options.enableDebug) {
          console.warn(`⚠️  Stellar: Failed to transform ${id}:`, error)
        }
        // Don't fail the build, just skip transformation
        return null
      }
    }
  }
}

/**
 * Plugin configuration helper
 */
export function stellarPlugin(options: StellarPluginOptions = {}) {
  return stellarVitePlugin(options)
}

