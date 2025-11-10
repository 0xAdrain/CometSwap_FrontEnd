import React from 'react'
import { styled } from '../styled-components'
import { space, layout, color, flexbox, position, variant, AllSystemProps, ResponsiveValue } from '../styled-system'

// AtomBox - Stellar UI通用布局容器组件
export interface AtomBoxProps extends 
  AllSystemProps, 
  Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  className?: string
  children?: React.ReactNode
  // Variant props for styled-system compatibility
  display?: 'flex' | 'block' | 'inline' | 'inline-flex' | 'none' | ResponsiveValue<'flex' | 'block' | 'inline' | 'inline-flex' | 'none'>
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  width?: string | number
  padding?: string | number
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

// Define variant mappings for styled-system compatibility
const displayVariants = {
  flex: { display: 'flex' },
  block: { display: 'block' },
  inline: { display: 'inline' },
  'inline-flex': { display: 'inline-flex' },
  none: { display: 'none' },
} as const

const flexDirectionVariants = {
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' },
} as const

const justifyContentVariants = {
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  center: { justifyContent: 'center' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' },
} as const

const alignItemsVariants = {
  start: { alignItems: 'flex-start' },
  end: { alignItems: 'flex-end' },
  center: { alignItems: 'center' },
  baseline: { alignItems: 'baseline' },
  stretch: { alignItems: 'stretch' },
} as const

const positionVariants = {
  static: { position: 'static' },
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  fixed: { position: 'fixed' },
  sticky: { position: 'sticky' },
} as const

const StyledAtomBox = styled.div<AtomBoxProps>`
  /* Base styles */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  
  /* Apply variant-based styling */
  ${variant({ prop: 'display', variants: displayVariants })}
  ${variant({ prop: 'flexDirection', variants: flexDirectionVariants })}
  ${variant({ prop: 'justifyContent', variants: justifyContentVariants })}
  ${variant({ prop: 'alignItems', variants: alignItemsVariants })}
  ${variant({ prop: 'position', variants: positionVariants })}
  
  /* Apply styled-system functions */
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  ${position}
`

export const AtomBox = React.forwardRef<HTMLDivElement, AtomBoxProps>(({
  as = 'div',
  className,
  children,
  ...props
}, ref) => {
  // If custom element type is specified, create styled component
  if (as !== 'div') {
    const CustomElement = styled(as)<AtomBoxProps>`
      /* Apply same styling as StyledAtomBox */
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      
      ${variant({ prop: 'display', variants: displayVariants })}
      ${variant({ prop: 'flexDirection', variants: flexDirectionVariants })}
      ${variant({ prop: 'justifyContent', variants: justifyContentVariants })}
      ${variant({ prop: 'alignItems', variants: alignItemsVariants })}
      ${variant({ prop: 'position', variants: positionVariants })}
      
      ${space}
      ${layout}
      ${color}
      ${flexbox}
      ${position}
    `
    
    return (
      <CustomElement
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </CustomElement>
    )
  }
  
  // Use Stellar UI's StyledAtomBox
  return (
    <StyledAtomBox
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </StyledAtomBox>
  )
})

AtomBox.displayName = 'StellarAtomBox'

export type { AtomBoxProps }

