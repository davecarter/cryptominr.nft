import { BlockchainRepository } from "../repositories"

export class GetLastBlockHashUseCase {
  _repository

  static async create() {
    const repository = await BlockchainRepository.create()
    return new GetLastBlockHashUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute() {
    return await this._repository.getLastBlock()
  }
}
