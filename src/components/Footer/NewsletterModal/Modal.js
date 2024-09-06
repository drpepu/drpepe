// src/components/Modal.js
import React from 'react';
import styles from './Modal.module.css';
import pepemodal from '../../../Assets/DRPEPEFAT.svg'

const Modal = ({ message, onClose }) => {
  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <span className={styles.modal_close} onClick={onClose}>&times;</span>
        <img src={pepemodal}alt='PEPE SUCCES' className={styles.modal_image}></img>
        <p className={styles.modal_text}>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
