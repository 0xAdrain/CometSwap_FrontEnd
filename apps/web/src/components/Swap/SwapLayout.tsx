import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { SwapContainer } from './SwapContainer'
import { RouteVisualization } from './RouteVisualization'

// Token interface matching our existing structure
interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

// Mock smart router result for now
interface SmartRouterResult {
  bestRoute?: any
  allRoutes?: any[]
  isLoading: boolean
  error?: string
}

// 主容器 - 参考老前端的设计
const SwapPageContainer = styled.div`
  display: flex;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  min-height: 600px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
    padding: 16px;
  }
`

// 左侧Swap表单区域 - 固定宽度
const SwapFormSection = styled(motion.div)`
  flex: 0 0 420px;
  
  @media (max-width: 1024px) {
    flex: none;
  }
`

// 右侧路由可视化区域 - 自适应宽度
const RouteSection = styled(motion.div)`
  flex: 1;
  min-width: 600px;
  
  @media (max-width: 1024px) {
    flex: none;
    min-width: auto;
  }
`

// 连接线装饰（可选，参考老前端设计）
const ConnectionContainer = styled.div`
  position: relative;
  flex: 0 0 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const ConnectionLine = styled(motion.div)`
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors?.primary} 0%, 
    ${({ theme }) => theme.colors?.primary} 100%
  );
  border-radius: 1px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    width: 0;
    height: 0;
    border-left: 6px solid ${({ theme }) => theme.colors?.primary};
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transform: translateY(-50%);
  }
`

// 页面标题区域（参考老前端）
const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors?.text};
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors?.primary} 0%, 
    ${({ theme }) => theme.colors?.primary} 50%, 
    ${({ theme }) => theme.colors?.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 16px;
  margin: 0;
  font-weight: 500;
`

// 状态指示器
const StatusIndicator = styled.div<{ isConnected?: boolean }>`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ isConnected, theme }) => 
    isConnected 
      ? theme.colors?.success
      : theme.colors?.textSubtle
  };
  border: 2px solid ${({ theme }) => theme.colors?.background};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors?.background};
    transform: translate(-50%, -50%);
    opacity: ${({ isConnected }) => isConnected ? 1 : 0};
  }
`

export const SwapLayout: React.FC = () => {
  // 模拟状态数据，后续替换为真实数据
  const [inputToken, setInputToken] = useState<Token | undefined>()
  const [outputToken, setOutputToken] = useState<Token | undefined>()
  const [inputAmount, setInputAmount] = useState<string>('')
  
  // 模拟smart router结果
  const mockSmartRouter: SmartRouterResult = {
    isLoading: false,
    error: '',
    bestRoute: inputToken && outputToken && inputAmount ? {
      protocol: 'Uniswap V3',
      outputAmount: (parseFloat(inputAmount || '0') * 0.99).toFixed(4),
      priceImpact: 0.12,
      executionPrice: '0.99',
      fee: '0.3%',
      gasEstimate: '~$2.50'
    } : undefined,
    allRoutes: inputToken && outputToken && inputAmount ? [
      {
        protocol: 'Uniswap V3',
        outputAmount: (parseFloat(inputAmount || '0') * 0.99).toFixed(4),
        priceImpact: 0.12,
        executionPrice: '0.99',
        fee: '0.3%',
        gasEstimate: '~$2.50'
      },
      {
        protocol: 'Uniswap V2',
        outputAmount: (parseFloat(inputAmount || '0') * 0.97).toFixed(4),
        priceImpact: 0.28,
        executionPrice: '0.97',
        fee: '0.3%',
        gasEstimate: '~$3.20'
      },
      {
        protocol: 'SushiSwap',
        outputAmount: (parseFloat(inputAmount || '0') * 0.96).toFixed(4),
        priceImpact: 0.35,
        executionPrice: '0.96',
        fee: '0.25%',
        gasEstimate: '~$2.80'
      }
    ] : []
  }

  return (
    <>
      <PageHeader>
        <PageTitle>
          Swap Tokens
        </PageTitle>
        <PageSubtitle>
          Trade tokens in an instant with best execution price
        </PageSubtitle>
      </PageHeader>

      <SwapPageContainer>
        <SwapFormSection
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ position: 'relative' }}>
            <SwapContainer />
            <StatusIndicator isConnected={true} />
          </div>
        </SwapFormSection>

        <ConnectionContainer>
          <ConnectionLine
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </ConnectionContainer>

        <RouteSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RouteVisualization 
            smartRouter={mockSmartRouter}
            inputToken={inputToken}
            outputToken={outputToken}
            inputAmount={inputAmount}
          />
        </RouteSection>
      </SwapPageContainer>
    </>
  )
}

export default SwapLayout
