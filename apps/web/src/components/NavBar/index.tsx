import React, { useState, useEffect } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { NavBar as UikitNavBar, TabType, ChainSelector, Chain } from '@cometswap/uikit'
import { SettingsButton } from '../SettingsModal'
import { ConnectWallet } from '../ConnectWallet'

// 支持的链配置
const supportedChains: Chain[] = [
  {
    id: 196,
    name: 'XLAYER Mainnet',
    symbol: 'OKB',
    testnet: false
  },
  {
    id: 195,
    name: 'XLAYER Testnet',
    symbol: 'OKB',
    testnet: true
  },
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    testnet: false
  },
  {
    id: 11155111,
    name: 'Sepolia',
    symbol: 'ETH',
    testnet: true
  }
]

interface WebNavBarProps {
  activeTab?: TabType
  onTabChange?: (tab: TabType) => void
}

const WebNavBar: React.FC<WebNavBarProps> = ({ 
  activeTab = 'swap',
  onTabChange = () => {}
}) => {
  // 🔗 获取当前钱包链ID和切换功能
  const walletChainId = useChainId()
  const { switchChain } = useSwitchChain()
  
  // 🔄 根据钱包链ID找到对应的链配置
  const [currentChain, setCurrentChain] = useState<Chain>(() => {
    const chain = supportedChains.find(c => c.id === walletChainId)
    return chain || supportedChains[1] // 默认XLAYER Testnet
  })

  // 🔄 监听钱包链ID变化，同步到UI
  useEffect(() => {
    const chain = supportedChains.find(c => c.id === walletChainId)
    if (chain) {
      console.log('📡 Wallet chain changed to:', chain.name, `(ID: ${walletChainId})`)
      setCurrentChain(chain)
    }
  }, [walletChainId])

  const handleTabChange = (tab: TabType) => {
    onTabChange(tab)
    
    // 根据tab切换页面
    switch(tab) {
      case 'swap':
        // 已经在swap页面
        break;
      case 'liquidity':
        window.location.href = '/liquidity'
        break;
      case 'pools':
        window.location.href = '/pools'
        break;
      case 'farm':
        window.location.href = '/farm'
        break;
      case 'stake':
        window.location.href = '/stake'
        break;
      case 'stats':
        window.location.href = '/stats'
        break;
      case 'launch':
        window.location.href = '/launch'
        break;
      case 'launched':
        window.location.href = '/launched'
        break;
      case 'about':
        window.location.href = '/about'
        break;
      case 'faucet':
        window.location.href = '/faucet'
        break;
    }
  }

  // 🔗 真正切换钱包链
  const handleChainChange = async (chain: Chain) => {
    console.log('🔄 Switching wallet to chain:', chain.name, `(ID: ${chain.id})`)
    
    if (switchChain) {
      try {
        await switchChain({ chainId: chain.id })
        console.log('✅ Chain switched successfully')
      } catch (error) {
        console.error('❌ Failed to switch chain:', error)
      }
    } else {
      console.warn('⚠️ switchChain not available')
    }
  }

  return (
    <UikitNavBar
      activeTab={activeTab}
      onTabChange={handleTabChange}
      rightSide={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* 链选择器 */}
          <ChainSelector
            currentChain={currentChain}
            chains={supportedChains}
            onChainChange={handleChainChange}
          />
          
          {/* 设置按钮 */}
          <SettingsButton />
          
          {/* 连接钱包按钮 */}
          <ConnectWallet />
        </div>
      }
    />
  )
}

export default WebNavBar
