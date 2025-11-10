/**
 * 🃏 Card Component - Stellar UI Implementation  
 * Modern, accessible card component with Stellar UI styling
 */
import { styled } from "../../styled-components"
import { space } from "../../styled-system"
import { Box } from "../Box"
import { CardProps } from "./types"

interface StyledCardProps extends CardProps {
  // No theme dependency - using CSS variables
}

/**
 * Priority: Warning --> Success --> Active
 * Now using CSS variables instead of theme object
 */
const getBorderColor = (props: StyledCardProps) => {
  const { isActive, isSuccess, isWarning, borderBackground } = props
  
  if (borderBackground) {
    return borderBackground
  }
  if (isWarning) {
    return 'var(--stellar-warning)'
  }
  if (isSuccess) {
    return 'var(--stellar-success)'
  }
  if (isActive) {
    return 'linear-gradient(180deg, var(--stellar-primaryBright), var(--stellar-secondary))'
  }
  return 'var(--stellar-cardBorder)'
}

const StyledCardBase = styled.div<StyledCardProps>`
  /* Base styles */
  border-radius: var(--stellar-borderRadius-card);
  overflow: hidden;
  position: relative;
  padding: 1px 1px 3px 1px;
  
  /* Modern shadow and transitions */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Dynamic border color based on state */
  border: 2px solid ${getBorderColor};
  
  /* Hover effects */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  /* State-based styling */
  ${({ isActive }: StyledCardProps) =>
    isActive &&
    `
      background: linear-gradient(-45deg, var(--stellar-primaryBright), var(--stellar-secondary));
      background-size: 400% 400%;
      animation: gradientAnimation 4s ease infinite;
      
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
    
  ${({ isDisabled }: StyledCardProps) =>
    isDisabled &&
    `
      color: var(--stellar-textDisabled);
      opacity: 0.6;
    `}
    
  ${({ isDisabled }: StyledCardProps) =>
    !isDisabled &&
    `
      color: var(--stellar-text);
    `}
`

interface StyledCardInnerProps {
  hasCustomBorder?: boolean;
}

export const StyledCardInner = styled(Box)<StyledCardInnerProps>`
  width: 100%;
  height: 100%;
  border-radius: var(--stellar-borderRadius-card);
  background-color: var(--stellar-background);
  
  /* Conditional overflow based on custom border */
  overflow: ${({ hasCustomBorder = false }: StyledCardInnerProps) =>
    hasCustomBorder ? 'visible' : 'inherit'
  };
`;

// Add space system compatibility to base card
const StyledCardWithSpace = styled(StyledCardBase)<StyledCardProps>`
  /* Apply styled-system space via our Stellar-UI */
  ${space}
`;

// Export with displayName for debugging
StyledCardWithSpace.displayName = 'StellarCard';
StyledCardInner.displayName = 'StellarCardInner';

// Set default props
StyledCardWithSpace.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
};

// Export the final component
export { StyledCardWithSpace as StyledCard };
