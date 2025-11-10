/**
 * 📱 Responsive Breakpoints - PancakeSwap Compatible
 * Standard breakpoints for mobile-first design
 */

export const breakpoints = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
} as const

export type Breakpoint = keyof typeof breakpoints

export default breakpoints