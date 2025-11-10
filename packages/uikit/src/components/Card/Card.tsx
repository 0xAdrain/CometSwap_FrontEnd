import React from "react";
import { StyledCard, StyledCardInner } from "./StyledCard";
import { CardProps } from "./types";

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  ribbon,
  children,
  background,
  innerCardProps = {},
  ...props
}) => {
  // Type-safe handling of innerCardProps - no any types!
  const { userSelect, ...safeInnerProps } = innerCardProps;
  
  return (
    <StyledCard {...props}>
      <StyledCardInner 
        {...safeInnerProps} 
        {...(background && { backgroundColor: background })} 
        hasCustomBorder={!!props.borderBackground}
      >
        {ribbon}
        {children}
      </StyledCardInner>
    </StyledCard>
  );
};
export default Card;
