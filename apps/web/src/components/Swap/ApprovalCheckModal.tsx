import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Modal } from '@cometswap/uikit'

// Token类型定义
interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

// Approval信息类型
export interface TokenApprovalInfo {
  token: Token
  spender: string
  currentAllowance: string
  requiredAmount: string
  needsApproval: boolean
}

export interface ApprovalCheckModalProps {
  isOpen: boolean
  onClose: () => void
  onApprovalComplete: () => void
  approvalInfo: TokenApprovalInfo | null
  swapAmount: string
  isApproving?: boolean
  isSuccess?: boolean
  error?: any
}

// Styled components with theme support
const ModalContent = styled.div`
  padding: 0 24px 24px;
`

const TokenInfoCard = styled.div`
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const InfoLabel = styled.div`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 14px;
  font-weight: 500;
`

const InfoValue = styled.div`
  color: ${({ theme }) => theme.colors?.text};
  font-size: 14px;
  font-weight: 600;
`

const StatusCard = styled.div<{ status: 'idle' | 'pending' | 'success' | 'error' }>`
  background: ${({ theme, status }) => {
    switch (status) {
      case 'success':
        return `${theme.colors?.success}15`
      case 'error':
        return `${theme.colors?.failure}15`
      case 'pending':
        return `${theme.colors?.primary}15`
      default:
        return theme.colors?.backgroundAlt
    }
  }};
  border: 1px solid ${({ theme, status }) => {
    switch (status) {
      case 'success':
        return `${theme.colors?.success}30`
      case 'error':
        return `${theme.colors?.failure}30`
      case 'pending':
        return `${theme.colors?.primary}30`
      default:
        return theme.colors?.border
    }
  }};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: center;
`

const StatusIcon = styled.div<{ status: 'idle' | 'pending' | 'success' | 'error' }>`
  font-size: 48px;
  margin-bottom: 12px;
  
  ${({ status }) => status === 'pending' && `
    animation: spin 1s linear infinite;
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}
`

const StatusTitle = styled.h3`
  color: ${({ theme }) => theme.colors?.text};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
`

const StatusMessage = styled.p`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`

const ApproveButton = styled(motion.button)`
  flex: 1;
  padding: 16px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.colors?.primary};
  color: white;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors?.primaryHover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors?.textDisabled};
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: ${({ theme }) => theme.colors?.textSubtle};
  border: 1px solid ${({ theme }) => theme.colors?.border};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors?.backgroundHover};
    color: ${({ theme }) => theme.colors?.text};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const HelpText = styled.div`
  text-align: center;
  margin-top: 16px;
  
  p {
    color: ${({ theme }) => theme.colors?.textSubtle};
    font-size: 12px;
    margin: 0;
    line-height: 1.5;
  }
`

const WarningBox = styled.div`
  background: ${({ theme }) => theme.colors?.warning}15;
  border: 1px solid ${({ theme }) => theme.colors?.warning}30;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

const WarningText = styled.div`
  color: ${({ theme }) => theme.colors?.warning};
  font-size: 13px;
  line-height: 1.5;
  flex: 1;
`

export const ApprovalCheckModal: React.FC<ApprovalCheckModalProps> = ({
  isOpen,
  onClose,
  onApprovalComplete,
  approvalInfo,
  swapAmount,
  isApproving = false,
  isSuccess = false,
  error = null
}) => {
  // 确定当前状态
  const getStatus = (): 'idle' | 'pending' | 'success' | 'error' => {
    if (error) return 'error'
    if (isSuccess) return 'success'
    if (isApproving) return 'pending'
    return 'idle'
  }

  const status = getStatus()

  // 获取状态图标
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'pending':
        return '⏳'
      default:
        return '🔐'
    }
  }

  // 获取状态标题
  const getStatusTitle = () => {
    switch (status) {
      case 'success':
        return 'Approval Successful!'
      case 'error':
        return 'Approval Failed'
      case 'pending':
        return 'Approving Token...'
      default:
        return 'Token Approval Required'
    }
  }

  // 获取状态消息
  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return 'Your token has been approved. You can now proceed with the swap.'
      case 'error':
        return error?.message || 'Failed to approve token. Please try again.'
      case 'pending':
        return 'Please confirm the approval transaction in your wallet and wait for confirmation...'
      default:
        return 'You need to approve this token before swapping. This is a one-time action per token.'
    }
  }

  const handleApprove = () => {
    // UI阶段：模拟授权
    console.log('🔐 Approve token:', approvalInfo?.token.symbol)
    // 真实集成时会调用 writeContract
  }

  const handleClose = () => {
    if (!isApproving) {
      onClose()
    }
  }

  const handleContinue = () => {
    if (isSuccess) {
      onApprovalComplete()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Token Approval"
      maxWidth="480px"
    >
      <ModalContent>
        {/* Token Info */}
        {approvalInfo && status === 'idle' && (
          <>
            <TokenInfoCard>
              <InfoRow>
                <InfoLabel>Token</InfoLabel>
                <InfoValue>{approvalInfo.token.symbol}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Amount to Swap</InfoLabel>
                <InfoValue>{swapAmount} {approvalInfo.token.symbol}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Current Allowance</InfoLabel>
                <InfoValue>{approvalInfo.currentAllowance}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Required Allowance</InfoLabel>
                <InfoValue>{approvalInfo.requiredAmount}</InfoValue>
              </InfoRow>
            </TokenInfoCard>

            <WarningBox>
              <span>⚠️</span>
              <WarningText>
                Approving will allow the router contract to spend your {approvalInfo.token.symbol} tokens. 
                This is required for the swap to work.
              </WarningText>
            </WarningBox>
          </>
        )}

        {/* Status Display */}
        <StatusCard status={status}>
          <StatusIcon status={status}>{getStatusIcon()}</StatusIcon>
          <StatusTitle>{getStatusTitle()}</StatusTitle>
          <StatusMessage>{getStatusMessage()}</StatusMessage>
        </StatusCard>

        {/* Action Buttons */}
        {status === 'idle' && (
          <ButtonGroup>
            <ApproveButton
              disabled={isApproving || !approvalInfo}
              onClick={handleApprove}
              whileTap={{ scale: 0.98 }}
            >
              Approve {approvalInfo?.token.symbol}
            </ApproveButton>
            <CancelButton onClick={handleClose} disabled={isApproving}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        )}

        {status === 'success' && (
          <ButtonGroup>
            <ApproveButton
              onClick={handleContinue}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Swap
            </ApproveButton>
          </ButtonGroup>
        )}

        {status === 'error' && (
          <ButtonGroup>
            <ApproveButton
              onClick={handleApprove}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </ApproveButton>
            <CancelButton onClick={handleClose}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        )}

        {/* Help Text */}
        <HelpText>
          <p>
            {status === 'idle' && 'This approval is required only once per token.'}
            {status === 'pending' && 'Do not close this window while the transaction is processing.'}
            {status === 'success' && 'Your approval was successful and you can now swap tokens.'}
            {status === 'error' && 'Please check your wallet and try again.'}
          </p>
        </HelpText>
      </ModalContent>
    </Modal>
  )
}

export default ApprovalCheckModal
