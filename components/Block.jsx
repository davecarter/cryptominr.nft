import { useState } from "react";
import styles from "../styles/Block.module.css";

export const Block = ({
  id,
  blockKey, // Cambié 'key' a 'blockKey' para evitar conflicto con la propiedad 'key' de React
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
  const [editableTitle, setEditableTitle] = useState(title || "");
  const [editableBlockData, setEditableBlockData] = useState(blockData || "");
  const [editableDate, setEditableDate] = useState(date || new Date().toISOString());

  const handleSave = () => {
    if (onSave) {
      // Se pasa el bloque editado a onSave
      onSave({
        id,
        title: editableTitle,
        blockData: editableBlockData,
        date: editableDate,
        previousHash,
        currentHash,
        nonce,
        difficulty,
      });
    }
  };

  return (
    <div className={styles.container} key={blockKey}> {/* Usar blockKey en lugar de key */}
      <span className={styles.previousHash}>Previous Hash: {previousHash}</span>
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
            />
            <input
              type="datetime-local"
              className={styles.dateInput}
              value={editableDate.slice(0, 19)} // Ajustar formato para el input
              onChange={(e) => setEditableDate(e.target.value)}
            />
          </>
        ) : (
          <>
            <span>
              <span className={styles.blockDataLabel}>Block data:</span>
              <span className={styles.blockDateLabel}>Creation date: {date}</span>
            </span>
            <p>{blockData}</p>
          </>
        )}
      </div>

      <div className={styles.footerContainer}>
        <span className={styles.difficultyLabel}>Current difficulty: {difficulty}</span>
        <span className={styles.nonceLabel}>Block Nonce: {nonce}</span>
      </div>
      <span className={styles.currentHash}>Current Hash: {currentHash}</span>

      {isEditMode && (
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      )}
    </div>
  );
};
