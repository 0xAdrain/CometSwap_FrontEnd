/**
 * 🌟 STELLAR TYPE DEFINITIONS 🌟
 * Complete type system for Stellar compile-time style system
 * 
 * These types ensure 100% compatibility with styled-system
 * while enabling advanced compile-time optimizations.
 */

// =============================================================================
// CORE VALUE TYPES
// =============================================================================

/**
 * Length values supported by Stellar
 * Compatible with styled-system TLengthStyledSystem
 */
export type TLengthStyledSystem = string | 0 | number

/**
 * Responsive value types - supports arrays and objects
 */
export type ResponsiveValue<T> = T | T[] | { [key: string]: T }

// =============================================================================
// SPACE SYSTEM TYPES
// =============================================================================

/**
 * Space properties interface
 * Handles margin and padding with responsive support
 */
export interface SpaceProps {
  /** margin */
  m?: ResponsiveValue<TLengthStyledSystem>
  /** margin */
  margin?: ResponsiveValue<TLengthStyledSystem>
  /** margin-top */
  mt?: ResponsiveValue<TLengthStyledSystem>
  /** margin-top */
  marginTop?: ResponsiveValue<TLengthStyledSystem>
  /** margin-right */
  mr?: ResponsiveValue<TLengthStyledSystem>
  /** margin-right */
  marginRight?: ResponsiveValue<TLengthStyledSystem>
  /** margin-bottom */
  mb?: ResponsiveValue<TLengthStyledSystem>
  /** margin-bottom */
  marginBottom?: ResponsiveValue<TLengthStyledSystem>
  /** margin-left */
  ml?: ResponsiveValue<TLengthStyledSystem>
  /** margin-left */
  marginLeft?: ResponsiveValue<TLengthStyledSystem>
  /** margin-left and margin-right */
  mx?: ResponsiveValue<TLengthStyledSystem>
  /** margin-left and margin-right */
  marginX?: ResponsiveValue<TLengthStyledSystem>
  /** margin-top and margin-bottom */
  my?: ResponsiveValue<TLengthStyledSystem>
  /** margin-top and margin-bottom */
  marginY?: ResponsiveValue<TLengthStyledSystem>
  /** padding */
  p?: ResponsiveValue<TLengthStyledSystem>
  /** padding */
  padding?: ResponsiveValue<TLengthStyledSystem>
  /** padding-top */
  pt?: ResponsiveValue<TLengthStyledSystem>
  /** padding-top */
  paddingTop?: ResponsiveValue<TLengthStyledSystem>
  /** padding-right */
  pr?: ResponsiveValue<TLengthStyledSystem>
  /** padding-right */
  paddingRight?: ResponsiveValue<TLengthStyledSystem>
  /** padding-bottom */
  pb?: ResponsiveValue<TLengthStyledSystem>
  /** padding-bottom */
  paddingBottom?: ResponsiveValue<TLengthStyledSystem>
  /** padding-left */
  pl?: ResponsiveValue<TLengthStyledSystem>
  /** padding-left */
  paddingLeft?: ResponsiveValue<TLengthStyledSystem>
  /** padding-left and padding-right */
  px?: ResponsiveValue<TLengthStyledSystem>
  /** padding-left and padding-right */
  paddingX?: ResponsiveValue<TLengthStyledSystem>
  /** padding-top and padding-bottom */
  py?: ResponsiveValue<TLengthStyledSystem>
  /** padding-top and padding-bottom */
  paddingY?: ResponsiveValue<TLengthStyledSystem>
}

// =============================================================================
// LAYOUT SYSTEM TYPES
// =============================================================================

/**
 * Layout properties interface
 * Handles sizing, display, and overflow
 */
export interface LayoutProps {
  width?: ResponsiveValue<TLengthStyledSystem>
  height?: ResponsiveValue<TLengthStyledSystem>
  minWidth?: ResponsiveValue<TLengthStyledSystem>
  maxWidth?: ResponsiveValue<TLengthStyledSystem>
  minHeight?: ResponsiveValue<TLengthStyledSystem>
  maxHeight?: ResponsiveValue<TLengthStyledSystem>
  size?: ResponsiveValue<TLengthStyledSystem>
  display?: ResponsiveValue<string>
  verticalAlign?: ResponsiveValue<string>
  overflow?: ResponsiveValue<string>
  overflowX?: ResponsiveValue<string>
  overflowY?: ResponsiveValue<string>
}

// =============================================================================
// TYPOGRAPHY SYSTEM TYPES
// =============================================================================

/**
 * Typography properties interface  
 * Handles all text-related styling
 */
