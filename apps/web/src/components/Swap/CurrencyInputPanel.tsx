import React from 'react'
import styled from 'styled-components'

// 定义Currency接口
export interface Currency {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

// 定义CurrencyInputPanel props
export interface CurrencyInputPanelProps {
  id: string
  value?: string
  onUserInput?: (value: string) => void
  currency?: Currency
  onCurrencySelect?: (currency: Currency) => void
  otherCurrency?: Currency
  showMaxButton?: boolean
  onMax?: () => void
  label?: string
  disabled?: boolean
  readOnly?: boolean  // 新增：只读模式，input不可编辑但button可点击
  className?: string
}

// Styled components with theme support
const Container = styled.div`
  background: ${({ theme }) => theme.colors?.background || 'rgba(26, 32, 44, 0.02)'};
  border-radius: 16px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(26, 32, 44, 0.1)'};
  margin-bottom: 8px;
  transition: border-color 0.2s ease;
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors?.primary || '#667eea'};
  }
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(26, 32, 44, 0.6)'};
  font-size: 12px;
  font-weight: 500;
`

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors?.text || '#1a202c'};
  font-size: 24px;
  font-weight: 600;
  width: 60%;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(26, 32, 44, 0.4)'};
  }
  
  &:disabled {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors?.textDisabled || 'rgba(26, 32, 44, 0.3)'};
  }
`

const CurrencyButton = styled.button`
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(26, 32, 44, 0.05)'};
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(26, 32, 44, 0.1)'};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors?.text || '#1a202c'};
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(26, 32, 44, 0.1)'};
    border-color: ${({ theme }) => theme.colors?.primary || '#667eea'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors?.textDisabled || 'rgba(26, 32, 44, 0.3)'};
  }
`

// Web层的CurrencyInputPanel
export const CurrencyInputPanel: React.FC<CurrencyInputPanelProps> = ({
  id,
  value,
  onUserInput,
  currency,
  onCurrencySelect,
  label = "From",
  disabled = false,
  readOnly = false,
  className
}) => {
  return (
    <Container id={id} className={className}>
      <TopRow>
        <Label>{label}</Label>
      </TopRow>
      
      <InputRow>
        <Input
          type="number"
          placeholder="0.0"
          value={value || ''}
          onChange={(e) => onUserInput?.(e.target.value)}
          disabled={disabled || readOnly}  // disabled或readOnly时input不可编辑
          readOnly={readOnly}
        />
        
        <CurrencyButton
          onClick={() => onCurrencySelect?.(currency)}
          disabled={disabled}  // 只有disabled时button才禁用，readOnly时button可用
        >
          {currency?.symbol || 'Select Token'}
          {!disabled && ' ▼'}
        </CurrencyButton>
      </InputRow>
    </Container>
  )
}

export default CurrencyInputPanel
