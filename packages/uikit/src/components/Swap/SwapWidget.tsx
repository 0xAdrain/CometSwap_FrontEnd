import React from 'react'
import { styled } from '../../styled-components'
import { Box } from '../Box'
import { Button } from '../Button'
import IconButton from '../Button/IconButton'
import { Flex } from '../Box'

// Swap Widget Container - 参考 PancakeSwap 设计
export const SwapContainer = styled(Box)`
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#1a1a1a'};
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  max-width: 420px;
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
`

// Currency Input Panel Container
export const CurrencyInputContainer = styled(Box)`
  background: ${({ theme }) => theme.colors?.background || '#0d0d0d'};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  padding: 16px;
  position: relative;
`

// Switch Arrow Button - 参考 PancakeSwap 的 SwitchIconButton
export const SwitchIconButton = styled(IconButton)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  border: 4px solid ${({ theme }) => theme.colors?.background || '#fff'};
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#1a1a1a'};
  
  .icon-down {
    display: block;
  }
  .icon-up-down {
    display: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors?.primary || '#667eea'};
    transform: rotate(180deg);
    
    .icon-down {
      display: none;
      fill: white;
    }
    .icon-up-down {
      display: block;
      fill: white;
    }
  }
  
  transition: all 0.2s ease;
`

// Currency Selection Button
export const CurrencySelectButton = styled(Button)`
  background: transparent;
  border: none;
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  font-weight: 600;
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(255, 255, 255, 0.05)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Numerical Input for amounts
export const NumericalInput = styled.input<{ error?: boolean; loading?: boolean }>`
  background: transparent;
  border: none;
  outline: none;
  font-size: 28px;
  font-weight: 600;
  text-align: right;
  width: 100%;
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(255, 255, 255, 0.4)'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  ${({ error, theme }) =>
    error &&
    `
    color: ${theme.colors?.failure || '#ff6b6b'};
  `}
`

// Token Icon Component
export const TokenLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`

// Balance Text Component
export const BalanceText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(255, 255, 255, 0.6)'};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors?.primary || '#667eea'};
  }
`

// Swap Arrow Icons - 参考 PancakeSwap 的图标
export const ArrowDownIcon: React.FC<{ className?: string; color?: string }> = ({ className, color = "currentColor" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.70 10.70c-.39-.39-.39-1.02 0-1.41.39-.39 1.03-.39 1.42 0z"
      fill={color}
    />
  </svg>
)

export const ArrowUpDownIcon: React.FC<{ className?: string; color?: string }> = ({ className, color = "currentColor" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M16 17.01V11c0-.55-.45-1-1-1s-1 .45-1 1v6.01h-1.79c-.45 0-.67.54-.35.85l2.79 2.78c.2.19.51.19.71 0l2.79-2.78c.32-.31.09-.85-.35-.85H16zM8.65 3.35L5.86 6.14c-.32.31-.09.85.35.85H8v6.01c0 .55.45 1 1 1s1-.45 1-1V7h1.79c.45 0 .67-.54.35-.85L9.35 3.35c-.19-.19-.51-.19-.7 0z"
      fill={color}
    />
  </svg>
)

// Switch Button Component - 参考 PancakeSwap
export const SwitchButton: React.FC<{ onClick?: () => void; disabled?: boolean }> = ({ onClick, disabled }) => (
  <SwitchIconButton variant="light" scale="sm" onClick={onClick} disabled={disabled}>
    <ArrowDownIcon className="icon-down" color="primary" />
    <ArrowUpDownIcon className="icon-up-down" color="primary" />
  </SwitchIconButton>
)

// Swap Info Panel for displaying trade details
export const SwapInfoPanel = styled(Box)`
  background: ${({ theme }) => theme.colors?.background || 'rgba(255, 255, 255, 0.02)'};
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`

// Export all components
export {
  // Re-export from other files for convenience
  Box,
  Flex,
  Button,
  IconButton
}
