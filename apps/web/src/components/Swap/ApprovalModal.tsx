import React, { useEffect } from 'react'
import { Address } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Modal, Button, Flex, InfoCard, Box, Text, Alert } from '@cometswap/uikit'

// ERC20 ABI for approve
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
] as const

// 不再创建任何自定义styled组件，完全使用UIKit基础组件

interface Token {
  symbol: string
  address: string
  decimals: number
}

interface ApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  onApprovalComplete: () => void
  token: Token
  spender: string
  amount: string
  currentAllowance: bigint
  needsApproval: boolean
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  onApprovalComplete,
  token,
  spender,
  amount,
  currentAllowance,
  needsApproval,
}) => {
  const { writeContract, data: txHash, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  // 当授权成功时，调用回调
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onApprovalComplete()
      }, 500)
    }
  }, [isSuccess, onApprovalComplete])

  const handleApprove = async () => {
    try {
      // 🔑 关键修复：使用MAX授权（无限授权），避免频繁授权
      const maxApproval = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      
      console.log('🔐 Approving token:', token.symbol)
      console.log('  - Spender:', spender)
      console.log('  - Amount: MAX (unlimited)')

      writeContract({
        address: token.address as Address,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [spender as Address, maxApproval],
      })
    } catch (err) {
      console.error('❌ Approval failed:', err)
    }
  }

  if (!isOpen) return null

  const allowanceFormatted = (Number(currentAllowance) / Math.pow(10, token.decimals)).toFixed(6)

  // 使用UIKit的InfoCard组件，传入items数据
  const infoItems = [
    { label: 'Token:', value: token.symbol },
    { label: 'Swap Amount:', value: `${amount} ${token.symbol}` },
    { label: 'Current Allowance:', value: `${allowanceFormatted} ${token.symbol}` },
    { 
      label: 'Spender:', 
      value: `${spender.slice(0, 6)}...${spender.slice(-4)}`,
      valueProps: { style: { fontFamily: 'monospace', fontSize: '12px' } }
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={needsApproval ? '🔐 Step 1: Token Approval' : '✅ Step 1: Approval Check'}
      maxWidth="420px"
    >
      {/* 使用UIKit的通用InfoCard组件 */}
      <InfoCard items={infoItems} />

      {/* Status */}
      {needsApproval ? (
        <Alert variant="warning" title="⚠️ Approval Required">
          You need to approve {token.symbol} tokens before swapping. 
          This is a one-time transaction per token.
        </Alert>
      ) : (
        <Alert variant="success" title="✅ Approval Sufficient">
          You have sufficient allowance for this swap. Click continue to proceed.
        </Alert>
      )}

      {/* Transaction Status */}
      {(isPending || isConfirming) && (
        <Alert variant="info" title="🔄 Transaction Status">
          {isPending ? 'Waiting for wallet confirmation...' : 'Transaction confirming...'}
        </Alert>
      )}

      {/* Error */}
      {error && (
        <Alert variant="danger" title="❌ Transaction Failed">
          {error.message}
        </Alert>
      )}

      {/* Success */}
      {isSuccess && (
        <Alert variant="success" title="🎉 Approval Successful!">
          Token approval completed. Proceeding to swap...
        </Alert>
      )}

      {/* Actions */}
      <Flex gap="12px" mt="20px">
        {needsApproval && !isSuccess ? (
          <>
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isPending || isConfirming}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleApprove}
              disabled={isPending || isConfirming}
              style={{ flex: 1 }}
            >
              {isPending || isConfirming ? 'Approving...' : 'Approve Token'}
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={onApprovalComplete}
            disabled={isSuccess && (isPending || isConfirming)}
            style={{ width: '100%' }}
          >
            {isSuccess ? 'Proceeding...' : 'Continue to Swap'}
          </Button>
        )}
      </Flex>

      {/* 使用UIKit的Box和Text组件 */}
      <Box textAlign="center" mt="16px">
        <Text fontSize="12px" color="textSubtle" mb="4px">
          💡 Approving tokens allows the smart contract to spend them on your behalf
        </Text>
        <Text fontSize="12px" color="textSubtle">
          🔒 Future: Token security check will be added here
        </Text>
      </Box>
    </Modal>
  )
}
