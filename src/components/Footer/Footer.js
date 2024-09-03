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
      



      <div className={styles.footer_socials_container}>
          <div className={styles.footer_social_button}>X</div>
          <div className={styles.footer_social_button}>TELEGRAM</div>
      </div>


    </div>
  )
}

export default Footer