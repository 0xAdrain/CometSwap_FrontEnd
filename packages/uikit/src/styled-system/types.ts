// Styled System Types for UIKit
// 参考styled-system和PancakeSwap实现

export interface SpaceProps {
  m?: string | number
  mt?: string | number
  mr?: string | number
  mb?: string | number
  ml?: string | number
  mx?: string | number
  my?: string | number
  p?: string | number
  pt?: string | number
  pr?: string | number
  pb?: string | number
  pl?: string | number
  px?: string | number
  py?: string | number
  margin?: string | number
  marginTop?: string | number
  marginRight?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  padding?: string | number
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
}

export interface LayoutProps {
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  size?: string | number
  display?: string
  verticalAlign?: string
  overflow?: string
  overflowX?: string
  overflowY?: string
}

export interface FlexboxProps {
  alignItems?: string
  alignContent?: string
  justifyItems?: string
  justifyContent?: string
  flexWrap?: string
  flexDirection?: string
  flex?: string | number
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string | number
  justifySelf?: string
  alignSelf?: string
  order?: number
}

export interface TypographyProps {
  fontFamily?: string
  fontSize?: string | number
  fontWeight?: string | number
  lineHeight?: string | number
  letterSpacing?: string | number
  textAlign?: string
  fontStyle?: string
}

export interface ColorProps {
  color?: string
  bg?: string
  backgroundColor?: string
  opacity?: number
}

export interface PositionProps {
  position?: string
  zIndex?: number
  top?: string | number
  right?: string | number
  bottom?: string | number
  left?: string | number
}

export interface BorderProps {
  border?: string
  borderWidth?: string | number
  borderStyle?: string
  borderColor?: string
  borderRadius?: string | number
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  borderTopWidth?: string | number
  borderRightWidth?: string | number
  borderBottomWidth?: string | number
  borderLeftWidth?: string | number
}

export interface BackgroundProps {
  background?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
}

export interface GridProps {
  gridGap?: string | number
  gridRowGap?: string | number
  gridColumnGap?: string | number
  gridColumn?: string
  gridRow?: string
  gridArea?: string
  gridAutoFlow?: string
  gridAutoRows?: string
  gridAutoColumns?: string
  gridTemplateRows?: string
  gridTemplateColumns?: string
  gridTemplateAreas?: string
}

export interface ShadowProps {
  boxShadow?: string
  textShadow?: string
}

// 组合所有样式props
export interface AllSystemProps
  extends SpaceProps,
    LayoutProps,
    FlexboxProps,
    TypographyProps,
    ColorProps,
    PositionProps,
    BorderProps,
    BackgroundProps,
    GridProps,
    ShadowProps {}

// Responsive value type - 支持数组和对象形式的响应式值
export type ResponsiveValue<T> = T | T[] | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T; xxl?: T }

// Length type
export type TLengthStyledSystem = string | 0 | number

// Variant arguments
export interface VariantArgs {
  prop?: string
  scale?: string
  variants?: Record<string, any>
}

// Style function type
export type StyleFunction = (props: any) => any

// Theme type
export interface Theme {
  [key: string]: any
}
