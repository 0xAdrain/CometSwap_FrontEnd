import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// 路由数据接口
interface RouteQuote {
  protocol: string
  outputAmount: string
  priceImpact: number
  executionPrice: string
  fee: string
  gasEstimate?: string
  path?: string[]
}

interface SmartRouterResult {
  bestRoute?: RouteQuote
  allRoutes?: RouteQuote[]
  isLoading: boolean
  error?: string
}

export interface RouteVisualizationProps {
  smartRouter: SmartRouterResult
  inputToken?: any
  outputToken?: any
  inputAmount?: string
}

// Styled components with theme support
const RoutePanel = styled(motion.div)`
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  backdrop-filter: blur(10px);
`

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border};
`

const PanelTitle = styled.h3`
  color: ${({ theme }) => theme.colors?.text};
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

const RouteCount = styled.span`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 14px;
  font-weight: 500;
`

// 单个路由卡片
const RouteCard = styled(motion.div)<{ isBest?: boolean }>`
  background: ${({ theme }) => theme.colors?.background};
  border: 1px solid ${({ theme, isBest }) => 
    isBest 
      ? theme.colors?.primary
      : theme.colors?.border
  };
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;

  ${({ isBest, theme }) =>
    isBest &&
    `
    box-shadow: 0 0 20px ${theme.colors?.primary}20;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, ${theme.colors?.primary}, ${theme.colors?.primary});
    }
  `}

  &:hover {
    border-color: ${({ theme }) => theme.colors?.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const ProtocolName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text};
`

const BestBadge = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors?.primary}, ${({ theme }) => theme.colors?.primary});
  color: ${({ theme }) => theme.colors?.background};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const OutputAmount = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary};
  margin-bottom: 8px;
`

const RouteDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
`

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DetailLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DetailValue = styled.span<{ isNegative?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, isNegative }) => 
    isNegative 
      ? theme.colors?.failure
      : theme.colors?.text
  };
`

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 16px;
`

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors?.border};
  border-top: 3px solid ${({ theme }) => theme.colors?.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors?.textSubtle};
  margin: 0;
  font-weight: 500;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 16px;
  color: ${({ theme }) => theme.colors?.textSubtle};
`

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 16px;
  color: ${({ theme }) => theme.colors?.failure};
  text-align: center;
`

export const RouteVisualization: React.FC<RouteVisualizationProps> = ({
  smartRouter,
  inputToken,
  outputToken,
  inputAmount
}) => {
  const { bestRoute, allRoutes, isLoading, error } = smartRouter

  // 格式化价格影响
  const formatPriceImpact = (impact: number) => {
    if (impact > 5) return { value: `${impact.toFixed(2)}%`, isHigh: true }
    if (impact > 1) return { value: `${impact.toFixed(2)}%`, isMedium: true }
    return { value: `${impact.toFixed(2)}%`, isLow: true }
  }

  return (
    <RoutePanel
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <PanelHeader>
        <PanelTitle>Route Analysis</PanelTitle>
        {allRoutes && allRoutes.length > 0 && (
          <RouteCount>{allRoutes.length} routes found</RouteCount>
        )}
      </PanelHeader>

      {isLoading && (
        <LoadingState>
          <LoadingSpinner />
          <LoadingText>Finding best routes...</LoadingText>
        </LoadingState>
      )}

      {error && (
        <ErrorState>
          <div>⚠️</div>
          <div>Failed to find routes</div>
          <div style={{ fontSize: '14px' }}>{error}</div>
        </ErrorState>
      )}

      {!isLoading && !error && (!allRoutes || allRoutes.length === 0) && (
        <EmptyState>
          <div>🔍</div>
          <div>No routes available</div>
          <div style={{ fontSize: '14px' }}>
            {inputToken && outputToken 
              ? `No routes found for ${inputToken.symbol} → ${outputToken.symbol}`
              : 'Select tokens to see available routes'
            }
          </div>
        </EmptyState>
      )}

      {!isLoading && !error && allRoutes && allRoutes.length > 0 && (
        <>
          {allRoutes.map((route, index) => {
            const isBest = route === bestRoute
            const priceImpact = formatPriceImpact(route.priceImpact)
            
            return (
              <RouteCard
                key={`${route.protocol}-${index}`}
                isBest={isBest}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CardHeader>
                  <ProtocolName>
                    {route.protocol}
                    {isBest && <BestBadge>Best</BestBadge>}
                  </ProtocolName>
                </CardHeader>

                <OutputAmount>
                  {route.outputAmount} {outputToken?.symbol}
                </OutputAmount>

                <RouteDetails>
                  <DetailItem>
                    <DetailLabel>Price Impact</DetailLabel>
                    <DetailValue isNegative={route.priceImpact > 1}>
                      {priceImpact.value}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Exchange Rate</DetailLabel>
                    <DetailValue>
                      1 {inputToken?.symbol} = {route.executionPrice} {outputToken?.symbol}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Protocol Fee</DetailLabel>
                    <DetailValue>{route.fee}</DetailValue>
                  </DetailItem>

                  {route.gasEstimate && (
                    <DetailItem>
                      <DetailLabel>Est. Gas</DetailLabel>
                      <DetailValue>{route.gasEstimate}</DetailValue>
                    </DetailItem>
                  )}
                </RouteDetails>
              </RouteCard>
            )
          })}
        </>
      )}
    </RoutePanel>
  )
}

export default RouteVisualization
