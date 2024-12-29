import { useState, useEffect } from "react"
import styles from "../styles/Block.module.css"

const calculateHash = async (data) => {
  const encoder = new TextEncoder()
  const encodedData = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("")
  return hashHex
}

const findValidHash = async (blockData, difficulty) => {
  let nonce = 0
  let validHash = ""
  const target = "0".repeat(difficulty)

  while (true) {
    const dataToHash = `${blockData.title}${blockData.blockData}${blockData.date}${blockData.previousHash}${nonce}${blockData.difficulty}`
    const hash = await calculateHash(dataToHash)
    if (hash.startsWith(target)) {
      validHash = hash
      break
    }
    nonce++
  }

  return { validHash, nonce }
}

const getCurrentDateInSpanishFormat = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  return `Time: ${hours}:${minutes} - Date: ${day}-${month}-${year}`
}

export const Block = ({
  id,
  key,
  title,
  blockData,
  date,
  previousHash,
  currentHash,
  nonce,
  difficulty,
  isEditMode,
  onSave,
}) => {
  const [editableTitle, setEditableTitle] = useState(title || "")
  const [editableBlockData, setEditableBlockData] = useState(blockData || "")
  const [editableDate, setEditableDate] = useState(date || getCurrentDateInSpanishFormat())
  const [editableCurrentHash, setEditableCurrentHash] = useState(currentHash || "")
  const [editableNonce, setEditableNonce] = useState(nonce || 0)
  const [editableDifficulty, setEditableDifficulty] = useState(difficulty || 1)
  const [mining, setmining] = useState(false) // Nuevo estado de carga

  useEffect(() => {
    const updateHash = async () => {
      const dataToHash = `${editableTitle}${editableBlockData}${editableDate}${previousHash}${editableNonce}${editableDifficulty}`
      const newHash = await calculateHash(dataToHash)
      setEditableCurrentHash(newHash)
    }

    if (isEditMode) {
      updateHash()
    }
  }, [editableTitle, editableBlockData, editableDate, previousHash, editableNonce, editableDifficulty, isEditMode])

  const handleSave = async () => {
    if (onSave) {
      setmining(true) // Activamos el estado de carga al empezar a calcular el hash

      const blockData = {
        title: editableTitle,
        blockData: editableBlockData,
        date: editableDate,
        previousHash: editableCurrentHash,
        difficulty: editableDifficulty,
      }

      const { validHash, nonce: validNonce } = await findValidHash(blockData, editableDifficulty)

      onSave({
        id,
        title: editableTitle,
        blockData: editableBlockData,
        date: editableDate,
        previousHash: editableCurrentHash,
        currentHash: validHash,
        nonce: validNonce,
        difficulty: editableDifficulty,
      })

      setmining(false) // Desactivamos el estado de carga cuando se haya terminado
    }
  }

  return (
    <div className={styles.container} key={key}>
      <span className={styles.currentHashContainer}>
        <span className={styles.currentHash}>Current Hash:</span>
        <span className={styles.currentHashData}> {editableCurrentHash}</span>
      </span>
      <div className={styles.headingContainer}>
        {isEditMode ? (
          <input
            type="text"
            className={styles.titleInput}
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            placeholder="Enter block title"
          />
        ) : (
          <h2 className={styles.title}>{title}</h2>
        )}
        <h3 className={styles.blockID}>Block ID # {id}</h3>
      </div>
      <div className={styles.blockData}>
        {isEditMode ? (
          <>
            <textarea
              className={styles.blockDataInput}
              value={editableBlockData}
              onChange={(e) => setEditableBlockData(e.target.value)}
              placeholder="Enter block data"
              onFocus={(e) => (e.target.placeholder = "")}
            />
            <span className={styles.dateInput}>{getCurrentDateInSpanishFormat()}</span>
          </>
        ) : (
          <>
            <span className={styles.blockDataLabelContainer}>
              <span className={styles.blockDataLabel}>Block data:</span>
              <span className={styles.blockDateLabel}>{date}</span>
            </span>
            <p>{blockData}</p>
          </>
        )}
      </div>

      <div className={styles.footerContainer}>
        <span className={styles.difficultyLabel}>Current difficulty: {editableDifficulty}</span>
        <span className={styles.nonceLabel}>Block Nonce: {editableNonce}</span>
      </div>
      <span className={styles.previousHashContainer}>
        <span className={styles.previousHash}>Previous Hash:</span>
        <span className={styles.previousHashData}>{previousHash}</span>
      </span>

      {isEditMode ? (
        <div className={styles.mineButtonContainer}>
          {mining && <span className={styles.miningText}>Mining... please wait</span>}
          <button className={mining ? styles.miningButton : styles.mineButton} onClick={handleSave} disabled={mining}>
            {!mining && "Mine Block!"}
          </button>
        </div>
      ) : null}
    </div>
  )
}
