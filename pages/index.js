import React, { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import { Header } from "components/Header"
import { Block } from "components/Block"
import { useDomain } from "components/context"
import { CURRENT_DIFFICULTY } from "domain/config"
import { TopBar } from "components/TopBar"
import { Footer } from "components/Footer"

export default function Home() {
  const { domain, blocks, updateBlocks } = useDomain()
  const [localBlocks, setLocalBlocks] = useState(blocks)

  const addBlock = async (updatedBlock) => {
    const newBlock = {
      id: localBlocks.length + 1,
      title: updatedBlock.title,
      blockData: updatedBlock.blockData,
      date: updatedBlock.date,
      previousHash: localBlocks[localBlocks.length - 1] ? localBlocks[localBlocks.length - 1].currentHash : "0",
      currentHash: updatedBlock.currentHash,
      nonce: updatedBlock.nonce,
      difficulty: updatedBlock.difficulty,
    }

    await domain.addNewBlockUseCase.execute({ block: newBlock })

    setLocalBlocks((prevBlocks) => [...prevBlocks, newBlock])
    await updateBlocks()
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <Block
          difficulty={CURRENT_DIFFICULTY}
          isEditMode={true}
          previousHash={localBlocks.length > 0 ? localBlocks[localBlocks.length - 1].currentHash : "0"}
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
