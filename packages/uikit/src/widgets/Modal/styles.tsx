/**
 * 🪟 Modal Styles - Stellar UI Implementation
 * Modern modal components with responsive design
 */
import React, { MouseEvent } from "react"
import { styled } from '../../styled-components'
import { MotionBox, Flex } from "../../components/Box"
import { ButtonProps, IconButton } from "../../components/Button"
import { ArrowBackIcon, CloseIcon } from "../../components/Svg"
import { ModalProps } from "./types"

export const mobileFooterHeight = 73

interface ModalHeaderProps {
  background?: string
  headerBorderColor?: string
}

export const ModalHeader = styled(Flex)<ModalHeaderProps>`
  align-items: center;
  background-color: transparent;
  border-bottom: 1px solid var(--stellar-cardBorder);
  display: flex;
  padding: var(--stellar-space-3) var(--stellar-space-6);

  /* Dynamic background color */
  ${({ background }: ModalHeaderProps) => background && `
    @media (min-width: 768px) {
      background-color: ${background};
    }
  `}

  /* Dynamic border color */
  ${({ headerBorderColor }: ModalHeaderProps) => headerBorderColor && `
    border-bottom-color: ${headerBorderColor};
  `}

  @media (min-width: 768px) {
    background-color: transparent;
  }
`

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(90vh - ${mobileFooterHeight}px);

  @media (min-width: 768px) {
    display: flex;
    max-height: 90vh;
  }
`

export const ModalCloseButton: React.FC<
  React.PropsWithChildren<{ onDismiss: ModalProps["onDismiss"] }> & ButtonProps
> = ({ onDismiss, ...props }) => {
  return (
    <IconButton
      variant="text"
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDismiss?.()
      }}
      aria-label="Close the dialog"
      {...props}
    >
      <CloseIcon color="textSubtle" />
    </IconButton>
  )
}

export const ModalBackButton: React.FC<
  React.PropsWithChildren<{ onBack: ModalProps["onBack"] }>
> = ({ onBack }) => {
  return (
    <div style={{ marginRight: 'var(--stellar-space-2)' }}>
      <IconButton 
        variant="text" 
        onClick={onBack} 
        aria-label="go back"
      >
        <ArrowBackIcon color="primary" />
      </IconButton>
    </div>
  )
}

interface ModalContainerProps {
  minHeight?: string
}

export const ModalContainer = styled(MotionBox)<ModalContainerProps>`
  overflow: hidden;
  background-color: var(--stellar-modalBackground, var(--stellar-background));
  box-shadow: 0 20px 36px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--stellar-cardBorder);
  border-top-left-radius: var(--stellar-borderRadius-card);
  border-top-right-radius: var(--stellar-borderRadius-card);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  max-height: calc(var(--vh, 1vh) * 100);
  z-index: var(--stellar-zIndex-modal, 1000);
  position: absolute;
  bottom: 0;
  max-width: none;

  /* Dynamic min height */
  ${({ minHeight }: ModalContainerProps) => minHeight && `
    min-height: ${minHeight};
  `}

  @media (min-width: 768px) {
    width: auto;
    position: relative;
    bottom: auto;
    border-radius: var(--stellar-borderRadius-card);
    max-height: 100vh;
  }
` as typeof MotionBox;
