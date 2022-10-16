import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { providerOptions, theme, METHOD, PARAMS } from "../../config"
import { InjectedProviderValueObject } from "../models"
import { ABI, ADDRESS } from "../../config/contracts"
import { FromGetBlocksToBlockListMapper } from "../mappers/fromGetBlocksToBlockListMapper"

let web3Modal

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme,
  })
}
export class InjectedRepository {
  static create() {
    return new InjectedRepository()
  }

  async getInjectedProvider() {
    if (web3Modal?.cachedProvider) {
      const injectedProviderVO = await this.connectWallet()
      return injectedProviderVO
    } else {
      return InjectedProviderValueObject.create({ hasWallet: false })
    }
  }

  async connectWallet() {
    try {
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(provider)
      const signer = library.getSigner()
      const account = await signer.getAddress()
      const network = await library.getNetwork()
      const selectedChain = `0x${network.chainId.toString(16)}`
      const blockNumber = await library.getBlockNumber()

      const contract = provider.request({ method: "eth_requestAccounts" }).then(() => {
        return new ethers.Contract(ADDRESS, ABI, signer)
      })

      return InjectedProviderValueObject.create({
        provider,
        account,
        selectedChain,
        library,
        signer,
        blockNumber,
        contract,
      })
    } catch (e) {
      console.error(e)
    }
  }

  async disconnectWallet() {
    await web3Modal.clearCachedProvider()
  }

  async handleSwitchChain() {
    const provider = await web3Modal.connect()

    try {
      await provider.request({
        method: METHOD.WALLET_SWITCH_ETHEREUM,
        params: PARAMS.WALLET_SWITCH_ETHEREUM,
      })
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: METHOD.WALLET_ADD_ETHEREUM,
            params: PARAMS.WALLET_ADD_ETHEREUM,
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        console.error(switchError)
      }
    }
  }

  async getBlocks() {
    const injectedProviderVO = await this.connectWallet()
    const contract = await injectedProviderVO.contract()

    const getBlocksPromise = contract.getBlocks()
    const blocks = await getBlocksPromise

    const mapper = FromGetBlocksToBlockListMapper.create()
    return mapper.map(blocks)
  }
}
