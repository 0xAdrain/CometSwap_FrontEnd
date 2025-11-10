/**
 * 📏 Spacer - Stellar UI Implementation
 * Simple spacing component for modal layouts
 */
import { styled } from '../../styled-components'
import { Box } from '../../components/Box'

const Spacer: React.FC<React.PropsWithChildren> = () => {
  return <StyledSpacer />
}

const StyledSpacer = styled(Box)`
  height: var(--stellar-space-6);
  width: var(--stellar-space-6);
`

export default Spacer;
