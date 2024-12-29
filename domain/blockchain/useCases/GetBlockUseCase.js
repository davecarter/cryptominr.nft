import { BlockchainRepository } from "../repositories"

export class GetBlockUseCase {
  _repository

  static async create() {
    const repository = await BlockchainRepository.create()
    return new GetBlockUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    return await this._repository.getBlocks()
  }
}
