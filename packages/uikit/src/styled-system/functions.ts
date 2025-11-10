// Additional styled-system functions
import { ColorProps, BorderProps, PositionProps } from './types'

export const color = (props: ColorProps) => ({
  color: props.color,
  backgroundColor: props.backgroundColor || props.bg,
  opacity: props.opacity,
})

export const border = (props: BorderProps) => ({
  border: props.border,
  borderWidth: props.borderWidth,
  borderStyle: props.borderStyle,
  borderColor: props.borderColor,
  borderRadius: props.borderRadius,
  borderTop: props.borderTop,
  borderRight: props.borderRight,
  borderBottom: props.borderBottom,
  borderLeft: props.borderLeft,
})

export const position = (props: PositionProps) => ({
  position: props.position,
  zIndex: props.zIndex,
  top: props.top,
  right: props.right,
  bottom: props.bottom,
  left: props.left,
})
