import React from 'react';
import styles from './Tokenomics.module.css';
import drpepehi4 from '../../Assets/DRPEPEHI5_XMAS.svg';
import drpepehi4leftxmas from '../../Assets/DRPEPEHI5LEFT_XMAS.svg';
import solanalogotext from '../../Assets/SOLANALOGOTEXT.svg'

import { useTranslation } from 'react-i18next';


import { useCountdown } from './countdown.js';

function Tokenomics() {

  const { t } = useTranslation();

  const targetDate = new Date("Dec 25, 2024 15:00:00").getTime();
  
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className={styles.tokenomics_main_container}>

        <div className={styles.tokenomics_title}>{t('tokenomics_title')}</div>
        <div className={styles.tokenomics_main_info_box}>

            <div className={styles.tokenomics_info_box_main_container}>

              <div className={styles.tokenomics_info_box_container}>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_one_title')}</div>
                    <div className={styles.tokenomics_info_description}>BRYAN</div>
                  </div>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_two_title')}</div>
                    <img src={solanalogotext} alt='Solana Logo' className={styles.tokenomics_solana_logo}></img>


                  </div>
              </div>

              <div className={styles.tokenomics_info_box_container}>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_three_title')}</div>
                    <div className={styles.tokenomics_info_description}>BrYANThKaAbjZZH5XWLrw26NzMbfUNmBwbZiMe4Fj5Mk</div>
                  </div>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_four_title')}</div>
                    <div className={styles.tokenomics_info_description}>888,888,888,888,888</div>
                  </div>
              </div>

            </div>
        </div>

      <div className={styles.tokenomics_countdown_main_container}>
        <img src={drpepehi4} className={styles.tokenomics_pepe_image} alt="Tokenomics Pepe" />
        <img src={drpepehi4leftxmas} className={styles.tokenomics_pepe_image_mobile} alt="Tokenomics Pepe" />


      </div>
    </div>
  );
}

export default Tokenomics;
