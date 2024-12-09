import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';

const FirebaseSchemaTransform = () => {
  const [loading, setLoading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);

  const transformSchema = async () => {
    if (loading || processComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'referrals'); // Target collection
      const querySnapshot = await getDocs(collectionRef);

      const referrerMap = new Map();

      // Group referrals by referrerPublicKey
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const { referrerPublicKey, referredPublicKey, timestamp } = data;

        if (!referrerPublicKey || !referredPublicKey || !timestamp) {
          console.warn(`Skipping invalid document with ID: ${docSnapshot.id}`);
          return;
        }

        if (!referrerMap.has(referrerPublicKey)) {
          referrerMap.set(referrerPublicKey, []);
        }

        referrerMap.get(referrerPublicKey).push({ referredPublicKey, timestamp });
      });

      // Delete old documents and write consolidated data
      for (const [referrerPublicKey, referredPublicKeys] of referrerMap.entries()) {
        const referrerDocRef = doc(collectionRef, referrerPublicKey);

        // Write consolidated document
        await setDoc(referrerDocRef, {
          referrerPublicKey,
          totalReferrals: referredPublicKeys.length,
          referredPublicKeys,
          lastUpdated: new Date().toISOString(),
        });

        console.log(`Transformed data for referrer: ${referrerPublicKey}`);
      }

      // Clean up unassociated documents
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { referrerPublicKey } = data;

        if (referrerMap.has(referrerPublicKey)) {
          continue; // Keep documents that are part of the transformation
        }

        // Delete dangling documents
        await deleteDoc(doc(db, 'referrals', docSnapshot.id));
        console.log(`Deleted unassociated document with ID: ${docSnapshot.id}`);
      }

      console.log('Schema transformation complete.');
      setProcessComplete(true);
    } catch (error) {
      console.error('Error transforming schema:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Transform Schema In-Place</h2>
      <p>
        This will consolidate all referredPublicKeys under their respective referrerPublicKey directly in the "referrals" collection.
      </p>
      <button onClick={transformSchema} disabled={loading || processComplete}>
        {loading ? 'Processing...' : 'Transform Schema'}
      </button>
      {processComplete && <p>Schema transformation is complete!</p>}
    </div>
  );
};

export default FirebaseSchemaTransform;
