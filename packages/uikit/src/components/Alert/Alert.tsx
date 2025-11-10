import React from "react";
import { styled } from "../../styled-components";
import { variant } from "../../styled-system";
import { Text } from "../Text";
import { IconButton } from "../Button";
import { CloseIcon } from "../Svg";
import Flex from "../Box/Flex";
import { AlertProps, variants } from "./types";
import { variantIcons, alertVariants } from "./theme";

interface ThemedIconLabel {
  variant?: AlertProps["variant"];
}

const IconLabel = styled.div<ThemedIconLabel>`
  border-radius: 16px 0 0 16px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Use Stellar variant system for colors */
  ${variant({
    variants: alertVariants,
  })}
`;

const withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
const Details = styled.div<{ $hasHandler: boolean }>`
  flex: 1;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: ${({ $hasHandler }: { $hasHandler: boolean }) => ($hasHandler ? `${withHandlerSpacing}px` : "12px")};
  padding-top: 12px;
`;

const CloseHandler = styled.div`
  border-radius: 0 16px 16px 0;
  right: 8px;
  position: absolute;
  top: 8px;
`;

const StyledAlert = styled(Flex)`
  position: relative;
  background-color: var(--stellar-background);
  border-radius: 16px;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--stellar-border);
`;

const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({ 
  title, 
  children, 
  variant = variants.INFO, 
  onClick 
}) => {
  // Use object lookup instead of switch-case
  const Icon = variantIcons[variant];

  return (
    <StyledAlert>
      <IconLabel variant={variant}>
        <Icon color="currentColor" width="24px" />
      </IconLabel>
      <Details $hasHandler={!!onClick}>
        <Text bold>{title}</Text>
        {typeof children === "string" ? (
          <Text style={{ wordBreak: "break-word" }} as="p">
            {children}
          </Text>
        ) : (
          children
        )}
      </Details>
      {onClick && (
        <CloseHandler>
          <IconButton scale="sm" variant="text" onClick={onClick}>
            <CloseIcon width="24px" color="currentColor" />
          </IconButton>
        </CloseHandler>
      )}
    </StyledAlert>
  );
};

export default Alert;
