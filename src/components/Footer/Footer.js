import React from 'react';
import styles from './Footer.module.css'

function Footer() {
  return (
    <div className={styles.footer_container}>


      <div className={styles.footer_newsletter_container}>
            <div className={styles.footer_newsletter_text_container}>
                <div>STAY IN THE LOOP WITH</div>
                <div>DR. PEPE NEWSLETTER</div>
            </div>

            <div className={styles.footer_newsletter_form_container}>
                  <div className={styles.footer_newsletter_form}>Enter your email address</div>
                  <div className={styles.footer_newsletter_form_button}>SUBSCRIBE</div>
            </div>
      </div>

      <div className={styles.footer_buttons_container}>
          <div className={`${styles.footer_button_one } ${styles.footer_button}`}>DOCS</div>
          <div className={`${styles.footer_button_two } ${styles.footer_button}`}>APP</div>
          <div className={`${styles.footer_button_three } ${styles.footer_button}`}>DRPEPEAI</div>
          <div className={`${styles.footer_button_four } ${styles.footer_button}`}>EN</div>
      </div>
      
      <div className={styles.footer_socials_container}>
          <div className={styles.footer_social_button}>X</div>
          <div className={styles.footer_social_button}>TELEGRAM</div>
      </div>


    </div>
  )
}

export default Footer