// 🌟 Stellar UI - Independent Cross-Platform UI System
// Complete independent UI system with superior performance and PancakeSwap compatibility

// Core styling system - selective exports to avoid conflicts
export { styled, css, keyframes, createGlobalStyle } from "./styled-components"
export * from "./styled-system"

// Independent theme system
export * from "./theme"

// Cross-platform components
export * from "./components"

// Providers (Independent Stellar UI) - primary theme provider
export { UIKitProvider, ThemeProvider, useStellarTheme, useTheme } from "./Providers"

// Hooks
export * from "./hooks"

// Contexts
export * from "./contexts"

// Widgets
export * from "./widgets/Ifo"
export * from "./widgets/Menu"
// Modal已从components导出，避免重复导出
// export * from "./widgets/Modal"

// Reset CSS
export { default as ResetCSS } from "./ResetCSS"

// Animation Toolkit
export * from "./util/animationToolkit"

// Portal Root
export { default as getPortalRoot } from "./util/getPortalRoot"

// Dialog Provider
export { DialogProvider } from "./hooks/useDialog/DialogContext"


