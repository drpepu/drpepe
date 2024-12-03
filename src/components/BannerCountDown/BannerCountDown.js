import React, { useEffect, useState } from 'react';
import styles from './BannerCountDown.module.css';
import { useTranslation } from 'react-i18next';
import { useCountdown } from '../Tokenomics/countdown';

function BannerCountDown() {
  const { t } = useTranslation();

  const targetDate = new Date("Dec 25, 2024 15:00:00").getTime();
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTitle((prev) => !prev); // Toggle between title and countdown
    }, 5000); // Switch every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={styles.banner_count_down_container}>
      <div className={styles.banner_count_down_main_content}>
        <div
          className={`${styles.banner_count_down_text} ${
            showTitle ? styles.visible : styles.hidden
          }`}
        >
          🌟$DRP {t('tokenomics_subtitle')}🌟
        </div>
        <div
          className={`${styles.banner_count_down_dates} ${
            showTitle ? styles.hidden : styles.visible
          }`}
          
        >
          🎄
          <div className={styles.banner_count_down_date_box}>
            <div className={styles.banner_count_down_date_box_text}>{t('tokenomics_days')}</div>
            <div className={styles.banner_count_down_date_box_number}>{days}</div>
          </div>
          <div className={styles.banner_count_down_date_box}>
            <div className={styles.banner_count_down_date_box_text}>{t('tokenomics_hours')}</div>
            <div className={styles.banner_count_down_date_box_number}>{hours}</div>
          </div>
          <div className={styles.banner_count_down_date_box}>
            <div className={styles.banner_count_down_date_box_text}>{t('tokenomics_minutes')}</div>
            <div className={styles.banner_count_down_date_box_number}>{minutes}</div>
          </div>
          <div className={styles.banner_count_down_date_box}>
            <div className={styles.banner_count_down_date_box_text}>{t('tokenomics_seconds')}</div>
            <div className={styles.banner_count_down_date_box_number}>{seconds}</div>
          </div>
          🎄
        </div>
      </div>
    </div>
  );
}

export default BannerCountDown;
