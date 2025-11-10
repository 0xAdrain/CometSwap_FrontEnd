import React, { useState } from 'react'
import styled from 'styled-components'

// 简化的主题感知NavBar
const NavContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(102, 126, 234, 0.2)'};
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(15, 15, 35, 0.9)'};
  backdrop-filter: blur(20px);
  z-index: 1000;
`

const NavContent = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  min-width: 0;
  
  @media (max-width: 1024px) {
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`

const Logo = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors?.primary ? 
    `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary || '#764ba2'} 100%)` :
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  cursor: pointer;
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 1;
  min-width: 0;
  
  @media (max-width: 1200px) {
    gap: 16px;
  }
  
  @media (max-width: 900px) {
    gap: 12px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.button<{ active?: boolean; hasDropdown?: boolean }>`
  all: unset;
  position: relative;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  
  color: ${({ theme, active }) => 
    active 
      ? theme.colors?.primary || '#667eea'
      : theme.colors?.text || 'rgba(255, 255, 255, 0.7)'
  };
  
  background: ${({ active }) => active ? 'rgba(102, 126, 234, 0.15)' : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(102, 126, 234, 0.1)'};
    transform: translateY(-1px);
  }
  
  @media (max-width: 1024px) {
    padding: 6px 12px;
    font-size: 0.9em;
  }
  
  @media (max-width: 900px) {
    padding: 6px 8px;
    font-size: 0.85em;
  }
  
  ${({ hasDropdown }) => hasDropdown && `
    &:after {
      content: '▼';
      margin-left: 8px;
      font-size: 0.7em;
      opacity: 0.7;
    }
  `}
`

const DropdownMenu = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(15, 15, 35, 0.95)'};
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(102, 126, 234, 0.2)'};
  border-radius: 12px;
  padding: 8px;
  margin-top: 8px;
  z-index: 9998;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  display: ${({ show }) => show ? 'block' : 'none'};
`

const DropdownItem = styled.button<{ active?: boolean }>`
  all: unset;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  
  color: ${({ theme, active }) => 
    active 
      ? theme.colors?.primary || '#667eea'
      : theme.colors?.text || 'rgba(255, 255, 255, 0.9)'
  };
  
  background: ${({ active }) => active ? 'rgba(102, 126, 234, 0.15)' : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(102, 126, 234, 0.1)'};
  }
`

export type TabType = 'swap' | 'liquidity' | 'pools' | 'farm' | 'stake' | 'stats' | 'launch' | 'launched' | 'about' | 'faucet'

export interface NavBarProps {
  activeTab?: TabType
  onTabChange?: (tab: TabType) => void
  rightSide?: React.ReactNode
  className?: string
}

const NavBar: React.FC<NavBarProps> = ({ 
  activeTab = 'swap',
  onTabChange = () => {},
  rightSide,
  className 
}) => {
  const [tradeOpen, setTradeOpen] = useState(false)
  const [earnOpen, setEarnOpen] = useState(false)
  const tradeTimeoutRef = React.useRef<NodeJS.Timeout>()
  const earnTimeoutRef = React.useRef<NodeJS.Timeout>()

  const showTradeDropdown = () => {
    if (tradeTimeoutRef.current) clearTimeout(tradeTimeoutRef.current)
    setTradeOpen(true)
  }

  const hideTradeDropdown = () => {
    tradeTimeoutRef.current = setTimeout(() => setTradeOpen(false), 150)
  }

  const showEarnDropdown = () => {
    if (earnTimeoutRef.current) clearTimeout(earnTimeoutRef.current)
    setEarnOpen(true)
  }

  const hideEarnDropdown = () => {
    earnTimeoutRef.current = setTimeout(() => setEarnOpen(false), 150)
  }
  
  const tradeItems = ['swap', 'liquidity'] as TabType[]
  const earnItems = ['pools', 'farm', 'stake'] as TabType[]
  const isTradeActive = tradeItems.includes(activeTab)
  const isEarnActive = earnItems.includes(activeTab)
  
  return (
    <NavContainer className={className}>
      <NavContent>
        <LeftSection>
          <Logo onClick={() => window.location.href = '/'}>
            CometSwap
          </Logo>
          
          <NavMenu>
            <div style={{ position: 'relative' }}
                 onMouseEnter={showTradeDropdown}
                 onMouseLeave={hideTradeDropdown}>
              <NavLink 
                active={isTradeActive}
                hasDropdown
              >
                Trade
              </NavLink>
              <DropdownMenu show={tradeOpen}
                           onMouseEnter={showTradeDropdown}
                           onMouseLeave={hideTradeDropdown}>
                <DropdownItem 
                  active={activeTab === 'swap'}
                  onClick={() => onTabChange('swap')}
                >
                  Swap
                </DropdownItem>
                <DropdownItem 
                  active={activeTab === 'liquidity'}
                  onClick={() => onTabChange('liquidity')}
                >
                  Liquidity
                </DropdownItem>
              </DropdownMenu>
            </div>
            
            <div style={{ position: 'relative' }}
                 onMouseEnter={showEarnDropdown}
                 onMouseLeave={hideEarnDropdown}>
              <NavLink 
                active={isEarnActive}
                hasDropdown
              >
                Earn
              </NavLink>
              <DropdownMenu show={earnOpen}
                           onMouseEnter={showEarnDropdown}
                           onMouseLeave={hideEarnDropdown}>
                <DropdownItem 
                  active={activeTab === 'pools'}
                  onClick={() => onTabChange('pools')}
                >
                  Pools
                </DropdownItem>
                <DropdownItem 
                  active={activeTab === 'farm'}
                  onClick={() => onTabChange('farm')}
                >
                  Farm
                </DropdownItem>
                <DropdownItem 
                  active={activeTab === 'stake'}
                  onClick={() => onTabChange('stake')}
                >
                  Stake
                </DropdownItem>
              </DropdownMenu>
            </div>
            
            <NavLink 
              active={activeTab === 'stats'} 
              onClick={() => onTabChange('stats')}
            >
              Stats
            </NavLink>
            
            <NavLink 
              active={activeTab === 'launch'} 
              onClick={() => onTabChange('launch')}
            >
              Launch
            </NavLink>
          </NavMenu>
        </LeftSection>
        
        <RightSection>
          {rightSide}
        </RightSection>
      </NavContent>
    </NavContainer>
  )
}

export { NavBar }
export default NavBar
