import { Box as View } from "../../components/Box";
import { Flex } from "../../components/Box";
import { Skeleton } from "../../components/Skeleton";

export const IfoSkeletonCardActions = () => {
  return <Skeleton height="48px" />;
};

export const IfoSkeletonCardTokens = () => {
  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <View marginRight="16px">
          <Skeleton variant="circle" width="32px" height="32px" />
        </View>
        <Skeleton width="90%" />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <View marginRight="16px">
          <Skeleton variant="circle" width="32px" height="32px" />
        </View>
        <Skeleton width="90%" />
      </Flex>
    </div>
  );
};

export const IfoSkeletonCardDetails = () => {
  return (
    <div>
      <View marginBottom="8px">
        <Skeleton />
      </View>
      <Skeleton />
    </div>
  );
};

export default null;
