/**
 * 🌟 STELLAR VARIANT FUNCTION 🌟
 * Superior to styled-system's variant with cross-platform support
 * Designed for compile-time optimization
 */

import { StellarTheme, StellarThemeType } from '../stellar/theme'
import type { VariantArgs } from './types'

// Helper to get a value from the theme object using a path string
const get = (obj: any, path: string, fallback?: any): any => {
  const pathArray = path.split('.').filter(Boolean)
  const result = pathArray.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
  return result === undefined ? fallback : result
}

/**
 * Enhanced variant function - API compatible with styled-system
 * but with superior performance and cross-platform capabilities.
 * 
 * @param {VariantArgs} args - Configuration for the variant
 */
export const variant = ({
  prop = 'variant',
  scale,
  variants = {},
}: VariantArgs) => {
  // Determine the theme scale to use. e.g., 'colors', 'space', or a custom key like 'buttonVariants'
  const themeScale = scale

  // This is the core style function returned by `variant`
  return (props: { [key: string]: any; theme?: StellarThemeType }) => {
    const theme = props.theme || StellarTheme
    const propValue = props[prop]
    
    // If the designated prop (e.g., 'variant' or 'size') doesn't exist on the component's props, do nothing.
    if (propValue === null || propValue === undefined) {
      return {}
    }

    // This function finds the corresponding style object from either the theme or the local variants object.
    const resolveStyles = (value: string | number) => {
      // If a `scale` (like 'colors') or a `key` (which becomes `keys`, like 'buttonVariants') is provided, look in the theme.
      const scaleObject = themeScale ? get(theme, themeScale, {}) : variants
      // Return the specific style object (e.g., scaleObject.primary or scaleObject.md) or an empty object.
      return scaleObject[value] || {}
    }

    // --- Full Responsive Handling ---
    // This is the logic PancakeSwap uses and we need for compatibility.
    // It checks if the prop value is an object or array to generate media queries.
    
    // Handle responsive objects, e.g., variant={{ xs: 'primary', md: 'secondary' }}
    if (typeof propValue === 'object' && !Array.isArray(propValue)) {
      const responsiveStyles: Record<string, any> = {}
      for (const breakpoint in propValue) {
        // @ts-ignore
        const valueAtBreakpoint = propValue[breakpoint]
        const styles = resolveStyles(valueAtBreakpoint)
        
        // 'xs' or '_' is the base style, without a media query.
        if (breakpoint === 'xs' || breakpoint === '_') {
          Object.assign(responsiveStyles, styles)
        } else {
          // Get the breakpoint value (e.g., '768px') from our theme.
          // @ts-ignore
          const mediaQuery = `@media screen and (min-width: ${theme.breakpoints[breakpoint]})`
          // Nest the styles inside the media query block.
          responsiveStyles[mediaQuery] = {
            ...(responsiveStyles[mediaQuery] || {}),
            ...styles
          }
        }
      }
      return responsiveStyles
    }
    
    // Handle responsive arrays, e.g., variant={['primary', 'secondary']}
    if (Array.isArray(propValue)) {
        const responsiveStyles: Record<string, any> = {};
        const breakpoints = ['xs', ...Object.keys(theme.breakpoints)];

        propValue.slice(0, breakpoints.length).forEach((value, index) => {
            const breakpointName = breakpoints[index];
            if (value === null || value === undefined) return;

            const styles = resolveStyles(value);
            if (!styles || Object.keys(styles).length === 0) return;

            if (breakpointName === 'xs') {
                Object.assign(responsiveStyles, styles);
            } else {
                // @ts-ignore
                const mediaQuery = `@media screen and (min-width: ${theme.breakpoints[breakpointName]})`;
                responsiveStyles[mediaQuery] = {
                    ...(responsiveStyles[mediaQuery] || {}),
                    ...styles,
                };
            }
        });

        return responsiveStyles;
    }

    // Handle non-responsive, direct values, e.g., variant="primary"
    return resolveStyles(propValue)
  }
}

export default variant




