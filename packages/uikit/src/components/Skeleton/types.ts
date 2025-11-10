export const animation = {
  WAVES: "wave",
  PULSE: "pulse",
} as const;

export const variant = {
  RECT: "rect",
  ROUND: "round",
  CIRCLE: "circle",
} as const;

export type Animation = (typeof animation)[keyof typeof animation];
export type Variant = (typeof variant)[keyof typeof variant];

// 这些类型现在在Skeleton.tsx中定义，这里保留为向后兼容
export interface SkeletonProps {
  animation?: Animation;
  variant?: Variant;
  isDark?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonV2Props extends SkeletonProps {
  isDataReady?: boolean;
  children?: React.ReactNode;
  wrapperProps?: any;
  skeletonTop?: string;
  skeletonLeft?: string;
  mr?: string | number;
  ml?: string | number;
}