export interface TypographyProps {
  fontFamily?: ResponsiveValue<string>
  fontSize?: ResponsiveValue<TLengthStyledSystem>
  fontWeight?: ResponsiveValue<string | number>
  lineHeight?: ResponsiveValue<TLengthStyledSystem>
  letterSpacing?: ResponsiveValue<TLengthStyledSystem>
  textAlign?: ResponsiveValue<'left' | 'center' | 'right' | 'justify'>
  fontStyle?: ResponsiveValue<'normal' | 'italic' | 'oblique'>
}

// =============================================================================
// FLEXBOX SYSTEM TYPES
// =============================================================================

/**
 * Flexbox properties interface
 * Handles flex layout properties
 */
export interface FlexboxProps {
  alignItems?: ResponsiveValue<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>
  alignContent?: ResponsiveValue<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around'>
  justifyItems?: ResponsiveValue<'flex-start' | 'flex-end' | 'center' | 'stretch'>
  justifyContent?: ResponsiveValue<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'>
  flexWrap?: ResponsiveValue<'nowrap' | 'wrap' | 'wrap-reverse'>
  flexDirection?: ResponsiveValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>
  flex?: ResponsiveValue<string | number>
  flexGrow?: ResponsiveValue<number>
  flexShrink?: ResponsiveValue<number>
  flexBasis?: ResponsiveValue<TLengthStyledSystem>
  justifySelf?: ResponsiveValue<'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch'>
  alignSelf?: ResponsiveValue<'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>
  order?: ResponsiveValue<number>
}

// =============================================================================
// COLOR SYSTEM TYPES
// =============================================================================

/**
 * Color properties interface
 */
export interface ColorProps {
  color?: ResponsiveValue<string>
  backgroundColor?: ResponsiveValue<string>
  bg?: ResponsiveValue<string>
}

// =============================================================================
// BORDER SYSTEM TYPES
// =============================================================================

/**
 * Border properties interface
 */
export interface BorderProps {
  border?: ResponsiveValue<string>
  borderWidth?: ResponsiveValue<TLengthStyledSystem>
  borderStyle?: ResponsiveValue<'solid' | 'dashed' | 'dotted' | 'double' | 'none'>
  borderColor?: ResponsiveValue<string>
  borderRadius?: ResponsiveValue<TLengthStyledSystem>
  borderTop?: ResponsiveValue<string>
  borderTopWidth?: ResponsiveValue<TLengthStyledSystem>
  borderTopStyle?: ResponsiveValue<string>
  borderTopColor?: ResponsiveValue<string>
  borderTopLeftRadius?: ResponsiveValue<TLengthStyledSystem>
  borderTopRightRadius?: ResponsiveValue<TLengthStyledSystem>
  borderRight?: ResponsiveValue<string>
  borderRightWidth?: ResponsiveValue<TLengthStyledSystem>
  borderRightStyle?: ResponsiveValue<string>
  borderRightColor?: ResponsiveValue<string>
  borderBottom?: ResponsiveValue<string>
  borderBottomWidth?: ResponsiveValue<TLengthStyledSystem>
  borderBottomStyle?: ResponsiveValue<string>
  borderBottomColor?: ResponsiveValue<string>
  borderBottomLeftRadius?: ResponsiveValue<TLengthStyledSystem>
  borderBottomRightRadius?: ResponsiveValue<TLengthStyledSystem>
  borderLeft?: ResponsiveValue<string>
  borderLeftWidth?: ResponsiveValue<TLengthStyledSystem>
  borderLeftStyle?: ResponsiveValue<string>
  borderLeftColor?: ResponsiveValue<string>
}

// =============================================================================
// POSITION SYSTEM TYPES
// =============================================================================

/**
 * Position properties interface
 */
export interface PositionProps {
  position?: ResponsiveValue<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>
  zIndex?: ResponsiveValue<number>
  top?: ResponsiveValue<TLengthStyledSystem>
  right?: ResponsiveValue<TLengthStyledSystem>
  bottom?: ResponsiveValue<TLengthStyledSystem>
  left?: ResponsiveValue<TLengthStyledSystem>
}

// =============================================================================
// SHADOW SYSTEM TYPES  
// =============================================================================

/**
 * Shadow properties interface
 */
export interface ShadowProps {
  textShadow?: ResponsiveValue<string>
  boxShadow?: ResponsiveValue<string>
}

// =============================================================================
// VARIANT SYSTEM TYPES
// =============================================================================

/**
 * Variant configuration interface
 */
export interface VariantArgs {
  prop?: string
  variants: Record<string, any>
  scale?: string
}

// =============================================================================
// COMPOSITE TYPES
// =============================================================================

/**
 * All system properties combined
 */
