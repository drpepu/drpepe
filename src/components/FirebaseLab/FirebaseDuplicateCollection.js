import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs, addDoc } from 'firebase/firestore';

const FirebaseDuplicateCollection = () => {
  const [processComplete, setProcessComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const duplicateCollection = async () => {
    if (processComplete || loading) return; // Prevent reprocessing during loading

    setLoading(true); // Set loading state to true

    try {
      const sourceCollectionRef = collection(db, 'referrals_two'); // Source collection
      const targetCollectionRef = collection(db, 'referrals'); // Target collection
      const querySnapshot = await getDocs(sourceCollectionRef);

      // Duplicate each document with a new ID
      for (const document of querySnapshot.docs) {
        const data = document.data();

        // Write to the new collection
        await addDoc(targetCollectionRef, { ...data }); // Copy data without adding extra fields
        console.log(`Duplicated document with new ID from: ${document.id}`);
      }

      console.log('Collection duplicated successfully.');
      setProcessComplete(true); // Mark the process as complete
    } catch (error) {
      console.error('Error duplicating collection:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Duplicate Collection</h2>
      <p>Duplicates all documents from "referrals_two" to "referrals".</p>
      <button onClick={duplicateCollection} disabled={processComplete || loading}>
        {loading ? 'Processing...' : 'Duplicate Collection'}
      </button>
      {processComplete && <p>Collection has been duplicated successfully!</p>}
    </div>
  );
};

export default FirebaseDuplicateCollection;
