// src/components/Footer.js
import React, { useState } from 'react';
import { addSubscriber } from '../../newsletter_service/getResponseService'; // Adjust path if necessary
import styles from './Footer.module.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const listId = 'ZPUUe'; // Correct List Token
      await addSubscriber(listId, email); // Call addSubscriber with email only
      setMessage('Successfully subscribed!');

      // Reset the state after successful submission
      setEmail('');
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_newsletter_container}>
        <div className={styles.footer_newsletter_text_container}>
          <div>STAY IN THE LOOP WITH</div>
          <div>DR. PEPE NEWSLETTER</div>
        </div>

        <div className={styles.footer_newsletter_form_container}>
          <form className={styles.footer_newsletter_form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.footer_newsletter_input}
            />
            <button type="submit" className={styles.footer_newsletter_form_button}>SUBSCRIBE</button>
          </form>
        </div>
      </div>

      <div className={styles.footer_buttons_container}>
        <div className={`${styles.footer_button_one} ${styles.footer_button}`}>DOCS</div>
        <div className={`${styles.footer_button_two} ${styles.footer_button}`}>APP</div>
        <div className={`${styles.footer_button_three} ${styles.footer_button}`}>DRPEPEAI</div>
        <div className={`${styles.footer_button_four} ${styles.footer_button}`}>EN</div>
      </div>

      <div className={styles.footer_socials_container}>
        <div className={styles.footer_social_button}>X</div>
        <div className={styles.footer_social_button}>TELEGRAM</div>
      </div>

      <div className={styles.footer_copywrite}>© 2024 dr Pepe All rights reserved.</div>
    </div>
  );
}

export default Footer;
