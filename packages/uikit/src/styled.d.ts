import "styled-components";
import { StellarThemeType } from "./stellar/theme";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends StellarThemeType {
    // 添加isDark字段，借鉴PancakeSwap的设计
    isDark: boolean;
  }
}
