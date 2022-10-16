import { ethers } from "ethers"

export const addressNick = (address) => `${address?.substring(0, 8)}...`

export const ensNameResolver = async (address) => {
  if (!address) return
  const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY
  if (infuraApiKey) {
    const ethereumProvider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraApiKey}`)
    const ensName = await ethereumProvider.lookupAddress(address)
    return ensName
  }
}
