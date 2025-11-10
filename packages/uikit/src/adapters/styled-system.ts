/**
 * Styled-System 到 Stellar 的适配层
 * 保持原有 styled-system API 不变，底层使用 Stellar 实现
 */

import { ViewStyle, TextStyle } from 'react-native'

// 定义原 styled-system 的接口
export interface SpaceProps {
  m?: string | number | (string | number)[]
  margin?: string | number | (string | number)[]
  mt?: string | number | (string | number)[]
  marginTop?: string | number | (string | number)[]
  mr?: string | number | (string | number)[]
  marginRight?: string | number | (string | number)[]
  mb?: string | number | (string | number)[]
  marginBottom?: string | number | (string | number)[]
  ml?: string | number | (string | number)[]
  marginLeft?: string | number | (string | number)[]
  mx?: string | number | (string | number)[]
  marginX?: string | number | (string | number)[]
  my?: string | number | (string | number)[]
  marginY?: string | number | (string | number)[]
  p?: string | number | (string | number)[]
  padding?: string | number | (string | number)[]
  pt?: string | number | (string | number)[]
  paddingTop?: string | number | (string | number)[]
  pr?: string | number | (string | number)[]
  paddingRight?: string | number | (string | number)[]
  pb?: string | number | (string | number)[]
  paddingBottom?: string | number | (string | number)[]
  pl?: string | number | (string | number)[]
  paddingLeft?: string | number | (string | number)[]
  px?: string | number | (string | number)[]
  paddingX?: string | number | (string | number)[]
  py?: string | number | (string | number)[]
  paddingY?: string | number | (string | number)[]
}

export interface LayoutProps {
  width?: string | number | (string | number)[]
  height?: string | number | (string | number)[]
  minWidth?: string | number | (string | number)[]
  maxWidth?: string | number | (string | number)[]
  minHeight?: string | number | (string | number)[]
  maxHeight?: string | number | (string | number)[]
  display?: string
  overflow?: string
  overflowX?: string
  overflowY?: string
}

export interface TypographyProps {
  fontFamily?: string
  fontSize?: string | number | (string | number)[]
  fontWeight?: string | number
  lineHeight?: string | number | (string | number)[]
  letterSpacing?: string | number | (string | number)[]
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  fontStyle?: string
}

export interface FlexboxProps {
  alignItems?: string
  alignContent?: string  
  justifyContent?: string
  flexWrap?: string
  flexDirection?: string
  flex?: string | number
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string | number
  justifyItems?: string
  justifySelf?: string
  alignSelf?: string
  order?: number
}

// 响应式值类型
export type ResponsiveValue<T> = T | T[]

// 工具函数：转换 styled-system 值到 Stellar 样式
const convertSpaceValue = (value: string | number): string => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  if (typeof value === 'string') {
    // 如果是主题token，保持原样
    if (value.startsWith('$')) return value
    // 数字字符串转换为px
    if (/^\d+$/.test(value)) return `${value}px`
    return value
  }
  return '0'
}

const processResponsiveValue = (value: string | number | (string | number)[]): any => {
  if (Array.isArray(value)) {
    // 响应式数组值，取第一个作为默认值
    return convertSpaceValue(value[0] || 0)
  }
  return convertSpaceValue(value)
}

// Space 系统适配函数 - 转换为 Stellar 样式对象
export const space = (props: SpaceProps): any => {
  const styles: Record<string, any> = {}
  
  // Margin
  if (props.m !== undefined) styles.margin = processResponsiveValue(props.m)
  if (props.margin !== undefined) styles.margin = processResponsiveValue(props.margin)
  if (props.mt !== undefined) styles.marginTop = processResponsiveValue(props.mt)
  if (props.marginTop !== undefined) styles.marginTop = processResponsiveValue(props.marginTop)
  if (props.mr !== undefined) styles.marginRight = processResponsiveValue(props.mr)
  if (props.marginRight !== undefined) styles.marginRight = processResponsiveValue(props.marginRight)
  if (props.mb !== undefined) styles.marginBottom = processResponsiveValue(props.mb)
  if (props.marginBottom !== undefined) styles.marginBottom = processResponsiveValue(props.marginBottom)
  if (props.ml !== undefined) styles.marginLeft = processResponsiveValue(props.ml)
  if (props.marginLeft !== undefined) styles.marginLeft = processResponsiveValue(props.marginLeft)
  if (props.mx !== undefined) {
    const val = processResponsiveValue(props.mx)
    styles.marginLeft = val
    styles.marginRight = val
  }
  if (props.marginX !== undefined) {
    const val = processResponsiveValue(props.marginX)
    styles.marginLeft = val
    styles.marginRight = val
  }
  if (props.my !== undefined) {
    const val = processResponsiveValue(props.my)
    styles.marginTop = val
    styles.marginBottom = val
  }
  if (props.marginY !== undefined) {
    const val = processResponsiveValue(props.marginY)
    styles.marginTop = val
    styles.marginBottom = val
  }

  // Padding
  if (props.p !== undefined) styles.padding = processResponsiveValue(props.p)
  if (props.padding !== undefined) styles.padding = processResponsiveValue(props.padding)
  if (props.pt !== undefined) styles.paddingTop = processResponsiveValue(props.pt)
  if (props.paddingTop !== undefined) styles.paddingTop = processResponsiveValue(props.paddingTop)
  if (props.pr !== undefined) styles.paddingRight = processResponsiveValue(props.pr)
  if (props.paddingRight !== undefined) styles.paddingRight = processResponsiveValue(props.paddingRight)
  if (props.pb !== undefined) styles.paddingBottom = processResponsiveValue(props.pb)
  if (props.paddingBottom !== undefined) styles.paddingBottom = processResponsiveValue(props.paddingBottom)
  if (props.pl !== undefined) styles.paddingLeft = processResponsiveValue(props.pl)
  if (props.paddingLeft !== undefined) styles.paddingLeft = processResponsiveValue(props.paddingLeft)
  if (props.px !== undefined) {
    const val = processResponsiveValue(props.px)
    styles.paddingLeft = val
    styles.paddingRight = val
  }
  if (props.paddingX !== undefined) {
    const val = processResponsiveValue(props.paddingX)
    styles.paddingLeft = val
    styles.paddingRight = val
  }
  if (props.py !== undefined) {
    const val = processResponsiveValue(props.py)
    styles.paddingTop = val
    styles.paddingBottom = val
  }
  if (props.paddingY !== undefined) {
    const val = processResponsiveValue(props.paddingY)
    styles.paddingTop = val
    styles.paddingBottom = val
  }

  return styles
}

