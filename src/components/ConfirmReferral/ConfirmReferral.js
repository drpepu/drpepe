import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import styles from './ConfirmReferral.module.css';
import { db } from '../../firebase'; // Import Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions

const ConfirmReferral = () => {
  const [referrer, setReferrer] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State to track referral confirmation success
  const location = useLocation();
  const { publicKey, signMessage, connected } = useWallet(); // useWallet hook for Solana wallet

  // Capture the referrer from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referrerParam = params.get('referrer');
    if (referrerParam) {
      setReferrer(referrerParam);
    }
  }, [location]);

  const signAndSubmitReferral = async () => {
    if (!publicKey) {
      setError('Please connect your wallet first.');
      return;
    }

    if (!referrer) {
      setError('No referrer found in the URL.');
      return;
    }

    try {
      const message = 'Please sign this message to confirm your referral.';
      const encodedMessage = new TextEncoder().encode(message);

      // Sign the message using the wallet
      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);
      const userPublicKey = publicKey.toBase58();
      const referrerPublicKey = referrer;

      // Log values for debugging
      console.log('User Public Key:', userPublicKey);
      console.log('Referrer Public Key:', referrerPublicKey);
      console.log('Signature:', signature);

      // Send the data to Firestore
      try {
        await addDoc(collection(db, 'referrals_two'), {
          userPublicKey,
          referrerPublicKey,
          signature,
          timestamp: serverTimestamp(), // Add a timestamp for when the referral is stored
        });
        setSuccess(true); // Mark the referral as successful
      } catch (dbError) {
        console.error('Error storing referral data:', dbError);
        setError('Failed to store referral data.');
      }
    } catch (error) {
      console.error('Error during referral process:', error);
      setError('An error occurred during the referral process.');
    }
  };

  // If there's no referrer in the URL, don't render the component
  if (!referrer) {
    return null; // Or you can return a message like: <p>No referral link detected.</p>
  }

  return (
<div className={styles.confirmReferral_main_container}>
 
  
{referrer && (
    <p>
      <span style={{ fontWeight: 'bold' }}>Referred by:</span> {referrer}
    </p>
  )}{error && <p style={{ color: 'red' }}>{error}</p>}
  
  {connected ? (
    <>
  <p>
        <span style={{ fontWeight: 'bold' }}>Connected as:</span> {publicKey.toBase58()}
      </p>      {!success ? (
        <button className={styles.btn_confirm} onClick={signAndSubmitReferral}>
          CONFIRM REFERRAL
        </button>
      ) : (
        <p className={styles.success_confirmed}>REFERRAL CONFIRMED!</p>
      )}
    </>
  ) : (
    <p style={{ fontWeight: 'bold' }}>
      Connect your Solana wallet to confirm the referral.
    </p>
    
  )}
   {success && (
    <p style={{ fontWeight: 'bold' }} >
      WAGMI, fren! You've been officially shilled and referred to the Dr. Pepe AI fam. LFG!
    </p>
  )}
</div>

  );
};

export default ConfirmReferral;
