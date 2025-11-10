import { forwardRef } from "react";
import { Box } from "../Box";
import { space } from "../../styled-system"; // Using Stellar-UI styled-system replacement
import { WrapperProps } from "./types";

/**
 * 🖼️ Image Wrapper - Stellar UI Implementation
 * Responsive image container with aspect ratio preservation
 */
const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ width, height, ...props }, ref) => {
  // 计算 aspect ratio 用于响应式
  const aspectRatio = height / width;
  const paddingTop = aspectRatio * 100;

  // 使用 Stellar-UI 处理 space props
  const spaceStyles = space(props);
  
  return (
    <Box
      ref={ref}
      style={{
        maxHeight: `${height}px`,
        maxWidth: `${width}px`,
        position: "relative",
        width: "100%",
        ...spaceStyles
      }}
      {...props}
    >
      {/* CSS 伪元素替换 */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 0,
          paddingTop: `${paddingTop}%`,
          pointerEvents: "none"
        }}
      />
      {props.children}
    </Box>
  );
});

Wrapper.displayName = 'Wrapper';

export default Wrapper;
