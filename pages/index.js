import React, { useState, useEffect } from "react"
import styles from "../styles/Home.module.css"
import { Header } from "components/Header"
import { Block } from "components/Block"
import { useDomain } from "components/context"
import { CURRENT_DIFFICULTY } from "domain/config"
import { TopBar } from "components/TopBar"
import { Footer } from "components/Footer"
import { debugLogger } from "utils"
import { useRouter } from "next/router"

export default function Home() {
  const { domain, blocks, updateBlocks } = useDomain()
  const [localBlocks, setLocalBlocks] = useState(blocks)
  const [currentBlock, setCurrentBlock] = useState({ currentHash: "0" })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    domain.getLastBlockHashUseCase.execute().then((lastBlock) => {
      debugLogger("Last block hash:", lastBlock)
      setCurrentBlock(lastBlock)
    })
  }, [localBlocks])

  useEffect(() => {
    if (!loading) return
    setTimeout(async () => {
      setLoading(false)
      const initialBlocks = await domain.getBlocksUseCase.execute()
      setLocalBlocks(initialBlocks)
      router.push("/")
    }, 1)
    setLocalBlocks(blocks)
    debugLogger("Initial blocks:", blocks)
  }, [blocks, localBlocks, loading])

  const addBlock = async (updatedBlock) => {
    debugLogger("Adding new block:", updatedBlock)
    try {
      const newBlock = {
        id: currentBlock?.id + 1 || 100,
        title: updatedBlock.title,
        blockData: updatedBlock.blockData,
        date: updatedBlock.date,
        previousHash: currentBlock?.currentHash || "GENESIS BLOCK",
        currentHash: updatedBlock.currentHash,
        nonce: updatedBlock.nonce,
        difficulty: updatedBlock.difficulty,
      }

      debugLogger("Prepared new block:", newBlock)
      await domain.addNewBlockUseCase.execute({ block: newBlock })
      debugLogger("Block added successfully")

      setLocalBlocks((prevBlocks) => [...prevBlocks, newBlock])
      await updateBlocks()
    } catch (error) {
      console.error("Error adding block:", error)
    }
  }

  useEffect(() => {
    debugLogger("Block Addition Debug:", {
      localBlocksCount: localBlocks.length,
      lastBlock: localBlocks[localBlocks.length - 1],
    })
  }, [localBlocks])

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <Block
          difficulty={CURRENT_DIFFICULTY}
          isEditMode={true}
          previousHash={currentBlock ? currentBlock.currentHash : "GENESIS BLOCK"}
          onSave={(updatedBlock) => addBlock(updatedBlock)}
        />
        {localBlocks
          .slice()
          .sort((a, b) => b.id - a.id)
          .map((block) => (
            <div className={styles.item} key={block.id}>
              <Block blockKey={block.id} {...block} />
            </div>
          ))}
      </main>
      <Footer />
    </div>
  )
}
