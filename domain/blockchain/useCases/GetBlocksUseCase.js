import { BlockchainRepository } from "../repositories"

export class GetBlocksUseCase {
  _repository

  static async create() {
    const repository = await BlockchainRepository.create()
    return new GetBlocksUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    return await this._repository.getBlocks()
  }
}
