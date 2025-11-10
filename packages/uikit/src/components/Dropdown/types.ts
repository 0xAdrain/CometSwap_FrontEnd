export type Position = "top" | "top-right" | "bottom" | "bottom-right";

export type TriggerType = 'hover' | 'click';

export interface PositionProps {
  position?: Position;
}

export interface DropdownProps extends PositionProps {
  target: React.ReactElement;
  disabled?: boolean;
  closeOnClick?: boolean;
  trigger?: TriggerType;
}
