import React, { forwardRef } from "react";
import { Box } from "../Box";
import { variant } from "../../styled-system"; // Using Stellar-UI styled-system replacement
import { ImageProps, Variant, variants } from "./types";
import TokenImage from "./TokenImage";
import TokenLogoWithService from "../TokenLogo/TokenLogoWithService";

interface StyledImageProps extends ImageProps {
  variant: Variant;
}

/**
 * 🖼️ Image Styles - Stellar UI Implementation
 * Token image components with variant-based positioning
 */

export const StyledPrimaryLogo = forwardRef<HTMLDivElement, StyledImageProps>(
  ({ variant: imageVariant, ...props }, ref) => {
    // 使用 Stellar-UI variant 处理样式变体
    const variantStyles = variant({
      prop: 'variant',
      variants: {
        [variants.DEFAULT]: {
          bottom: "auto",
          left: 0,
          right: "auto",
          top: 0,
          zIndex: 5,
        },
        [variants.INVERTED]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 6,
        },
      },
    })({ variant: imageVariant });

    // 分离TokenLogo专用的属性
    const { srcs, alt, width, height, ...viewProps } = props as any;
    
    return (
      <Box
        ref={ref}
        position="absolute"
        style={{ 
          borderRadius: "50%",
          width: imageVariant === variants.DEFAULT ? "92%" : "82%",
          ...variantStyles 
        }}
        {...viewProps}
      >
        <TokenLogoWithService srcs={srcs} alt={alt} width={width} height={height} />
      </Box>
    );
  }
);

export const StyledSecondaryLogo = forwardRef<HTMLDivElement, StyledImageProps>(
  ({ variant: imageVariant, ...props }, ref) => {
    const variantStyles = variant({
      prop: 'variant',
      variants: {
        [variants.DEFAULT]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 6,
        },
        [variants.INVERTED]: {
          bottom: "auto",
          left: 0,
          right: "auto",
          top: 0,
          zIndex: 5,
        },
      },
    })({ variant: imageVariant });

    // 分离TokenLogo专用的属性
    const { srcs, alt, width, height, ...viewProps } = props as any;
    
    return (
      <Box
        ref={ref}
        position="absolute"
        borderRadius="50%"
        width="50%"
        {...variantStyles}
        {...viewProps}
      >
        <TokenLogoWithService srcs={srcs} alt={alt} width={width} height={height} />
      </Box>
    );
  }
);

export const StyledChainLogo = forwardRef<HTMLDivElement, StyledImageProps>(
  ({ variant: imageVariant, ...props }, ref) => {
    const variantStyles = variant({
      prop: 'variant',
      variants: {
        [variants.DEFAULT]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 7,
        },
        [variants.INVERTED]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 7,
        },
      },
    })({ variant: imageVariant });

    // 分离TokenLogo专用的属性
    const { srcs, alt, width, height, ...viewProps } = props as any;
    
    return (
      <Box
        ref={ref}
        position="absolute"
        borderRadius="50%"
        {...variantStyles}
        {...viewProps}
      >
        <TokenLogoWithService srcs={srcs} alt={alt} width={width} height={height} />
      </Box>
    );
  }
);

export const StyledPrimaryImage = forwardRef<HTMLDivElement, StyledImageProps>(
  ({ variant: imageVariant, ...props }, ref) => {
    const variantStyles = variant({
      prop: 'variant',
      variants: {
        [variants.DEFAULT]: {
          bottom: "auto",
          left: 0,
          right: "auto",
          top: 0,
          zIndex: 5,
        },
        [variants.INVERTED]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 6,
        },
      },
    })({ variant: imageVariant });

    // 过滤width属性避免重复
    const { width, ...safeProps } = props as any;
    
    return (
      <Box
        ref={ref}
        position="absolute"
        width={imageVariant === variants.DEFAULT ? "92%" : "82%"}
        {...variantStyles}
        {...safeProps}
      >
        <TokenImage {...props} />
      </Box>
    );
  }
);

export const StyledSecondaryImage = forwardRef<HTMLDivElement, StyledImageProps>(
  ({ variant: imageVariant, ...props }, ref) => {
    const variantStyles = variant({
      prop: 'variant',
      variants: {
        [variants.DEFAULT]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 6,
        },
        [variants.INVERTED]: {
          bottom: "auto",
          left: 0,
          right: "auto",
          top: 0,
          zIndex: 5,
        },
      },
    })({ variant: imageVariant });

    // 过滤width属性避免重复
    const { width, ...safeProps } = props as any;
    
    return (
      <Box
        ref={ref}
        position="absolute"
        width="50%"
        {...variantStyles}
        {...safeProps}
      >
        <TokenImage {...props} />
      </Box>
    );
  }
);

export const StyledChainImage = forwardRef<HTMLDivElement, StyledImageProps>(
  ({ variant: imageVariant, ...props }, ref) => {
    const variantStyles = variant({
      prop: 'variant',
      variants: {
        [variants.DEFAULT]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 7,
        },
        [variants.INVERTED]: {
          bottom: 0,
          left: "auto",
          right: 0,
          top: "auto",
          zIndex: 7,
        },
      },
    })({ variant: imageVariant });

    return (
      <Box
        ref={ref}
        position="absolute"
        {...variantStyles}
        {...props}
      >
        <TokenImage {...props} />
      </Box>
    );
  }
);

// 添加 displayName 方便调试
StyledPrimaryLogo.displayName = 'StyledPrimaryLogo';
StyledSecondaryLogo.displayName = 'StyledSecondaryLogo';
StyledChainLogo.displayName = 'StyledChainLogo';
StyledPrimaryImage.displayName = 'StyledPrimaryImage';
StyledSecondaryImage.displayName = 'StyledSecondaryImage';
StyledChainImage.displayName = 'StyledChainImage';
