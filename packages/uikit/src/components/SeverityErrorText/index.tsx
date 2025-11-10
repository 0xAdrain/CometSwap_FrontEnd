import React, { PropsWithChildren } from "react"
import { styled } from '../../styled-components'
import { Text } from '../Text'
import { AtomBox, AtomBoxProps } from "../AtomBox"

// Severity级别类型
export interface SeverityVariants {
  severity?: 0 | 1 | 2 | 3 | 4
}

// Stellar UI 严重性文本组件
interface SeverityTextProps {
  severity?: 0 | 1 | 2 | 3 | 4
}

const StyledSeverityText = styled(Text)<SeverityTextProps>`
  ${({ severity = 1 }: SeverityTextProps) => {
    const colorMap = {
      0: 'var(--stellar-success)',      // 成功
      1: 'var(--stellar-text)',         // 普通文本
      2: 'var(--stellar-warning)',      // 警告
      3: 'var(--stellar-error)',        // 错误
      4: 'var(--stellar-error)',        // 严重错误
    }
    return `color: ${colorMap[severity]};`
  }}
`

export const SeverityErrorText = ({ 
  severity = 1, 
  children, 
  ...props 
}: PropsWithChildren<AtomBoxProps & SeverityVariants>) => (
  <AtomBox {...props}>
    <StyledSeverityText severity={severity}>
      {children}
    </StyledSeverityText>
  </AtomBox>
)