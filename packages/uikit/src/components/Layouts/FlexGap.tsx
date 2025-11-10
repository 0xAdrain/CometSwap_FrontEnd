import { styled } from "../../styled-components";
import { Flex, FlexProps, MotionFlex } from "../Box";

export interface FlexGapProps extends FlexProps {
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

const FlexGap = styled(Flex)<FlexGapProps>`
  gap: ${({ gap  }: { gap: any }) => gap};
  row-gap: ${({ rowGap  }: { rowGap: any }) => rowGap};
  column-gap: ${({ columnGap  }: { columnGap: any }) => columnGap};
`;

export const MotionFlexGap = styled(MotionFlex)<FlexGapProps>`
  gap: ${({ gap  }: { gap: any }) => gap};
  row-gap: ${({ rowGap  }: { rowGap: any }) => rowGap};
  column-gap: ${({ columnGap  }: { columnGap: any }) => columnGap};
`;

export default FlexGap;
