import { CURRENT_CHAIN } from "../../config"

export class InjectedProviderValueObject {
  static create({ provider, account, library, signer, selectedChain, contract }) {
    const hasWallet = typeof window.ethereum !== "undefined"
    const isCorrectChain = selectedChain === CURRENT_CHAIN.ID
    const isActive = Boolean(hasWallet && account && signer && isCorrectChain)
    const isWalletConnected = Boolean(signer)

    InjectedProviderValueObject.validate({
      hasWallet,
      isActive,
      isCorrectChain,
      isWalletConnected,
      selectedChain,
      contract,
    })

    const injectedProviderVO = new InjectedProviderValueObject({
      account,
      hasWallet,
      isActive,
      isCorrectChain,
      library,
      provider,
      signer,
      isWalletConnected,
      contract,
    })

    if (window) {
      window.injectedProvider = injectedProviderVO.serialize()
    }

    return injectedProviderVO
  }

  static validate({ hasWallet, isActive, isCorrectChain, isWalletConnected, selectedChain, contract }) {
    if (!hasWallet || !isActive) {
      if (window) {
        window.injectedProvider = null
      }

      return new InjectedProviderValueObject({
        account: null,
        hasWallet,
        isActive,
        isCorrectChain,
        library: null,
        provider: null,
        selectedChain,
        isWalletConnected,
        signer: null,
        contract,
      })
    }
  }

  constructor({
    provider,
    account,
    library,
    signer,
    selectedChain,
    isCorrectChain,
    hasWallet,
    isActive,
    isWalletConnected,
    contract,
  }) {
    this._account = account
    this._hasWallet = hasWallet
    this._isActive = isActive
    this._isCorrectChain = isCorrectChain
    this._isWalletConnected = isWalletConnected
    this._library = library
    this._provider = provider
    this._selectedChain = selectedChain
    this._signer = signer
    this._contract = contract
  }

  provider() {
    return this._provider
  }

  account() {
    return this._account
  }

  library() {
    return this._library
  }

  signer() {
    return this._signer
  }

  selectedChain() {
    return this._selectedChain
  }

  isCorrectChain() {
    return this._isCorrectChain
  }

  hasWallet() {
    return this._hasWallet
  }

  isActive() {
    return this._isActive
  }

  isWalletConnected() {
    return this._isWalletConnected
  }

  contract() {
    return this._contract
  }

  serialize() {
    return {
      account: this.account(),
      hasWallet: this.hasWallet(),
      isActive: this.isActive(),
      isCorrectChain: this.isCorrectChain(),
      isWalletConnected: this.isWalletConnected(),
      library: this.library(),
      provider: this.provider(),
      selectedChain: this.selectedChain(),
      signer: this.signer(),
      contract: this.contract(),
    }
  }
}
