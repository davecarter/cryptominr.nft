import styles from "../styles/BlockBuilder.module.css"
import { useState } from "react"

export const BlockBuilder = ({ id, previousHash }) => {
  const [blockData, setBlockData] = useState([])
  const [currentHash, setCurrentHash] = useState("")
  const [titleData, setTitleData] = useState("")
  const [difficulty, setDifficulty] = useState("")

  const clearBlockData = () => setBlockData("")
  const clearTitleData = () => setBlockData("")
  const handleBlockData = (evt) => setBlockData(evt.target.value)
  const handleTitleData = (evt) => setTitleData(evt.target.value)

  return (
    <div className={styles.container}>
      <div>
        <span>previous hash: {previousHash}</span>
        <h2>
          <input
            className={styles.title}
            type="text"
            value={titleData}
            onFocus={clearTitleData}
            onChange={handleTitleData}
          />
        </h2>
        <h3>{id}</h3>
      </div>
      <span>{Date.now()}</span>
      <p>
        <textarea
          id="blockData"
          placeholder="type your data"
          className={styles.blockData}
          value={blockData}
          onChange={handleBlockData}
          onFocus={clearBlockData}
        />
      </p>
      <div>
        <span>{"nonce"}</span>
        <span>{"difficulty"}</span>
      </div>
      <span>{"currentHash"}</span>
    </div>
  )
}
