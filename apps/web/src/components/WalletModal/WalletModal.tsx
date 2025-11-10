import React, { useState, useEffect } from 'react'
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { useTranslate } from '@comet-swap/localization'
import styled from 'styled-components'

interface WalletModalProps {
  isOpen: boolean
  onDismiss: () => void
}

// CDN地址 - 使用PancakeSwap的CDN
const ASSET_CDN = 'https://assets.pancakeswap.finance'

// 钱包配置
const walletConfigs = {
  'Injected': {
    title: 'Browser Wallet',
    icon: `${ASSET_CDN}/web/wallets/metamask.png`,
    description: 'Connect using browser extension'
  },
  'MetaMask': {
    title: 'MetaMask',
    icon: `${ASSET_CDN}/web/wallets/metamask.png`,
    description: 'The world\'s most popular wallet'
  },
  'WalletConnect': {
    title: 'WalletConnect', 
    icon: `${ASSET_CDN}/web/wallets/walletconnect.png`,
    description: 'Scan QR code with mobile wallet'
  },
  'Coinbase Wallet': {
    title: 'Coinbase Wallet',
    icon: `${ASSET_CDN}/web/wallets/coinbase.png`,
    description: 'Connect with Coinbase Wallet'
  },
  'Trust Wallet': {
    title: 'Trust Wallet',
    icon: `${ASSET_CDN}/web/wallets/trust.png`,
    description: 'Connect with Trust Wallet'
  }
} as const

// Styled Components - 0运行时开销，PancakeSwap风格
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(15, 15, 35, 0.92));
  backdrop-filter: blur(12px);
  z-index: ${({ theme }) => theme.zIndices?.modal || '1000'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#27262c'};
  border-radius: 32px;
  max-width: 420px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors?.cardBorder || 'rgba(255, 255, 255, 0.1)'};
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0px 24px;
`

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
  }
`

const ModalBody = styled.div`
  padding: 24px;
`

const ErrorBox = styled.div`
  background: ${({ theme }) => theme.colors.failure}19;
  border: 1px solid ${({ theme }) => theme.colors.failure}4D;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    color: ${({ theme }) => theme.colors.failure};
    font-size: 14px;
  }
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: center;
  margin: 0 0 24px 0;
  font-size: 14px;
  line-height: 1.4;
`

const WalletItem = styled.button<{ $isConnecting?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  background: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  cursor: ${({ $isConnecting }) => $isConnecting ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${({ $isConnecting }) => $isConnecting ? 0.7 : 1};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.tertiary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`

const WalletIcon = styled.div<{ $isConnecting?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  overflow: hidden;
  
  img {
    border-radius: 8px;
  }
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid ${({ theme }) => theme.colors.textSubtle};
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  
  h4 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 14px;
    margin: 0;
  }
`

const SecurityNote = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 16px;
  padding: 16px;
  margin-top: 24px;
  text-align: center;
  
  p {
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 12px;
    margin: 0;
    line-height: 1.4;
  }
`

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onDismiss }) => {
  const t = useTranslate()
  const { connectors, connect } = useConnect()
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const handleConnect = async (connector: any) => {
    try {
      setConnectingWallet(connector.name)
      setConnectionError(null)
      await connect({ connector })
      onDismiss()
    } catch (error: any) {
      setConnectionError(error?.message || 'Connection failed')
    } finally {
      setConnectingWallet(null)
    }
  }

  const getWalletConfig = (name: string) => {
    return walletConfigs[name as keyof typeof walletConfigs] || {
      title: name,
      icon: `${ASSET_CDN}/web/wallets/metamask.png`,
      description: 'Connect wallet'
    }
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onDismiss}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Connect Wallet</ModalTitle>
          <CloseButton onClick={onDismiss}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {connectionError && (
            <ErrorBox>
              <span>⚠️</span>
              <span>{connectionError}</span>
            </ErrorBox>
          )}

          <Description>
            Choose how you want to connect. There are several wallet providers.
          </Description>

          {connectors.map((connector) => {
            const isConnecting = connectingWallet === connector.name
            const config = getWalletConfig(connector.name)
            
            return (
              <WalletItem
                key={connector.uid}
                onClick={() => handleConnect(connector)}
                disabled={isConnecting}
                $isConnecting={isConnecting}
              >
                <WalletIcon $isConnecting={isConnecting}>
                  {isConnecting ? (
                    <div className="spinner" />
                  ) : (
                    <img 
                      src={config.icon}
                      alt={config.title}
                      width="32"
                      height="32"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement!
                        parent.style.background = 'linear-gradient(135deg, #1FC7D4 0%, #9A6AFF 100%)'
                        parent.innerHTML = connector.name.charAt(0).toUpperCase()
                        parent.style.fontSize = '18px'
                        parent.style.fontWeight = '600'
                        parent.style.color = 'white'
                      }}
                    />
                  )}
                </WalletIcon>
                
                <WalletInfo>
                  <h4>{config.title}</h4>
                  <p>
                    {isConnecting ? 'Connecting...' : 
                     connector.type === 'injected' ? 'Detected' : 
                     config.description}
                  </p>
                </WalletInfo>
              </WalletItem>
            )
          })}

          <SecurityNote>
            <p>🔒 We do not own your private keys and cannot access your funds without your confirmation.</p>
          </SecurityNote>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  )
}

// Styled Components for Wallet Button
const ConnectedWalletContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ConnectedButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors?.tertiary || 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${({ theme }) => theme.colors?.cardBorder || 'rgba(255, 255, 255, 0.2)'};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #00D897;
  border-radius: 50%;
  box-shadow: 0 0 6px #00D897;
`

const AddressText = styled.span`
  color: ${({ theme }) => theme.colors?.text || 'white'};
  font-size: 14px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
`

const DisconnectButton = styled.button`
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #FF453A;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 59, 48, 0.2);
  }
`

const ConnectWalletButton = styled.button`
  background: linear-gradient(135deg, #1FC7D4 0%, #9A6AFF 100%);
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  box-shadow: 0 4px 12px rgba(31, 199, 212, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(31, 199, 212, 0.4);
  }
`

// 钱包连接按钮组件
export const ConnectWallet: React.FC = () => {
  const t = useTranslate()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [showModal, setShowModal] = useState(false)

  if (isConnected && address) {
    return (
      <ConnectedWalletContainer>
        <ConnectedButton>
          <StatusIndicator />
          <AddressText>
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </AddressText>
        </ConnectedButton>
        
        <DisconnectButton onClick={() => disconnect()}>
          Disconnect
        </DisconnectButton>
      </ConnectedWalletContainer>
    )
  }

  return (
    <>
      <ConnectWalletButton onClick={() => setShowModal(true)}>
        Connect Wallet
      </ConnectWalletButton>

      <WalletModal 
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
      />
    </>
  )
}
