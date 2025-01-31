import { useState, useEffect } from "react"
import styles from "../styles/Block.module.css"
import { getCalculatedHashService } from "domain/blockchain/service"
import { useDomain } from "components/context"
import { getCurrentDateInSpanishFormat, formatNumeral } from "utils"

export const Block = ({
  id,
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
  const { domain } = useDomain()

  const [editableTitle, setEditableTitle] = useState(title || "")
  const [editableBlockData, setEditableBlockData] = useState(blockData || "")
  const [editableDate] = useState(date || getCurrentDateInSpanishFormat())
  const [editableCurrentHash, setEditableCurrentHash] = useState(currentHash || "")
  const [editableNonce] = useState(nonce || 0)
  const [editableDifficulty, setEditableDifficulty] = useState(difficulty || 1)
  const [mining, setmining] = useState(false)

  useEffect(() => {
    const updateHash = async () => {
      const dataToHash = `${editableTitle}${editableBlockData}${editableDate}${previousHash}${editableNonce}${editableDifficulty}`
      const newHash = await getCalculatedHashService({ data: dataToHash })
      setEditableCurrentHash(newHash)
    }

    if (isEditMode) {
      updateHash()
    }
  }, [editableTitle, editableBlockData, editableDate, previousHash, editableNonce, editableDifficulty, isEditMode])

  const handleCalculateHash = async () => {
    if (!onSave) return

    const blockData = {
      title: editableTitle,
      blockData: editableBlockData,
      date: editableDate,
      previousHash: previousHash,
      difficulty: editableDifficulty,
    }

    try {
      const { validHash, nonce: validNonce } = await domain.getMinedBlockUseCase.execute({
        blockData,
        difficulty: editableDifficulty,
      })

      onSave({
        id,
        title: editableTitle,
        blockData: editableBlockData,
        date: editableDate,
        previousHash,
        currentHash: validHash,
        nonce: formatNumeral(validNonce),
        difficulty: editableDifficulty,
      })
    } catch (error) {
      console.error("Error while calculating hash:", error)
      throw error
    }
  }

  const handleMining = async () => {
    setmining(true)

    try {
      await handleCalculateHash()
    } catch (error) {
      console.error("Error during mining:", error)
    } finally {
      setEditableTitle("")
      setEditableBlockData("Enter new block data")
      setmining(false)
    }
  }

  return (
    <div className={styles.container}>
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
            onFocus={() => setEditableTitle("")}
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
              onFocus={() => setEditableBlockData("")}
              placeholder="Enter block data"
              onBlur={() => setEditableBlockData(editableBlockData || "Enter new block data")}
            />
            <span className={styles.dateInput}>{getCurrentDateInSpanishFormat()}</span>
          </>
        ) : (
          <>
            <span className={styles.blockDataLabelContainer}>
              <span className={styles.blockDataLabel}>Block data:</span>
              <span className={styles.blockDateLabel}>{date}</span>
            </span>
            <p className={styles.blockDataContent}>{blockData}</p>
          </>
        )}
      </div>

      <div className={styles.footerContainer}>
        <span className={styles.difficultyLabel}>
          Current difficulty:{" "}
          <select value={editableDifficulty} onChange={(e) => setEditableDifficulty(e.target.value)}>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
          </select>
        </span>
        <span className={styles.nonceLabel}>Block Nonce: {editableNonce}</span>
      </div>
      <span className={styles.previousHashContainer}>
        <span className={styles.previousHash}>Previous Hash:</span>
        <span className={styles.previousHashData}>{previousHash}</span>
      </span>

      {isEditMode ? (
        <div className={styles.mineButtonContainer}>
          {mining && <span className={styles.miningText}>Mining... please wait</span>}
          <button className={mining ? styles.miningButton : styles.mineButton} onClick={handleMining} disabled={mining}>
            {!mining && "Mine Block!"}
          </button>
        </div>
      ) : null}
    </div>
  )
}
