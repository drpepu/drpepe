import React from 'react';
import styles from './Header.module.css'

function Header() {
  return (
    <div className={styles.header_container}>
        <div className={`${styles.header_button_one } ${styles.header_button}`}>DR PEPE</div>
        <div className={`${styles.header_button_two } ${styles.header_button}`}>NEWSLETTER</div>
        <div className={`${styles.header_button_three } ${styles.header_button}`}>CONTACT ME</div>
        <div className={`${styles.header_button_four } ${styles.header_button}`}>DOCS</div>
        <div className={`${styles.header_button_five } ${styles.header_button}`}>APP</div>
        <div className={`${styles.header_button_six } ${styles.header_button}`}>X</div>
        <div className={`${styles.header_button_seven } ${styles.header_button}`}>TELEGRAM</div>
        <div className={`${styles.header_button_eight } ${styles.header_button}`}>DRPEPEAI</div>
    </div>
  )
}

export default Header