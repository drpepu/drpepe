import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from './LeaderboardReferrals.module.css';

const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 8)}...${key.slice(-8)}`;
};

const LeaderboardReferrals = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReferrals, setSelectedReferrals] = useState({}); // Stores the referrals of the selected user
  const [expandedUser, setExpandedUser] = useState(null); // Track which user row is expanded

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const referralData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Create a map to count the number of referrals per referrer
        const referralCountMap = referralData.reduce((acc, referral) => {
          const referrer = referral.referrerPublicKey;
          if (!acc[referrer]) {
            acc[referrer] = 0;
          }
          acc[referrer] += 1;
          return acc;
        }, {});

        // Convert the referral count map into an array and sort by the count
        const leaderboardData = Object.keys(referralCountMap).map(referrerPublicKey => ({
          referrerPublicKey,
          referralCount: referralCountMap[referrerPublicKey],
        })).sort((a, b) => b.referralCount - a.referralCount);

        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to fetch leaderboard data.');
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  // Fetch the referrals of the selected user
  const fetchUserReferrals = async (referrerPublicKey) => {
    if (expandedUser === referrerPublicKey) {
      // If already expanded, collapse the row
      setExpandedUser(null);
      setSelectedReferrals({});
    } else {
      try {
        const q = query(collection(db, 'referrals_two'), where('referrerPublicKey', '==', referrerPublicKey));
        const querySnapshot = await getDocs(q);
        const userReferrals = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSelectedReferrals({
          [referrerPublicKey]: userReferrals,
        });
        setExpandedUser(referrerPublicKey); // Set the expanded user
      } catch (err) {
        console.error('Error fetching user referrals:', err);
        setError('Failed to fetch user referrals.');
      }
    }
  };

  return (
    <div className={styles.leaderboard_main_container}>
      <div className={styles.leaderboard_container}>

        <div className={styles.leaderboard_title}>DR.PEPE AI REFERRAL PROGRAM LEADERBOARD </div>

        {loading && <p>Loading leaderboard...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && leaderboard.length > 0 && (
          <table className={styles.leaderboard_table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fren (Public Key)</th>
                <th>Referrals</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((referrer, index) => (
                <React.Fragment key={referrer.referrerPublicKey}>
                  <tr onClick={() => fetchUserReferrals(referrer.referrerPublicKey)} 
                  >
                    <td>{index + 1}</td>
                    <td>{truncatePublicKey(referrer.referrerPublicKey)}</td>
                    <td>{referrer.referralCount}</td>
                  </tr>

                  {/* Show the details of the selected user's referrals */}
                  {expandedUser === referrer.referrerPublicKey && selectedReferrals[referrer.referrerPublicKey] && (
                    <tr>
                      <td colSpan="3">
                        <table className={styles.sub_table}>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Invited Fren</th>
                              <th>Tx Hash</th>
                              <th>Invite Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedReferrals[referrer.referrerPublicKey].map((referral, i) => (
                              <tr key={referral.id}>
                                <td>{i + 1}</td>
                                <td>{truncatePublicKey(referral.userPublicKey)}</td>
                                <td>{truncatePublicKey(referral.signature)}</td>
                                <td>{new Date(referral.timestamp?.seconds * 1000).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {!loading && leaderboard.length === 0 && (
          <p>No referrals found. Invite your frens to climb the leaderboard!</p>
        )}
      </div>

    </div>
  );
};

export default LeaderboardReferrals;
