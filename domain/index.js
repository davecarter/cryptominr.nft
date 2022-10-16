// Create a Domain singleton instance as an entry point
// const domain = DomainApp.create()
// The exposed API is camelCased:
// domain.nameOfUseCase.execute({ namedParams })
// All UseCases will always have just an execute method and they will return a promise

// More about using minimal API Surface Area pattern
// https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html

const interOP = (fn, name) => () => fn().then((mod) => mod[name])
const useCases = {
  connectWalletUseCase: interOP(() => import("./blockchain/useCases/ConnectWalletUseCase.js"), "ConnectWalletUseCase"),
  disconnectWalletUseCase: interOP(
    () => import("./blockchain/useCases/DisconnectWalletUseCase.js"),
    "DisconnectWalletUseCase"
  ),
  getInjectedProviderUseCase: interOP(
    () => import("./blockchain/useCases/GetInjectedProviderUseCase.js"),
    "GetInjectedProviderUseCase"
  ),
  handleSwitchChainUseCase: interOP(
    () => import("./blockchain/useCases/HandleSwitchChainUseCase.js"),
    "HandleSwitchChainUseCase"
  ),
  getBlocksUseCase: interOP(() => import("./blockchain/useCases/GetBlocksUseCase.js"), "GetBlocksUseCase"),
}

export class DomainApp {
  static create() {
    return new DomainApp()
  }

  get connectWalletUseCase() {
    return this._getter("connectWalletUseCase")
  }

  get disconnectWalletUseCase() {
    return this._getter("disconnectWalletUseCase")
  }

  get getInjectedProviderUseCase() {
    return this._getter("getInjectedProviderUseCase")
  }

  get handleSwitchChainUseCase() {
    return this._getter("handleSwitchChainUseCase")
  }

  get getBlocksUseCase() {
    return this._getter("getBlocksUseCase")
  }

  _getter(name) {
    return {
      async execute() {
        const klass = await useCases[name]()
        const response = klass.create().execute(...arguments)
        return response
      },
    }
  }
}
