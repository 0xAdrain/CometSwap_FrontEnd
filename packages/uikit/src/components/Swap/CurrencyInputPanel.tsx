import React from 'react'
import { styled } from '../../styled-components'
import { Box } from '../Box'
import { Flex } from '../Box'
import { Text } from '../Text'
import { Button } from '../Button'
import { NumericalInput, TokenLogo, BalanceText } from './SwapWidget'

export interface Currency {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

export interface CurrencyInputPanelProps {
  id: string
  value?: string
  onUserInput?: (value: string) => void
  onInputBlur?: () => void
  currency?: Currency
  onCurrencySelect?: () => void
  otherCurrency?: Currency
  showMaxButton?: boolean
  onMax?: () => void
  balance?: string
  label?: string
  disabled?: boolean
  error?: boolean
  loading?: boolean
  showBridgeWarning?: boolean
  disableCurrencySelect?: boolean
  hideBalance?: boolean
}

// Container with PancakeSwap style
const InputContainer = styled(Box)<{ error?: boolean; showBridgeWarning?: boolean }>`
  background: ${({ theme }) => theme.colors?.background || '#0d0d0d'};
  border-radius: 16px;
  border: 1px solid ${({ theme, error }) => 
    error 
      ? theme.colors?.failure || '#ff6b6b'
      : theme.colors?.border || 'rgba(255, 255, 255, 0.1)'
  };
  padding: 0;
  position: relative;
  
  ${({ showBridgeWarning, theme }) =>
    showBridgeWarning &&
    `
    border-color: ${theme.colors?.warning || '#ffb237'};
    background: ${theme.colors?.warning}08;
  `}
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors?.primary || '#667eea'};
  }
`

const TopRow = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 0;
`

const InputRow = styled(Flex)`
  align-items: center;
  padding: 12px 16px 16px;
  gap: 12px;
`

const CurrencyButton = styled(Button)<{ hasLogo?: boolean }>`
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 8px 12px;
  height: auto;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const MaxButton = styled(Button)`
  background: ${({ theme }) => theme.colors?.primary || '#667eea'};
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  height: auto;
  font-weight: 600;
  
  &:hover {
    opacity: 0.8;
  }
`

const LabelText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(255, 255, 255, 0.6)'};
  font-weight: 500;
`

const StyledNumericalInput = styled(NumericalInput)`
  font-size: 24px;
  
  @media (max-width: 400px) {
    font-size: 18px;
  }
`

export const CurrencyInputPanel: React.FC<CurrencyInputPanelProps> = ({
  id,
  value,
  onUserInput,
  onInputBlur,
  currency,
  onCurrencySelect,
  showMaxButton = false,
  onMax,
  balance,
  label = "From",
  disabled = false,
  error = false,
  loading = false,
  showBridgeWarning = false,
  disableCurrencySelect = false,
  hideBalance = false
}) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/,/g, '.')
    if (onUserInput) {
      onUserInput(input)
    }
  }

  return (
    <InputContainer 
      id={id} 
      error={error} 
      showBridgeWarning={showBridgeWarning}
    >
      <TopRow>
        <LabelText>{label}</LabelText>
        {!hideBalance && balance && (
          <Flex alignItems="center" gap="8px">
            <BalanceText onClick={onMax}>
              Balance: {balance}
            </BalanceText>
            {showMaxButton && onMax && (
              <MaxButton onClick={onMax} scale="xs">
                MAX
              </MaxButton>
            )}
          </Flex>
        )}
      </TopRow>

      <InputRow>
        <CurrencyButton
          onClick={onCurrencySelect}
          disabled={disableCurrencySelect || disabled}
          hasLogo={!!currency?.logoURI}
          variant="secondary"
        >
          <Flex alignItems="center" gap="6px">
            {currency?.logoURI && (
              <TokenLogo 
                src={currency.logoURI} 
                alt={currency.symbol}
                onError={(e) => {
                  // Hide broken images
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            )}
            <Text fontWeight="600">
              {currency?.symbol || 'Select Token'}
            </Text>
            {!disableCurrencySelect && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            )}
          </Flex>
        </CurrencyButton>

        <StyledNumericalInput
          value={value || ''}
          onChange={handleInput}
          onBlur={onInputBlur}
          placeholder="0.0"
          disabled={disabled}
          error={error}
          loading={loading}
        />
      </InputRow>
      
      {currency && (
        <Box px="16px" pb="8px">
          <Text fontSize="12px" color="textSubtle">
            {currency.name}
          </Text>
        </Box>
      )}
    </InputContainer>
  )
}

export default CurrencyInputPanel
