import React from 'react'
import { styled } from '../../styled-components'

export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
  balance?: string
}

export interface TokenListProps {
  tokens: Token[]
  onTokenSelect: (token: Token) => void
  selectedToken?: Token
  searchValue?: string
  onSearchChange?: (value: string) => void
  showBalance?: boolean
  className?: string
}

// UIKit基础TokenList组件 - 纯UI展示
const TokenListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchContainer = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border};
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors?.background};
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors?.text};
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors?.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors?.textSubtle};
  }
`

const TokenListScrollable = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors?.background};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.border};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors?.textSubtle};
  }
`

const TokenItem = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ isSelected, theme }) => 
    isSelected ? theme.colors?.backgroundHover : 'transparent'
  };
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover};
  }
  
  ${({ isSelected, theme }) =>
    isSelected && `
    border-left: 3px solid ${theme.colors?.primary};
  `}
`

const TokenLogo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary};
  font-size: 12px;
  flex-shrink: 0;
`

const TokenImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`

const TokenInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const TokenSymbol = styled.div`
  color: ${({ theme }) => theme.colors?.text};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 2px;
`

const TokenName = styled.div`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TokenBalance = styled.div`
  color: ${({ theme }) => theme.colors?.text};
  font-weight: 500;
  font-size: 14px;
  text-align: right;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors?.textSubtle};
  text-align: center;
`

export const TokenList: React.FC<TokenListProps> = ({
  tokens,
  onTokenSelect,
  selectedToken,
  searchValue,
  onSearchChange,
  showBalance = false,
  className
}) => {
  const renderTokenLogo = (token: Token) => {
    if (token.logoURI) {
      return (
        <TokenImage 
          src={token.logoURI} 
          alt={token.symbol}
          onError={(e) => {
            // Fallback to text if image fails
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling!.style.display = 'flex'
          }}
        />
      )
    }
    
    return (
      <TokenLogo>
        {token.symbol.slice(0, 2).toUpperCase()}
      </TokenLogo>
    )
  }

  return (
    <TokenListContainer className={className}>
      {onSearchChange && (
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search tokens by name or symbol..."
            value={searchValue || ''}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchContainer>
      )}
      
      <TokenListScrollable>
        {tokens.length === 0 ? (
          <EmptyState>
            <div>🔍</div>
            <div style={{ marginTop: '12px' }}>No tokens found</div>
            <div style={{ fontSize: '14px', marginTop: '4px' }}>
              Try adjusting your search
            </div>
          </EmptyState>
        ) : (
          tokens.map((token) => (
            <TokenItem
              key={`${token.chainId}-${token.address}`}
              isSelected={selectedToken?.address === token.address}
              onClick={() => onTokenSelect(token)}
            >
              {renderTokenLogo(token)}
              <TokenLogo style={{ display: 'none' }}>
                {token.symbol.slice(0, 2).toUpperCase()}
              </TokenLogo>
              
              <TokenInfo>
                <TokenSymbol>{token.symbol}</TokenSymbol>
                <TokenName>{token.name}</TokenName>
              </TokenInfo>
              
              {showBalance && token.balance && (
                <TokenBalance>{token.balance}</TokenBalance>
              )}
            </TokenItem>
          ))
        )}
      </TokenListScrollable>
    </TokenListContainer>
  )
}

export default TokenList
