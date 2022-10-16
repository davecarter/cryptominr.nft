import WalletConnectProvider from "@walletconnect/web3-provider"
import { CURRENT_CHAIN } from "./chains"

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 5: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
}

export const theme = {
  background: "black",
  main: "white",
  secondary: "darkgrey",
  hover: "grey",
}

export const METHOD = {
  WALLET_SWITCH_ETHEREUM: "wallet_switchEthereumChain",
  WALLET_ADD_ETHEREUM: "wallet_addEthereumChain",
}

export const PARAMS = {
  WALLET_SWITCH_ETHEREUM: [{ chainId: CURRENT_CHAIN.ID }],
  WALLET_ADD_ETHEREUM: [
    {
      chainId: CURRENT_CHAIN.ID,
      chainName: CURRENT_CHAIN.NAME,
      nativeCurrency: {
        name: CURRENT_CHAIN.CURRENCY.NAME,
        symbol: CURRENT_CHAIN.CURRENCY.SYMBOL,
        decimals: CURRENT_CHAIN.CURRENCY.DECIMALS,
      },
      rpcUrls: [CURRENT_CHAIN.RPC],
    },
  ],
}
