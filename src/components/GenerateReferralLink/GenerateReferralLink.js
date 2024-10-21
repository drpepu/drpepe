import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from './GenerateReferralLink.module.css';

const GenerateReferralLink = () => {
  const { publicKey } = useWallet();

  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (publicKey) {
      const baseUrl = 'https://www.drpepe.ai/referral-system';
      const link = `${baseUrl}?referrer=${publicKey.toString()}`;
      setReferralLink(link);
    }
  }, [publicKey]);

  return (
    <div className={styles.generateReferralLink_main_container}>
 
        <div className={styles.generateReferralLink_container}>

          <input type="text" value={referralLink} readOnly className={styles.generateReferralLink_input} />

          <button
          className={styles.generateReferralLink_button}
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              alert('Referral link copied to clipboard!');
            }}
          >
            COPY REFERRAL LINK
          </button>

        </div>
      
    </div>
  );
};

export default GenerateReferralLink;
