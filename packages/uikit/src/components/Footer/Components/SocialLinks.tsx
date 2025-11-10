// @ts-nocheck
import React from "react";
import { Box } from "../../Box";
import { FlexProps } from "../../Box";
import Flex from "../../Box/Flex";
import Dropdown from "../../Dropdown/Dropdown";
import Link from "../../Link/Link";
import { socials } from "../config";
import useMatchBreakpoints from "../../../contexts/MatchBreakpoints/useMatchBreakpoints";

const SocialLinks: React.FC<React.PropsWithChildren<FlexProps>> = ({ ...props }) => {
  const { isMobile } = useMatchBreakpoints();
  
  // 过滤掉可能不兼容的属性
  const { userSelect, ...safeProps } = props as any;

  return (
    <Flex {...safeProps} data-theme="dark">
      {socials.map((social, index) => {
        const iconProps = {
          width: "20px",
          color: "textSubtle",
          style: { cursor: "pointer" },
        };
        const Icon = social.icon;
        const mr = index < socials.length - 1 ? (isMobile ? "16px" : "24px") : 0;
        if (social.items) {
          return (
            <Dropdown key={social.label} position="top" target={
              <Box style={{ marginRight: mr }}>
                <Icon {...iconProps} />
              </Box>
            }>
              {social.items.map((item) => (
                <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                  {item.label}
                </Link>
              ))}
            </Dropdown>
          );
        }
        return (
          <View marginRight={mr} key={social.label}>
            <Link external href={social.href} aria-label={social.label}>
              <Icon {...iconProps} />
            </Link>
          </View>
        );
      })}
    </Flex>
  );
};

export default React.memo(SocialLinks, () => true);
