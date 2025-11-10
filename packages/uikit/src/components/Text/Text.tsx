import React from 'react'
import { styled } from '../../styled-components'
import { color, typography, ColorProps, TypographyProps, SpaceProps, LayoutProps } from '../../styled-system'

// Modern Text interface - using styled-system props
export interface TextProps extends 
  React.HTMLAttributes<HTMLElement>,
  ColorProps,
  TypographyProps,
  SpaceProps,
  LayoutProps {
  ellipsis?: boolean
  bold?: boolean
  small?: boolean
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: React.ReactNode
}

// Modern Stellar Text - powered by styled-system
const StyledText = styled.span<TextProps & { 
  $ellipsis?: boolean
  $bold?: boolean
  $small?: boolean
}>`
  /* Reset and base styles */
  margin: 0;
  padding: 0;
  font-family: inherit;
  
  /* Default typography */
  line-height: 1.5;
  font-size: 16px;
  font-weight: 400;
  color: var(--stellar-text);
  
  /* Convenience props handling */
  ${({ $bold }: { $bold?: boolean }) => $bold && 'font-weight: 700;'}
  ${({ $small }: { $small?: boolean }) => $small && 'font-size: 12px;'}
  
  /* Ellipsis handling */
  ${({ $ellipsis }: { $ellipsis?: boolean }) => $ellipsis && `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
  
  /* Smooth transitions */
  transition: color 0.2s ease;
  
  /* Apply styled-system functions - this replaces all our manual logic */
  ${color}
  ${typography}
`;

// Modern Stellar Text Component - powered by styled-system
const Text = React.forwardRef<HTMLElement, TextProps>(({
  ellipsis = false,
  bold = false,
  small = false,
  as = 'span',
  children,
  className,
  ...props
}, ref) => {
  return (
    <StyledText
      as={as}
      ref={ref}
      $ellipsis={ellipsis}
      $bold={bold}
      $small={small}
      className={className}
      {...props}
    >
      {children}
    </StyledText>
  )
})

Text.displayName = 'StellarText'

export default Text

// Common text variants for convenience
export const Heading = React.forwardRef<HTMLHeadingElement, TextProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(({
  level = 1,
  fontSize,
  fontWeight = '700',
  ...props
}, ref) => {
  const defaultFontSizes = {
    1: '32px',
    2: '24px', 
    3: '20px',
    4: '18px',
    5: '16px',
    6: '14px'
  } as const
  
  const headingAs = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  return (
    <Text
      ref={ref}
      as={headingAs}
      fontSize={fontSize || defaultFontSizes[level]}
      fontWeight={fontWeight}
      {...props}
    />
  )
})

Heading.displayName = 'StellarHeading'

export const SmallText = React.forwardRef<HTMLElement, TextProps>((props, ref) => (
  <Text ref={ref} small {...props} />
))

SmallText.displayName = 'StellarSmallText'

export const BoldText = React.forwardRef<HTMLElement, TextProps>((props, ref) => (
  <Text ref={ref} bold {...props} />
))

BoldText.displayName = 'StellarBoldText'