import CheckmarkCircleIcon from "../Svg/Icons/CheckmarkCircle";
import ErrorIcon from "../Svg/Icons/Error";
import BlockIcon from "../Svg/Icons/Block";
import InfoIcon from "../Svg/Icons/Info";
/**
 * Alert Theme Configuration
 * Stellar UI - Modern alert system with clear visual hierarchy
 */

import { variants, AlertTheme } from './types'
import { darkColors, lightColors } from '../../theme/colors'

// Icon mapping - replacing switch-case with object lookup
export const variantIcons = {
  [variants.DANGER]: BlockIcon,
  [variants.WARNING]: ErrorIcon,
  [variants.SUCCESS]: CheckmarkCircleIcon,
  [variants.INFO]: InfoIcon,
} as const;

// Color variants - replacing switch-case with variant system
export const alertVariants = {
  [variants.DANGER]: {
    backgroundColor: 'var(--stellar-error)',
    color: 'white',
    iconColor: 'white',
  },
  [variants.WARNING]: {
    backgroundColor: 'var(--stellar-warning)', 
    color: 'black',
    iconColor: 'black',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'var(--stellar-success)',
    color: 'white', 
    iconColor: 'white',
  },
  [variants.INFO]: {
    backgroundColor: 'var(--stellar-secondary)',
    color: 'white',
    iconColor: 'white',
  },
} as const;

export const light: AlertTheme = {
  background: lightColors.backgroundAlt,
};

export const dark: AlertTheme = {
  background: darkColors.backgroundAlt,
};
