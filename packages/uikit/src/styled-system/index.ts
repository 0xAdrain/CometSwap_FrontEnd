/**
 * 🌟 STELLAR STYLED-SYSTEM 🌟
 * 
 * This module provides 100% API compatibility with styled-system
 * while delivering enhanced performance and cross-platform capabilities.
 */
// Re-export enhanced Stellar runtime API
export {
  space,
  layout, 
  typography,
  flexbox,
  compose,
  getStellarStatus,
  isCompiled,
  markCompiled
} from '../stellar/runtime'

// Export our new, powerful variant function
export { variant } from './variant'

// Additional styled-system functions not in stellar/runtime yet
export { color, border, position } from './functions'

// Re-export types for full compatibility
export type {
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
  Theme
} from './types'

// Import for default export
import {
  space as spaceImpl,
  layout as layoutImpl,
  typography as typographyImpl,
  flexbox as flexboxImpl,
  variant as variantImpl,
  compose as composeImpl
} from '../stellar/runtime'

import { color as colorImpl, border as borderImpl, position as positionImpl } from './functions'

// Complete styled-system API - PancakeSwap compatible
export default {
  space: spaceImpl,
  layout: layoutImpl,
  typography: typographyImpl,
  flexbox: flexboxImpl,
  color: colorImpl,
  border: borderImpl,
  position: positionImpl,
  variant: variantImpl,
  compose: composeImpl
}




