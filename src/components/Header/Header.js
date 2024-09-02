import React from 'react';
import styles from './Header.module.css'

function Header() {
  return (
    <div className={styles.header_container}>
        <div className={`${styles.header_button_one } ${styles.header_button}`}>DR PEPE</div>
        <div className={`${styles.header_button_four } ${styles.header_button}`}>DOCS</div>
        <div className={`${styles.header_button_five } ${styles.header_button}`}>APP</div>
        <div className={`${styles.header_button_eight } ${styles.header_button}`}>DRPEPEAI</div>
        <div className={`${styles.header_button_seven } ${styles.header_button}`}>EN</div>
    </div>
  )
}

export default Header