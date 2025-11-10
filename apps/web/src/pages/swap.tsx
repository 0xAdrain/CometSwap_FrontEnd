import React, { useState } from 'react'
import styled from 'styled-components'
import { TabType } from '@cometswap/uikit'
import WebNavBar from '../components/NavBar'
import SwapLayout from '../components/Swap/SwapLayout'

const DAppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background: ${({ theme }) => {
    if (theme?.colors) {
      // 为亮色主题和暗色主题创建不同的渐变背景
      const primary = theme.colors.primary || '#667eea';
      const background = theme.colors.background || '#ffffff';
      const backgroundAlt = theme.colors.backgroundAlt || '#f8f9fa';
      
      return `radial-gradient(ellipse at top, ${primary}10 0%, ${backgroundAlt} 50%)`;
    }
    // 回退到硬编码
    return 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.1) 0%, rgba(15, 15, 35, 1) 50%)';
  }};
`

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 32px; // 120px top padding for fixed NavBar
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function SwapPage() {
  const [activeTab, setActiveTab] = useState<TabType>('swap')

  return (
    <DAppContainer>
      <WebNavBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <MainContent>
        {/* 使用完整的Swap布局 - 左侧Swap表单，右侧路由可视化 */}
        <SwapLayout />
      </MainContent>
    </DAppContainer>
  )
}
