import React, { useState } from 'react'
import styled from 'styled-components'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Modal } from '@cometswap/uikit'

// Web层业务组件 - 集成wagmi钱包连接
const WalletButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 16px;
  color: white;
  padding: 10px 20px;
  fontSize: 14px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`

const ModalContent = styled.div`
  padding: 0 24px 24px;
`

const ConnectorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ConnectorButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors?.text};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors?.primary};
    background: ${({ theme }) => theme.colors?.backgroundHover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text};
`

const DisconnectButton = styled.button`
  background: ${({ theme }) => theme.colors?.failure};
  border: none;
  border-radius: 12px;
  color: white;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    opacity: 0.9;
  }
`

export const ConnectWallet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = (connector: any) => {
    connect({ connector })
    setIsOpen(false)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <AccountInfo>
        {formatAddress(address)}
        <DisconnectButton onClick={() => disconnect()}>
          断开
        </DisconnectButton>
      </AccountInfo>
    )
  }

  return (
    <>
      <WalletButton onClick={() => setIsOpen(true)}>
        连接钱包
      </WalletButton>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="连接钱包"
        maxWidth="400px"
      >
        <ModalContent>
          <ConnectorList>
            {connectors.map((connector) => (
              <ConnectorButton
                key={connector.id}
                onClick={() => handleConnect(connector)}
                disabled={isPending}
              >
                <span>💼</span>
                {connector.name}
              </ConnectorButton>
            ))}
          </ConnectorList>
          
          <div style={{ 
            marginTop: '16px', 
            textAlign: 'center', 
            fontSize: '12px',
            color: '#999'
          }}>
            连接钱包即表示您同意我们的服务条款
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConnectWallet
