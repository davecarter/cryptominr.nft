import { BlockchainRepository } from "../repositories"

export class GetComputerPerformanceUseCase {
  _repository

  static async create() {
    const repository = await BlockchainRepository.create()
    return new GetComputerPerformanceUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    return await this._repository.getPerformance()
  }
}
