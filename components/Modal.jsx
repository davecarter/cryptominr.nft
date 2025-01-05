import styles from '../styles/Modal.module.css';

export const Modal = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete all blocks? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.confirmButton}>Yes, Delete</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};