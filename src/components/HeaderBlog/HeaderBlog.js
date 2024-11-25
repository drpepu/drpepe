import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HeaderBlog.module.css';
import pepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function HeaderBlog() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('english');
  const [activeLink, setActiveLink] = useState('home'); // State to track active link
  const sideNavRef = useRef(null);
  const location = useLocation(); // Get the current route


  const toggleMenu = (link) => {
    setIsOpen(!isOpen);
    if (link) setActiveLink(link);
  };

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };

  const openTelegramLink = () => {
    const mobileLink = 'tg://resolve?domain=drpepeaiOFFICIAL'; 
    const webLink = 'https://web.telegram.org/a/#-1002428485287'; 

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = mobileLink;
    } else {
      window.open(webLink, '_blank', 'noopener noreferrer');
    }
  };

  const openXLink = () => {
    const webLink = 'https://x.com/drpepeai'; // X web link
    window.open(webLink, '_blank', 'noopener noreferrer');
  };

  const { t } = useTranslation();

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
      <Link
          to="/"
          className={`${styles.header_button_one} ${styles.header_button} ${
            location.pathname === '/' ? styles.activeButton : ''
          }`}
          >
         DRPEPE.AI
        </Link>

       
    

        <Link
          to="/referral-program"
          className={`${styles.header_button_five} ${styles.header_button} ${
            location.pathname === '/referral-program' ? styles.activeButton : ''
          }`}
          >
          FRENS
        </Link>
        <a href="https://docs.drpepe.ai/" target="_blank" rel="noreferrer" className={`${styles.header_button_four} ${styles.header_button}`}>
          DOCS
        </a>

        <LanguageSwitcher />

        <div className={styles.header_container_mobile}>

          <Link className={styles.header_link} to="/">
            <div className={styles.header_container_headshot_title}>
             
             
              <img src={pepeheadshot} alt="dr pepe headshot" className={styles.mobile_pepe_headshot} />

              
              <div className={styles.header_title_imm_container}>
                <div className={styles.mobile_pepe_title}>DrPepe.ai</div>
                <span className={styles.header_dark_subText}>Blog</span>
              </div>
            </div>
          </Link>

       

          <div onClick={() => toggleMenu()}>
            <svg className={styles.mobile_pepe_hamburger} width="40" height="23" viewBox="0 0 40 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="5" rx="2.5" fill="white" />
              <rect y="9" width="40" height="5" rx="2.5" fill="white" />
              <rect y="18" width="40" height="5" rx="2.5" fill="white" />
            </svg>
          </div>

        </div>

        <div className={styles.header_sidenav} ref={sideNavRef}>
          <div className={styles.header_closeBtn} onClick={() => toggleMenu()}>X</div>

          <div className={styles.header_linksPages}>
            <div className={styles.header_descriptionContent}>
              <p>{t('side_navigation_title_one')}</p>
              <hr className={styles.hrClass} />
            </div>

            <Link
              to="/"
              className={`${styles.header_sideNavLink} ${location.pathname === '/' ? styles.active : ''}`}
              onClick={() => toggleMenu()}
            >
              Home
            </Link>

            <a href="https://docs.drpepe.ai/" target="_blank" rel="noreferrer" className={`${styles.header_sideNavLink} `} onClick={() => toggleMenu('docs')}>
              Docs
            </a>

       

            <Link
              to="/referral-program"
              className={`${styles.header_sideNavLink} ${location.pathname === '/referral-program' ? styles.active : ''}`}
              onClick={() => toggleMenu('referral-program')}
            >
              Frens
            </Link>
            <Link
              to="/immortality"
              className={`${styles.header_sideNavLink} ${location.pathname === '/immortality' ? styles.active : ''}`}
              onClick={() => toggleMenu('immortality')}
            >
             Immortality
            </Link>



          </div>

          <div className={styles.header_linksPages}>
            <div className={styles.header_descriptionContent}>
              <p>{t('side_navigation_title_two')}</p>
              <hr className={styles.hrClass} />
            </div>
            <div className={styles.header_sideNavLink_content}>
              <button className={`${styles.header_sideNavLink_small} ${activeLanguage === 'english' ? styles.active : ''}`} onClick={() => { toggleMenu(); changeLanguage('english'); }}>
                ENGLISH
              </button>
              <button className={`${styles.header_sideNavLink_small} ${activeLanguage === 'chinese' ? styles.active : ''}`} onClick={() => { toggleMenu(); changeLanguage('chinese'); }}>
                中文
              </button>
              <button className={`${styles.header_sideNavLink_small} ${activeLanguage === 'korean' ? styles.active : ''}`} onClick={() => { toggleMenu(); changeLanguage('korean'); }}>
                한국어
              </button>
            </div>
          </div>

          <div className={styles.header_linksPages}>
            <div className={styles.header_descriptionContent}>
              <p>{t('side_navigation_title_three')}</p>
              <hr className={styles.hrClass} />
            </div>
            <div className={styles.header_sideNavLink_content}>
              <button onClick={openXLink} className={`${styles.header_sideNavLink_small}`}>
                X
              </button>
              <button onClick={openTelegramLink} className={`${styles.header_sideNavLink_small}`}>
                TELEGRAM
              </button>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default HeaderBlog;
