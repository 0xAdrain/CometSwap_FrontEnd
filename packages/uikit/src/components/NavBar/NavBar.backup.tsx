import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Box } from '../Box'
import { Text } from '../Text'
import { Button } from '../Button'

// 简化的主题感知NavBar
const NavContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(102, 126, 234, 0.2)'};
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(15, 15, 35, 0.8)'};
  backdrop-filter: blur(20px);
`

const NavContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
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

export interface TabType {
  // 你的TabType定义
}

export interface NavBarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  settingsButton?: React.ReactNode
  walletButton?: React.ReactNode
  className?: string
}

const NavBar: React.FC<NavBarProps> = ({ 
  activeTab = 'swap',
  onTabChange = () => {},
  settingsButton,
  walletButton,
  className 
}) => {
  return (
    <NavContainer className={className}>
      <NavContent>
        <Logo onClick={() => window.location.href = '/'}>
          CometSwap
        </Logo>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {settingsButton}
          {walletButton}
        </div>
      </NavContent>
    </NavContainer>
  )
}

export default NavBar
