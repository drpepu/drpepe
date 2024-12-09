import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const SafelyUpdateDocumentIDs = () => {
  const [loading, setLoading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);

  const updateDocumentIDsSafely = async () => {
    if (loading || processComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'referrals'); // Target collection
      const querySnapshot = await getDocs(collectionRef);

      const failedDocuments = [];

      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { referrerPublicKey } = data;

        if (!referrerPublicKey) {
          console.warn(`Skipping document with no referrerPublicKey: ${docSnapshot.id}`);
          failedDocuments.push(docSnapshot.id);
          continue;
        }

        try {
          // Create a new document with referrerPublicKey as the ID
          const newDocRef = doc(db, 'referrals', referrerPublicKey);
          await setDoc(newDocRef, data);
          console.log(`Created document with new ID: ${referrerPublicKey}`);
        } catch (error) {
          console.error(`Failed to create document with new ID: ${referrerPublicKey}`, error);
          failedDocuments.push(docSnapshot.id);
        }
      }

      console.log('Document ID update complete. No deletions performed.');
      console.log('Failed documents:', failedDocuments);
      setProcessComplete(true);
    } catch (error) {
      console.error('Error updating document IDs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Safely Update Document IDs</h2>
      <p>
        This will create new documents with <strong>referrerPublicKey</strong> as the ID in the
        "referrals" collection without deleting old documents.
      </p>
      <button onClick={updateDocumentIDsSafely} disabled={loading || processComplete}>
        {loading ? 'Processing...' : 'Safely Update Document IDs'}
      </button>
      {processComplete && (
        <p>
          Document ID update is complete! Please verify the data before performing deletions.
        </p>
      )}
    </div>
  );
};

export default SafelyUpdateDocumentIDs;
