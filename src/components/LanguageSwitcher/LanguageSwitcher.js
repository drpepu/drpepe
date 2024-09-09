import React from 'react';
import styles from './LanguageSwitcher.module.css';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className={styles.LanguageSwitcher_Container}>
      <select
        className={styles.LanguageSwitcher}
        value={currentLanguage}
        onChange={changeLanguage}
      >
        <option className={styles.LanguageSwitcher_option}>EN</option>
        <option className={styles.LanguageSwitcher_option} value="chinese">中文</option>
        <option className={styles.LanguageSwitcher_option}value="korean">한국어</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
