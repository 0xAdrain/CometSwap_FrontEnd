import React, { useState, useMemo } from 'react'
import { Modal, TokenList } from '@cometswap/uikit'
import type { Token } from '@cometswap/uikit'

// Web层业务组件 - 集成UIKit + 业务逻辑
export interface TokenSelectModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectToken: (token: Token) => void
  tokens: Token[]
  selectedToken?: Token
  title?: string
}

export const TokenSelectModal: React.FC<TokenSelectModalProps> = ({
  isOpen,
  onClose,
  onSelectToken,
  tokens,
  selectedToken,
  title = "Select a Token"
}) => {
  const [searchValue, setSearchValue] = useState('')

  // 业务逻辑：Token搜索和过滤
  const filteredTokens = useMemo(() => {
    if (!searchValue.trim()) {
      return tokens
    }

    const search = searchValue.toLowerCase()
    return tokens.filter(token => 
      token.symbol.toLowerCase().includes(search) ||
      token.name.toLowerCase().includes(search) ||
      token.address.toLowerCase().includes(search)
    )
  }, [tokens, searchValue])

  // 业务逻辑：处理token选择
  const handleTokenSelect = (token: Token) => {
    onSelectToken(token)
    setSearchValue('') // 清空搜索
    onClose()
  }

  // 业务逻辑：处理模态框关闭
  const handleClose = () => {
    setSearchValue('') // 清空搜索
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      maxWidth="480px"
    >
      <TokenList
        tokens={filteredTokens}
        onTokenSelect={handleTokenSelect}
        selectedToken={selectedToken}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        showBalance={true}
      />
    </Modal>
  )
}

export default TokenSelectModal
