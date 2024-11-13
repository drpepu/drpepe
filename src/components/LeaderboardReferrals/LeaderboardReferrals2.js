import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import styles from './LeaderboardReferrals.module.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import LeaderboardReferralHeader from '../LeaderboardReferralHeader/LeaderboardReferralHeader';
import Footer from '../Footer/Footer';

const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 8)}...${key.slice(-8)}`;
};

const LeaderboardReferrals = () => {
  const { t } = useTranslation();

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Firestore real-time listener for the 'referrals_two' collection
    const unsubscribe = onSnapshot(collection(db, 'referrals_two'), (querySnapshot) => {
      try {
        const referralData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const referralCountMap = referralData.reduce((acc, referral) => {
          const referrer = referral.referrerPublicKey;
          if (!acc[referrer]) {
            acc[referrer] = 0;
          }
          acc[referrer] += 1;
          return acc;
        }, {});

        const leaderboardData = Object.keys(referralCountMap).map(referrerPublicKey => ({
          referrerPublicKey,
          referralCount: referralCountMap[referrerPublicKey],
        })).sort((a, b) => b.referralCount - a.referralCount); // No limit on top 25

        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to fetch leaderboard data.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <LeaderboardReferralHeader />
      <div className={styles.leaderboard_main_container}>
        <div className={styles.leaderboard_container}>
          {loading && <p>{t('loading_leaderboard')}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && leaderboard.length > 0 && (
            <table className={styles.leaderboard_table}>
              <thead>
                <tr>
                  <th className={`${styles.leaderboard_table_th} ${styles.leaderboard_table_space}`}>Position</th>
                  <th className={styles.leaderboard_table_th}>{t('leaderboard_fren_public_key')}</th>
                  <th className={styles.leaderboard_table_th}>{t('leaderboard_referrals')}</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((referrer, index) => (
                  <tr key={referrer.referrerPublicKey}>
                    <td className={`${styles.leaderboard_table_td}`}>{index + 1}</td>
                    <td className={styles.leaderboard_table_td}>{truncatePublicKey(referrer.referrerPublicKey)}</td>
                    <td className={styles.leaderboard_table_td}>{referrer.referralCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaderboardReferrals;
