import React from 'react'
import { styled } from '../../styled-components'
import { Box } from '../Box'
import { Text } from '../Text'
import Flex from '../Box/Flex'

// InfoCard - 用于显示信息卡片（可复用组件）
const StyledInfoCard = styled(Box)`
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
`

const InfoRow = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const InfoLabel = styled(Text)`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 14px;
`

const InfoValue = styled(Text)`
  color: ${({ theme }) => theme.colors?.text};
  font-size: 14px;
  font-weight: 500;
`

interface InfoItemProps {
  label: string
  value: React.ReactNode
  valueProps?: any
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, valueProps }) => (
  <InfoRow>
    <InfoLabel>{label}</InfoLabel>
    <InfoValue {...valueProps}>{value}</InfoValue>
  </InfoRow>
)

interface InfoCardProps {
  items: InfoItemProps[]
}

export const InfoCard: React.FC<InfoCardProps> = ({ items }) => (
  <StyledInfoCard>
    {items.map((item, index) => (
      <InfoItem key={index} {...item} />
    ))}
  </StyledInfoCard>
)

export default InfoCard
