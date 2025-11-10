/**
 * 🪟 ModalActions - Stellar UI Implementation
 * Action button container for modal dialogs
 */
import { Children } from "react"
import { styled } from '../../styled-components'
import { Box } from '../../components/Box'
import Spacer from "./Spacer"

const ModalActions: React.FC<React.PropsWithChildren> = ({ children }) => {
  const childrenArray = Children.toArray(children)
  const length = childrenArray.length
  
  return (
    <StyledModalActions>
      {Children.map(children, (child, index) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
          {index < length - 1 && <Spacer />}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled(Box)`
  align-items: center;
  background-color: transparent;
  display: flex;
  margin: 0;
  padding: var(--stellar-space-6) 0;
`

const StyledModalAction = styled(Box)`
  flex: 1;
`

export default ModalActions;
