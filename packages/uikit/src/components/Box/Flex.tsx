import React from "react";
import { styled } from "../../styled-components";
import { FlexProps } from "./types";

// Independent Stellar Flex - optimized cross-platform implementation
const Flex = styled.div<FlexProps>`
  /* Base flex styles */
  display: flex;
  box-sizing: border-box;
  
  /* Flex direction */
  ${(props: FlexProps) => {
    if (props.direction) {
      return `flex-direction: ${props.direction};`
    }
    if (props.flexDirection) {
      return `flex-direction: ${props.flexDirection};`
    }
    return 'flex-direction: row;' // default
  }}
  
  /* Alignment */
  ${(props: FlexProps) => {
    if (props.align) {
      const alignMap: Record<string, string> = {
        start: 'flex-start',
        center: 'center', 
        end: 'flex-end',
        stretch: 'stretch',
        baseline: 'baseline'
      }
      return `align-items: ${alignMap[props.align] || props.align};`
    }
    if (props.alignItems) {
      return `align-items: ${props.alignItems};`
    }
    return 'align-items: stretch;' // default
  }}
  
  /* Justification */
  ${(props: FlexProps) => {
    if (props.justify) {
      const justifyMap: Record<string, string> = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end', 
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly'
      }
      return `justify-content: ${justifyMap[props.justify] || props.justify};`
    }
    if (props.justifyContent) {
      return `justify-content: ${props.justifyContent};`
    }
    return 'justify-content: flex-start;' // default
  }}
  
  /* Flex wrap */
  ${(props: FlexProps) => {
    if (props.wrap !== undefined) {
      if (typeof props.wrap === 'boolean') {
        return `flex-wrap: ${props.wrap ? 'wrap' : 'nowrap'};`
      }
      return `flex-wrap: ${props.wrap};`
    }
    if (props.flexWrap) {
      return `flex-wrap: ${props.flexWrap};`
    }
    return 'flex-wrap: nowrap;' // default
  }}
  
  /* Gap */
  ${(props: FlexProps) => props.gap ? `gap: ${typeof props.gap === 'number' ? `${props.gap}px` : props.gap};` : ''}
  
  /* Flex properties */
  ${(props: FlexProps) => props.flex ? (typeof props.flex === 'boolean' ? 'flex: 1;' : `flex: ${props.flex};`) : ''}
  ${(props: FlexProps) => props.flexGrow !== undefined ? `flex-grow: ${props.flexGrow};` : ''}
  ${(props: FlexProps) => props.flexShrink !== undefined ? `flex-shrink: ${props.flexShrink};` : ''}
  ${(props: FlexProps) => props.flexBasis ? `flex-basis: ${typeof props.flexBasis === 'number' ? `${props.flexBasis}px` : props.flexBasis};` : ''}
  
  /* Spacing - inherited from Box */
  ${(props: FlexProps) => props.padding ? `padding: ${typeof props.padding === 'number' ? `${props.padding}px` : props.padding};` : ''}
  ${(props: FlexProps) => props.margin ? `margin: ${typeof props.margin === 'number' ? `${props.margin}px` : props.margin};` : ''}
  ${(props: FlexProps) => props.p ? `padding: ${typeof props.p === 'number' ? `${props.p * 4}px` : props.p};` : ''}
  ${(props: FlexProps) => props.m ? `margin: ${typeof props.m === 'number' ? `${props.m * 4}px` : props.m};` : ''}
  ${(props: FlexProps) => props.px ? `padding-left: ${typeof props.px === 'number' ? `${props.px * 4}px` : props.px}; padding-right: ${typeof props.px === 'number' ? `${props.px * 4}px` : props.px};` : ''}
  ${(props: FlexProps) => props.py ? `padding-top: ${typeof props.py === 'number' ? `${props.py * 4}px` : props.py}; padding-bottom: ${typeof props.py === 'number' ? `${props.py * 4}px` : props.py};` : ''}
  ${(props: FlexProps) => props.mx ? `margin-left: ${typeof props.mx === 'number' ? `${props.mx * 4}px` : props.mx}; margin-right: ${typeof props.mx === 'number' ? `${props.mx * 4}px` : props.mx};` : ''}
  ${(props: FlexProps) => props.my ? `margin-top: ${typeof props.my === 'number' ? `${props.my * 4}px` : props.my}; margin-bottom: ${typeof props.my === 'number' ? `${props.my * 4}px` : props.my};` : ''}
  
  /* Sizing */
  ${(props: FlexProps) => props.width ? `width: ${typeof props.width === 'number' ? `${props.width}px` : props.width};` : ''}
  ${(props: FlexProps) => props.height ? `height: ${typeof props.height === 'number' ? `${props.height}px` : props.height};` : ''}
  ${(props: FlexProps) => props.minWidth ? `min-width: ${typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth};` : ''}
  ${(props: FlexProps) => props.minHeight ? `min-height: ${typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight};` : ''}
  ${(props: FlexProps) => props.maxWidth ? `max-width: ${typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth};` : ''}
  ${(props: FlexProps) => props.maxHeight ? `max-height: ${typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight};` : ''}
  
  /* Appearance */
  ${(props: FlexProps) => props.backgroundColor ? `background-color: ${props.backgroundColor.startsWith('var(') ? props.backgroundColor : `var(--stellar-${props.backgroundColor}, ${props.backgroundColor})`};` : ''}
  ${(props: FlexProps) => props.bg ? `background-color: ${props.bg.startsWith('var(') ? props.bg : `var(--stellar-${props.bg}, ${props.bg})`};` : ''}
  ${(props: FlexProps) => props.color ? `color: ${props.color.startsWith('var(') ? props.color : `var(--stellar-${props.color}, ${props.color})`};` : ''}
  ${(props: FlexProps) => props.border ? `border: ${props.border};` : ''}
  ${(props: FlexProps) => props.borderRadius ? `border-radius: ${typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius};` : ''}
  ${(props: FlexProps) => props.boxShadow ? `box-shadow: ${props.boxShadow};` : ''}
  
  /* Smooth transitions */
  transition: all 0.2s ease;
`;

// Enhanced Motion Flex with CSS animations
export const MotionFlex = styled(Flex)<{
  animate?: boolean;
  initial?: React.CSSProperties;
  exit?: React.CSSProperties;
}>`
  /* Enhanced animation capabilities */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Animation states */
  ${(props: { animate?: boolean }) => props.animate ? `
    animation: stellarFlexBounce 0.6s ease-out;
  ` : ''}
`;

// Add CSS animations for MotionFlex
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes stellarFlexBounce {
      0% {
        transform: scale(0.9);
        opacity: 0;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Flex;



