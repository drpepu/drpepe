import React from 'react';
import styles from './ReferralSystem.module.css';
import './WalletMultiButton.css';
import Header from '../../components/Header/Header';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import ReferralProgramDashboard from '../../components/ReferralProgramDashboard/ReferralProgramDashboard';
import GenerateReferralLink from '../../components/GenerateReferralLink/GenerateReferralLink';
import SocialTaskTelelegram from '../../components/SocialTaskTelegram/SocialTaskTelegram';
import SocialTaskTwitter from '../../components/SocialTaskTwitter/SocialTaskTwitter';
import FooterSimple from '../../components/FooterSimple/FooterSimple';
import ConfirmReferral from '../../components/ConfirmReferral/ConfirmReferral';
import ReferralHeader from '../../components/ReferralHeader/ReferralHeader';
import BannerCountDown from '../../components/BannerCountDown/BannerCountDown'
import { Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';



function ReferralSystem() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleWalletClick = () => {
    if (isMobile) {
      window.location.href = 'https://phantom.app/ul/browse/';
    } else {
      document.querySelector('.wallet-adapter-button').click();
    }
  };
  const { t } = useTranslation();


  return (
    <>
      <BannerCountDown />
      <Header />
      <ReferralHeader />
      <div className={styles.wallet_confirm_container}>
        <ConfirmReferral />
        <div className={styles.walletButton_container}>
          <WalletMultiButton className={styles.walletButton} onClick={handleWalletClick} /> 
        </div>
      </div>
      <ReferralProgramDashboard />
      <div className={styles.referralSystem_block_titles}>{t('referral_program_title')}</div>
      <GenerateReferralLink />
 
        <div className={styles.referralSystem_block_titles}>{t('social_task_title')}</div>
      <SocialTaskTelelegram />
      <SocialTaskTwitter />
      <div className={styles.leaderboard_cta_container}>
        <Link
            to="/leaderboard"
            className={styles.leaderboard_cta}
          >
          {t('leaderboard_CTA') } 
          </Link>
      </div>


      <FooterSimple />
    </>
  );
}

export default ReferralSystem;
