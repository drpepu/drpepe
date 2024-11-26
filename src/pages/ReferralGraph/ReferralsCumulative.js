import React, { useEffect, useState } from 'react';
import styles from './referral_graph.module.css';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomAxisTick = ({ x, y, payload }) => (
  <text x={x} y={y} textAnchor="middle" fill="#f5f5f5" fontSize="14">
    {payload.value}
  </text>
);

const CumulativeReferralsGraph = () => {
  const [cumulativeData, setCumulativeData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'referrals_two'), (snapshot) => {
      const dailyReferralsByDate = {};
      const cumulativeReferralsByDate = {};
      const globalUniqueReferrers = new Set(); // Global set to track all unique referrers

      snapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.timestamp?.toDate().toLocaleDateString();

        if (date) {
          if (!dailyReferralsByDate[date]) {
            dailyReferralsByDate[date] = { referrals: 0, uniqueReferrers: new Set() };
          }

          // Count daily referrals
          dailyReferralsByDate[date].referrals += 1;

          // Track unique referrers for the day
          if (data.referrerPublicKey) {
            dailyReferralsByDate[date].uniqueReferrers.add(data.referrerPublicKey);
          }
        }
      });

      // Convert data into a cumulative dataset
      const cumulativeDataArray = [];
      let runningTotalReferrals = 0;

      Object.keys(dailyReferralsByDate)
        .sort((a, b) => new Date(a) - new Date(b))
        .forEach((date) => {
          const dailyUniqueReferrers = dailyReferralsByDate[date].uniqueReferrers;

          // Add daily unique referrers to the global set
          dailyUniqueReferrers.forEach((referrer) => globalUniqueReferrers.add(referrer));

          // Update cumulative totals
          runningTotalReferrals += dailyReferralsByDate[date].referrals;

          cumulativeDataArray.push({
            date,
            referrals: runningTotalReferrals,
            referrers: globalUniqueReferrers.size, // Total unique referrers up to this date
          });
        });

      setCumulativeData(cumulativeDataArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.referrals_container}>
      <div className={styles.referrals_graphs_title}>TOTAL NEW REFERRALS & NEW REFERRERS OVER TIME</div>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={cumulativeData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={<CustomAxisTick />} />
          <YAxis tick={<CustomAxisTick />} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="referrals"
            stroke="#ADFF00"
            strokeWidth={2}
            name="Cumulative Referrals"
          />
          <Line
            type="monotone"
            dataKey="referrers"
            stroke="#4ed0e1"
            strokeWidth={2}
            name="Cumulative Referrers"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CumulativeReferralsGraph;
