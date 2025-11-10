import React from 'react'
import { styled, keyframes } from '../../styled-components'
import { variant as systemVariant } from '../../styled-system'
import { ButtonProps } from './types'
import { scaleVariants, styleVariants } from './theme'

// Spin animation for loading spinner
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled loading spinner component
const StyledLoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

// Independent Stellar Button - powered by our own variant system
const StyledButton = styled.button<ButtonProps>`
  /* Base styles */
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  /* Handle disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  /* Handle loading state */
  ${({ isLoading }) => isLoading && `
    opacity: 0.7;
    cursor: not-allowed;
  `}

  /* Focus states for accessibility */
  &:focus-visible {
    outline: 2px solid var(--stellar-primary);
    outline-offset: 2px;
  }
  
  /* Apply scale and style variants */
  ${systemVariant({
    prop: 'scale',
    variants: scaleVariants,
  })}
  
  ${systemVariant({
    variants: styleVariants,
  })}

  /* Full width */
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
`

// Loading spinner component - now using our styled system
const LoadingSpinner: React.FC = () => <StyledLoadingSpinner />

// Main Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size, // Our prop
  scale, // PancakeSwap alias
  fullWidth = false,
  isLoading = false,
  startIcon,
  endIcon,
  children,
  disabled,
  as: Component = 'button',
  ...props
}, ref) => {
  
  return (
    <StyledButton
      as={Component}
      ref={ref}
      variant={variant}
      scale={scale || size || 'md'} // Prioritize scale, fallback to size, then md
      fullWidth={fullWidth}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {startIcon && !isLoading && startIcon}
      {children}
      {endIcon && !isLoading && endIcon}
    </StyledButton>
  )
})

Button.displayName = 'StellarButton'

// Inject global CSS animation for spinner
if (typeof document !== 'undefined') {
  const styleId = 'stellar-spinner-animation';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId;
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)
  }
}

export default Button