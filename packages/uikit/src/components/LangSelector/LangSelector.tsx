// @ts-nocheck
import React from 'react'
import { styled } from '../../styled-components'
import { Button } from '../Button'
import { Box } from '../Box'

export interface LanguageSelectorProps {
  currentLang?: string
  onLanguageChange?: (language: string) => void
  className?: string
  showIcon?: boolean
  variant?: 'select' | 'button'
  // Footer组件需要的属性
  langs?: any[]
  setLang?: (lang: any) => void
  color?: string
  dropdownPosition?: string
  buttonScale?: string
  hideLanguage?: boolean
}

// 语言选项
const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
]

// Base Select component
const BaseSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => (
  <select ref={ref} {...props} />
))

// Styled Select组件
const StyledSelect = styled(BaseSelect)`
  padding: var(--stellar-space-2) var(--stellar-space-3);
  border-radius: var(--stellar-borderRadius-sm);
  border: 1px solid var(--stellar-borderColor);
  background-color: var(--stellar-background);
  font-size: var(--stellar-fontSize-sm);
  font-family: var(--stellar-fontFamily-body);
  cursor: pointer;
  outline: none;
  appearance: none;
  
  &:focus {
    border-color: var(--stellar-primary500);
    box-shadow: 0 0 4px var(--stellar-primary200);
  }
  
  &:hover {
    border-color: var(--stellar-primary300);
  }
`;

// 简单的图标组件
const GlobeIcon = () => (
  <span style={{ fontSize: '16px', marginRight: '4px' }}>🌐</span>
)

const ChevronDownIcon = () => (
  <span style={{ fontSize: '12px', marginLeft: '4px' }}>▼</span>
)

// Button样式的语言选择器
const LanguageButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: var(--stellar-space-2);
`;

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang = 'en',
  onLanguageChange,
  className,
  showIcon = true,
  variant = 'select',
  langs,
  setLang,
  color,
  dropdownPosition,
  buttonScale,
  hideLanguage,
}) => {
  // 使用传入的langs或默认的LANGUAGES
  const availableLanguages = langs || LANGUAGES
  const currentLanguage = availableLanguages.find((lang: any) => lang.code === currentLang) || availableLanguages[0]
  
  // 处理语言变化事件
  const handleLanguageChange = (newLang: string) => {
    if (setLang) {
      const selectedLang = availableLanguages.find((lang: any) => lang.code === newLang)
      setLang(selectedLang)
    }
    if (onLanguageChange) {
      onLanguageChange(newLang)
    }
  }
  
  if (variant === 'button') {
    return (
      <LanguageButton className={className}>
        {showIcon && <GlobeIcon />}
        {currentLanguage.nativeName}
        <ChevronDownIcon />
      </LanguageButton>
    )
  }
  
  return (
    <XStack alignItems="center" gap="$2" className={className}>
      {showIcon && <GlobeIcon />}
      <StyledSelect
        value={currentLang}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleLanguageChange(e.target.value)}
      >
        {availableLanguages.map((lang: any) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName || lang.language || lang.name}
          </option>
        ))}
      </StyledSelect>
    </XStack>
  )
}

export default LanguageSelector