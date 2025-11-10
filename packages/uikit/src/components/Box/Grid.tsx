import React from "react";
import { styled } from "../../styled-components";
import { Box } from "./Box";
import { GridProps } from "./types";

// Stellar UI Grid组件 - 保持API兼容性  
const Grid = styled(Box)`
  display: grid;
`

// MotionGrid使用CSS动画
export const MotionGrid = styled(Box)`
  display: grid;
  transition: all 0.2s ease;
`

export default Grid;
