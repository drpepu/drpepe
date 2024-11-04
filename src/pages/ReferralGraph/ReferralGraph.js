import React from 'react';
import styles from './referral_graph.module.css';
import Header from '../../components/Header/Header';
import FooterSimple from '../../components/FooterSimple/FooterSimple';
import ReferralGraphLineChart from './ReferralGraphLineChart';
import ReferralGraphsHeader from '../../components/ReferralGraphsHeader/ReferralGraphsHeader';



function ReferralGraph() {




  return (
    <>
      <div className={styles.fixedHeader}>
        <Header /> 
      </div>
      <div className={styles.fixedReferralHeader}>
        <ReferralGraphsHeader /> 
      </div>
    
      <div className={styles.chartContainer}>
        <ReferralGraphLineChart />
      </div>
      <FooterSimple />
    </>
  );
}

export default ReferralGraph;
