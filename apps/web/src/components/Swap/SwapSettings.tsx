import React from 'react'
import styled from 'styled-components'

export interface SwapSettingsProps {
  slippage: number
  deadline: number
  onSlippageChange: (value: number) => void
  onDeadlineChange: (value: number) => void
  onClose: () => void
}

// Styled components with theme support
const SettingsContainer = styled.div`
  background: ${({ theme }) => theme.colors?.background || 'rgba(26, 32, 44, 0.02)'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(26, 32, 44, 0.1)'};
`

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const SettingsTitle = styled.span`
  color: ${({ theme }) => theme.colors?.text || '#1a202c'};
  font-weight: 600;
  font-size: 16px;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(26, 32, 44, 0.6)'};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors?.text || '#1a202c'};
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(26, 32, 44, 0.05)'};
  }
`

const SettingRow = styled.div`
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SettingLabel = styled.div`
  color: ${({ theme }) => theme.colors?.text || '#1a202c'};
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`

const RangeInput = styled.input`
  width: 100%;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(26, 32, 44, 0.1)'};
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors?.primary || '#667eea'};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors?.background || '#fff'};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors?.primary || '#667eea'};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors?.background || '#fff'};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`

export const SwapSettings: React.FC<SwapSettingsProps> = ({
  slippage,
  deadline,
  onSlippageChange,
  onDeadlineChange,
  onClose
}) => {
  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsTitle>Swap Settings</SettingsTitle>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </SettingsHeader>
      
      <SettingRow>
        <SettingLabel>Slippage Tolerance: {slippage}%</SettingLabel>
        <RangeInput 
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={slippage}
          onChange={(e) => onSlippageChange(Number(e.target.value))}
        />
      </SettingRow>
      
      <SettingRow>
        <SettingLabel>Transaction Deadline: {deadline} minutes</SettingLabel>
        <RangeInput 
          type="range"
          min="1"
          max="60"
          step="1"
          value={deadline}
          onChange={(e) => onDeadlineChange(Number(e.target.value))}
        />
      </SettingRow>
    </SettingsContainer>
  )
}

export default SwapSettings
