import React from 'react';
import styles from './Tokenomics.module.css';
import drpepehi4 from '../../Assets/DRPEPEHI4.svg';
import drpepehi4left from '../../Assets/DRPEPEHI4LEFT.svg';
import solanalogotext from '../../Assets/SOLANALOGOTEXT.svg'

import { useTranslation } from 'react-i18next';


import { useCountdown } from './countdown.js';

function Tokenomics() {

  const { t } = useTranslation();
  // Set the target date for the countdown.
const targetDate = new Date("Jan 31, 2025 00:00:00").getTime();

  // Use the countdown hook to get the time left
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className={styles.tokenomics_main_container}>

        <div className={styles.tokenomics_title}>{t('tokenomics_title')}</div>
        <div className={styles.tokenomics_main_info_box}>

            <div className={styles.tokenomics_info_box_main_container}>

              <div className={styles.tokenomics_info_box_container}>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_one_title')}</div>
                    <div className={styles.tokenomics_info_description}>DRP</div>
                  </div>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_two_title')}</div>
                    <img src={solanalogotext} alt='Solana Logo' className={styles.tokenomics_solana_logo}></img>


                  </div>
              </div>

              <div className={styles.tokenomics_info_box_container}>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_three_title')}</div>
                    <div className={styles.tokenomics_info_description}>COMING SOON</div>
                  </div>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>{t('tokenomics_info_four_title')}</div>
                    <div className={styles.tokenomics_info_description}>1.000.000.000.000</div>
                  </div>
              </div>

            </div>
        </div>

      <div className={styles.tokenomics_countdown_main_container}>
        <img src={drpepehi4} className={styles.tokenomics_pepe_image} alt="Tokenomics Pepe" />
        <img src={drpepehi4left} className={styles.tokenomics_pepe_image_mobile} alt="Tokenomics Pepe" />
        <div className={styles.tokenomics_tge_title_mobile}>{t('tokenomics_subtitle')}</div>
        <div className={styles.tokenomics_main_countdown_container}>
          <div className={styles.tokenomics_tge_title}>{t('tokenomics_subtitle')}</div>
           
           
            <div className={styles.tokenomics_container_countdown}>
              <div className={styles.tokenomics_date_box}>
                <div className={styles.tokenomics_date_box_text}>{t('tokenomics_days')}</div>
                <div className={styles.tokenomics_date_box_number}>{days}</div>
              </div>

              <div className={styles.tokenomics_date_box}>
                <div className={styles.tokenomics_date_box_text}>{t('tokenomics_hours')}</div>
                <div className={styles.tokenomics_date_box_number}>{hours}</div>
              </div>

              <div className={styles.tokenomics_date_box}>
                <div className={styles.tokenomics_date_box_text}>{t('tokenomics_minutes')}</div>
                <div className={styles.tokenomics_date_box_number}>{minutes}</div>
              </div>

              <div className={styles.tokenomics_date_box}>
                <div className={styles.tokenomics_date_box_text}>{t('tokenomics_seconds')}</div>
                <div className={styles.tokenomics_date_box_number}>{seconds}</div>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default Tokenomics;
