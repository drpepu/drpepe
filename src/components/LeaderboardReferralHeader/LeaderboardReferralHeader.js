import React from 'react';
import styles from './LeaderboardReferralHeader.module.css';
import drpepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg';
import { useTranslation } from 'react-i18next';




function LeaderboardReferralHeader() {

  const { t } = useTranslation();


  return (
    <>
    <div className={styles.leaderboard_referral_header_main_container}>
        <div className={styles.leaderboard_referral_header_container}>
            <img src={drpepeheadshot} alt='dr pepe headshot'className={styles.leaderboard_referral_drpepe_img} ></img>
            <div className={styles.leaderboard_referral_header_text_container}>
                <div className={styles.leaderboard_referral_header_text_one}>{t('leaderboard_referral_header_text_one')}</div>
                <div className={styles.leaderboard_referral_header_text_two} >{t('leaderboard_referral_header_text_two')}</div>
                <div className={styles.leaderboard_referral_header_text_three}>{t('leaderboard_referral_header_text_three')}</div>
            </div>
        </div>
    </div>
    </>
  );
}

export default LeaderboardReferralHeader;
