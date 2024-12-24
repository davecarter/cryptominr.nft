import React, { useEffect, useState } from "react"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Header } from "components/Header"
import { Block } from "components/Block"
import { useDomain } from "components/context"
import { GENESIS_BLOCK } from "domain/config"

export default function Home() {
  const { domain } = useDomain()
  const [blocks, setBlocks] = useState([])

  // Cargar los bloques desde IndexedDB cuando el componente se monta
  useEffect(() => {
    domain.getBlockUseCase.execute().then((blocks) => {
      setBlocks(blocks)
    })
  }, []) // Ejecuta solo al montar

  // Función para agregar un bloque
  const addBlock = async (updatedBlock) => {
    const previousBlock = blocks[blocks.length - 1] // Conseguir el último bloque
    const block = await domain.addNewBlockUseCase.execute({
      block: {
        id: blocks.length + 1,
        title: updatedBlock.title,
        blockData: updatedBlock.blockData,
        date: updatedBlock.date,
        previousHash: previousBlock ? previousBlock.currentHash : "0",
        currentHash: "PlaceholderHash", // Puedes usar una lógica de hash real aquí
        nonce: 0,
        difficulty: 1,
      },
    })

    // Después de añadir el bloque, obtener todos los bloques actualizados
    const updatedBlocks = await domain.getBlockUseCase.execute()
    setBlocks(updatedBlocks) // Actualiza el estado con los bloques actualizados
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>CryptoMinr</h1>
        <Block
          isEditMode={true}
          onSave={(updatedBlock) => addBlock(updatedBlock)} // Pasamos el bloque editado al guardar
        />
        {/* Ya no es necesario el botón Add Block aquí */}
        {blocks.map((block) => (
          <Block key={block.id} blockKey={block.id} {...block} />
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
