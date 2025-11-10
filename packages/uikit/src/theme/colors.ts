// Color definitions for backward compatibility
export const lightColors = {
  // Primary colors
  primary50: '#faf5ff',
  primary100: '#f3e8ff', 
  primary200: '#e9d5ff',
  primary300: '#d8b4fe',
  primary400: '#c084fc',
  primary500: '#a855f7',
  primary600: '#9333ea',
  primary700: '#7c3aed',
  primary800: '#6b21a8',
  primary900: '#581c87',

  // Background colors  
  backgroundAlt: '#FAF9FA',
  backgroundAlt2: '#F7F6F8',
  backgroundDisabled: '#E7E3EB',
  background: '#FFFFFF',

  // Text colors
  text: '#280D5F',
  textDisabled: '#BDC2C4',
  textSubtle: '#7A6EAA',

  // Card colors
  cardBorder: '#E7E3EB',
  cardHeader: '#F4F0F9',

  // Input colors
  input: '#eeeaf4',
  inputSecondary: '#d7caec',

  // Other colors
  tertiary: '#EFF4F5',
  success: '#31D0AA',
  failure: '#ED4B9E',
  warning: '#FFB237',

  // Gradients (simplified)
  gradientBubblegum: '#E6FDFF',
  gradientInverseBubblegum: '#7645D9',
}

export const darkColors = {
  ...lightColors,
  
  // Override for dark theme
  backgroundAlt: '#27262c',
  backgroundAlt2: '#21202a',
  backgroundDisabled: '#3c3742',
  background: '#08060B',

  text: '#F2F2F2',
  textDisabled: '#666171',
  textSubtle: '#B8ADD2',

  cardBorder: '#383241',
  cardHeader: '#2E2A3B',

  input: '#372f47',
  inputSecondary: '#262130',
  gradientBubblegum: '#1a1033',
  gradientInverseBubblegum: '#7645D9',
}
