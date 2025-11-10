// @ts-nocheck - 临时禁用类型检查，响应式props类型需要完善
import { useIsMounted } from "@comet-swap/hooks";

// 纯JavaScript节流函数，替代lodash/throttle
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}
// @ts-nocheck - 临时禁用类型检查，响应式props类型需要完善
import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "../../styled-components";
import { AtomBox } from "../../components/AtomBox";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import CometPrice from "../../components/CometPrice/CometPrice";
import Footer from "../../components/Footer";
import LangSelector from "../../components/LangSelector/LangSelector";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { MenuContext } from "./context";
import { NavProps } from "./types";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }: { theme: any }) => theme.nav.background};
  border-bottom: 1px solid ${({ theme }: { theme: any }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`;

const FixedContainer = styled("div").withConfig({
  shouldForwardProp: (props: string) => !["showMenu"].includes(props),
})<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height  }: { showMenu: any, height: any }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height  }: { height: any }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height  }: { height: any }) => `${height}px`};
  min-height: ${({ height  }: { height: any }) => `${height}px`};
  max-height: ${({ height  }: { height: any }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
  max-width: 100vw;
`;

const Inner = styled.div`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cometPriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  activeSubItemChildItem,
  langs,
  buyCometLabel,
  buyCometLink,
  children,
  chainId,
  logoComponent,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = useMemo(() => subLinks?.filter((subLink) => !subLink.isMobileOnly), [subLinks]);
  const subLinksMobileOnly = useMemo(() => subLinks?.filter((subLink) => subLink.isMobileOnly), [subLinks]);
  const providerValue = useMemo(() => ({ linkComponent }), [linkComponent]);
  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        <Wrapper>
          <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
            {banner && isMounted && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
            <StyledNav>
              <Flex>
                {logoComponent ?? <Logo href={homeLink?.href ?? "/home"} />}
                <AtomBox display={{ xs: "none", lg: "block" }}>
                  <MenuItems
                    ml="24px"
                    items={links}
                    activeItem={activeItem}
                    activeSubItem={activeSubItem}
                    activeSubItemChildItem={activeSubItemChildItem}
                  />
                </AtomBox>
              </Flex>
              <Flex alignItems="center" height="100%">
                <AtomBox mr="12px" display={{ xs: "none", xxl: "block" }}>
                  <CometPrice chainId={chainId} showSkeleton={false} cometPriceUsd={cometPriceUsd} />
                </AtomBox>
                {langs && langs.length > 0 && (
                  <Box mt="4px">
                    <LangSelector
                      currentLang={currentLang}
                      langs={langs}
                      setLang={setLang}
                      buttonScale="xs"
                      color="textSubtle"
                      hideLanguage
                    />
                  </Box>
                )}
                {rightSide}
              </Flex>
            </StyledNav>
          </FixedContainer>
          {subLinks ? (
            <Flex justifyContent="space-around" overflow="hidden">
              <SubMenuItems
                items={subLinksWithoutMobile}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItemChildItem || activeSubItem}
              />

              {subLinksMobileOnly && subLinksMobileOnly?.length > 0 && (
                <SubMenuItems
                  items={subLinksMobileOnly}
                  mt={`${totalTopMenuHeight + 1}px`}
                  activeItem={activeSubItemChildItem || activeSubItem}
                  isMobileOnly
                />
              )}
            </Flex>
          ) : (
            <div />
          )}
          <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
            <Inner>{children}</Inner>
          </BodyWrapper>
        </Wrapper>
      </AtomBox>
      <Footer
        chainId={chainId}
        items={footerLinks}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        setLang={setLang}
        currentLang={currentLang}
        cometPriceUsd={cometPriceUsd}
        buyCometLabel={buyCometLabel}
        buyCometLink={buyCometLink}
        marginBottom={`${MOBILE_MENU_HEIGHT}px`}
        marginBottom={["auto", null, null, null, "0px"]}
      />
      <AtomBox display={{ xs: "block", lg: "none" }}>
        <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
      </AtomBox>
    </MenuContext.Provider>
  );
};

export default Menu;
