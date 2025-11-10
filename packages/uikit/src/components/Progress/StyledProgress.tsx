import { styled } from "../../styled-components";
import { space, variant as StyledSystemVariant } from "../../styled-system";
import { styleVariants, styleScales } from "./themes";
import { ProgressProps, variants } from "./types";

interface ProgressBarProps {
  primary?: boolean;
  $useDark?: boolean;
  $background?: string;
}

export const Bar = styled.div.withConfig({
  shouldForwardProp: (prop) => !['primary', '$useDark', '$background'].includes(prop)
})<ProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 200ms ease;
  
  background: ${({ $useDark = true, primary = false, $background }: ProgressBarProps) => {
    if ($background) return $background;
    
    // Use CSS variables instead of theme object access
    if ($useDark) {
      return primary 
        ? 'var(--stellar-secondary)' 
        : 'var(--stellar-secondary-opacity-80)';
    }
    
    return primary 
      ? 'var(--stellar-secondary-light)' 
      : 'var(--stellar-secondary-light-opacity-80)';
  }};
`;

interface StyledProgressProps {
  variant?: ProgressProps["variant"];
  scale?: ProgressProps["scale"];
  $useDark?: boolean;
}

const StyledProgress = styled.div<StyledProgressProps>`
  position: relative;
  overflow: hidden;
  
  /* Use CSS variables for background and shadows */
  background-color: ${({ $useDark = true }: StyledProgressProps) => 
    $useDark ? 'var(--stellar-input)' : 'var(--stellar-input-light)'
  };
  box-shadow: var(--stellar-shadows-inset);
  
  /* Dynamic border radius based on variant */
  ${Bar} {
    border-top-left-radius: ${({ variant }: StyledProgressProps) => 
      (variant === variants.FLAT ? "0" : "32px")
    };
    border-bottom-left-radius: ${({ variant }: StyledProgressProps) => 
      (variant === variants.FLAT ? "0" : "32px")
    };
  }

  /* Apply variant styles */
  ${StyledSystemVariant({
    variants: styleVariants,
  })}
  ${StyledSystemVariant({
    prop: "scale",
    variants: styleScales,
  })}
  ${space}
`;

export default StyledProgress;
