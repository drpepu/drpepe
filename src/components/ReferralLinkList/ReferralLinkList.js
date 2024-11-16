import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs } from 'firebase/firestore';
import styles from './ReferralLinksList.module.css';

const ReferralLinksList = () => {
  const [referralData, setReferralData] = useState([]);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id, // Include the document ID for uniqueness
          ...doc.data(), // Spread the document data
        }));
        setReferralData(data);
      } catch (err) {
        console.error('Error fetching referral data:', err);
      }
    };

    fetchReferralData();
  }, []);

  return (
    <div className={styles.referralLinksList_main_container}>
      <h2>All Referral Data (JSON Format)</h2>
      <pre className={styles.jsonContainer}>
        {JSON.stringify(referralData, null, 2)}
      </pre>
    </div>
  );
};

export default ReferralLinksList;
