import { BlockchainRepository } from "../repositories"

export class AddNewBlockUseCase {
  _repository

  static async create() {
    const repository = await BlockchainRepository.create()
    return new AddNewBlockUseCase({ repository })
  }

  constructor({ repository }) {
    this._repository = repository
  }

  async execute({ block }) {
    return await this._repository.addNewBlock({ block })
  }
}
