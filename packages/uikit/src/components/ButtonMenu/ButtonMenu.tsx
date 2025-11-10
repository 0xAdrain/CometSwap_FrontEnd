import React, { Children, cloneElement, ReactElement } from "react";
import { styled } from "../../styled-components";
import { space, variant } from "../../styled-system";
import { scales, variants } from "../Button/types";
import { ButtonMenuProps } from "./types";
import { buttonMenuVariants } from "./theme";

interface StyledButtonMenuProps extends ButtonMenuProps {}

const StyledButtonMenu = styled.div.withConfig({
  shouldForwardProp: (prop: string) => !['fullWidth', 'noButtonMargin', 'disabled', 'variant'].includes(prop),
})<StyledButtonMenuProps>`
  /* Base layout and structure */
  border-radius: var(--stellar-borderRadius-md);
  align-items: center;
  
  /* Dynamic display and width based on fullWidth prop */
  display: ${({ fullWidth }: { fullWidth?: boolean }) => (fullWidth ? "flex" : "inline-flex")};
  width: ${({ fullWidth }: { fullWidth?: boolean }) => (fullWidth ? "100%" : "auto")};
  
  /* Flex behavior for child buttons */
  & > button,
  & > a {
    flex: ${({ fullWidth }: { fullWidth?: boolean }) => (fullWidth ? 1 : "auto")};
    box-shadow: none;
  }

  /* Spacing between adjacent buttons */
  & > button + button,
  & > a + a {
    margin-left: ${({ noButtonMargin }: { noButtonMargin?: boolean }) => (noButtonMargin ? "0px" : "2px")};
  }
  
  /* Apply variant-based styling using our Stellar variant system */
  ${variant({
    variants: buttonMenuVariants,
  })}
  
  /* Apply styled-system spacing */
  ${space}
`;

const ButtonMenu: React.FC<React.PropsWithChildren<ButtonMenuProps>> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  onItemClick,
  disabled,
  children,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButtonMenu disabled={disabled} variant={variant} fullWidth={fullWidth} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onItemClick ? (e: React.MouseEvent<HTMLElement>) => onItemClick(index, e) : undefined,
          scale,
          variant,
          disabled,
        });
      })}
    </StyledButtonMenu>
  );
};

export default ButtonMenu;
