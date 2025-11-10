/**
 * 🃏 CardFooter Component - Stellar UI Implementation
 * Card footer with top border and consistent padding
 */
import { styled } from '../../styled-components'
import { Box } from '../Box'
import { space, SpaceProps } from "../../styled-system"

export type CardFooterProps = SpaceProps

const CardFooter = styled(Box)`
  /* Default styling */
  padding: var(--stellar-space-6);
  border-top: 1px solid var(--stellar-cardBorder);

  /* Apply space system */
  ${space}
`

CardFooter.defaultProps = {
  p: "24px",
};

export default CardFooter;
