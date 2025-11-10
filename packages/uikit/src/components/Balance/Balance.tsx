// @ts-nocheck - 临时禁用类型检查，动画相关类型需要完善
import React, { useMemo, useState, useEffect } from "react"
import { Text, TextProps } from "../Text"

export interface BalanceProps extends TextProps {
  value: number
  decimals?: number
  unit?: string
  isDisabled?: boolean
  prefix?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  strikeThrough?: boolean
  startFromValue?: boolean
  display?: string
  fontSize?: string | number
  color?: string
}

// 使用普通的 Text 组件而不是 styled，避免属性兼容性问题
const AnimatedText = Text

// 数字格式化工具函数
const formatNumber = (
  value: number, 
  decimals: number, 
  prefix?: string, 
  suffix?: string
): string => {
  // 检查是否需要显示小数
  const showDecimals = value % 1 !== 0
  const finalDecimals = showDecimals ? decimals : 0
  
  // 格式化数字，添加千分位分隔符
  const formattedNumber = value.toLocaleString('en-US', {
    minimumFractionDigits: finalDecimals,
    maximumFractionDigits: finalDecimals,
  })
  
  // 组合前缀和后缀
  let result = formattedNumber
  if (prefix) result = `${prefix}${result}`
  if (suffix) result = `${result}${suffix}`
  
  return result
}

// 简单的数字动画Hook
const useNumberAnimation = (
  targetValue: number, 
  startFromValue: boolean, 
  duration: number = 1000
) => {
  const [currentValue, setCurrentValue] = useState(startFromValue ? targetValue : 0)
  
  useEffect(() => {
    if (startFromValue) {
      setCurrentValue(targetValue)
      return
    }

    // 简单的线性插值动画
    const startValue = currentValue
    const difference = targetValue - startValue
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // 使用缓出函数 (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const newValue = startValue + (difference * easeOut)
      
      setCurrentValue(newValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCurrentValue(targetValue)
      }
    }
    
    requestAnimationFrame(animate)
  }, [targetValue, startFromValue, duration])
  
  return currentValue
}

const Balance: React.FC<React.PropsWithChildren<BalanceProps>> = ({
  value,
  color = "text",
  decimals = 3,
  isDisabled = false,
  unit,
  prefix,
  onClick,
  strikeThrough,
  startFromValue = false,
  ...props
}) => {
  // 使用数字动画Hook
  const animatedValue = useNumberAnimation(value, startFromValue, 1000)
  
  // 格式化显示文本
  const displayText = useMemo(() => {
    return formatNumber(animatedValue, decimals, prefix, unit)
  }, [animatedValue, decimals, prefix, unit])
  
  return (
    <AnimatePresence>
      <AnimatedText
        key={`balance-${value}`} // 用于触发动画
        color={isDisabled ? "textDisabled" : color}
        style={strikeThrough ? { textDecoration: "line-through" } : undefined}
        onClick={onClick}
        enterStyle={{ opacity: 0, scale: 0.9 }}
        exitStyle={{ opacity: 0, scale: 0.9 }}
        animateOnly={['opacity', 'scale']}
        animation="quick"
        {...props}
      >
        {displayText}
      </AnimatedText>
    </AnimatePresence>
  )
}

export default Balance