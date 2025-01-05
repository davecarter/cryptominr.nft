import styles from "../styles/TopBar.module.css"
import React, { useState } from "react";
import { Modal } from "./Modal";
import { useDomain } from "./context";
import { useRouter } from 'next/router'

export const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteAllBlocks } = useDomain();
  const router = useRouter()

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };






  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    await deleteAllBlocks();
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
          <button className={styles.cta} onClick={() => router.push("/")} >Blockchain</button>
          <button className={styles.cta} onClick={() => router.push("/docs")} >Documentation</button>
          <button className={styles.cta} onClick={handleDeleteClick}>Delete blocks</button>
        </div>
      </nav>
      {isModalOpen && <Modal onClose={handleModalClose} onConfirm={handleConfirmDelete} />}
    </>
  )
}
