/**
 * 🌟 STELLAR THEME - Independent cross-platform solution
 * Cross-platform, performant, zero-runtime theme system
 */

// =============================================================================
// DESIGN TOKENS - Better than PancakeSwap's rigid system
// =============================================================================

// Enhanced spacing scale - more flexible than PancakeSwap
export const SPACE_SCALE = {
  0: 0,
  1: 4,    // 4px
  2: 8,    // 8px  
  3: 12,   // 12px
  4: 16,   // 16px
  5: 20,   // 20px
  6: 24,   // 24px
  8: 32,   // 32px
  10: 40,  // 40px
  12: 48,  // 48px
  16: 64,  // 64px
  20: 80,  // 80px
  24: 96,  // 96px
  32: 128, // 128px
} as const

// Responsive breakpoints - superior to PancakeSwap
export const BREAKPOINTS = {
  xs: '0px',
  sm: '576px', 
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
} as const

// Font size scale - better organized than PancakeSwap
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16, 
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 48,
} as const

// Font weight scale
export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const

// Border radius scale
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8, 
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const

// Shadow scale
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
  md: '0 4px 12px rgba(0, 0, 0, 0.15)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.2)',
  xl: '0 20px 60px rgba(0, 0, 0, 0.3)',
} as const

// Z-index scale
export const Z_INDICES = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// =============================================================================
// COLOR SYSTEM - Superior to PancakeSwap
// =============================================================================

// Light theme colors
export const LIGHT_COLORS = {
  // Primary palette - modern blue-purple gradient
  primary: '#667eea',
  primaryHover: '#5a67d8',
  primaryPress: '#553c9a',
  primary50: '#f0f4ff',
  primary100: '#e0e7ff', 
  primary500: '#667eea',
  primary600: '#5a67d8',
  primary700: '#553c9a',
  
  // Secondary palette
  secondary: '#764ba2',
  secondaryHover: '#6b46c1',
  
  // Background system - cleaner than PancakeSwap
  background: '#ffffff',
  backgroundAlt: '#f8f9fa',
  backgroundAlt2: '#f1f3f4',
  backgroundDisabled: '#e9ecef',
  
  // Text system - better contrast
  text: '#1a202c',
  textSecondary: '#4a5568', 
  textSubtle: '#718096',
  textDisabled: '#a0aec0',
  
  // Status colors - more vibrant
  success: '#32CD32',
  error: '#ff4757', 
  warning: '#ffa502',
  info: '#3b82f6',
  
  // Border system
  border: '#e2e8f0',
  borderHover: '#cbd5e0',
  
  // Input colors
  input: '#edf2f7',
  inputFocus: '#e6fffa',
  
  // Card colors
  card: '#ffffff',
  cardHover: '#f8f9fa',
} as const

// Dark theme colors
export const DARK_COLORS = {
  // Primary palette - consistent across themes
  primary: '#667eea',
  primaryHover: '#7c3aed',
  primaryPress: '#553c9a',
  primary50: '#1e1b4b',
  primary100: '#312e81',
  primary500: '#667eea',
  primary600: '#7c3aed',
  primary700: '#553c9a',
  
  // Secondary palette
  secondary: '#764ba2',
  secondaryHover: '#8b5cf6',
  
  // Background system - dark mode optimized
  background: '#0f0f0f',
  backgroundAlt: '#1a1a1a',
  backgroundAlt2: '#2a2a2a',
  backgroundDisabled: '#2d3748',
  
  // Text system - dark mode optimized
  text: '#f7fafc',
  textSecondary: '#e2e8f0', 
  textSubtle: '#a0aec0',
  textDisabled: '#4a5568',
  
  // Status colors - consistent
  success: '#32CD32',
  error: '#ff4757', 
  warning: '#ffa502',
  info: '#3b82f6',
  
  // Border system
  border: '#4a5568',
  borderHover: '#718096',
  
  // Input colors
  input: '#2d3748',
  inputFocus: '#4a5568',
  
  // Card colors
  card: '#1a1a1a',
  cardHover: '#2a2a2a',
} as const

// =============================================================================
// STELLAR THEME OBJECT - Complete theme system
// =============================================================================

export const StellarTheme = {
  // Design tokens
  space: SPACE_SCALE,
  breakpoints: BREAKPOINTS,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  zIndices: Z_INDICES,
  
  // Media queries based on breakpoints
  mediaQueries: {
    xs: `@media (min-width: ${BREAKPOINTS.xs})`,
    sm: `@media (min-width: ${BREAKPOINTS.sm})`,
    md: `@media (min-width: ${BREAKPOINTS.md})`,
    lg: `@media (min-width: ${BREAKPOINTS.lg})`,
    xl: `@media (min-width: ${BREAKPOINTS.xl})`,
    xxl: `@media (min-width: ${BREAKPOINTS.xxl})`,
  },
  
  // Colors (light mode default)
  colors: LIGHT_COLORS,
  
  // Color schemes
  colorSchemes: {
    light: LIGHT_COLORS,
    dark: DARK_COLORS,
  },
  
  // Additional design tokens
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em', 
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Animation durations
  durations: {
    fast: '150ms',
    normal: '300ms', 
    slow: '500ms',
  },
  
  // Animation easings
  easings: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// Export type for theme
export type StellarThemeType = typeof StellarTheme

// Default export
export default StellarTheme






