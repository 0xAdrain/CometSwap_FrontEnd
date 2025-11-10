/**
 * 🌟 Stellar Theme System
 * Pure Stellar themes with styled-system compatibility
 */

// Export Stellar themes
export { default as dark } from "./dark";
export { default as light } from "./light";

// Export theme utilities
export * from "./colors";
export * from "./base";
export * from "./types";

// Simplified theme interface for Stellar
export interface StellarTheme {
  isDark: boolean;
  colors: Record<string, string>;
  breakpoints: string[];
  spacing: (string | number)[];
  radii: Record<string, string | number>;
  shadows: Record<string, string>;
}
import { AlertTheme } from "../components/Alert/types";
import { CardTheme } from "../components/Card/types";
import { CometToggleTheme } from "../components/CometToggle/types";
import { RadioTheme } from "../components/Radio/types";
import { ToggleTheme } from "../components/Toggle/theme";
import { TooltipTheme } from "../components/Tooltip/types";
import { NavThemeType } from "../widgets/Menu/theme";
import { ModalTheme } from "../widgets/Modal/types";
import { Breakpoints, MediaQueries, ZIndices } from "./types";
import { vars } from "../css/vars.css";

export interface CometTheme {
  siteWidth: number;
  isDark: boolean;
  alert: AlertTheme;
  colors: typeof vars.colors;
  card: CardTheme;
  nav: NavThemeType;
  modal: ModalTheme;
  cometToggle: CometToggleTheme;
  radio: RadioTheme;
  toggle: ToggleTheme;
  tooltip: TooltipTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: typeof vars.space;
  shadows: typeof vars.shadows;
  radii: typeof vars.radii;
  zIndices: ZIndices;
}

