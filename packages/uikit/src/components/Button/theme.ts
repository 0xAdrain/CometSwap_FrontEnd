// Define scales and variants first
export const scales = {
  XS: 'xs',
  SM: 'sm', 
  MD: 'md',
  LG: 'lg',
} as const

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  TEXT: 'text',
  DANGER: 'danger',
  SUCCESS: 'success',
  SUBTLE: 'subtle',
  LIGHT: 'light',
} as const

// Style object for button sizes (scales)
export const scaleVariants = {
  [scales.XS]: {
    height: '28px',
    padding: '0 12px',
    fontSize: '12px',
    borderRadius: '6px',
  },
  [scales.SM]: {
    height: '36px',
    padding: '0 16px',
    fontSize: '14px',
    borderRadius: '8px',
  },
  [scales.MD]: {
    height: '44px',
    padding: '0 24px',
    fontSize: '16px',
    borderRadius: '8px',
  },
  [scales.LG]: {
    height: '56px',
    padding: '0 32px',
    fontSize: '18px',
    borderRadius: '12px',
  },
}

// Style object for button variants
export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: 'var(--stellar-primary)',
    color: 'white',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
    '&:hover:not(:disabled)': {
      backgroundColor: 'var(--stellar-primaryHover)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0px)',
    },
  },
  [variants.SECONDARY]: {
    backgroundColor: 'transparent',
    color: 'var(--stellar-primary)',
    border: '2px solid var(--stellar-primary)',
    '&:hover:not(:disabled)': {
      backgroundColor: 'var(--stellar-primary)',
      color: 'white',
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: 'var(--stellar-backgroundAlt)',
    color: 'var(--stellar-text)',
    border: '1px solid var(--stellar-border)',
    '&:hover:not(:disabled)': {
      backgroundColor: 'var(--stellar-backgroundAlt2)',
      borderColor: 'var(--stellar-borderHover)',
    },
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'var(--stellar-primary)',
    border: 'none',
    '&:hover:not(:disabled)': {
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
  },
  [variants.DANGER]: {
    backgroundColor: 'var(--stellar-error)',
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: '#e33e4d',
      boxShadow: '0 6px 16px rgba(255, 71, 87, 0.4)',
    },
  },
  [variants.SUCCESS]: {
    backgroundColor: 'var(--stellar-success)',
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: '#28a428',
      boxShadow: '0 6px 16px rgba(50, 205, 50, 0.4)',
    },
  },
  [variants.SUBTLE]: {
    backgroundColor: 'var(--stellar-backgroundAlt)',
    color: 'var(--stellar-textSubtle)',
    '&:hover:not(:disabled)': {
      backgroundColor: 'var(--stellar-backgroundAlt2)',
    },
  },
  [variants.LIGHT]: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    '&:hover:not(:disabled)': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
};
