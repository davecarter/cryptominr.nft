export const DB_NAME = "blockchainDB"
export const STORE_NAME = "blocks"
export const GENESIS_BLOCK = {
  id: 1,
  title: "Genesis Block",
  blockData: "This is the first block.",
  date: new Date().toISOString(),
  previousHash: "0",
  currentHash: "PlaceholderHash",
  nonce: 0,
  difficulty: 1,
}