export interface AllSystemProps
  extends SpaceProps,
    LayoutProps,
    TypographyProps,
    FlexboxProps,
    ColorProps,
    BorderProps,
    PositionProps,
    ShadowProps {}

/**
 * Style function interface
 */
export type StyleFunction<T = any> = (props: T) => Record<string, any>

// =============================================================================
// THEME SYSTEM TYPES
// =============================================================================

/**
 * Theme structure interface
 * Compatible with styled-system theme structure
 */
export interface Theme {
  breakpoints?: string[]
  colors?: Record<string, string>
  space?: (string | number)[]
  fontSizes?: (string | number)[]
  fonts?: Record<string, string>
  fontWeights?: Record<string, string | number>
  lineHeights?: Record<string, string | number>
  letterSpacings?: Record<string, string>
  sizes?: Record<string, string | number>
  borders?: Record<string, string>
  borderWidths?: Record<string, string | number>
  borderStyles?: Record<string, string>
  radii?: Record<string, string | number>
  shadows?: Record<string, string>
  zIndices?: Record<string, number>
}

// =============================================================================
// STELLAR COMPILATION TYPES
// =============================================================================

/**
 * Stellar compilation context
 */
export interface StellarContext {
  filename: string
  source: string
  imports: Map<string, string>
  components: ComponentAnalysis[]
  optimizations: OptimizationResult[]
}

/**
 * Component analysis result
 */
export interface ComponentAnalysis {
  name: string
  type: 'styled-component' | 'stellar-component'
  styleProps: StyleProperty[]
  variants: VariantDefinition[]
  performance: PerformanceMetrics
}

/**
 * Style property analysis
 */
export interface StyleProperty {
  system: 'space' | 'layout' | 'typography' | 'color' | 'flexbox' | 'variant'
  property: string
  value: StyleValue
  responsive: boolean
  compiledValue: StellarStyleObject
}

/**
 * Style value types for compilation
 */
export type StyleValue = 
  | string 
  | number 
  | ResponsiveArray 
  | ThemeReference
  | ComputedValue

/**
 * Responsive array with breakpoint information
 */
export interface ResponsiveArray {
  type: 'responsive'
  values: (string | number)[]
  breakpoints: string[]
}

/**
 * Theme reference for compile-time resolution
 */
export interface ThemeReference {
  type: 'theme'
  path: string
  fallback?: string | number
}

/**
 * Computed value with dependencies
 */
export interface ComputedValue {
  type: 'computed'
  expression: string
  dependencies: string[]
}

/**
 * Variant definition for compilation
 */
export interface VariantDefinition {
  name: string
  prop: string
  variants: Record<string, StellarStyleObject>
  defaultVariant?: string
}

/**
 * Stellar style object (compilation target)
 */
export interface StellarStyleObject {
  [key: string]: any
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  originalSize: number
  compiledSize: number
  runtimeSavings: number
  optimizationLevel: number
}

/**
 * Optimization result
 */
export interface OptimizationResult {
  type: 'dead-code-elimination' | 'style-merging' | 'constant-folding' | 'theme-resolution'
  description: string
  savingsBytes: number
  savingsMs: number
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Extract props type from style function
 */
export type ExtractProps<T> = T extends StyleFunction<infer P> ? P : never

/**
 * Make properties responsive
 */
export type Responsive<T> = {
  [K in keyof T]: ResponsiveValue<T[K]>
}

/**
 * Conditional type for compile-time vs runtime
 */
export type StellarOptimized<T, Fallback = T> = T extends { __stellarCompiled: true } ? never : Fallback

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Default breakpoints (compatible with styled-system)
 */
export const DEFAULT_BREAKPOINTS = ['40em', '52em', '64em']

/**
 * Default space scale (compatible with styled-system)  
 */
export const DEFAULT_SPACE_SCALE = [0, 4, 8, 16, 32, 64, 128, 256, 512]

/**
 * Stellar compilation marker
 */
export const STELLAR_COMPILED_MARKER = '__STELLAR_COMPILED__'

// =============================================================================
// STELLAR FUNCTION INTERFACES
// =============================================================================

/**
 * Stellar function interface
 * Functions marked with this type are optimized by the compiler
 */
export interface StellarFunction<T> {
  (props: T): Record<string, any>
  [STELLAR_COMPILED_MARKER]?: boolean
}

/**
 * Stellar variant function interface
 */
export interface StellarVariantFunction {
  (args: VariantArgs): (props: any) => Record<string, any>
  [STELLAR_COMPILED_MARKER]?: boolean
}

/**
 * Stellar compose function interface  
 */
export interface StellarComposeFunction {
  (...funcs: StellarFunction<any>[]): StellarFunction<any>
  [STELLAR_COMPILED_MARKER]?: boolean
}





