import { HTMLAttributes } from "react";
import type { AllSystemProps } from "../../styled-system";

// Enhanced Stellar Box - complete styled-system integration
export interface BoxProps extends AllSystemProps, HTMLAttributes<HTMLElement> {
  // Custom Box properties
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  
  // Additional utility props not in styled-system
  cursor?: string;
  userSelect?: string;
  pointerEvents?: string;
  
  // Animation props (replacing framer-motion)
  animate?: boolean;
  variants?: Record<string, any>;
  initial?: string;
  exit?: string;
}

// Flex布局属性
export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;
}

// Grid布局属性  
export interface GridProps extends FlexProps {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: number | string;
  textOverflow?: 'clip' | 'ellipsis' | 'unset'
}

// Motion动画类型（替代framer-motion）
export type MotionVariants = Record<string, any>;