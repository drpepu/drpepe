import React from 'react';
import styles from './Header.module.css'
import pepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg'

function Header() {
  return (
    <>
      <div className={styles.header_container}>
          <div className={`${styles.header_button_one } ${styles.header_button}`}>DR PEPE</div>
          <div className={`${styles.header_button_four } ${styles.header_button}`}>DOCS</div>
          <div className={`${styles.header_button_five } ${styles.header_button}`}>APP</div>
          <div className={`${styles.header_button_eight } ${styles.header_button}`}>DRPEPEAI</div>
          <div className={`${styles.header_button_seven } ${styles.header_button}`}>EN</div>

          <div className={styles.header_container_mobile}>

            <div className={styles.header_container_headshot_title}>
              <img src={pepeheadshot} alt='dr pepe headshot'className={styles.mobile_pepe_headshot} ></img>
              <div className={styles.mobile_pepe_title}>DR PEPE</div>
            </div>
            <div>


          </div>
      </div>
            <svg className={styles.mobile_pepe_hamburger} width="40" height="23" viewBox="0 0 40 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="5" rx="2.5" fill="white"/>
              <rect y="9" width="40" height="5" rx="2.5" fill="white"/>
              <rect y="18" width="40" height="5" rx="2.5" fill="white"/>
              </svg>
            </div>
    </>
  )
}

export default Header