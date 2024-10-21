import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from './ReferralLog.module.css';

const truncatePublicKey = (key) => {
  if (!key) return '';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

const ReferralLog = () => {
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
      {loading && <p>Loading referrals...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && referrals.length === 0 && (
  !publicKey ? (
    <p style={{ fontWeight: 'bold', color: 'white' }}>
      Connect your Wallet to see your referrals.
    </p>
  ) : (
    <p style={{ fontWeight: 'bold', color: 'white' }}>
      Invite your frens and live forever with Dr. Pepe AI.
    </p>
  )
)}

      {!loading && referrals.length > 0 && (
        <table className={styles.referral_table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Invited Fren</th>
              <th>Inviting Fren (me)</th>
              <th>Tx Hash</th>
              <th>Invite Date</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral, index) => (
              <tr key={referral.id}>
                <td>{index + 1}</td>
                <td>{truncatePublicKey(referral.userPublicKey)}</td>
                <td>{truncatePublicKey(referral.referrerPublicKey)}</td>
                <td>{truncatePublicKey(referral.signature)}</td>
                <td>{new Date(referral.timestamp?.seconds * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReferralLog;
