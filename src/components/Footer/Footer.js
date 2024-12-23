import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase configuration
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

    if (!email.trim()) {
      setMessage('Please enter a valid email.');
      setShowModal(true);
      return;
    }

    try {
      // Save email to Firestore
      await addDoc(collection(db, 'newsletter_emails'), {
        email: email.trim(),
        timestamp: serverTimestamp(),
      });
      setMessage('Successfully subscribed!');
      setShowModal(true); 
      setEmail(''); // Clear the input field
    } catch (error) {
      console.error('Error saving email to Firestore:', error);
      setMessage('Failed to subscribe. Please try again.');
      setShowModal(true); 
    }
  };

  // Detect if the user is on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const openTelegramLink = () => {
    const mobileLink = 'tg://resolve?domain=drpepeaiOFFICIAL'; 
    const webLink = 'https://web.telegram.org/a/#-1002428485287'; 

    if (isMobile) {
      window.location.href = mobileLink;
    } else {
      window.open(webLink, '_blank', 'noopener noreferrer');
    }
  };

  const openXLink = () => {
    const webLink = 'https://x.com/drpepeai'; 
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
            <button type="submit" className={styles.footer_newsletter_form_button}>
              {t('footer_email_button')}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.footer_buttons_container}>
        <a href="https://docs.drpepe.ai/" target="_blank" rel="noreferrer" className={`${styles.footer_button_one} ${styles.footer_button}`}>DOCS</a>

        <Link 
          to="/leaderboard" 
          className={`${styles.footer_button_two} ${styles.footer_button} ${isActive('/leaderboard') ? styles.active : ''}`}
        >
          LEADERBOARD
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
