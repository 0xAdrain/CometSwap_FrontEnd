import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "28px",
    padding: "0 8px",
    fontSize: "14px",
  },
  [scales.SM]: {
    height: "24px",
    padding: "0 4px",
    fontSize: "12px",
  },
};

interface IStyleVariantsProps {
  backgroundColor?: string;
  bg?: string;
  color?: string;
  border?: string;
  borderColor?: string;
}
export const styleVariants: { [key: string]: IStyleVariantsProps } = {
  [variants.PRIMARY]: {
    backgroundColor: 'var(--stellar-primary)',
    color: 'white',
  },
  [variants.SECONDARY]: {
    backgroundColor: 'var(--stellar-secondary)', 
    color: 'white',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'var(--stellar-success)',
    color: 'white',
  },
  [variants.TEXTDISABLED]: {
    backgroundColor: 'var(--stellar-textDisabled)',
    color: 'var(--stellar-background)',
  },
  [variants.TEXTSUBTLE]: {
    backgroundColor: 'var(--stellar-textSubtle)',
    color: 'var(--stellar-background)',
  },
  [variants.BINANCE]: {
    backgroundColor: '#F0B90B', // Binance brand color
    color: 'black',
  },
  [variants.FAILURE]: {
    backgroundColor: 'var(--stellar-error)',
    color: 'white',
  },
  [variants.WARNING]: {
    backgroundColor: 'var(--stellar-warning)',
    color: 'black',
  },
  [variants.GRADIENTBOLD]: {
    background: 'linear-gradient(135deg, var(--stellar-primary), var(--stellar-secondary))',
    color: 'white',
  },
  [variants.FAILURE_LOW_CONTRAST]: {
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    color: 'var(--stellar-error)',
    border: '2px solid',
    borderColor: 'rgba(255, 71, 87, 0.2)',
  },
  [variants.SUCCESS_LOW_CONTRAST]: {
    backgroundColor: 'rgba(50, 205, 50, 0.1)',
    color: 'var(--stellar-success)',
    border: '2px solid',
    borderColor: 'rgba(50, 205, 50, 0.2)',
  },
  [variants.TERTIARY]: {
    backgroundColor: 'var(--stellar-backgroundAlt)',
    color: 'var(--stellar-textSubtle)',
    border: '2px solid',
    borderColor: 'var(--stellar-border)',
  },
  [variants.PRIMARY60]: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    color: 'var(--stellar-primary)',
    border: '2px solid', 
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
};
