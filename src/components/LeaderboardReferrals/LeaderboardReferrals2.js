import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './LeaderboardReferrals.module.css';
import patterns from '../../Patterns.module.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import LeaderboardReferralHeader from '../LeaderboardReferralHeader/LeaderboardReferralHeader';
import BannerCountDown from '../BannerCountDown/BannerCountDown';

import Footer from '../Footer/Footer';


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
        setLoading(true); // Start loading
  
        // Fetch all referrals
        const referralSnapshot = await getDocs(collection(db, 'referrals_two'));
        const referralMap = new Map();
  
        referralSnapshot.forEach((doc) => {
          const { referrerPublicKey, referredPublicKey } = doc.data();
          if (!referralMap.has(referrerPublicKey)) {
            referralMap.set(referrerPublicKey, []);
          }
          referralMap.get(referrerPublicKey).push(referredPublicKey);
        });
  
        // Fetch all social verification statuses
        const verificationSnapshot = await getDocs(collection(db, 'social_verifications'));
        const verificationStatuses = {};
        verificationSnapshot.forEach((doc) => {
          const data = doc.data();
          verificationStatuses[doc.id] = {
            telegramVerified: data.telegramVerification?.verifiedStatus || false,
            twitterVerified: !!data.twitterHandle,
          };
        });
  
        // Process leaderboard data
        const leaderboardData = [];
        referralMap.forEach((referredList, referrerPublicKey) => {
          const { telegramVerified, twitterVerified } = verificationStatuses[referrerPublicKey] || {
            telegramVerified: false,
            twitterVerified: false,
          };
  
          const level1Count = referredList.length;
          const level2Count = referredList.reduce((count, referred) => {
            const subReferrals = referralMap.get(referred) || [];
            return count + subReferrals.length;
          }, 0);
  
          const referralPoints =
            level1Count + level2Count * 0.5 + (telegramVerified ? 10 : 0) + (twitterVerified ? 10 : 0);
  
          if (referralPoints > 0) {
            leaderboardData.push({
              referrerPublicKey,
              referralCount: level1Count + level2Count / 2,
              points: referralPoints,
              telegramVerified,
              twitterVerified,
            });
          }
        });
  
        // Sort leaderboard data
        leaderboardData.sort((a, b) => b.points - a.points);
  
        setLeaderboard(leaderboardData); 
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to fetch leaderboard data.');
      } finally {
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
      <BannerCountDown />
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
