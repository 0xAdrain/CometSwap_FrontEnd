/**
 * ☄️ CometSwap Theme Switch
 * 
 * 以Apple设计大师的标准，结合Google CTO的技术深度
 * 为CometSwap创造完美的主题切换体验
 */

import React from 'react'
import styled from 'styled-components'

interface CometThemeSwitchProps {
  isDark: boolean
  onChange: (isDark: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// 尺寸配置 - Apple设计规范
const sizes = {
  sm: {
    width: '42px',
    height: '24px',
    handleSize: '20px',
    handleOffset: '2px',
    handleTranslate: '18px'
  },
  md: {
    width: '50px',
    height: '28px',
    handleSize: '24px',
    handleOffset: '2px',
    handleTranslate: '22px'
  },
  lg: {
    width: '60px',
    height: '32px',
    handleSize: '28px',
    handleOffset: '2px',
    handleTranslate: '28px'
  }
}

// Switch容器 - Apple风格设计
const SwitchContainer = styled.div<{ 
  $isDark: boolean; 
  $disabled: boolean; 
  $size: keyof typeof sizes 
}>`
  position: relative;
  width: ${({ $size }) => sizes[$size].width};
  height: ${({ $size }) => sizes[$size].height};
  background: ${({ $isDark, $disabled }) => {
    if ($disabled) return '#E5E5E7'
    return $isDark 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : '#E5E5E7'
  }};
  border-radius: ${({ $size }) => sizes[$size].height};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
  
  /* Apple的微妙阴影 */
  box-shadow: ${({ $isDark }) => $isDark 
    ? 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)' 
    : 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)'
  };
  
  &:hover:not([disabled]) {
    transform: scale(1.02);
    box-shadow: ${({ $isDark }) => $isDark 
      ? 'inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(102, 126, 234, 0.3)' 
      : 'inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
    };
  }
  
  &:active:not([disabled]) {
    transform: scale(0.98);
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }
`

// 滑动手柄 - Apple精致设计
const SwitchHandle = styled.div<{ 
  $isDark: boolean; 
  $disabled: boolean; 
  $size: keyof typeof sizes 
}>`
  position: absolute;
  top: ${({ $size }) => sizes[$size].handleOffset};
  left: ${({ $isDark, $size }) => 
    $isDark 
      ? `calc(${sizes[$size].width} - ${sizes[$size].handleSize} - ${sizes[$size].handleOffset})` 
      : sizes[$size].handleOffset
  };
  width: ${({ $size }) => sizes[$size].handleSize};
  height: ${({ $size }) => sizes[$size].handleSize};
  background: #ffffff;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Apple经典阴影 */
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
  /* 内部图标容器 */
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '${({ $isDark }) => $isDark ? '🌙' : '☀️'}';
    font-size: ${({ $size }) => {
      const sizeMap = { sm: '10px', md: '12px', lg: '14px' }
      return sizeMap[$size]
    }};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`

// 隐藏的原生input
const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: inherit;
  z-index: 1;
  
  &:focus + ${SwitchHandle} {
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 1px 2px rgba(0, 0, 0, 0.06),
      0 0 0 3px rgba(102, 126, 234, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
`

// 背景装饰 - Apple的细节
const BackgroundDecoration = styled.div<{ 
  $isDark: boolean; 
  $size: keyof typeof sizes 
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $isDark, $size }) => $isDark 
    ? `left: ${sizes[$size].handleOffset}; opacity: 0.3;` 
    : `right: ${sizes[$size].handleOffset}; opacity: 0.3;`
  };
  font-size: ${({ $size }) => {
    const sizeMap = { sm: '8px', md: '10px', lg: '12px' }
    return sizeMap[$size]
  }};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '${({ $isDark }) => $isDark ? '☀️' : '🌙'}';
  }
`

// 主组件
export const CometThemeSwitch: React.FC<CometThemeSwitchProps> = ({
  isDark,
  onChange,
  disabled = false,
  size = 'md'
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!isDark)
    }
  }

  return (
    <SwitchContainer 
      $isDark={isDark} 
      $disabled={disabled} 
      $size={size}
      onClick={handleChange}
    >
      <HiddenInput
        type="checkbox"
        checked={isDark}
        onChange={handleChange}
        disabled={disabled}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      />
      <SwitchHandle 
        $isDark={isDark} 
        $disabled={disabled} 
        $size={size}
      />
      <BackgroundDecoration 
        $isDark={isDark} 
        $size={size}
      />
    </SwitchContainer>
  )
}

export default CometThemeSwitch
