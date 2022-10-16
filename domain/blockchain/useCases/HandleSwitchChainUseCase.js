import { InjectedRepository } from "../repositories"

export class HandleSwitchChainUseCase {
  _repository

  static create() {
    const repository = InjectedRepository.create()
    return new HandleSwitchChainUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    await this._repository.handleSwitchChain()
  }
}
