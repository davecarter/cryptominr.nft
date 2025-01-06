import { BlockchainRepository } from "../repositories"

export class DeleteAllBlocksUseCase {
  _repository
  static async create() {
    const repository = await BlockchainRepository.create()
    return new DeleteAllBlocksUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    return await this._repository.deleteAllBlocks()
  }
}
