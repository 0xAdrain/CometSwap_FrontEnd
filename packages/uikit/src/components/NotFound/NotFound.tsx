import { styled } from "../../styled-components";
import { JSXElementConstructor, ReactNode, createElement } from "react";
import { Box } from "../Box";
import { useTranslation } from "@comet-swap/localization";
import { LogoIcon } from "../Svg";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Button } from "../Button";

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`;

const NotFound = ({
  statusCode = 404,
  children,
  LinkComp,
}: {
  LinkComp: JSXElementConstructor<any>;
  statusCode?: number;
  children: ReactNode;
}) => {
  const t = useTranslation();

  const linkElement = createElement(
    LinkComp,
    {
      href: "/",
      passHref: true,
    },
    <Button scale="sm">{t("Back Home")}</Button>
  );

  return (
    <>
      {children}
      <StyledNotFound>
        <Box style={{ marginBottom: "8px" }}>
          <LogoIcon width="64px" />
        </Box>
        <Heading scale="xxl">{statusCode}</Heading>
        <Text mb="16px">{t("Oops, page not found.")}</Text>
        {linkElement}
      </StyledNotFound>
    </>
  );
};

export default NotFound;
