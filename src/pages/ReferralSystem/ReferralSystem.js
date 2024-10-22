import React from 'react';
import styles from './ReferralSystem.module.css';
import './WalletMultiButton.css';
import Header from '../../components/Header/Header';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import GenerateReferralLink from '../../components/GenerateReferralLink/GenerateReferralLink';
import ReferralLog from '../../components/ReferralLog/ReferralLog';
import Footer from '../../components/Footer/Footer';
import ConfirmReferral from '../../components/ConfirmReferral/ConfirmReferral';

function ReferralSystem() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleWalletClick = () => {
    if (isMobile) {
      window.location.href = 'https://phantom.app/ul/browse/';
    } else {
      document.querySelector('.wallet-adapter-button').click();
    }
  };

  return (
    <>
      <Header />
      <div className={styles.wallet_confirm_container}>
        <ConfirmReferral />
        <div className={styles.walletButton_container}>
          <WalletMultiButton className={styles.walletButton} onClick={handleWalletClick} /> 
        </div>
      </div>
      <GenerateReferralLink />
      <ReferralLog />
      <Footer />
    </>
  );
}

export default ReferralSystem;
