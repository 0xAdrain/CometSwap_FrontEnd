/**
 * 🃏 CardHeader Component - Stellar UI Implementation
 * Card header with variant support and rounded top corners
 */
import { styled } from "../../styled-components"
import { variant, space, SpaceProps } from "../../styled-system"
import { CardTheme } from "./types"

export interface CardHeaderProps extends SpaceProps {
  variant?: keyof CardTheme["cardHeaderBackground"]
}

// Define variant styles for CardHeader
const headerVariants = {
  default: {
    backgroundColor: 'var(--stellar-cardHeaderBackground)',
  },
  bubblegum: {
    backgroundColor: 'var(--stellar-cardHeaderBackgroundBubblegum)', 
  },
  blue: {
    backgroundColor: 'var(--stellar-cardHeaderBackgroundBlue)',
  },
  violet: {
    backgroundColor: 'var(--stellar-cardHeaderBackgroundViolet)',
  },
} as const;

const CardHeader = styled.div<CardHeaderProps>`
  /* Base styling */
  padding: 24px;
  border-top-left-radius: var(--stellar-borderRadius-card);
  border-top-right-radius: var(--stellar-borderRadius-card);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  
  /* Apply variant styles */
  ${variant({
    variants: headerVariants,
  })}
  
  /* Apply space system */
  ${space}
`;

CardHeader.displayName = 'StellarCardHeader';

CardHeader.defaultProps = {
  p: "24px",
};

export default CardHeader;
