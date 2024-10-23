import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Add useNavigate for redirection
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import styles from './ConfirmReferral.module.css';
import { db } from '../../firebase';
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';


const ConfirmReferral = () => {

  const { t } = useTranslation();

  const [referrer, setReferrer] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // New state to control visibility
  const location = useLocation();
  const navigate = useNavigate();
  const { publicKey, signMessage, connected } = useWallet();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referrerParam = params.get('referrer');
    if (referrerParam) {
      setReferrer(referrerParam);
    }
  }, [location]);

  useEffect(() => {
    const checkForExistingReferral = async () => {
      if (publicKey) {
        const referralsRef = collection(db, 'referrals_two');
        const q = query(referralsRef, where('userPublicKey', '==', publicKey.toBase58()));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setAlreadyConfirmed(true);
        }
      }
    };
    checkForExistingReferral();
  }, [publicKey]);

  const signAndSubmitReferral = async () => {
    if (!publicKey) {
      setError('Please connect your wallet first.');
      return;
    }

    if (!referrer) {
      setError('No referrer found in the URL.');
      return;
    }

    if (referrer === publicKey.toBase58()) {
      setError('You cannot refer yourself.');
      return;
    }

    if (alreadyConfirmed) {
      setError('You have already confirmed this referral.');
      return;
    }

    try {
      const message = 'Please sign this message to confirm your referral.';
      const encodedMessage = new TextEncoder().encode(message);

      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);
      const userPublicKey = publicKey.toBase58();
      const referrerPublicKey = referrer;

      try {
        await addDoc(collection(db, 'referrals_two'), {
          userPublicKey,
          referrerPublicKey,
          signature,
          timestamp: serverTimestamp(),
        });
        setSuccess(true);
      } catch (dbError) {
        console.error('Error storing referral data:', dbError);
        setError('Failed to store referral data.');
      }
    } catch (error) {
      console.error('Error during referral process:', error);
      setError('An error occurred during the referral process.');
    }
  };

  const handleClose = () => {
    setIsVisible(false); // Hide the container
    navigate('/referral-program'); // Redirect to base URL
  };

  if (!referrer || !isVisible) {
    return null;
  }

  return (
    <div className={styles.confirmReferral_main_container}>
    <button className={styles.close_button} onClick={handleClose}>
      &times;
    </button>
    
    {referrer && (
      <p>
        <span style={{ fontWeight: 'bold' }}>{t('referred_by')}:</span> {referrer}
      </p>
    )}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {connected ? (
      <>
        <p style={{ fontWeight: 'bold' }}>{t('connected_as')}: {publicKey.toBase58()}</p>
        {alreadyConfirmed ? (
          <p style={{ color: 'orange', fontWeight: 'bold' }}>
            {t('already_confirmed')}
          </p>
        ) : !success ? (
          <button className={styles.btn_confirm} onClick={signAndSubmitReferral}>
            {t('confirm_referral')}
          </button>
        ) : (
          <p className={styles.success_confirmed}>{t('referral_confirmed')}</p>
        )}
      </>
    ) : (
      <p style={{ fontWeight: 'bold' }}>
        {t('connect_wallet')}
      </p>
    )}
    {success && (
      <p style={{ fontWeight: 'bold' }}>
        {t('wagmi_fren')}
      </p>
    )}
  </div>
  );
};

export default ConfirmReferral;
