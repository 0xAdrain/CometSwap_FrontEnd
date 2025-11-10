import React, { createContext, useCallback, useMemo, useState } from "react"
import { styled } from '../../styled-components'
import { Box } from '../../components/Box'
import { createPortal } from "react-dom"

export interface ModalV2Props {
  isOpen?: boolean
  onDismiss?: () => void
  closeOnOverlayClick?: boolean
  children?: React.ReactNode
}

export const ModalV2Context = createContext<{
  onDismiss?: () => void
}>({})

export type UseModalV2Props = ReturnType<typeof useModalV2>

export function useModalV2() {
  const [isOpen, setIsOpen] = useState(false)

  const onDismiss = useCallback(() => setIsOpen(false), [])
  const onOpen = useCallback(() => setIsOpen(true), [])

  return useMemo(
    () => ({
      onDismiss,
      onOpen,
      isOpen,
      setIsOpen,
    }),
    [onDismiss, onOpen, isOpen]
  )
}

// Stellar UI Modal容器
const ModalContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: all 0.2s ease;
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`

const ModalContent = styled(Box)`
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  max-width: 90vw;
  background-color: var(--stellar-background);
  border-radius: var(--stellar-borderRadius-lg);
  padding: var(--stellar-space-4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`

// 简单的portal root获取
const getPortalRoot = () => {
  if (typeof document !== 'undefined') {
    let portalRoot = document.getElementById('portal-root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.id = 'portal-root'
      document.body.appendChild(portalRoot)
    }
    return portalRoot
  }
  return null
}

export function ModalV2({
  isOpen,
  onDismiss,
  closeOnOverlayClick = true,
  children,
  ...props
}: ModalV2Props) {
  const handleOverlayDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (closeOnOverlayClick) {
      onDismiss?.()
    }
  }, [closeOnOverlayClick, onDismiss])

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const portal = useMemo(() => getPortalRoot(), [])

  const providerValue = useMemo(() => ({ onDismiss }), [onDismiss])

  // 处理ESC键关闭
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onDismiss?.()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onDismiss])

  if (!portal || !isOpen) {
    return null
  }

  return createPortal(
    <ModalV2Context.Provider value={providerValue}>
      <ModalContainer role="dialog" {...props}>
        <Overlay onClick={handleOverlayDismiss} />
        <ModalContent onClick={handleContentClick}>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalV2Context.Provider>,
    portal
  )
}