// Layout 系统适配函数
export const layout = (props: LayoutProps): any => {
  const styles: Record<string, any> = {}
  
  if (props.width !== undefined) styles.width = processResponsiveValue(props.width)
  if (props.height !== undefined) styles.height = processResponsiveValue(props.height)
  if (props.minWidth !== undefined) styles.minWidth = processResponsiveValue(props.minWidth)
  if (props.maxWidth !== undefined) styles.maxWidth = processResponsiveValue(props.maxWidth)
  if (props.minHeight !== undefined) styles.minHeight = processResponsiveValue(props.minHeight)
  if (props.maxHeight !== undefined) styles.maxHeight = processResponsiveValue(props.maxHeight)
  if (props.display !== undefined) styles.display = props.display
  if (props.overflow !== undefined) styles.overflow = props.overflow
  if (props.overflowX !== undefined) styles.overflowX = props.overflowX
  if (props.overflowY !== undefined) styles.overflowY = props.overflowY

  return styles
}

// Typography 系统适配函数
export const typography = (props: TypographyProps): any => {
  const styles: Record<string, any> = {}
  
  if (props.fontFamily !== undefined) styles.fontFamily = props.fontFamily
  if (props.fontSize !== undefined) styles.fontSize = processResponsiveValue(props.fontSize)
  if (props.fontWeight !== undefined) styles.fontWeight = props.fontWeight
  if (props.lineHeight !== undefined) styles.lineHeight = processResponsiveValue(props.lineHeight)
  if (props.letterSpacing !== undefined) styles.letterSpacing = processResponsiveValue(props.letterSpacing)
  if (props.textAlign !== undefined) styles.textAlign = props.textAlign
  if (props.fontStyle !== undefined) styles.fontStyle = props.fontStyle

  return styles
}

// Flexbox 系统适配函数
export const flexbox = (props: FlexboxProps): any => {
  const styles: Record<string, any> = {}
  
  if (props.alignItems !== undefined) styles.alignItems = props.alignItems
  if (props.alignContent !== undefined) styles.alignContent = props.alignContent
  if (props.justifyContent !== undefined) styles.justifyContent = props.justifyContent
  if (props.flexWrap !== undefined) styles.flexWrap = props.flexWrap
  if (props.flexDirection !== undefined) styles.flexDirection = props.flexDirection
  if (props.flex !== undefined) styles.flex = props.flex
  if (props.flexGrow !== undefined) styles.flexGrow = props.flexGrow
  if (props.flexShrink !== undefined) styles.flexShrink = props.flexShrink
  if (props.flexBasis !== undefined) styles.flexBasis = processResponsiveValue(props.flexBasis)
  if (props.justifyItems !== undefined) styles.justifyItems = props.justifyItems
  if (props.justifySelf !== undefined) styles.justifySelf = props.justifySelf
  if (props.alignSelf !== undefined) styles.alignSelf = props.alignSelf
  if (props.order !== undefined) styles.order = props.order

  return styles
}

// Variant 系统适配函数
export const variant = ({ prop = 'variant', variants }: { 
  prop?: string
  variants: Record<string, any> 
}) => {
  return (props: any) => {
    const variantKey = props[prop]
    if (variantKey && variants[variantKey]) {
      return variants[variantKey]
    }
    return {}
  }
}

// 组合所有样式系统
export const compose = (...funcs: any[]) => {
  return (props: any) => {
    return funcs.reduce((acc, func) => {
      return { ...acc, ...func(props) }
    }, {})
  }
}

// 导出常用组合
export const allStyleSystem = compose(space, layout, typography, flexbox)

// 兼容性导出，保持原 styled-system 的使用方式
export default {
  space,
  layout, 
  typography,
  flexbox,
  variant,
  compose
}














