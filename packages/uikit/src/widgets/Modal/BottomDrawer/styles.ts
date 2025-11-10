/**
 * 📱 BottomDrawer Styles - Stellar UI Implementation
 * Slide-up drawer component with animations
 */
import { styled } from '../../../styled-components'
import { Box } from '../../../components/Box'

interface DrawerContainerProps {
  animationState?: 'entering' | 'exiting'
}

export const DrawerContainer = styled(Box)<DrawerContainerProps>`
  width: 100%;
  max-width: 100vw;
  height: 80vh;
  background-color: var(--stellar-backgroundAlt);
  border-top-left-radius: var(--stellar-borderRadius-xl);
  border-top-right-radius: var(--stellar-borderRadius-xl);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 21;
  
  /* Animation based on state */
  transition: transform 0.2s ease;
  transform: ${({ animationState }: DrawerContainerProps) => 
    animationState === 'exiting' ? 'translateY(20%)' : 'translateY(0)'
  };
`

// Legacy animation names for compatibility
export const mountAnimation = 'quick'
export const unmountAnimation = 'quick'
