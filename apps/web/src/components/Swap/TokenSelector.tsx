import React, { useState } from 'react'
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Input,
  styled 
} from '@cometswap/uikit'

// Token interface - 可以从config包导入
export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

export interface TokenSelectorProps {
  label: string
  token?: Token
  amount?: string
  onTokenSelect?: (token: Token) => void
  onAmountChange?: (amount: string) => void
  showBalance?: boolean
  readOnly?: boolean
  className?: string
}

const SelectorContainer = styled(Box)`
  background: ${({ theme }) => theme.colors?.background || 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 16px;
  padding: 16px;
  position: relative;
`

const SelectorHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const TokenButton = styled(Button)`
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 600;
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(255, 255, 255, 0.1)'};
  }
`

const AmountInput = styled(Input)`
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  text-align: right;
  
  &:focus {
    box-shadow: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(255, 255, 255, 0.4)'};
  }
`

const TokenIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`

const Balance = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(255, 255, 255, 0.6)'};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors?.primary || '#667eea'};
  }
`

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  label,
  token,
  amount,
  onTokenSelect,
  onAmountChange,
  showBalance = false,
  readOnly = false,
  className
}) => {
  const [balance] = useState('0.00') // 这里会连接实际的余额获取

  const handleTokenClick = () => {
    if (onTokenSelect) {
      // 这里会打开token选择模态框
      console.log('Open token selector modal')
    }
  }

  const handleMaxClick = () => {
    if (onAmountChange && balance !== '0.00') {
      onAmountChange(balance)
    }
  }

  return (
    <SelectorContainer className={className}>
      <SelectorHeader>
        <Text fontSize="12px" fontWeight="500" color="textSubtle">
          {label}
        </Text>
        {showBalance && (
          <Balance onClick={handleMaxClick}>
            Balance: {balance}
          </Balance>
        )}
      </SelectorHeader>

      <Flex alignItems="center" justifyContent="space-between">
        <TokenButton
          variant="secondary"
          scale="sm"
          onClick={handleTokenClick}
          disabled={readOnly}
        >
          <Flex alignItems="center">
            {token?.logoURI && (
              <TokenIcon src={token.logoURI} alt={token.symbol} />
            )}
            <Text fontWeight="600">
              {token?.symbol || 'Select Token'}
            </Text>
            {!readOnly && (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ marginLeft: '4px' }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            )}
          </Flex>
        </TokenButton>

        <AmountInput
          type="number"
          placeholder="0.0"
          value={amount || ''}
          onChange={(e) => onAmountChange?.(e.target.value)}
          disabled={readOnly}
          scale="lg"
        />
      </Flex>

      {token && (
        <Flex justifyContent="flex-end" mt="4px">
          <Text fontSize="12px" color="textSubtle">
            {token.name}
          </Text>
        </Flex>
      )}
    </SelectorContainer>
  )
}

export default TokenSelector
