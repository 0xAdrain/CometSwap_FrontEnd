import React, { useMemo } from "react"
import Balance from "./Balance"
import { TextProps } from "../Text"
import { Skeleton } from "../Skeleton"

interface BalanceProps extends TextProps {
  value: number
  decimals?: number
  unit?: string
  isDisabled?: boolean
  prefix?: string
  strikeThrough?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

// 纯JavaScript工具函数，替代lodash
const isUndefinedOrNull = (value: any): boolean => {
  return value == null // 同时检查 undefined 和 null
}

const safeToNumber = (value: string | number): number => {
  if (typeof value === 'number') return value
  
  // 移除逗号分隔符
  const trimmedValue = String(value).replace(/,/g, "")
  
  // 转换为数字
  const numericValue = Number(trimmedValue)
  
  // 检查是否为有效数字
  return Number.isNaN(numericValue) ? 0 : numericValue
}

const BalanceWithLoading: React.FC<
  React.PropsWithChildren<Omit<BalanceProps, "value"> & { value: string | number }>
> = ({ value, fontSize, ...props }) => {
  // 检查值是否为 undefined 或 null
  const isValueUndefinedOrNull = useMemo(() => isUndefinedOrNull(value), [value])
  
  // 安全转换为数字
  const finalValue = useMemo(() => {
    if (isValueUndefinedOrNull) return null
    return safeToNumber(value)
  }, [value, isValueUndefinedOrNull])

  // 如果值未定义，显示骨架屏
  if (isValueUndefinedOrNull) {
    return <Skeleton width="60px" height="1.2em" />
  }

  // 渲染Balance组件
  return <Balance {...props} value={finalValue as number} fontSize={fontSize} />
}

export default BalanceWithLoading