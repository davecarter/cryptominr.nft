import { useState, useEffect, useRef } from "react"
import styles from "../styles/Block.module.css"
import { getCalculatedHashService } from "domain/blockchain/service"
import { useDomain } from "components/context"
import { getCurrentDateInSpanishFormat, formatNumeral, getElapsedTime } from "utils"

export const Block = ({
  id,
  title,
  blockData,
  date,
  elapsedTime,
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
  const [editableDate, setEditableDate] = useState(date || getCurrentDateInSpanishFormat())
  const [editableCurrentHash, setEditableCurrentHash] = useState(currentHash || "")
  const [editableNonce] = useState(nonce || 0)
  const [editableDifficulty, setEditableDifficulty] = useState(difficulty || 1)
  const [mining, setMining] = useState(false)
  const [miningNonce, setMiningNonce] = useState(0)

  const nonceRef = useRef(miningNonce)
  const initialTimeRef = useRef(new Date())

  useEffect(() => {
    const updateNonce = () => {
      if (window.nonce !== undefined) {
        setMiningNonce(window.nonce)
        nonceRef.current = window.nonce
      }
    }

    const interval = setInterval(updateNonce, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setEditableDate(getCurrentDateInSpanishFormat())
    const updateHash = async () => {
      const dataToHash = `${editableTitle}${editableBlockData}${getCurrentDateInSpanishFormat()}${previousHash}${editableNonce}${editableDifficulty}`
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
      elapsedTime: initialTimeRef.current,
      previousHash: previousHash,
      difficulty: editableDifficulty,
    }

    try {
      const { validHash, nonce: validNonce } = await domain.getMinedBlockUseCase.execute({
        blockData,
        difficulty: editableDifficulty,
      })

      window.nonce = validNonce

      onSave({
        id,
        title: editableTitle,
        blockData: editableBlockData,
        date: editableDate,
        previousHash,
        elapsedTime: getElapsedTime(initialTimeRef.current),
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
    initialTimeRef.current = new Date()
    setMining(true)

    try {
      await handleCalculateHash()
    } catch (error) {
      console.error("Error during mining:", error)
    } finally {
      setEditableTitle("")
      setEditableBlockData("Enter block data")
      setMining(false)
    }
  }

  return (
    <div className={styles.container}>
      <span className={styles.currentHashContainer}>
        <span className={styles.currentHash}>Current Hash:</span>
        <span className={styles.currentHashData}> {!mining ? editableCurrentHash : window.hash}</span>
      </span>
      <div className={styles.headingContainer}>
        {isEditMode ? (
          <input
            disabled={mining}
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
        {!isEditMode && (
          <div className={styles.blockID}>
            <span className={styles.blockIDLabel}>Block ID</span>
            <span className={styles.blockIDNumber}>{id}</span>
          </div>
        )}
      </div>
      <div className={styles.blockData}>
        {isEditMode ? (
          <>
            <textarea
              disabled={mining}
              className={styles.blockDataInput}
              value={editableBlockData}
              onChange={(e) => setEditableBlockData(e.target.value)}
              onFocus={() => setEditableBlockData("")}
              placeholder="Enter block data"
              onBlur={() => setEditableBlockData(editableBlockData || "Enter block data")}
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
          {isEditMode ? "Current difficulty: " : "Mined difficulty: "}
          {isEditMode ? (
            <select
              className={styles.difficultySelect}
              value={editableDifficulty}
              onChange={(e) => setEditableDifficulty(e.target.value)}
            >
              {[...Array(8)].map((_, i) => (
                <option key={i} value={i + 1}>
                  0{i + 1}
                </option>
              ))}
            </select>
          ) : (
            editableDifficulty
          )}
        </span>
        <span className={!mining ? styles.nonceLabel : styles.miningNonce}>
          Block Nonce: {!mining ? editableNonce : miningNonce}
        </span>
      </div>
      {!isEditMode && (
        <span className={styles.miningTimeContainer}>
          <span className={styles.miningTime}>
            Mining time: {elapsedTime} <small>{`${"HH:MM:SS"}`}</small>
          </span>
        </span>
      )}
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
