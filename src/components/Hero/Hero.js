import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import Header from '../Header/Header';
import DrPepeFat from '../../Assets/DRPEPEFAT.svg';
import solanapill from '../../Assets/SOLANAPILL.svg';

import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();

  const scrollToEnd = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.header_solana_container}>
        <Header />
        <img src={solanapill} alt='' className={`${styles.hero_solana_logo} `} />
      </div>

      <div className={styles.hero_main_text_container}>
        <div className={styles.hero_main_text_one_container}>
          <div className={styles.hero_main_text_one}>DrPepe.ai</div>
        </div>
      </div>

      <div className={styles.hero_secondary_text_container}>
        <div className={styles.hero_secondary_text_one}>{t('hero_subtitle_line_one')}</div>
        <div className={styles.hero_secondary_text_two}>{t('hero_subtitle_line_two')}</div>
        <img src={solanapill} alt='' className={`${styles.hero_solana_logo_mobile}`} />

        <div className={styles.hero_buttons_container}>
          {/* Using anchor tag for external link */}
          <a 
            href='https://web.telegram.org/a/#-1002428485287' 
            target='_blank' 
            rel='noopener noreferrer'
            className={styles.hero_button_one}
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            {t('hero_button_one')}
          </a>

          {/* Scroll to end action using Link for internal navigation */}
          <Link 
            to="#"
            onClick={scrollToEnd} 
            className={styles.hero_button_two} 
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            {t('hero_button_two')}
          </Link>

          {/* Referral program link */}
          <Link 
            to='/referral-program' 
            className={styles.hero_button_three} 
            style={{ textDecoration: 'none', textAlign: 'center' }}
            >
            {t('hero_button_three')}
          </Link>
        </div>

        <img src={DrPepeFat} alt='Dr Pepe' className={styles.hero_drpepe_image_two} />
      </div>
    </>
  );
}

export default Hero;
