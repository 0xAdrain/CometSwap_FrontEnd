// Base theme configuration for backward compatibility
export const breakpoints = ['370px', '576px', '852px', '968px', '1080px'] as const

export const mediaQueries = {
  xs: `@media screen and (min-width: ${breakpoints[0]})`,
  sm: `@media screen and (min-width: ${breakpoints[1]})`,
  md: `@media screen and (min-width: ${breakpoints[2]})`,
  lg: `@media screen and (min-width: ${breakpoints[3]})`,
  xl: `@media screen and (min-width: ${breakpoints[4]})`,
  nav: `@media screen and (min-width: ${breakpoints[1]})`,
} as const

export const spacing = [0, 4, 8, 16, 24, 32, 48, 64] as const

export const radii = {
  small: '4px',
  default: '16px',
  card: '24px',
  circle: '50%',
} as const

export const shadows = {
  level1: '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
  active: '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
  success: '0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)',
  warning: '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
  inset: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)',
} as const

export const transitions = {
  normal: 'all 0.3s ease',
  fast: 'all 0.15s ease',
  slow: 'all 0.5s ease',
} as const
export default {
  siteWidth: 1200,
  breakpoints: Object.values(breakpoints),
  mediaQueries,
  spacing,
  shadows,
  radii,
  zIndices: { ribbon: 9, dropdown: 10, modal: 100 },
};
