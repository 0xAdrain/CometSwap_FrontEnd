/**
 * 🎛️ DropdownMenu Styles - Stellar UI Implementation
 */
import { styled } from '../../styled-components'
import { variant } from '../../styled-system'
import { Button } from '../Button'
import { Text } from '../Text'
import { Box } from '../Box'
import { StyledDropdownMenuItemProps } from "./types";

// Modern variant definitions
const dropdownItemVariants = {
  active: {
    fontWeight: '600',
    color: 'var(--stellar-primary)',
  },
  inactive: {
    fontWeight: '400', 
    color: 'var(--stellar-textSubtle)',
  },
  disabled: {
    color: 'var(--stellar-textDisabled)',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
} as const

interface DropdownMenuItemProps {
  $isActive?: boolean
  disabled?: boolean
}

export const DropdownMenuItem = styled(Button)<DropdownMenuItemProps>`
  /* Base styles */
  align-items: center;
  background-color: transparent;
  border-radius: 0;
  border: none;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  cursor: pointer;
  
  /* Dynamic styling based on state */
  ${({ $isActive, disabled }: DropdownMenuItemProps) => {
    if (disabled) return dropdownItemVariants.disabled;
    if ($isActive) return dropdownItemVariants.active;
    return dropdownItemVariants.inactive;
  }}
  
  /* Hover and active states */
  &:hover {
    background-color: var(--stellar-backgroundAlt);
  }
  
  &:active {
    transform: translateY(1px);
  }
`

export const StyledDropdownMenuItemContainer = styled(Box)`
  &:first-child ${DropdownMenuItem} {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child ${DropdownMenuItem} {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

export const DropdownMenuDivider = styled(Box)`
  border-color: var(--stellar-border);
  border-style: solid;
  border-width: 1px 0 0;
  margin: 4px 0;
`

interface StyledDropdownMenuProps {
  $isBottomNav?: boolean
  $isOpen?: boolean
}

export const StyledDropdownMenu = styled(Box)<StyledDropdownMenuProps>`
  background-color: var(--stellar-background);
  border: 1px solid var(--stellar-border);
  border-radius: 16px;
  padding: 4px 0;
  pointer-events: auto;
  margin-bottom: 0;
  z-index: 1001;
  
  /* Width based on bottom nav */
  width: ${({ $isBottomNav }: StyledDropdownMenuProps) => 
    $isBottomNav ? 'calc(100% - 32px)' : '280px'
  };
  
  /* Visibility based on open state */
  opacity: ${({ $isOpen }: StyledDropdownMenuProps) => $isOpen ? 1 : 0};
  pointer-events: ${({ $isOpen }: StyledDropdownMenuProps) => 
    $isOpen ? 'auto' : 'none'
  };
`

interface LinkStatusProps {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'failure'
}

const linkStatusVariants = {
  primary: {
    borderColor: 'var(--stellar-primary)',
    color: 'var(--stellar-primary)',
  },
  secondary: {
    borderColor: 'var(--stellar-secondary)', 
    color: 'var(--stellar-secondary)',
  },
  success: {
    borderColor: 'var(--stellar-success)',
    color: 'var(--stellar-success)',
  },
  warning: {
    borderColor: 'var(--stellar-warning)',
    color: 'var(--stellar-warning)',
  },
  failure: {
    borderColor: 'var(--stellar-error)',
    color: 'var(--stellar-error)',
  },
} as const

export const LinkStatus = styled(Text)<LinkStatusProps>`
  border-radius: var(--stellar-borderRadius-md);
  padding: 0 8px;
  border: 2px solid;
  box-shadow: none;
  margin-left: 8px;
  
  /* Apply color variant */
  ${variant({ prop: 'color', variants: linkStatusVariants })}
`;
