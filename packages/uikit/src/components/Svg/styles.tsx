import React, { forwardRef } from "react";
import { Box } from "../Box";
import { useStellarTheme } from "../../Providers";
import { Colors } from "../../theme";

/**
 * 🎨 SVG Styles - Stellar UI Implementation
 * Icon container and animated icon components with cross-platform support
 */

// Icon Container Component
interface StyledIconContainerProps {
  activeBackgroundColor?: keyof Colors;
  children?: React.ReactNode;
}

export const StyledIconContainer = forwardRef<HTMLDivElement, StyledIconContainerProps>(
  ({ activeBackgroundColor, children, ...props }, ref) => {
    const { colors } = useStellarTheme();
    
    const backgroundColor = activeBackgroundColor 
      ? colors[activeBackgroundColor] || colors.background
      : 'transparent';

    return (
      <Box
        ref={ref}
        style={{ backgroundColor }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

// Animated Icon Component
interface StyledAnimatedIconComponentProps {
  isActive: boolean;
  height?: string;
  width?: string;
  hasFillIcon: boolean;
  children?: React.ReactNode;
}

export const StyledAnimatedIconComponent = forwardRef<HTMLDivElement, StyledAnimatedIconComponentProps>(
  ({ isActive, height, width = "100%", hasFillIcon, children, ...props }, ref) => {
    // 计算动态样式
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      ...(height && { height }),
      width,
    };

    // 子元素样式
    const firstChildStyles: React.CSSProperties = {
      ...(height && { height }),
      width,
      zIndex: 0,
    };

    // 处理 hasFillIcon 的样式 - 转换为CSS-in-JS
    const fillIconStyles: React.CSSProperties = hasFillIcon
      ? {
          // Note: CSS-in-JS doesn't support nested selectors directly
          // These styles would need to be applied via CSS classes or inline styles
        }
      : {};

    const combinedStyles = {
      ...containerStyles,
      ...fillIconStyles,
    };

    return (
      <Box
        ref={ref}
        style={combinedStyles}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const childStyles: React.CSSProperties = {};
            
            // 为第一个子元素应用特殊样式
            if (index === 0) {
              Object.assign(childStyles, firstChildStyles);
            }
            
            // 处理 hasFillIcon 的样式
            if (hasFillIcon) {
              if (index === 0) {
                Object.assign(childStyles, {
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  overflow: 'hidden',
                });
              } else if (index === React.Children.count(children) - 1) {
                Object.assign(childStyles, {
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  overflow: 'hidden',
                  height: isActive && height ? height : '0',
                  width: isActive ? width : width,
                  zIndex: 5,
                  transition: 'height 0.25s ease',
                });
              }
            }
            
            return React.cloneElement(child, {
              style: {
                ...child.props.style,
                ...childStyles,
              },
            });
          }
          return child;
        })}
      </Box>
    );
  }
);

// 添加 displayName 方便调试
StyledIconContainer.displayName = 'StyledIconContainer';
StyledAnimatedIconComponent.displayName = 'StyledAnimatedIconComponent';
