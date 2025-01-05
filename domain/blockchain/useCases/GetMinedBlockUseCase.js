import { BlockchainRepository } from "../repositories"

export class GetMinedBlockUseCase {
  _repository

  static async create() {
    const repository = await BlockchainRepository.create()
    return new GetMinedBlockUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute({ blockData, difficulty }) {
    return await this._repository.getMinedBlock({ blockData, difficulty })
  }
}
