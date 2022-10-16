import { InjectedRepository } from "../repositories"

export class GetInjectedProviderUseCase {
  _repository

  static create() {
    const repository = InjectedRepository.create()
    return new GetInjectedProviderUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    const injectedProviderVO = await this._repository.getInjectedProvider()
    return injectedProviderVO.serialize()
  }
}
