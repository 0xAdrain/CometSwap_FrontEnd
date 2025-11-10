import { SvgProps } from '@comet-swap/uikit'
import { WalletIds as LegacyWalletIds } from './components/LegacyWalletModal/legacyWalletIds'
import { EvmConnectorNames } from './config/connectorNames'

type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
  desktop?: LinkOfTextAndLink
  mobile?: LinkOfTextAndLink
}

export type LinkOfDevice = string | DeviceLink

export enum WalletAdaptedNetwork {
  EVM = 'evm',
}

export enum WalletIds {
  Injected = 'injected',
  
  // EVM Wallets
  Metamask = 'metamask',
  Okx = 'okx',
  BinanceW3W = 'BinanceW3W',
  TrustWallet = 'trustWallet',
  Coinbase = 'coinbase',
  WalletConnect = 'walletConnect',
  Brave = 'brave',
  Rabby = 'rabby',
}

type WalletConfigBase = {
  title: string
  icon: string | React.FC<React.PropsWithChildren<SvgProps>>

  deepLink?: string
  installed?: boolean
  guide?: LinkOfDevice
  downloadLink?: LinkOfDevice
  mobileOnly?: boolean
  qrCode?: (cb?: () => void) => Promise<string>
  isNotExtension?: boolean
  MEVSupported?: boolean
}

export type WalletConfigV2<T = unknown> = WalletConfigBase & {
  id: LegacyWalletIds
  connectorId: T
}

export type WalletConfigV3<T = EvmConnectorNames> = WalletConfigBase & {
  id: WalletIds
  networks: Array<WalletAdaptedNetwork>
  connectorId: T
  canInitWithoutInstall?: boolean
}

export type ConnectData = {
  accounts: readonly [string, ...string[]]
  chainId: number | string | undefined
}
