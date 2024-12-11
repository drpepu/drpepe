import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AddLevel2AndPoints = () => {
  const [loading, setLoading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);

  const updateSchemaWithLevel2AndPoints = async () => {
    if (loading || processComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'referrals');
      const querySnapshot = await getDocs(collectionRef);

      // Create a mapping of referrerPublicKey to their referredPublicKeys
      const referralsMap = new Map();
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        referralsMap.set(data.referrerPublicKey, data.referredPublicKeys || []);
      });

      // Process each document to calculate level2Referrals and update totalPoints
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { referrerPublicKey, level1Referrals = 0, referredPublicKeys } = data;

        if (!referrerPublicKey) {
          console.warn(`Skipping document with no referrerPublicKey: ${docSnapshot.id}`);
          continue;
        }

        let level2Referrals = 0;

        // Calculate level2Referrals
        (referredPublicKeys || []).forEach((referred) => {
          const subReferrals = referralsMap.get(referred.referredPublicKey) || [];
          level2Referrals += subReferrals.length;
        });

        // Calculate points for level2Referrals (dividing total by 2)
        const level2Points = level2Referrals / 2;

        // Calculate totalPoints (level1Referrals + level2Points)
        const totalPoints = level1Referrals + level2Points;

        // Update the document with new fields
        const docRef = doc(db, 'referrals', referrerPublicKey);
        await updateDoc(docRef, {
          level2Referrals,
          totalPoints,
        });

        console.log(`Updated document for referrer: ${referrerPublicKey}`);
      }

      console.log('Schema update with level2Referrals and updated totalPoints complete.');
      setProcessComplete(true);
    } catch (error) {
      console.error('Error updating schema:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Level 2 Referrals and Update Points</h2>
      <p>
        This will calculate and add <strong>level2Referrals</strong>, divide Level 2 referrals by 2,
        and update <strong>totalPoints</strong> in the "referrals" collection.
      </p>
      <button onClick={updateSchemaWithLevel2AndPoints} disabled={loading || processComplete}>
        {loading ? 'Processing...' : 'Add Level 2 and Update Points'}
      </button>
      {processComplete && <p>Level 2 referrals and points have been updated successfully!</p>}
    </div>
  );
};

export default AddLevel2AndPoints;
