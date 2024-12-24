import { openDB } from "idb"
import { DB_NAME, STORE_NAME } from "domain/config"
import { v4 as uuidv4 } from "uuid"

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
}
