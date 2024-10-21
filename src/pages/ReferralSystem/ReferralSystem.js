
import React  from 'react';
import styles from './ReferralSystem.module.css';
import './WalletMultiButton.css'
import Header from '../../components/Header/Header';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import GenerateReferralLink from '../../components/GenerateReferralLink/GenerateReferralLink';
import ReferralLog from '../../components/ReferralLog/ReferralLog';
import Footer from '../../components/Footer/Footer';



function ReferralSystem() {


  return (
    <>
      <Header />
      <div className={styles.walletButton_container}>
        <WalletMultiButton className={styles.walletButton}/> 
      </div>
      <GenerateReferralLink />
      <ReferralLog />
      <Footer />

    </>
  );
}

export default ReferralSystem;
