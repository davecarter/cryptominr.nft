export const CHAINS = {
  MATIC: {
    ID: "0x89",
    NAME: "Matic",
    RPC: "https://polygon-rpc.com/",
    EXPLORER: "https://polygonscan.com",
    LOGO: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    CURRENCY: {
      NAME: "MATIC",
      SYMBOL: "MATIC",
      DECIMALS: 18,
    },
  },
  GOERLI: {
    ID: "0x5",
    NAME: "Goerli",
    RPC: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    EXPLORER: "https://goerli.etherscan.io",
    LOGO: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    CURRENCY: {
      NAME: "ETH",
      SYMBOL: "ETH",
      DECIMALS: 18,
    },
  },
}

export const CURRENT_CHAIN = CHAINS.GOERLI
