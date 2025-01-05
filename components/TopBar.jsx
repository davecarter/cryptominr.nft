import styles from "../styles/TopBar.module.css"
import React, { useState } from "react";
import { Modal } from "./Modal";

export const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    console.log("Blocks deleted!");
  };

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <img src="/images/cryptominr-logo.png" alt="CryptoMinr Logo" width={50} />
          <h1>CryptoMinr.nft</h1>
          <h3>A simple blockchain simulation tool</h3>
        </div>
        <div className={styles.buttons}>
          <button className={styles.cta}>Documentation</button>
          <button className={styles.cta} onClick={handleDeleteClick}>Delete blocks</button>
        </div>
      </nav>
      {isModalOpen && <Modal onClose={handleModalClose} onConfirm={handleConfirmDelete} />}
    </>
  )
}
