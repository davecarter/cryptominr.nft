import { getCalculatedHashService } from "./GetCalculatedHashService"

export const getMinedBlockService = async ({ blockData, difficulty }) => {
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
    nonce++
  }

  return { validHash, nonce }
}
