import React from 'react';
import styles from './referral_graph.module.css';
import Header from '../../components/Header/Header';
import FooterSimple from '../../components/FooterSimple/FooterSimple';
import ReferralGraphsHeader from '../../components/ReferralGraphsHeader/ReferralGraphsHeader';
import ReferralLinksList from '../../components/ReferralLinkList/ReferralLinkList';
import FirebaseDuplicateCollection from '../../components/FirebaseLab/FirebaseDuplicateCollection';
import FirebaseDeleteReservedCharacters from '../../components/FirebaseLab/FirebaseDeleteReservedCharacters';
import FirebaseSchemaTransform from '../../components/FirebaseLab/FirebaseSchemaTransform';
import FirebaseSchemaCleanUp from '../../components/FirebaseLab/FirebaseSchemaCleanUp';
import FirebaseUpdateDocumentIDs from '../../components/FirebaseLab/FirebaseUpdateDocumentId';
import FirebaseAddLevel1AndPoints from '../../components/FirebaseLab/FirebaseAddLevel1AndPoints';
import FirebaseAddLevel2Points from '../../components/FirebaseLab/FirebaseAddLevel2Points'




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
        <ReferralLinksList />
        {/* 
        
        <DailyReferralsGraph />
        <CumulativeReferralsGraph />
        <ReferralNetwork2 />
        
        */}
 
      </div>
      <FooterSimple />
    </>
  );
}

export default ReferralGraph;
