import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Dropdown } from '../Dropdown'

export interface Chain {
  id: number
  name: string
  symbol: string
  iconUrl?: string
  testnet?: boolean
}

export interface ChainSelectorProps {
  currentChain: Chain
  chains: Chain[]
  onChainChange: (chain: Chain) => void
  disabled?: boolean
}

const ChainButton = styled.button<{ isOpen?: boolean }>`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme, isOpen }) => 
    isOpen 
      ? theme.colors?.backgroundHover || 'rgba(255, 255, 255, 0.08)'
      : theme.colors?.backgroundAlt || 'rgba(255, 255, 255, 0.05)'
  };
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors?.text || 'white'};

  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(255, 255, 255, 0.1)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ChainIcon = styled.div<{ size?: number }>`
  width: ${({ size = 20 }) => size}px;
  height: ${({ size = 20 }) => size}px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ size = 20 }) => size * 0.6}px;
  font-weight: 600;
`

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(30, 30, 40, 0.85)'};
  backdrop-filter: blur(40px);
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  min-width: 220px;
  padding: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  z-index: 1001;
`

const DropdownItem = styled.button<{ active?: boolean }>`
  all: unset;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  color: ${({ theme, active }) => 
    active 
      ? theme.colors?.primary || '#667eea'
      : theme.colors?.text || 'rgba(255, 255, 255, 0.9)'
  };
  
  background: ${({ active }) => active ? 'rgba(102, 126, 234, 0.15)' : 'transparent'};
  font-weight: ${({ active }) => active ? '600' : '400'};
  
  &:hover {
    background: ${({ theme, active }) => 
      active 
        ? 'rgba(102, 126, 234, 0.25)' 
        : theme.colors?.backgroundHover || 'rgba(255, 255, 255, 0.06)'
    };
    transform: translateX(2px);
  }
`

const ChainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const TestnetLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(255, 255, 255, 0.5)'};
  font-weight: 400;
`

export const ChainSelector: React.FC<ChainSelectorProps> = ({
  currentChain,
  chains,
  onChainChange,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleChainSelect = (chain: Chain) => {
    onChainChange(chain);
    setIsOpen(false);
  };

  return (
    <div 
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
      style={{
        position: 'relative',
        display: 'inline-block',
        zIndex: isOpen ? 1002 : 1000
      }}
    >
      <ChainButton isOpen={isOpen} disabled={disabled}>
        <ChainIcon>
          {currentChain.iconUrl ? (
            <img 
              src={currentChain.iconUrl} 
              alt={currentChain.name}
              width={16}
              height={16}
              style={{ borderRadius: '50%' }}
            />
          ) : (
            currentChain.symbol.charAt(0)
          )}
        </ChainIcon>
        <span>{currentChain.name}</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
          style={{
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            opacity: 0.7
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </ChainButton>
      
      {isOpen && (
        <DropdownMenu 
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
        >
          {chains.map((chain) => (
            <DropdownItem
              key={chain.id}
              active={currentChain.id === chain.id}
              onClick={() => handleChainSelect(chain)}
            >
              <ChainIcon>
                {chain.iconUrl ? (
                  <img 
                    src={chain.iconUrl} 
                    alt={chain.name}
                    width={14}
                    height={14}
                    style={{ borderRadius: '50%' }}
                  />
                ) : (
                  chain.symbol.charAt(0)
                )}
              </ChainIcon>
              <ChainInfo>
                <span>{chain.name}</span>
                {chain.testnet && (
                  <TestnetLabel>Testnet</TestnetLabel>
                )}
              </ChainInfo>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </div>
  )
}

export default ChainSelector
