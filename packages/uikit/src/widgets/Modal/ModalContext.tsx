import React, { createContext, useCallback, useMemo, useState } from "react"
import { styled } from '../../styled-components'
import { Box } from '../../components/Box'
import { createPortal } from "react-dom"

interface ModalsContext {
  isOpen: boolean
  nodeId: string
  modalNode: React.ReactNode
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>
  onPresent: (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => void
  onDismiss: () => void
}


const ModalWrapper = styled(Box)`
  z-index: 1000;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transition: opacity 0.2s ease;
`

export const Context = createContext<ModalsContext>({
  isOpen: false,
  nodeId: "",
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
})

const ModalProvider: React.FC<React.PropsWithChildren<{
  portalProvider?: React.FC<React.PropsWithChildren>
}>> = ({ children, portalProvider: NestProvider = React.Fragment }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalNode, setModalNode] = useState<React.ReactNode>()
  const [nodeId, setNodeId] = useState("")
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const handlePresent = useCallback((node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => {
    setModalNode(node)
    setIsOpen(true)
    setNodeId(newNodeId)
    setCloseOnOverlayClick(closeOverlayClick)
  }, [])

  const handleDismiss = useCallback(() => {
    setModalNode(undefined)
    setIsOpen(false)
    setNodeId("")
    setCloseOnOverlayClick(true)
  }, [])

  const handleOverlayDismiss = useCallback(() => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }, [closeOnOverlayClick, handleDismiss])

  const providerValue = useMemo(() => {
    return { 
      isOpen, 
      nodeId, 
      modalNode, 
      setModalNode, 
      onPresent: handlePresent, 
      onDismiss: handleDismiss 
    }
  }, [isOpen, nodeId, modalNode, setModalNode, handlePresent, handleDismiss])

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

  const portal = useMemo(() => getPortalRoot(), [])

  // 处理ESC键关闭
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleOverlayDismiss()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleOverlayDismiss])

  return (
    <Context.Provider value={providerValue}>
      <NestProvider>
        {portal && isOpen &&
          createPortal(
            <div role="dialog">
              <Overlay onClick={handleOverlayDismiss} />
              <ModalWrapper>
                {React.isValidElement(modalNode) &&
                  React.cloneElement(modalNode, {
                    // @ts-ignore
                    onDismiss: handleDismiss,
                  })}
              </ModalWrapper>
            </div>,
            portal
          )}
        {children}
      </NestProvider>
    </Context.Provider>
  )
}

export default ModalProvider