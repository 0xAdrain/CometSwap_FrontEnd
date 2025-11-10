import React from 'react';
import TokenLogo from './TokenLogo';

export interface TokenLogoWithServiceProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  chainId?: number;
  address?: string;
  symbol?: string;
  imageRef?: React.RefObject<HTMLImageElement>;
  // 允许手动传入srcs作为fallback
  srcs?: string[];
}

/**
 * TokenLogo组件的简化版本
 * 暂时直接使用传入的srcs，等core-config包配置好后再集成logo服务
 */
const TokenLogoWithService: React.FC<TokenLogoWithServiceProps> = ({ 
  chainId, 
  address, 
  symbol, 
  srcs = [], 
  ...rest 
}) => {
  return <TokenLogo srcs={srcs} {...rest} />;
};

export default TokenLogoWithService;




