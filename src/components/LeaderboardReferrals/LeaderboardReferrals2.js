import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import styles from './LeaderboardReferrals.module.css';
import patterns from '../../Patterns.module.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import LeaderboardReferralHeader from '../LeaderboardReferralHeader/LeaderboardReferralHeader';
import CumulativeReferralsGraph from '../../pages/ReferralGraph/ReferralsCumulative';
import DailyReferralsGraph from '../../pages/ReferralGraph/ReferralsDaily';
import ReferralNetwork2 from '../../pages/ReferralGraph/ReferralNetwork2'
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
  const [searchTerm, setSearchTerm] = useState(''); 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch referrals data
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const referralMap = new Map();
  
        // Build a referral map from the querySnapshot
        querySnapshot.forEach((doc) => {
          const { referrerPublicKey, referredPublicKey } = doc.data();
          if (!referralMap.has(referrerPublicKey)) {
            referralMap.set(referrerPublicKey, []);
          }
          referralMap.get(referrerPublicKey).push(referredPublicKey);
        });
  
        let leaderboardData = [];
        const addedUserIds = new Set();
  
        // Helper function to calculate points for Level 1 and Level 2 referrals
        const calculateMultiLevelPoints = (referrer) => {
          let level1Count = 0;
          let level2Count = 0;
          const level2ReferralsSet = new Set();
  
          const addPoints = (currentReferrer, level = 0) => {
            if (level > 1) return; 
  
            const referredList = referralMap.get(currentReferrer) || [];
  
            referredList.forEach((referredPublicKey) => {
              if (level === 0) {
                level1Count += 1; 
              } else if (level === 1 && !level2ReferralsSet.has(referredPublicKey)) {
                level2Count += 1; 
                level2ReferralsSet.add(referredPublicKey);
              }
  
              addPoints(referredPublicKey, level + 1);
            });
          };
  
          addPoints(referrer);
          return { level1Count, level2Count };
        };
  
        // Includes all unique referrers from both referralMap and social verifications
        const socialQuerySnapshot = await getDocs(collection(db, 'social_verifications'));
        socialQuerySnapshot.docs.forEach((doc) => {
          const cleanedPublicKey = sanitizePublicKey(doc.id);
          addedUserIds.add(cleanedPublicKey);
        });
  
        referralMap.forEach((_, referrerPublicKey) => {
          addedUserIds.add(referrerPublicKey);
        });
  
        // Process each unique referrer and calculate their points
        await Promise.all(
          Array.from(addedUserIds).map(async (publicKey) => {
            const cleanedPublicKey = sanitizePublicKey(publicKey);
  
            // Fetch verification status for social tasks
            const { telegramVerified, twitterVerified } = await fetchVerificationStatus(cleanedPublicKey);
  
            // Calculate multi-level points
            const { level1Count, level2Count } = calculateMultiLevelPoints(cleanedPublicKey);
            const referralPoints = level1Count + level2Count * 0.5; // Level 1: 1 point, Level 2: 0.5 points
  
            // Calculate total points including social verification points
            const totalPoints =
              referralPoints + (telegramVerified ? 10 : 0) + (twitterVerified ? 10 : 0);
  
            // Only include users with more than 0 points
            if (totalPoints > 0) {
              leaderboardData.push({
                referrerPublicKey: cleanedPublicKey,
                referralCount: level1Count + level2Count / 2, // Divide Level 2 count by 2 bc having issues with the sum
                points: totalPoints,
                telegramVerified,
                twitterVerified,
              });
            }
          })
        );
  
        // Sort leaderboard by points in descending order
        leaderboardData.sort((a, b) => b.points - a.points);
  
        setLeaderboard(leaderboardData);
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
      <ReferralNetwork2 />
      <DailyReferralsGraph />
      <CumulativeReferralsGraph />

      <Footer />
    </>
  );
};

export default LeaderboardReferrals2;
