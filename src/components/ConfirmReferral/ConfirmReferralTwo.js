import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import styles from './ConfirmReferral.module.css';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const ConfirmReferralTwo = () => {
  const { t } = useTranslation();

  const [referrer, setReferrer] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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
        const userDocRef = doc(db, 'referrals', referrer);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const referredList = userDocSnapshot.data().referredPublicKeys || [];
          if (referredList.some((referred) => referred.referredPublicKey === publicKey.toBase58())) {
            setAlreadyConfirmed(true);
          }
        }
      }
    };
    checkForExistingReferral();
  }, [publicKey, referrer]);

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
      const referredPublicKey = publicKey.toBase58();
  
      const referrerDocRef = doc(db, 'referrals', referrer);
  
      try {
        const referrerDocSnapshot = await getDoc(referrerDocRef);
  
        const currentTimestamp = new Date(); // Use the client-side timestamp instead of serverTimestamp()
  
        if (referrerDocSnapshot.exists()) {
          // Update Level 1 referral for the current referrer
          const referredList = referrerDocSnapshot.data().referredPublicKeys || [];
          if (!referredList.some((referred) => referred.referredPublicKey === referredPublicKey)) {
            await updateDoc(referrerDocRef, {
              referredPublicKeys: arrayUnion({ referredPublicKey, timestamp: currentTimestamp }),
              totalReferrals: (referrerDocSnapshot.data().totalReferrals || 0) + 1,
              level1Referrals: (referrerDocSnapshot.data().level1Referrals || 0) + 1,
              totalPoints: (referrerDocSnapshot.data().totalPoints || 0) + 1,
              lastUpdated: serverTimestamp(), // Keep serverTimestamp() here for the lastUpdated field
            });
  
            // Update Level 2 referrals for the grand referrer
            const grandReferrer = referrerDocSnapshot.data().referrerPublicKey;
            if (grandReferrer) {
              const grandReferrerDocRef = doc(db, 'referrals', grandReferrer);
              const grandReferrerDocSnapshot = await getDoc(grandReferrerDocRef);
  
              if (grandReferrerDocSnapshot.exists()) {
                await updateDoc(grandReferrerDocRef, {
                  level2Referrals: (grandReferrerDocSnapshot.data().level2Referrals || 0) + 1,
                  totalPoints: (grandReferrerDocSnapshot.data().totalPoints || 0) + 1 / 2,
                  lastUpdated: serverTimestamp(),
                });
              }
            }
          }
        } else {
          // Create a new document for the referrer
          await setDoc(referrerDocRef, {
            referrerPublicKey: referrer,
            referredPublicKeys: [{ referredPublicKey, timestamp: currentTimestamp }],
            totalReferrals: 1,
            level1Referrals: 1,
            totalPoints: 1,
            lastUpdated: serverTimestamp(),
          });
        }
  
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
    setIsVisible(false);
    navigate('/referral-program');
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

export default ConfirmReferralTwo;
