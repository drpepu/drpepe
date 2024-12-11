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
  const [readCount, setReadCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch referrals data
        const referralSnapshot = await getDocs(collection(db, 'referrals'));
        setReadCount(prev => prev + 1); // Increment read count

        const leaderboardData = referralSnapshot.docs.map((doc) => {
          const data = doc.data();
          const telegramPoints = data.telegramId ? 10 : 0;
          const twitterPoints = data.twitterHandle ? 10 : 0;
          const totalPoints = (data.totalPoints || 0) + telegramPoints + twitterPoints;

          return {
            referrerPublicKey: data.referrerPublicKey,
            level1Referrals: data.level1Referrals || 0,
            level2Referrals: data.level2Referrals || 0,
            totalReferrals: data.totalReferrals || 0,
            totalPoints: totalPoints,
            telegramPoints: telegramPoints,
            twitterPoints: twitterPoints,
          };
        });

        // Sort leaderboard data by total points in descending order
        leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);

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
    setVisibleCount((prevCount) => prevCount + 25);
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter leaderboard based on search term
  const filteredLeaderboard = leaderboard.filter((referrer) =>
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
        <div className={patterns.searchBar_table_container}>
          <input
            type="text"
            placeholder="Search by Public Key"
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
                      <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('position')}>Position</th>
                      <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('referrerPublicKey')}>{t('leaderboard_fren_public_key')}</th>
                      <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('telegramPoints')}>Telegram Points</th>
                      <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('twitterPoints')}>Twitter Points</th>
                      <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('level1Referrals')}>Referrals Level 1</th>
                      <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('level2Referrals')}>Referrals Level 2</th>
                      <th className={styles.leaderboard_table_th} onClick={() => sortLeaderboard('totalPoints')}>Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardToShow.map((referrer, index) => (
                      <tr key={referrer.referrerPublicKey}>
                        <td className={styles.leaderboard_table_td}>{index + 1}</td>
                        <td className={styles.leaderboard_table_td}>{referrer.referrerPublicKey}</td>
                        <td className={styles.leaderboard_table_td}>{referrer.telegramPoints}</td>
                        <td className={styles.leaderboard_table_td}>{referrer.twitterPoints}</td>
                        <td className={styles.leaderboard_table_td}>{referrer.level1Referrals}</td>
                        <td className={styles.leaderboard_table_td}>{referrer.level2Referrals}</td>
                        <td className={styles.leaderboard_table_td}>{referrer.totalPoints}</td>
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
