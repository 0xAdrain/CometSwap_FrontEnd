// @ts-nocheck
import { useIsMounted } from "@comet-swap/hooks";
import React from "react";
import { Box } from "../Box";
import { useMatchBreakpoints } from "../../contexts";
import { Flex } from "../Box";
import { Link } from "../Link";
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledList,
  StyledListItem,
  StyledSocialLinks,
  StyledText,
  StyledToolsContainer,
} from "./styles";

// Removed vars import - using direct theme colors
import { Button } from "../Button";
import CometPrice from "../CometPrice/CometPrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoIcon, LogoWithTextIcon } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCometLabel,
  buyCometLink,
  chainId,
  ...props
}) => {
  const isMounted = useIsMounted();
  const { isXl } = useMatchBreakpoints();
  return (
    <StyledFooter
      data-theme="dark"
      p={["40px 16px", null, "56px 40px 32px 40px"]}
      position="relative"
      {...props}
      justifyContent="center"
    >
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledIconMobileContainer display={["block", null, "none"]}>
          <LogoWithTextIcon width="130px" />
        </StyledIconMobileContainer>
        <Box style={{ marginBottom: '42px' }}>
          <Flex
            order={[2, null, 1]}
            flexDirection={["column", "column", "column", "column", "row", "row"]}
            justifyContent="space-between"
            alignItems="flex-start"
          >
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      data-theme="dark"
                      href={href}
                      external
                      color={isHighlighted ? "warning" : "text"}
                      bold={false}
                      style={{ textTransform: "none" }}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
          <Box display={["none", null, null, null, "block"]}>{isXl ? <LogoIcon /> : <LogoWithTextIcon width="160px" />}</Box>
          </Flex>
        </Box>
        <Box marginBottom={["0px", null, "32px"]}>
          <StyledSocialLinks order={[2]} pb={["42px", null, "32px"]} />
        </Box>
        <StyledToolsContainer
          data-theme="dark"
          order={[1, null, 3]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
        >
          <Flex order={[2, null, 1]} alignItems="center">
            {isMounted && <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />}
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color="textSubtle"
              dropdownPosition="top-right"
            />
          </Flex>
          <Box marginBottom={["24px", null, "0px"]}>
            <Flex order={[1, null, 2]} justifyContent="space-between" alignItems="center">
            {cakePriceUsd && (
              <Box marginRight="20px">
                <Box>
                  <CometPrice chainId={chainId} cometPriceUsd={cakePriceUsd} color="textSubtle" />
                </Box>
              </Box>
            )}
            {buyCometLabel && buyCometLink && (
              <Button
                data-theme="dark"
                as="a"
                href={buyCometLink}
                target="_blank"
                scale="sm"
                endIcon={<ArrowForwardIcon color="backgroundAlt" />}
              >
                {buyCometLabel}
              </Button>
            )}
            </Flex>
          </Box>
        </StyledToolsContainer>
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
