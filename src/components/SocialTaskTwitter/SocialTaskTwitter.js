import React, { useState, useEffect, useRef } from 'react';
import { doc, setDoc, getDoc, serverTimestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { db } from '../../firebase';
import gsap from 'gsap';
import styles from './SocialTaskTwitter.module.css';
import checkmark_green from '../../Assets/CHECKMARK_ICON_GREEN.svg';
import checkmark_grey from '../../Assets/CHECKMARK_ICON_GREY.svg';

import { useTranslation } from 'react-i18next';

const SocialTaskTwitter = () => {
  const [twitterHandle, setTwitterHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [handleStatus, setHandleStatus] = useState('grey');
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef(null);
  const { publicKey } = useWallet();

  const { t } = useTranslation();

  useEffect(() => {
    if (publicKey) {
      setIsWalletConnected(true);
      fetchTwitterHandle();
    } else {
      setIsWalletConnected(false);
      setTwitterHandle('');
      setHandleStatus('grey');
    }
  }, [publicKey]);

  const fetchTwitterHandle = async () => {
    if (!publicKey) return;

    const userDocRef = doc(db, 'referrals', publicKey.toBase58());
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.twitterHandle) {
        setTwitterHandle(userData.twitterHandle);
        setHandleStatus('green'); // Set to green if handle exists
      }
    }
  };

  const validateTwitterHandle = (handle) => {
    const regex = /^[a-zA-Z0-9_]{1,15}$/; // Valid Twitter handle pattern
    return regex.test(handle);
  };

  const saveTwitterHandle = async () => {
    if (!publicKey || !twitterHandle) {
      console.error("Wallet not connected or Twitter handle is empty.");
      return;
    }

    if (!validateTwitterHandle(twitterHandle)) {
      setErrorMessage('Invalid X handle.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const referralsCollection = collection(db, 'referrals');
      const handleQuery = query(referralsCollection, where('twitterHandle', '==', twitterHandle));
      const querySnapshot = await getDocs(handleQuery);

      if (!querySnapshot.empty) {
        alert("This Twitter handle is already associated with another account.");
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, 'referrals', publicKey.toBase58());
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await setDoc(userDocRef, {
          twitterHandle,
          lastUpdated: serverTimestamp(),
        }, { merge: true });
      } else {
        await setDoc(userDocRef, {
          referrerPublicKey: publicKey.toBase58(),
          twitterHandle,
          totalReferrals: 0,
          level1Referrals: 0,
          level2Referrals: 0,
          totalPoints: 0,
          lastUpdated: serverTimestamp(),
        });
      }

      alert("Twitter handle saved successfully!");
      setHandleStatus('green');
    } catch (error) {
      console.error("Error saving Twitter handle:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      gsap.to(dropdownRef.current, { height: 0, duration: 0.5, ease: 'power3.inOut' });
    } else {
      gsap.to(dropdownRef.current, { height: 'auto', duration: 0.5, ease: 'power3.inOut' });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`${styles.SocialTaskTwitter_main_container} ${isDropdownOpen ? styles.active : ''}`}
      onClick={toggleDropdown} // Open/close dropdown on clicking anywhere
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.SocialTaskTwitter_visible_drop}>
        <div className={styles.SocialTaskTwitter_visible}>
          <div className={styles.SocialTaskTelegram_title}>FOLLOW DRPEPE.AI ON X</div>
          <div className={styles.SocialTaskTwitter_input_button}>
            <div className={styles.twitterInputWrapper}>
              <span className={styles.atSymbol}>@</span>
              <input
                type="text"
                placeholder="USERNAME"
                value={twitterHandle}
                onClick={(e) => e.stopPropagation()} // Prevent input clicks from toggling dropdown
                onChange={(e) => setTwitterHandle(e.target.value.trim().replace('@', ''))}
                className={styles.SocialTaskTwitter_input}
                disabled={!isWalletConnected || handleStatus === 'green'}
              />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); saveTwitterHandle(); }}
              disabled={loading || !publicKey || handleStatus === 'green'}
              className={styles.SocialTaskTwitter_button}
              style={{
                backgroundColor: publicKey && handleStatus !== 'green' ? 'var(--secondary-color)' : 'var(--tertiary-color-hover)',
                cursor: publicKey && handleStatus !== 'green' ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? 'SAVING...' : 'VERIFY X'}
            </button>

            {handleStatus === 'green' && (
              <img src={checkmark_green} alt="handle status" className={styles.checkmarkIcon} />
            )}
          </div>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          {twitterHandle && handleStatus === 'green' && (
            <div className={styles.SocialTaskTwitter_verified}>
              VERIFIED
            </div>
          )}
        </div>

        {/* Dropdown Instructions */}
        <div
          ref={dropdownRef}
          className={styles.SocialTaskTwitter_dropdown}
          style={{ height: 0, overflow: 'hidden' }}
        >
        <strong className={styles.SocialTaskTwitter_p}>
            {t('social_task_twitter_guide_description')}
        </strong>
            <ul className={styles.SocialTaskTwitter_ul}>
                 <li>{t('social_task_twitter_guide_description_text_1')}<strong><a className={styles.SocialTaskTwitter_link} href="https://x.com/drpepeai"   target="_blank" rel="noopener noreferrer">DrPepe.ai on X</a></strong> {t('social_task_twitter_guide_description_text_2')}.</li>            
            </ul>
        <strong className={styles.SocialTaskTwitter_p}>{t('social_task_twitter_guide_guide')}</strong>
            <ul className={styles.SocialTaskTwitter_ul}>
                <li className={styles.SocialTaskTwitter_li}>{t('social_task_twitter_step_1')}</li>
                <li className={styles.SocialTaskTwitter_li}>{t('social_task_twitter_step_2')}</li>
                <li className={styles.SocialTaskTwitter_li}>{t('social_task_twitter_step_3')}.</li>
                <li className={styles.SocialTaskTwitter_li}>{t('social_task_twitter_step_4')}</li> 
                <li className={styles.SocialTaskTwitter_li}>{t('social_task_twitter_step_5')}</li> 
            </ul>


        </div>
            <div className={styles.SocialTaskTwitter_read_instructions}>📖</div>
      </div>
    </div>
  );
};

export default SocialTaskTwitter;
