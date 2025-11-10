import { styled } from "../../styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }: { $isActive: any; $variant: any; theme: any }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  color: ${({ theme, $isActive  }: { theme: any, $isActive: any }) => ($isActive ? theme.colors.secondary : theme.colors.textSubtle)};
  font-size: 16px;
  font-weight: ${({ $isActive  }: { $isActive: any }) => ($isActive ? "600" : "400")};
  opacity: ${({ $isDisabled  }: { $isDisabled: any }) => ($isDisabled ? 0.5 : 1)};
  pointer-events: ${({ $isDisabled  }: { $isDisabled: any }) => ($isDisabled ? "none" : "inherit")};

  ${({ $statusColor, theme }: { $statusColor: any; theme: any }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant  }: { $variant: any }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    padding-left: 4px;
    padding-right: 4px;

    height: 42px;
  `}

  &:hover {
    background: ${({ theme }: { theme: any }) => theme.colors.tertiary};
    ${({ $variant  }: { $variant: any }) => $variant === "default" && "border-radius: 16px;"};
  }
`;

export default StyledMenuItem;
