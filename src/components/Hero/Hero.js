import React from 'react'
import styles from './Hero.module.css';
import Header from '../Header/Header';
import DrPepeVaccine from '../../Assets/DRPEPEVACCINE.svg';
import DrPepeFat from '../../Assets/DRPEPEFAT.svg';
import solanapill from '../../Assets/SOLANAPILL.svg';

import { useTranslation } from 'react-i18next';




function Hero() {
  const { t } = useTranslation();

  return (
    <>

    <Header />

    <div className={styles.hero_main_text_container}>
        <img src={DrPepeVaccine}alt='Dr Pepe' className={styles.hero_drpepe_image_one}></img>
        <div className={styles.hero_main_text_one_container}>
            <div className={styles.hero_main_text_one} >DR. PEPE’S</div>
        </div>
        <div className={styles.hero_main_text_two}>LONGEVITY</div>

        <div className={styles.hero_main_text_three_container} >
          <div className={styles.hero_main_text_three}>LAB </div>

      
          <img src={solanapill} alt=''className={styles.hero_solana_logo}></img>
      

        </div>

    </div>

    <div className={styles.hero_secondary_text_container}>
        <div className={styles.hero_secondary_text_one}>{t('hero_subtitle_line_one')}</div>
        <div className={styles.hero_secondary_text_two}>{t('hero_subtitle_line_two')}</div>

        <div className={styles.hero_buttons_container}>
          <div className={styles.hero_button_one}>{t('hero_button_one')}</div>
          <div className={styles.hero_button_two}>{t('hero_button_two')}</div>
        </div>


        <img src={DrPepeFat}alt='Dr Pepe' className={styles.hero_drpepe_image_two}></img>
    </div>

    </>
  )
}

export default Hero