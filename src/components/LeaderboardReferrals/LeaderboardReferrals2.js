import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import styles from './LeaderboardReferrals.module.css';
import patterns from '../../Patterns.module.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import LeaderboardReferralHeader from '../LeaderboardReferralHeader/LeaderboardReferralHeader';
import Footer from '../Footer/Footer';

const sanitizePublicKey = (key) => {
  if (!key) return '';
  return key.split('?')[0].replace(/[\/#]/g, '_'); // Sanitize public key to avoid Firestore issues
};

const fetchVerificationStatus = async (publicKey) => {
  const cleanedPublicKey = sanitizePublicKey(publicKey); // Use sanitized public key
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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState(''); // New state for search

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
          const cleanedReferrerPublicKey = sanitizePublicKey(referral.referrerPublicKey);
          if (!acc[cleanedReferrerPublicKey]) {
            acc[cleanedReferrerPublicKey] = 0;
          }
          acc[cleanedReferrerPublicKey] += 1;
          return acc;
        }, {});

        // Fetch all users who completed the social tasks
        const socialQuerySnapshot = await getDocs(collection(db, 'social_verifications'));
        const socialVerificationData = socialQuerySnapshot.docs.map(doc => ({
          referrerPublicKey: doc.id,
          ...doc.data(),
        }));

        // Use a Map to ensure unique public keys
        const uniqueUsersMap = new Map();

        // Process social verification data
        await Promise.all(
          socialVerificationData.map(async (socialUser) => {
            const cleanedPublicKey = sanitizePublicKey(socialUser.referrerPublicKey);

            if (!uniqueUsersMap.has(cleanedPublicKey)) {
              // Fetch verification status for social tasks
              const { telegramVerified, twitterVerified } = await fetchVerificationStatus(cleanedPublicKey);

              // Get referral count for this user (default to 0 if no referrals)
              const referralCount = referralCountMap[cleanedPublicKey] || 0;
              const points = referralCount + (telegramVerified ? 10 : 0) + (twitterVerified ? 10 : 0);

              uniqueUsersMap.set(cleanedPublicKey, {
                referrerPublicKey: cleanedPublicKey,
                referralCount,
                points,
                telegramVerified,
                twitterVerified,
              });
            }
          })
        );

        // Process referral data for users who haven't been added yet
        await Promise.all(
          Object.keys(referralCountMap).map(async (referrerPublicKey) => {
            const cleanedPublicKey = sanitizePublicKey(referrerPublicKey);

            if (!uniqueUsersMap.has(cleanedPublicKey)) {
              // Fetch verification status for this user
              const { telegramVerified, twitterVerified } = await fetchVerificationStatus(cleanedPublicKey);

              const referralCount = referralCountMap[referrerPublicKey];
              const points = referralCount + (telegramVerified ? 10 : 0) + (twitterVerified ? 10 : 0);

              uniqueUsersMap.set(cleanedPublicKey, {
                referrerPublicKey: cleanedPublicKey,
                referralCount,
                points,
                telegramVerified,
                twitterVerified,
              });
            }
          })
        );

        // Convert the Map values to an array and filter out users with 0 points
        const filteredLeaderboardData = Array.from(uniqueUsersMap.values()).filter(user => user.points > 0);

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

  // Sorting function
  const sortLeaderboard = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...leaderboard].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setLeaderboard(sortedData);
  };

  // Handle load more button click
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 25); // Load 25 more items
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter leaderboard based on search term
  const filteredLeaderboard = leaderboard.filter(referrer =>
    referrer.referrerPublicKey.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slice filtered leaderboard to show only up to visibleCount
  const leaderboardToShow = filteredLeaderboard.slice(0, visibleCount);

  return (
    <>
      <Header />
      <LeaderboardReferralHeader />
      <section className={styles.leaderboard_super_container}>


          <div  className={patterns.searchBar_table_container}>
                      <input
                        type="text"
                        placeholder= 'Search by Public Key'
                        value={searchTerm}
                        onChange={handleSearch}
                        className={patterns.searchBar_table}
                      />
                    
          </div>
          <div className={styles.leaderboard_main_container}>
            <div className={styles.leaderboard_container}>
              {loading && <p>{t('loading_leaderboard')}</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!loading && filteredLeaderboard.length > 0 && (
                <>
              
                  <table className={styles.leaderboard_table}>
                    <thead>
                      <tr>
                        <th className={`${styles.leaderboard_table_th} ${styles.leaderboard_table_space}`} onClick={() => sortLeaderboard('position')}>Position</th>
                        <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('referrerPublicKey')}>{t('leaderboard_fren_public_key')}</th>
                        <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('telegramVerified')}>Twitter Points</th>
                        <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('twitterVerified')}>Telegram Points</th>
                        <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('referralCount')}>{t('leaderboard_referrals')}</th>
                        <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('points')}>Total Points</th>
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
          {visibleCount < filteredLeaderboard.length && (
            <div className={patterns.loadmorebuttom_table_container}>
                <button className={patterns.loadmorebuttom_table} onClick={handleLoadMore}>
                  {t('leaderboard_load_more_bottom')}
                </button>
            </div>
          )}

      </section>
      <Footer />
    </>
  );
};

export default LeaderboardReferrals2;
