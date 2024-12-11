import React from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const FirebaseScanAndUpdateLevel2Referrals = ({ onComplete }) => {
  const updateLevel2Referrals = async () => {
    try {
      const collectionRef = collection(db, 'referrals');
      const querySnapshot = await getDocs(collectionRef);

      const referralsMap = new Map();
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        referralsMap.set(data.referrerPublicKey, data.referredPublicKeys || []);
      });

      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { referrerPublicKey, level1Referrals = 0, referredPublicKeys = [] } = data;

        let level2Referrals = 0;

        referredPublicKeys.forEach((referred) => {
          const subReferrals = referralsMap.get(referred.referredPublicKey) || [];
          level2Referrals += subReferrals.length;
        });

        const level2Points = level2Referrals / 2;
        const totalPoints = level1Referrals + level2Points;

        const docRef = doc(db, 'referrals', referrerPublicKey);
        await updateDoc(docRef, { level2Referrals, totalPoints });

        console.log(`Updated Level 2 referrals for: ${referrerPublicKey}`);
      }

      console.log('Level 2 referrals and points updated.');
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error updating Level 2 referrals:', error);
    }
  };

  // Automatically call `updateLevel2Referrals` on component mount
  React.useEffect(() => {
    updateLevel2Referrals();
  }, []);

  return null; // No UI for this component
};

export default FirebaseScanAndUpdateLevel2Referrals;
