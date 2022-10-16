import { InjectedRepository } from "../repositories"

export class GetBlocksUseCase {
  _repository

  static create() {
    const repository = InjectedRepository.create()
    return new GetBlocksUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    const blocks = await this._repository.getBlocks()
    return blocks
  }
}
