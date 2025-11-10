import { useTranslation } from "@comet-swap/localization";
import { Box as View } from "../../components/Box";
import { Box, Message, Text } from "../../components";
import { IfoMessageTextLink } from "./styleds";

const IfoHasVestingNotice: React.FC<React.PropsWithChildren<{ url: string }>> = ({ url }) => {
  const t = useTranslation();

  return (
    <Box maxWidth="350px">
      <View marginBottom="16px">
        <Message variant="primary">
        <Box>
          <Text fontSize="14px">
            {t("This IFO has token vesting. Purchased tokens are released over a period of time.")}
          </Text>
          <IfoMessageTextLink external href={url} color="#1FC7D4" display="inline">
            {t("Learn more")}
          </IfoMessageTextLink>
        </Box>
        </Message>
      </View>
    </Box>
  );
};

export default IfoHasVestingNotice;
