// src/components/Modal.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Modal.module.css';
import pepemodal from '../../../Assets/DRPEPEVACCINEHEADSHOT.svg';
import peperx from '../../../Assets/DRPEPERX.svg';

import { useTranslation } from 'react-i18next';


const Modal = ({ message, onClose }) => {
  const { t } = useTranslation();
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
        <div className={styles.modal_image_container}>

                <img
                  src={peperx}
                  alt='PEPE SUCCESS'
                  className={styles.modal_image_rx}
                />
                    <img
                  src={pepemodal}
                  alt='PEPE SUCCESS'
                  className={styles.modal_image}
                />

        </div>

        <div  className={styles.modal_title}>{t('modal_newsletter_title')}</div>
        <div className={styles.modal_subtitle_one}>{t('modal_newsletter_subtitle')}</div>
        <div className={styles.modal_subtitle_two}>{t('modal_newsletter_text')}</div>
      </div>
    </div>
  );
};

export default Modal;
