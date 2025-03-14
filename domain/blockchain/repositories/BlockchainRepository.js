import { openDB } from "idb"
import { DB_NAME, STORE_NAME } from "domain/config"
import { v4 as uuidv4 } from "uuid"
import { getCalculatedHashService } from "../service"

export class BlockchainRepository {
  static async create() {
    return new BlockchainRepository()
  }

  async indexedDB() {
    const indexedDB = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true })
        }
      },
    })
    return indexedDB
  }

  async getBlocks() {
    const db = await this.indexedDB()
    return (await db.getAll(STORE_NAME)).reverse()
  }

  async addNewBlock({ block }) {
    if (!block.id) {
      block.id = uuidv4()
    }

    const db = await this.indexedDB()
    await db.put(STORE_NAME, block)
  }

  async getLastBlock() {
    const db = await this.indexedDB()
    const blocks = await db.getAll(STORE_NAME)
    return blocks[blocks.length - 1]
  }

  async deleteAllBlocks() {
    const db = await this.indexedDB()
    await db.clear(STORE_NAME)
  }

  async getPerformance() {
    let hashes = 0
    const start = performance.now()
    const duration = 10000

    while (performance.now() - start < duration) {
      const batchSize = 24 // My Ryzen 9 5900X has 24 threads
      await Promise.all(
        Array.from({ length: batchSize }, async () => {
          await getCalculatedHashService({ data: "test" })
          hashes++
        }),
      )
    }

    const elapsedTime = (performance.now() - start) / 1000
    return Math.round(hashes / elapsedTime)
  }

  async getMinedBlock({ blockData, difficulty }) {
    let nonce = 0
    let validHash = ""
    const target = "0".repeat(difficulty)

    while (true) {
      const dataToHash = `${blockData.title}${blockData.blockData}${blockData.date}${blockData.previousHash}${nonce}${blockData.difficulty}`
      const hash = await getCalculatedHashService({ data: dataToHash })
      if (hash.startsWith(target)) {
        validHash = hash
        break
      }
      window.hash = hash
      window.nonce = nonce
      nonce++
    }

    return { validHash, nonce }
  }
}
