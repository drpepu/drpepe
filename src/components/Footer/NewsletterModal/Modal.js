// src/components/Modal.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Modal.module.css';
import pepemodal from '../../../Assets/DRPEPEFAT.svg';

const Modal = ({ message, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {

    gsap.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'elastic.out(1, 0.5)' 
      }
    );
  }, []);


  const handleClose = () => {

    gsap.to(modalRef.current, {
      scale: 0.8, 
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut', 
      onComplete: onClose, 
    });
  };

  return (
    <div className={styles.modal_overlay} onClick={handleClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <span className={styles.modal_close} onClick={handleClose}>
          &times;
        </span>
        <img
          src={pepemodal}
          alt='PEPE SUCCESS'
          className={styles.modal_image}
        />
        <p className={styles.modal_text}>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
