import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Header.module.css'
import pepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sideNavRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(sideNavRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
    } else {
      gsap.to(sideNavRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
    }
  }, [isOpen]);

  return (
    <>
      <div className={styles.header_container}>

          <div className={`${styles.header_button_one } ${styles.header_button}`}>DR PEPE</div>
          <div className={`${styles.header_button_four } ${styles.header_button}`}>DOCS</div>
          <div className={`${styles.header_button_five } ${styles.header_button}`}>APP</div>
          <div className={`${styles.header_button_eight } ${styles.header_button}`}>DRPEPEAI</div>
          <LanguageSwitcher />

          <div className={styles.header_container_mobile}>

              <div className={styles.header_container_headshot_title}>
                <img src={pepeheadshot} alt='dr pepe headshot'className={styles.mobile_pepe_headshot} ></img>
                <div className={styles.mobile_pepe_title}>DR. PEPE</div>
              </div>
       
            <div onClick={toggleMenu}>
                <svg className={styles.mobile_pepe_hamburger} width="40" height="23" viewBox="0 0 40 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="5" rx="2.5" fill="white"/>
                  <rect y="9" width="40" height="5" rx="2.5" fill="white"/>
                  <rect y="18" width="40" height="5" rx="2.5" fill="white"/>
                </svg>
            </div>


          </div>

          <div className={styles.header_sidenav} ref={sideNavRef}>
            <div className={styles.header_closeBtn} onClick={toggleMenu}>X</div>
            
            <div className={styles.header_linksPages}>
              <div className={styles.header_descriptionContent}>
                <p>NAVIGATION</p>
                <hr className={styles.hrClass}></hr>
              </div>
              <a href="/" className={`${styles.header_sideNavLink}`} onClick={toggleMenu}>Home</a>
              <a href="/docs" className={`${styles.header_sideNavLink}`} onClick={toggleMenu}>Docs</a>
              <a href="/app" className={`${styles.header_sideNavLink}`} onClick={toggleMenu}>App</a>
              <a href="/drpepeai" className={`${styles.header_sideNavLink}`} onClick={toggleMenu}>DRPEPEAI</a>
            </div>

            <div className={styles.header_linksPages}>
              <div className={styles.header_descriptionContent}>
                <p>LANGUAGE</p>
                <hr className={styles.hrClass}></hr>
              </div>
              <div className={styles.header_sideNavLink_content}>
                  <a href="/" className={`${styles.header_sideNavLink_small}`} onClick={toggleMenu}>ENGLISH</a>
                  <a href="/" className={`${styles.header_sideNavLink_small}`} onClick={toggleMenu}>中文</a>
                  <a href="/" className={`${styles.header_sideNavLink_small}`} onClick={toggleMenu}>중국어</a>
              </div>

            </div>

            <div className={styles.header_linksPages}>
              <div className={styles.header_descriptionContent}>
                <p>SOCIALS</p>
                <hr className={styles.hrClass}></hr>
              </div>
              <div className={styles.header_sideNavLink_content}>
                  <a href="/" className={`${styles.header_sideNavLink_small}`} onClick={toggleMenu}>X</a>
                  <a href="/" className={`${styles.header_sideNavLink_small}`} onClick={toggleMenu}>TELEGRAM</a>
              </div>

            </div>


          </div>


      </div>
    </>
  )
}

export default Header