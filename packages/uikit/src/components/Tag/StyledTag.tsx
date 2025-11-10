import { styled } from "../../styled-components";
import { space, variant, typography } from "../../styled-system";
import { scaleVariants, styleVariants } from "./theme";
import { TagProps, variants } from "./types";

interface ThemedProps extends TagProps {
  theme?: any;
}

const getOutlineStyles = ({ outline, variant: variantKey = variants.PRIMARY }: ThemedProps) => {
  if (outline) {
    // Use CSS variables for theme-aware colors
    const variantStyles = styleVariants[variantKey];
    const bgColor = variantStyles.backgroundColor || 'primary';
    
    return `
      color: var(--stellar-${bgColor});
      background: none;
      border: 2px solid var(--stellar-${bgColor});
    `;
  }

  return "";
};

export const StyledTag = styled.div<ThemedProps>`
  align-items: center;
  border-radius: 16px;
  color: #ffffff;
  display: inline-flex;
  font-weight: 400;
  white-space: nowrap;

  & > svg {
    fill: currentColor;
  }

  ${({ textTransform  }: { textTransform: any }) => textTransform && `text-transform: ${textTransform};`}

  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${space}
  ${typography}

  ${getOutlineStyles}
`;

export default null;
