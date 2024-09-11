
import React, { useState } from 'react';
import { addSubscriber } from '../../newsletter_service/getResponseService'; 
import styles from './Footer.module.css';
import Modal from './NewsletterModal/Modal'; 

import { useTranslation } from 'react-i18next';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); 

  const { t } = useTranslation();

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
        <div className={`${styles.footer_button_one} ${styles.footer_button}`}>DOCS</div>
        <div className={`${styles.footer_button_two} ${styles.footer_button}`}>APP</div>
        <div className={`${styles.footer_button_three} ${styles.footer_button}`}>DRPEPEAI</div>
      </div>

      <div className={styles.footer_socials_container}>
        <a href="https://x.com/drpepeai" target="_blank" rel="noopener noreferrer"  className={styles.footer_social_button}>X</a>
        <a href="https://t.me/+yxh5qd2tKQU2ODIx" target="_blank" rel="noopener noreferrer" className={styles.footer_social_button}>TELEGRAM</a>
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
