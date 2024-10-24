import React, { useState } from 'react';
import { addSubscriber } from '../../newsletter_service/getResponseService'; 
import styles from './Footer.module.css';
import Modal from './NewsletterModal/Modal'; 
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for routing

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); 

  const { t } = useTranslation();
  const location = useLocation(); // Get the current route

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const listId = 'jLWBb'; 
      await addSubscriber(listId, email); 
      setMessage('Successfully subscribed!');
      setShowModal(true); 
  
      setEmail('');
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
      setShowModal(true); 
    }
  };

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
      <div className={styles.footer_newsletter_container}>
        <div className={styles.footer_newsletter_text_container}>
          <div>{t('footer_title_line_one')}</div>
          <div>{t('footer_title_line_two')}</div>
        </div>

        <div className={styles.footer_newsletter_form_container}>
          <form className={styles.footer_newsletter_form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={t('footer_email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.footer_newsletter_input}
            />
            <button type="submit" className={styles.footer_newsletter_form_button}>{t('footer_email_button')}</button>
          </form>
        </div>
      </div>

      <div className={styles.footer_buttons_container}>
        <a href="https://docs.drpepe.ai/" target="_blank" rel="noreferrer" className={`${styles.footer_button_one} ${styles.footer_button}`}>DOCS</a>

        <Link 
          to="/agent" 
          className={`${styles.footer_button_two} ${styles.footer_button} ${isActive('/agent') ? styles.active : ''}`}
        >
          ASK DR.PEPE
        </Link>
        <Link 
          to="/referral-program" 
          className={`${styles.footer_button_three} ${styles.footer_button} ${isActive('/referral-program') ? styles.active : ''}`}
        >
         FRENS
        </Link>

      </div>

      <div className={styles.footer_socials_container}>
        <button onClick={openXLink} className={styles.footer_social_button}>X</button>
        <button onClick={openTelegramLink} className={styles.footer_social_button}>TELEGRAM</button>
      </div>

      <div className={styles.footer_copywrite}>{t('footer_copyrights')}</div>

      {showModal && (
        <Modal
          message={message}
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}

export default Footer;
