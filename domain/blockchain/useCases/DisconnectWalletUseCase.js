import { InjectedRepository } from "../repositories"

export class DisconnectWalletUseCase {
  _repository

  static create() {
    const repository = InjectedRepository.create()
    return new DisconnectWalletUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    await this._repository.disconnectWallet()
  }
}
