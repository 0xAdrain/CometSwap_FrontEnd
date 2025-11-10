/**
 * 🌟 Stellar Theme Types
 * Modern type definitions for our Stellar theme system
 */

export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  nav: string;
};

export type Spacing = readonly (string | number)[];

export type Radii = {
  small: string;
  default: string;
  card: string;
  circle: string;
};

export type Shadows = {
  level1: string;
  active: string;
  success: string;
  warning: string;
  inset: string;
};

export type Colors = Record<string, string>;

export type ZIndices = {
  ribbon: number;
  dropdown: number;
  modal: number;
};
