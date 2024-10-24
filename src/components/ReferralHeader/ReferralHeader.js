import React from 'react';
import styles from './ReferralHeader.module.css';
import drpepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg';
import { useTranslation } from 'react-i18next';




function ReferralHeader() {

  const { t } = useTranslation();


  return (
    <>
    <div className={styles.referral_header_main_container}>
        <div className={styles.referral_header_container}>
            <img src={drpepeheadshot} alt='dr pepe headshot'className={styles.referral_drpepe_img} ></img>
            <div className={styles.referral_header_text_container}>
                <div className={styles.referral_header_text_one}>{t('referral_header_text_one')}</div>
                <div className={styles.referral_header_text_two} >{t('referral_header_text_two')}</div>
                <div className={styles.referral_header_text_three}>{t('referral_header_text_three')}</div>
            </div>
        </div>
    </div>
    </>
  );
}

export default ReferralHeader;
