import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import styles from './ReferralLog.module.css';

// Utility function to truncate strings
const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

const ReferralLog = () => {
  const [referrals, setReferrals] = useState([]); // State to store referrals
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch referral data from Firestore on component mount
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        // Get all documents from the 'referrals_two' collection
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const referralData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort the referral data by timestamp in descending order (most recent first)
        referralData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        setReferrals(referralData); // Store sorted data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching referrals:', err);
        setError('Failed to fetch referral data.');
        setLoading(false); // Stop loading on error
      }
    };

    fetchReferrals();
  }, []);

  // Render the component
  return (
    <div className={styles.referral_log_main_container}>
      {loading && <p>Loading referrals...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && referrals.length === 0 && (
        <p>No referrals found.</p>
      )}

      {!loading && referrals.length > 0 && (
        <table className={styles.referral_table}>
          <thead>
            <tr>
              <th>#</th>
              <th>User Public Key</th>
              <th>Referrer Public Key</th>
              <th>Signature</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral, index) => (
              <tr key={referral.id}>
                <td>{index + 1}</td>
                <td>{truncatePublicKey(referral.userPublicKey)}</td>
                <td>{truncatePublicKey(referral.referrerPublicKey)}</td>
                <td>{truncatePublicKey(referral.signature)}</td>
                <td>{new Date(referral.timestamp?.seconds * 1000).toLocaleString()}</td> {/* Convert Firestore timestamp */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReferralLog;
