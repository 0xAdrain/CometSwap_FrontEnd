/**
 * 🌟 STELLAR SHOULD-FORWARD-PROP 🌟
 * Replacement for @styled-system/should-forward-prop
 * 
 * Zero-runtime version - optimized away by Stellar compiler
 */

import { STELLAR_COMPILED_MARKER } from '../types'

// List of styled-system props that should NOT be forwarded to DOM
const STYLED_SYSTEM_PROPS = new Set([
  // Space props
  'm', 'margin', 'mt', 'marginTop', 'mr', 'marginRight', 'mb', 'marginBottom', 
  'ml', 'marginLeft', 'mx', 'marginX', 'my', 'marginY',
  'p', 'padding', 'pt', 'paddingTop', 'pr', 'paddingRight', 'pb', 'paddingBottom',
  'pl', 'paddingLeft', 'px', 'paddingX', 'py', 'paddingY',
  
  // Layout props
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'size',
  'display', 'verticalAlign', 'overflow', 'overflowX', 'overflowY',
  
  // Typography props
  'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
  'textAlign', 'fontStyle',
  
  // Flexbox props
  'alignItems', 'alignContent', 'justifyItems', 'justifyContent', 'flexWrap',
  'flexDirection', 'flex', 'flexGrow', 'flexShrink', 'flexBasis',
  'justifySelf', 'alignSelf', 'order',
  
  // Color props
  'color', 'backgroundColor', 'bg',
  
  // Border props
  'border', 'borderWidth', 'borderStyle', 'borderColor', 'borderRadius',
  'borderTop', 'borderTopWidth', 'borderTopStyle', 'borderTopColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderRight', 'borderRightWidth',
  'borderRightStyle', 'borderRightColor', 'borderBottom', 'borderBottomWidth',
  'borderBottomStyle', 'borderBottomColor', 'borderBottomLeftRadius',
  'borderBottomRightRadius', 'borderLeft', 'borderLeftWidth', 'borderLeftStyle',
  'borderLeftColor',
  
  // Position props
  'position', 'zIndex', 'top', 'right', 'bottom', 'left',
  
  // Shadow props
  'textShadow', 'boxShadow',
  
  // Variant props
  'variant', 'scale'
])

/**
 * Stellar-optimized shouldForwardProp function
 * ⚡ Zero runtime overhead when compiled by Stellar
 */
const shouldForwardProp = ((prop: string): boolean => {
  if (process.env.NODE_ENV === 'development' && !(shouldForwardProp as any)[STELLAR_COMPILED_MARKER]) {
    // Only warn once per session in development
    if (!(globalThis as any).__stellarShouldForwardPropWarned) {
      // 🚨 AUDIT FIX: Runtime implementation - compiler not active
      ;(globalThis as any).__stellarShouldForwardPropWarned = true
    }
  }

  // Don't forward styled-system props
  if (STYLED_SYSTEM_PROPS.has(prop)) {
    return false
  }
  
  // Don't forward props starting with $ (styled-components convention)
  if (prop.startsWith('$')) {
    return false
  }
  
  // Don't forward common framework props
  if (prop === 'theme' || prop === 'as' || prop === 'forwardedAs') {
    return false
  }
  
  // Forward all other props (HTML attributes, event handlers, etc.)
  return true
}) as StellarShouldForwardProp

/**
 * Stellar function interface with compilation marker
 */
interface StellarShouldForwardProp {
  (prop: string): boolean
  [STELLAR_COMPILED_MARKER]?: boolean
}

// Default export for compatibility with @styled-system/should-forward-prop
export default shouldForwardProp

// Named export for convenience
export { shouldForwardProp }














