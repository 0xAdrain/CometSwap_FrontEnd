import { Box, BoxProps } from "../Box";

const Container: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => {
  // 过滤掉可能不兼容的属性
  const { userSelect, ...safeProps } = props as any;
  
  return (
    <Box px={["16px", "24px"]} mx="auto" maxWidth="1200px" {...safeProps}>
      {children}
    </Box>
  );
};

export default Container;
