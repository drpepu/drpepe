// src/components/Modal.js
import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <span className={styles.modal_close} onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
