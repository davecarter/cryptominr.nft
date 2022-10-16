import { InjectedRepository } from "../repositories"

export class ConnectWalletUseCase {
  _repository

  static create() {
    const repository = InjectedRepository.create()
    return new ConnectWalletUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    const connectedWalletVO = await this._repository.connectWallet()
    return connectedWalletVO.serialize()
  }
}
