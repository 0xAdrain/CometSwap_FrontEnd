import React from "react";
import { scales, TagProps } from "./types";
import { StyledTag } from "./StyledTag";

const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({ 
  variant = "primary",
  scale = scales.MD,
  outline = false,
  startIcon, 
  endIcon, 
  children, 
  ...props 
}) => (
  <StyledTag variant={variant} scale={scale} outline={outline} {...props}>
    {React.isValidElement(startIcon) &&
      React.cloneElement(startIcon, {
        style: { marginRight: "0.5em" }
      })}
    {children}
    {React.isValidElement(endIcon) &&
      React.cloneElement(endIcon, {
        style: { marginLeft: "0.5em" }
      })}
  </StyledTag>
);

Tag.displayName = 'StellarTag';

export default Tag;
