import React, { useEffect, useState } from "react"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Header } from "components/Header"
import { Block } from "components/Block"
import { useDomain } from "components/context"
import { CURRENT_DIFFICULTY } from "domain/config"
import { TopBar } from "components/TopBar"
import { Footer } from "components/Footer"

export default function Home() {
  const { domain } = useDomain()
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    domain.getBlockUseCase.execute().then((initialBlocks) => {
      setBlocks(initialBlocks)
    })
  }, [])

  const addBlock = async (updatedBlock) => {
    const previousBlock = blocks[blocks.length - 1]
    const newBlock = {
      id: blocks.length + 1,
      title: updatedBlock.title,
      blockData: updatedBlock.blockData,
      date: updatedBlock.date,
      previousHash: previousBlock ? previousBlock.currentHash : "0",
      currentHash: updatedBlock.currentHash,
      nonce: updatedBlock.nonce,
      difficulty: updatedBlock.difficulty,
    }

    await domain.addNewBlockUseCase.execute({ block: newBlock })

    setBlocks((prevBlocks) => [...prevBlocks, newBlock])
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <Block
          difficulty={CURRENT_DIFFICULTY}
          isEditMode={true}
          previousHash={blocks.length > 0 ? blocks[blocks.length - 1].currentHash : "0"}
          onSave={(updatedBlock) => addBlock(updatedBlock)}
        />
        {blocks
          .slice()
          .sort((a, b) => b.id - a.id)
          .map((block) => (
            <Block key={block.id} blockKey={block.id} {...block} />
          ))}
      </main>
      <Footer />
    </div>
  )
}
