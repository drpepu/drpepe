import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to track the current route
import styles from './FooterSimple.module.css';
import { useTranslation } from 'react-i18next';

function FooterSimple() {
  const { t } = useTranslation();
  const location = useLocation(); // Get the current route

  // Detect if the user is on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const openTelegramLink = () => {
    const mobileLink = 'tg://resolve?domain=drpepeai'; // Telegram mobile link
    const webLink = 'https://web.telegram.org/a/#-1002428485287'; // Telegram web link

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

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_buttons_container}>
        <a href="https://docs.drpepe.ai/" target="_blank" rel="noreferrer" className={`${styles.footer_button_one} ${styles.footer_button}`}>
          DOCS
        </a>

        {/* Apply styles conditionally based on active route */}
        <Link
          to="/agent"
          className={`${styles.footer_button_two} ${styles.footer_button} ${isActive('/agent') ? styles.active : ''}`}
        >
          ASK DRPEPE.AI
        </Link>

        <Link
          to="/referral-program"
          className={`${styles.footer_button_two} ${styles.footer_button} ${isActive('/referral-program') ? styles.active : ''}`}
        >
          FRENS
        </Link>
      </div>

      <div className={styles.footer_socials_container}>
        <div className={styles.footer_copywrite}>{t('footer_copyrights')}</div>
        <div>

        <button onClick={openXLink} className={styles.footer_social_button}>X</button>
        <button onClick={openTelegramLink} className={styles.footer_social_button}>TELEGRAM</button>
        </div>
      </div>
      <div className={styles.footer_copywrite_visible}>{t('footer_copyrights')}</div>

    </div>
  );
}

export default FooterSimple;
