import React, { useEffect, useState } from 'react';
import styles from './referral_graph.module.css';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom tick component for the X Axis
const CustomAxisTick = ({ x, y, payload }) => {
  return (
    <text x={x} y={y} textAnchor="middle" fill="#f5f5f5" fontSize="14">
      {payload.value}
    </text>
  );
};




function ReferralGraphLineChart() {

  const [dailyReferrals, setDailyReferrals] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);

  useEffect(() => {
    // Set up a real-time listener for the referrals collection
    const unsubscribe = onSnapshot(collection(db, 'referrals_two'), (snapshot) => {


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


      // Convert dailyReferralsByDate to an array and sort by date
      const dailyDataArray = Object.keys(dailyReferralsByDate)
        .sort((a, b) => new Date(a) - new Date(b))
        .map(date => ({
          date,
          referrals: dailyReferralsByDate[date],
        }));
      setDailyReferrals(dailyDataArray);

      // Convert cumulativeReferralsByDate to an array and accumulate totals
      const cumulativeDataArray = [];
      let runningTotalReferrals = 0;
      let runningTotalReferrers = 0;
      Object.keys(cumulativeReferralsByDate)
        .sort((a, b) => new Date(a) - new Date(b))
        .forEach(date => {
          runningTotalReferrals += cumulativeReferralsByDate[date].referrals;
          runningTotalReferrers += cumulativeReferralsByDate[date].referrers.size;
          cumulativeDataArray.push({
            date,
            referrals: runningTotalReferrals,
            referrers: runningTotalReferrers,
          });
        });
      setCumulativeData(cumulativeDataArray);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
   
   <div className={styles.referral_graph_container}>
      <div className={styles.daily_referrals_container}>
        <div className={styles.referrals_graphs_title}>DAILY REFERRALS</div>

        <ResponsiveContainer width="100%" height={600}>
          <LineChart
            data={dailyReferrals}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={<CustomAxisTick />}  />
            <YAxis tick={<CustomAxisTick />}  />
            <Tooltip />
            <Line type="monotone" dataKey="referrals" stroke="#ADFF00" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.daily_referrals_container}>
        <div className={styles.referrals_graphs_title}>TOTAL REFERRALS & REFERRERS OVER TIME</div>
        <ResponsiveContainer width="100%" height={600}>
          <LineChart
            data={cumulativeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={<CustomAxisTick />}  />
            <YAxis tick={<CustomAxisTick />}  />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="referrals" stroke="#ADFF00" strokeWidth={2} name="Cumulative Referrals" />
            <Line type="monotone" dataKey="referrers" stroke="#4ed0e1" strokeWidth={2} name="Cumulative Referrers" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
    </>
  );
}

export default ReferralGraphLineChart;
