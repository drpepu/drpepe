import React, { useEffect, useState } from 'react';
import styles from './referral_graph.module.css';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomAxisTick = ({ x, y, payload }) => (
  <text x={x} y={y} textAnchor="middle" fill="#f5f5f5" fontSize="14">
    {payload.value}
  </text>
);

const DailyReferralsGraph = () => {
  const [dailyReferrals, setDailyReferrals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'referrals_two'),
          orderBy('timestamp', 'desc') // Order referrals by date
        );
        const snapshot = await getDocs(q);

        const dailyReferralsByDate = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.timestamp?.toDate().toLocaleDateString();

          if (date) {
            if (!dailyReferralsByDate[date]) {
              dailyReferralsByDate[date] = 0;
            }
            dailyReferralsByDate[date] += 1;
          }
        });

        const dailyDataArray = Object.keys(dailyReferralsByDate)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date) => ({
            date,
            referrals: dailyReferralsByDate[date],
          }));

        setDailyReferrals(dailyDataArray);
      } catch (error) {
        console.error('Error fetching daily referrals:', error);
      }
    };

    fetchData(); // Fetch data once on component mount
  }, []);

  return (
    <div className={styles.referrals_container}>
      <div className={styles.referrals_graphs_title}>DAILY REFERRALS</div>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={dailyReferrals} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={<CustomAxisTick />} />
          <YAxis tick={<CustomAxisTick />} />
          <Tooltip />
          <Line type="monotone" dataKey="referrals" stroke="#ADFF00" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyReferralsGraph;
