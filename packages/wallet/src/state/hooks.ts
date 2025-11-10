import { useAtomValue } from 'jotai'
import { previouslyUsedWalletsAtom, selectedWalletAtom } from './atom'

export const useSelectedWallet = () => {
  return useAtomValue(selectedWalletAtom)
}

export const usePreviouslyUsedWallets = () => {
  // Simplified hooks for EVM-only wallet management
  // Most filtering logic removed as we only support EVM wallets
  return useAtomValue(previouslyUsedWalletsAtom)
}

// Additional hooks can be added here as needed
