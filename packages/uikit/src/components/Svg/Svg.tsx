import React from 'react'
import { styled } from '../../styled-components'
import { Box } from '../Box'
import getThemeValue from "../../util/getThemeValue"
import { SvgProps } from "./types"

// 创建基础SVG元素组件
const BaseSvg = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props} />
))
BaseSvg.displayName = 'BaseSvg'

// 使用Stellar UI样式化SVG组件
interface StyledSvgProps {
  spin?: boolean
}

const StyledSvg = styled(BaseSvg)<StyledSvgProps>`
  align-self: center; /* Safari fix */
  flex-shrink: 0;
  
  /* Safari fix for filters */
  @supports (-webkit-text-size-adjust: none) and (not (-ms-accelerator: true)) and (not (-moz-appearance: none)) {
    filter: none !important;
  }
  
  /* Spin animation */
  ${({ spin }: StyledSvgProps) => spin ? `
    animation-name: spin;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  ` : ''}
`;

// 注入旋转动画CSS（一次性注入）
const injectSpinAnimation = (() => {
  let injected = false
  return () => {
    if (typeof document === 'undefined' || injected) return
    
    const style = document.createElement('style')
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)
    injected = true
  }
})()

// Svg组件实现 - 更简洁的版本
const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({
  color = "text",
  width = "20px",
  spin = false,
  className,
  style,
  children,
  theme,
  ...props
}, ref) => {
  // 一次性注入动画样式
  React.useEffect(() => {
    injectSpinAnimation()
  }, [])
  
  // 处理颜色 - 支持主题颜色和自定义颜色
  const fillColor = React.useMemo(() => {
    if (theme && color && !color.startsWith('#')) {
      return getThemeValue(theme, `colors.${color}`, color)
    }
    return color
  }, [theme, color])
  
  return (
    <StyledSvg
      ref={ref}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      spin={spin || undefined}
      className={className}
      style={{
        fill: fillColor,
        color: fillColor,
        ...style,
      }}
      {...(props as any)} // Type assertion to bypass strict typing for now
    >
      {children}
    </StyledSvg>
  )
})

Svg.displayName = 'Svg'

export default Svg