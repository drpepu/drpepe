import React from 'react';
import styles from './ReferralLog.module.css';

const ReferralLog = () => {
  // Dummy data array
  const referralData = [
    { id: 1, reward: '10 SOL', signature: 'XYZ123', activeSince: '2023-01-15', referreeAccount: 'Account1', status: 'Active' },
    { id: 2, reward: '5 SOL', signature: 'ABC456', activeSince: '2023-02-20', referreeAccount: 'Account2', status: 'Inactive' },
    { id: 3, reward: '20 SOL', signature: 'DEF789', activeSince: '2023-03-10', referreeAccount: 'Account3', status: 'Active' }
  ];

  return (
    <div className={styles.referral_log_main_container}>
      <table className={styles.referral_table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Reward</th>
            <th>Signature</th>
            <th>Active Since</th>
            <th>Referree Account</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {referralData.map((referral, index) => (
            <tr key={referral.id}>
              <td>{index + 1}</td>
              <td>{referral.reward}</td>
              <td>{referral.signature}</td>
              <td>{referral.activeSince}</td>
              <td>{referral.referreeAccount}</td>
              <td>{referral.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralLog;
