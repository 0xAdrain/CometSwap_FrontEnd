import React from 'react'
import styled from 'styled-components'
import { Button, Text } from '@cometswap/uikit'
import { useTranslate } from '@comet-swap/localization'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
`

const HeroSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin: 0 0 3rem 0;
  opacity: 0.9;
  color: white;
  max-width: 600px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`

const FeatureSection = styled.div`
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  margin-top: 4rem;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 1rem 0;
`

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
`

export default function HomePage() {
  const t = useTranslate()

  const handleSwapClick = () => {
    window.location.href = '/swap'
  }

  const handleLearnMoreClick = () => {
    // 可以链接到文档或关于页面
    console.log('Learn more clicked')
  }

  return (
    <PageContainer>      
      <HeroSection>
        <HeroTitle>
          The Future of DeFi Trading
        </HeroTitle>
        <HeroSubtitle>
          {t('hero.subtitle', 'Trade, earn, and build on the most advanced decentralized exchange with intelligent routing and cross-chain capabilities.')}
        </HeroSubtitle>
        
        <ActionButtons>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleSwapClick}
            style={{ minWidth: '160px' }}
          >
            {t('hero.goDapp', 'Go DApp')}
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleLearnMoreClick}
            style={{ minWidth: '160px' }}
          >
            {t('hero.learnMore', 'Learn More')}
          </Button>
        </ActionButtons>
        
        <StatsSection>
          <StatCard>
            <StatValue>$2.5B+</StatValue>
            <StatLabel>{t('stats.tvl', 'Total Value Locked')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>150K+</StatValue>
            <StatLabel>{t('stats.users', 'Active Users')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>50M+</StatValue>
            <StatLabel>{t('stats.transactions', 'Transactions')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>99.9%</StatValue>
            <StatLabel>{t('stats.uptime', 'Uptime')}</StatLabel>
          </StatCard>
        </StatsSection>
      </HeroSection>
      
      <FeatureSection>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>
              {t('features.smartRouting.title', 'Smart Routing')}
            </FeatureTitle>
            <FeatureDescription>
              {t('features.smartRouting.description', 'Get the best prices across multiple DEXs with our advanced routing algorithm that splits trades for optimal execution.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🌉</FeatureIcon>
            <FeatureTitle>
              {t('features.crossChain.title', 'Cross-Chain Trading')}
            </FeatureTitle>
            <FeatureDescription>
              {t('features.crossChain.description', 'Trade seamlessly across multiple blockchains with built-in bridge functionality and unified liquidity.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>
              {t('features.security.title', 'Bank-Grade Security')}
            </FeatureTitle>
            <FeatureDescription>
              {t('features.security.description', 'Your funds are protected by audited smart contracts, multi-sig wallets, and comprehensive insurance coverage.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💎</FeatureIcon>
            <FeatureTitle>
              {t('features.liquidity.title', 'Deep Liquidity')}
            </FeatureTitle>
            <FeatureDescription>
              {t('features.liquidity.description', 'Access aggregated liquidity from top DEXs and market makers for minimal slippage on large trades.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>
              {t('features.mobile.title', 'Mobile-First Design')}
            </FeatureTitle>
            <FeatureDescription>
              {t('features.mobile.description', 'Built with Tamagui for seamless mobile experience. Trade anywhere, anytime with our native mobile app.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>
              {t('features.gasOptimization.title', 'Gas Optimization')}
            </FeatureTitle>
            <FeatureDescription>
              {t('features.gasOptimization.description', 'Advanced gas optimization techniques reduce transaction costs by up to 40% compared to traditional DEXs.')}
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>
    </PageContainer>
  )
}