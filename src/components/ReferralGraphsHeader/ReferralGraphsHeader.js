import React, { useEffect, useState } from 'react';
import styles from './ReferralGraphsHeader.module.css';
import drpepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function ReferralGraphsHeader() {
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [totalReferrers, setTotalReferrers] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Set up a real-time listener for the referrals collection
    const unsubscribe = onSnapshot(collection(db, 'referrals_two'), (snapshot) => {
      setTotalReferrals(snapshot.size);

      const uniqueReferrers = new Set();
      const dailyReferralsByDate = {};
      const cumulativeReferralsByDate = {};

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.referrerPublicKey) {
          uniqueReferrers.add(data.referrerPublicKey);
        }

        // Assuming `timestamp` field exists in each document and is a Firestore Timestamp
        const date = data.timestamp?.toDate().toLocaleDateString();
        if (date) {
          // Daily referrals count
          if (!dailyReferralsByDate[date]) {
            dailyReferralsByDate[date] = 0;
          }
          dailyReferralsByDate[date] += 1;

          // Cumulative referrals and referrers count
          if (!cumulativeReferralsByDate[date]) {
            cumulativeReferralsByDate[date] = { referrals: 0, referrers: new Set() };
          }
          cumulativeReferralsByDate[date].referrals += 1;
          cumulativeReferralsByDate[date].referrers.add(data.referrerPublicKey);
        }
      });

      setTotalReferrers(uniqueReferrers.size);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.referral_graph_referral_header_main_container}>
      <div className={styles.referral_graph_referral_header_container}>
        <img
          src={drpepeheadshot}
          alt='Dr. Pepe Headshot'
          className={styles.referral_graph_referral_drpepe_img}
        />
        <div className={styles.referral_graph_referral_header_text_container}>
          <div className={styles.referral_graph_referral_header_text_one}>
            {t('referralgraph_header_text_one')}
          </div>
          <div className={styles.referral_graph_referral_header_text_two}>{t('referralgraph_header_text_two')}
          </div>


          <div className={styles.referralheadermetric}>
            <div className={styles.referralheadermetric_text}>
              <span>Total Referrals:</span> {totalReferrals}
            </div>
            <div className={styles.referralheadermetric_text}>
              <span>Total Referrers:</span> {totalReferrers}
            </div>
          </div>
      


        </div>
      </div>
    </div>
  );
}

export default ReferralGraphsHeader;
