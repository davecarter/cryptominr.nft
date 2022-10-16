import { BigNumber } from "ethers"

export class FromGetBlocksToBlockListMapper {
  static create() {
    return new FromGetBlocksToBlockListMapper()
  }

  map(rawData) {
    return rawData.map((item, key) => {
      return {
        id: key,
        title: item.title,
        blockData: item.blockData,
        date: item.date,
        previousHash: BigNumber.from(item.previousHash).toNumber(),
        currentHash: BigNumber.from(item.currentHash).toNumber(),
        nonce: BigNumber.from(item.nonce).toNumber(),
        difficulty: BigNumber.from(item.difficulty).toNumber(),
      }
    })
  }
}
