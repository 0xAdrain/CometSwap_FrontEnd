import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '@cometswap/uikit'
import { useCometTheme } from '../providers/ThemeProvider'

// 使用styled-components，遵循主题系统
const ModalContent = styled.div`
  padding: 0 24px 24px;
`

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border};
  
  &:last-child {
    border-bottom: none;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors?.text};
  font-size: 16px;
  font-weight: 600;
`

const ThemeToggle = styled.button<{ isDark: boolean }>`
  position: relative;
  width: 60px;
  height: 32px;
  background: ${({ theme, isDark }) => 
    isDark ? theme.colors?.primary : theme.colors?.textSubtle};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: ${({ isDark }) => isDark ? '32px' : '4px'};
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  &:hover {
    opacity: 0.9;
  }
`

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors?.text};
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover};
    border-color: ${({ theme }) => theme.colors?.primary};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

// Settings按钮组件 - 使用UIKit Modal
export const SettingsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleTheme } = useCometTheme()

  return (
    <>
      <StyledButton onClick={() => setIsOpen(true)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </StyledButton>

      {/* 使用UIKit的Modal组件 */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="设置"
        maxWidth="400px"
      >
        <ModalContent>
          {/* 主题切换 */}
          <SettingsRow>
            <Label>深色模式</Label>
            <ThemeToggle 
              isDark={isDark}
              onClick={toggleTheme}
            />
          </SettingsRow>
          
          {/* 其他设置项 */}
          <SettingsRow>
            <Label>语言</Label>
            <Label style={{ fontSize: '14px', opacity: 0.7 }}>简体中文</Label>
          </SettingsRow>
          
          <SettingsRow>
            <Label>滑点容差</Label>
            <Label style={{ fontSize: '14px', opacity: 0.7 }}>0.5%</Label>
          </SettingsRow>
        </ModalContent>
      </Modal>
    </>
  )
}
