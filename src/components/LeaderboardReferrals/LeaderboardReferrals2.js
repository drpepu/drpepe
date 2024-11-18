import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import styles from './LeaderboardReferrals.module.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import LeaderboardReferralHeader from '../LeaderboardReferralHeader/LeaderboardReferralHeader';
import Footer from '../Footer/Footer';

const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 8)}...${key.slice(-8)}`;
};

const sanitizePublicKey = (key) => {
  if (!key) return '';
  return key.split('?')[0].replace(/[\/#]/g, '_'); // Sanitize public key to avoid Firestore issues
};

const fetchVerificationStatus = async (publicKey) => {
  const cleanedPublicKey = sanitizePublicKey(publicKey);  // Use sanitized public key

  const userDocRef = doc(db, 'social_verifications', cleanedPublicKey);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return {
      telegramVerified: userData.telegramVerification?.verifiedStatus || false,
      twitterVerified: userData.twitterHandle ? true : false,
    };
  }
  return { telegramVerified: false, twitterVerified: false };
};

const LeaderboardReferrals2 = () => {
  const { t } = useTranslation();

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch referrals data
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const referralData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Create referral count map
        const referralCountMap = referralData.reduce((acc, referral) => {
          const cleanedReferrerPublicKey = referral.referrerPublicKey.split('?')[0];
          if (!acc[cleanedReferrerPublicKey]) {
            acc[cleanedReferrerPublicKey] = 0;
          }
          acc[cleanedReferrerPublicKey] += 1;
          return acc;
        }, {});

        // Fetch all users who completed the social tasks (verify users even without referrals)
        const socialQuerySnapshot = await getDocs(collection(db, 'social_verifications'));
        const socialVerificationData = socialQuerySnapshot.docs.map(doc => ({
          referrerPublicKey: doc.id,
          ...doc.data(),
        }));

        // Create leaderboard data by merging both referral and social verification data
        const leaderboardData = await Promise.all([
          ...socialVerificationData.map(async (socialUser) => {
            const cleanedPublicKey = sanitizePublicKey(socialUser.referrerPublicKey);

            // Fetch verification status for social tasks
            const { telegramVerified, twitterVerified } = await fetchVerificationStatus(cleanedPublicKey);

            // Get referral count for this user (default to 0 if no referrals)
            const referralCount = referralCountMap[cleanedPublicKey] || 0;
            const points = referralCount + (telegramVerified ? 10 : 0) + (twitterVerified ? 10 : 0);

            return {
              referrerPublicKey: cleanedPublicKey,
              referralCount,
              points,
              telegramVerified,
              twitterVerified,
            };
          }),
          // Also include users with referrals but no social verification
          ...Object.keys(referralCountMap).map(async (referrerPublicKey) => {
            const cleanedPublicKey = sanitizePublicKey(referrerPublicKey);

            // Check if the referrer has completed social verification
            const { telegramVerified, twitterVerified } = await fetchVerificationStatus(cleanedPublicKey);

            const referralCount = referralCountMap[referrerPublicKey];
            const points = referralCount + (telegramVerified ? 10 : 0) + (twitterVerified ? 10 : 0);

            return {
              referrerPublicKey: cleanedPublicKey,
              referralCount,
              points,
              telegramVerified,
              twitterVerified,
            };
          }),
        ]);

        // Filter out users with 0 points (no social tasks completed and no referrals)
        const filteredLeaderboardData = leaderboardData.filter(user => user.points > 0);

        // Sort leaderboard by points (descending order)
        filteredLeaderboardData.sort((a, b) => b.points - a.points);

        setLeaderboard(filteredLeaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to fetch leaderboard data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle load more button click
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 25); // Load 25 more items
  };

  // Slice leaderboard to show only up to visibleCount
  const leaderboardToShow = leaderboard.slice(0, visibleCount);

  return (
    <>
      <Header />
      <LeaderboardReferralHeader />
      <div className={styles.leaderboard_main_container}>
        <div className={styles.leaderboard_container}>
          {loading && <p>{t('loading_leaderboard')}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && leaderboard.length > 0 && (
            <>
              <table className={styles.leaderboard_table}>
                <thead>
                  <tr>
                    <th className={`${styles.leaderboard_table_th} ${styles.leaderboard_table_space}`}>Position</th>
                    <th className={styles.leaderboard_table_th}>{t('leaderboard_fren_public_key')}</th>
                    <th className={styles.leaderboard_table_th}>Twitter Points</th>
                    <th className={styles.leaderboard_table_th}>Telegram Points</th>
                    <th className={styles.leaderboard_table_th}>{t('leaderboard_referrals')}</th>
                    <th className={styles.leaderboard_table_th}>Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardToShow.map((referrer, index) => (
                    <tr key={referrer.referrerPublicKey}>
                      <td className={styles.leaderboard_table_td}>{index + 1}</td>
                      <td className={styles.leaderboard_table_td}>{referrer.referrerPublicKey}</td>
                      <td className={styles.leaderboard_table_td}>{referrer.telegramVerified ? 10 : 0}</td>
                      <td className={styles.leaderboard_table_td}>{referrer.twitterVerified ? 10 : 0}</td>
                      <td className={styles.leaderboard_table_td}>{referrer.referralCount}</td>
                      <td className={styles.leaderboard_table_td}>{referrer.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
          {visibleCount < leaderboard.length && (
            <div className={styles.leaderboard_loadMoreButton_container}>
              <button className={styles.leaderboard_loadMoreButton} onClick={handleLoadMore}>
                {t('leaderboard_load_more_bottom')}
              </button>
            </div>
          )}
      <Footer />
    </>
  );
};

export default LeaderboardReferrals2;
