import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AddLevel1AndPoints = () => {
  const [loading, setLoading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);

  const updateSchemaWithLevel1AndPoints = async () => {
    if (loading || processComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'referrals');
      const querySnapshot = await getDocs(collectionRef);

      // Process each document to calculate level1Referrals and totalPoints
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { referrerPublicKey, referredPublicKeys } = data;

        if (!referrerPublicKey) {
          console.warn(`Skipping document with no referrerPublicKey: ${docSnapshot.id}`);
          continue;
        }

        // Calculate level1Referrals
        const level1Referrals = (referredPublicKeys || []).length;

        // Set totalPoints equal to level1Referrals
        const totalPoints = level1Referrals;

        // Update the document with new fields
        const docRef = doc(db, 'referrals', referrerPublicKey);
        await updateDoc(docRef, {
          level1Referrals,
          totalPoints,
        });

        console.log(`Updated document for referrer: ${referrerPublicKey}`);
      }

      console.log('Schema update with level1Referrals and totalPoints complete.');
      setProcessComplete(true);
    } catch (error) {
      console.error('Error updating schema:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Level 1 Referrals and Total Points</h2>
      <p>
        This will calculate and add <strong>level1Referrals</strong> and{' '}
        <strong>totalPoints</strong> to each document in the "referrals" collection.
      </p>
      <button onClick={updateSchemaWithLevel1AndPoints} disabled={loading || processComplete}>
        {loading ? 'Processing...' : 'Add Level 1 and Points'}
      </button>
      {processComplete && <p>Level 1 referrals and total points have been added successfully!</p>}
    </div>
  );
};

export default AddLevel1AndPoints;
