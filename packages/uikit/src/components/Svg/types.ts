/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, SVGAttributes } from "react";

// 替换styled-system的SpaceProps
export interface SpaceProps {
  m?: string | number
  margin?: string | number
  mt?: string | number
  marginTop?: string | number
  mr?: string | number
  marginRight?: string | number
  mb?: string | number
  marginBottom?: string | number
  ml?: string | number
  marginLeft?: string | number
  mx?: string | number
  marginX?: string | number
  my?: string | number
  marginY?: string | number
  p?: string | number
  padding?: string | number
  pt?: string | number
  paddingTop?: string | number
  pr?: string | number
  paddingRight?: string | number
  pb?: string | number
  paddingBottom?: string | number
  pl?: string | number
  paddingLeft?: string | number
  px?: string | number
  paddingX?: string | number
  py?: string | number
  paddingY?: string | number
}

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: any; // 简化的主题类型
  spin?: boolean;
  color?: string;
}

export type IconComponentType = {
  icon: ElementType<any>;
  fillIcon?: ElementType<any>;
  isActive?: boolean;
  height?: string;
  width?: string;
  activeColor?: string;
  activeBackgroundColor?: string;
} & SvgProps;