import React from 'react';
import styles from './Header.module.css'

function Header() {
  return (
    <div className={styles.header_container}>
        <div className={styles.header_button_one}>DR PEPE</div>
        <div className={styles.header_button_two}>NEWSLETTER</div>
        <div className={styles.header_button_three}>CONTACT ME</div>
    </div>
  )
}

export default Header