import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from './ReferralLog.module.css';
import { useTranslation } from 'react-i18next';


const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

const ReferralLog = () => {
  const { t } = useTranslation();

  const { publicKey } = useWallet();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const referralData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        referralData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        if (publicKey) {
          const filteredReferrals = referralData.filter(referral => referral.referrerPublicKey === publicKey.toBase58());
          setReferrals(filteredReferrals);
        } else {
          setReferrals([]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching referrals:', err);
        setError('Failed to fetch referral data.');
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [publicKey]);

  return (
    <div className={styles.referral_log_main_container}>
    {loading && <p>{t('loading_referrals')}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {!loading && !error && referrals.length === 0 && (
      !publicKey ? (
        <p style={{ fontWeight: 'bold', color: 'white' }}>
          {t('connect_wallet_view_log')}
        </p>
      ) : (
        <p style={{ fontWeight: 'bold', color: 'white' }}>
          {t('invite_frens_live_forever')}
        </p>
      )
    )}

    {!loading && referrals.length > 0 && (
      <table className={styles.referral_table}>
        <thead>
          <tr className={styles.referral_log_tr}>
            <th className={styles.referral_log_th}>#</th>
            <th className={styles.referral_log_th}>{t('invited_fren')}</th>
            <th className={styles.referral_log_th}>{t('inviting_fren')}</th>
            <th className={styles.referral_log_th}>{t('tx_hash')}</th>
            <th className={styles.referral_log_th}>{t('invite_date')}</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral, index) => (
            <tr className={styles.referral_log_tr} key={referral.id}>
              <td className={styles.referral_log_td}>{index + 1}</td>
              <td className={styles.referral_log_td}>{truncatePublicKey(referral.referredPublicKey)}</td>
              <td className={styles.referral_log_td}>{truncatePublicKey(referral.referrerPublicKey)}</td>
              <td className={styles.referral_log_td}>{truncatePublicKey(referral.signature)}</td>
              <td className={styles.referral_log_td}>{new Date(referral.timestamp?.seconds * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default ReferralLog;
