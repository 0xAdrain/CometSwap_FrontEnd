import React from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '../../styled-components'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  maxWidth?: string
  className?: string
}

// UIKit基础Modal组件 - 纯UI逻辑
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors?.overlay || 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`

const ModalContainer = styled(motion.div)<{ maxWidth?: string }>`
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 20px;
  max-width: ${({ maxWidth }) => maxWidth || '420px'};
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows?.modal || '0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05)'};
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border};
`

const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.colors?.text};
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors?.textSubtle};
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  font-size: 24px;
  line-height: 1;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors?.text};
    background: ${({ theme }) => theme.colors?.backgroundHover};
  }
`

const ModalContent = styled.div`
  overflow-y: auto;
  max-height: calc(80vh - 80px);
`

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth,
  className
}) => {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className={className}
        >
          <ModalContainer
            maxWidth={maxWidth}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <CloseButton onClick={onClose}>×</CloseButton>
              </ModalHeader>
            )}
            
            <ModalContent>
              {children}
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  )

  // 使用Portal渲染到body，确保z-index生效
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null
}

export default Modal
