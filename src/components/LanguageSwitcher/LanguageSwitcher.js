import React from 'react';
import styles from './LanguageSwitcher.module.css'
import { useTranslation } from 'react-i18next';


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.LanguageSwitcher_Container}>
      <div className={`${styles.LanguageSwitcher_button } ${styles.LanguageSwitcher}`} onClick={() => changeLanguage('english')}>English</div>
      <div className={`${styles.LanguageSwitcher_button } ${styles.LanguageSwitcher}`} onClick={() => changeLanguage('chinese')}>Chinese</div>
      <div className={`${styles.LanguageSwitcher_button } ${styles.LanguageSwitcher}`} onClick={() => changeLanguage('korean')}>Korean</div>
    </div>
  );
};

export default LanguageSwitcher;
