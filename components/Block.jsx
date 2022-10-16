import styles from "../styles/Block.module.css"

export const Block = ({ id, title, blockData, date, previousHash, currentHash, nonce, difficulty }) => {
  return (
    <div className={styles.container}>
      <span className={styles.previousHash}>Previous Hash: {previousHash}</span>
      <div className={styles.headingContainer}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.blockID}>Block ID # {id}</h3>
      </div>
      <div className={styles.blockData}>
        <span>
          <span className={styles.blockDataLabel}>Block data:</span>
          <span className={styles.blockDateLabel}>Creation date:{date}</span>
        </span>
        <p>{blockData}</p>
      </div>

      <div className={styles.footerContainer}>
        <span className={styles.difficultyLabel}>Current difficulty: {difficulty}</span>
        <span className={styles.nonceLabel}>Block Nonce: {nonce}</span>
      </div>
      <span className={styles.currentHash}>Current Hash: {currentHash}</span>
    </div>
  )
}
