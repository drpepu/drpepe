import React from 'react';
import styles from './Hero.module.css';
import Header from '../Header/Header';
import DrPepeVaccine from '../../Assets/DRPEPEVACCINE.svg';
import DrPepeFat from '../../Assets/DRPEPEFAT.svg';
import solanapill from '../../Assets/SOLANAPILL.svg';

import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();


  const scrollToEnd = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };


  const goToTelegram = () => {
    window.open('https://t.me/+yxh5qd2tKQU2ODIx', '_blank');
  };

  return (
    <>
      <Header />

      <div className={styles.hero_main_text_container}>
        <img src={DrPepeVaccine} alt='Dr Pepe' className={styles.hero_drpepe_image_one} />
        <div className={styles.hero_main_text_one_container}>
          <div className={styles.hero_main_text_one}>DR. PEPE’S</div>
        </div>
        <div className={styles.hero_main_text_two}>LONGEVITY</div>

        <div className={styles.hero_main_text_three_container}>
          <div className={styles.hero_main_text_three}>LAB </div>
          <img src={solanapill} alt='' className={styles.hero_solana_logo} />
        </div>
      </div>

      <div className={styles.hero_secondary_text_container}>
        <div className={styles.hero_secondary_text_one}>{t('hero_subtitle_line_one')}</div>
        <div className={styles.hero_secondary_text_two}>{t('hero_subtitle_line_two')}</div>

        <div className={styles.hero_buttons_container}>
          <button className={styles.hero_button_one}  onClick={goToTelegram}>
            {t('hero_button_one')}
          </button>
          <button className={styles.hero_button_two} onClick={scrollToEnd}>
            {t('hero_button_two')}
          </button>
        </div>

        <img src={DrPepeFat} alt='Dr Pepe' className={styles.hero_drpepe_image_two} />
      </div>
    </>
  );
}

export default Hero;
