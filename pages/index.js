import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Header } from "components/Header"
import { TopBar } from "components/TopBar"
import { Block } from "components/Block"
import { BlockBuilder } from "components/BlockBuilder"
import { useDomain } from "components/context"

export default function Home() {
  const { domain } = useDomain()
  const [blocks, setBlocks] = useState()
  const [lastBlock, setLastBlock] = useState()
  const [newBlock, setNewBlock] = useState(true)
  const getBlocks = async () => {
    const blocks = await domain.getBlocksUseCase.execute()
    setBlocks(blocks)
  }

  useEffect(() => {
    getBlocks()
  }, [])

  useEffect(() => {
    setLastBlock(blocks?.at(-1))
  }, [blocks])

  return (
    <div className={styles.container}>
      <Header />
      <TopBar />
      <main className={styles.main}>
        <h1 className={styles.title}>CryptoMinr</h1>
        {newBlock ? (
          <button onClick={() => setNewBlock(false)}>Add new Block</button>
        ) : (
          <BlockBuilder id={lastBlock.id} previousHash={lastBlock.previousHash} />
        )}
        {blocks?.map((block) => (
          <Block
            id={block.id}
            title={block.title}
            blockData={block.blockData}
            date={block.date}
            previousHash={block.previousHash}
            currentHash={block.currentHash}
            nonce={block.nonce}
            difficulty={block.difficulty}
          />
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/images/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
