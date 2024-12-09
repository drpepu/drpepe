import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const FirebaseDeleteReservedCharacters = () => {
  const [loading, setLoading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);

  const transformSchema = async () => {
    if (loading || processComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'referrals'); // Target collection
      const querySnapshot = await getDocs(collectionRef);

      const invalidDocuments = [];

      // Identify and delete invalid documents
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { referrerPublicKey } = data;

        // Check for reserved characters in the referrerPublicKey
        if (/[/#\[\].?]/.test(referrerPublicKey)) {
          console.warn(`Invalid referrerPublicKey detected: ${referrerPublicKey}`);
          invalidDocuments.push(docSnapshot.id);
        }
      }

      // Delete invalid documents
      for (const docId of invalidDocuments) {
        await deleteDoc(doc(db, 'referrals', docId));
        console.log(`Deleted document with ID: ${docId}`);
      }

      console.log('Invalid documents removed.');
      setProcessComplete(true);
    } catch (error) {
      console.error('Error processing schema:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Remove Invalid Referrers</h2>
      <p>
        This will identify and delete any documents in the "referrals" collection where
        the referrerPublicKey contains reserved characters.
      </p>
      <button onClick={transformSchema} disabled={loading || processComplete}>
        {loading ? 'Processing...' : 'Remove Invalid Referrers'}
      </button>
      {processComplete && <p>Invalid referrers have been removed successfully!</p>}
    </div>
  );
};

export default FirebaseDeleteReservedCharacters;
