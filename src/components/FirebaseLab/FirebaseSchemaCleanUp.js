import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const FirebaseSchemaCleanUp = () => {
  const [loading, setLoading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);

  const cleanUpSchema = async () => {
    if (loading || processComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'referrals'); // Target collection
      const querySnapshot = await getDocs(collectionRef);

      const danglingDocuments = [];

      // Identify dangling documents
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { referrerPublicKey, referredPublicKeys, totalReferrals } = data;

        // Check if the document fits the new schema
        const isValid =
          referrerPublicKey &&
          Array.isArray(referredPublicKeys) &&
          typeof totalReferrals === 'number';

        if (!isValid) {
          console.warn(`Dangling document detected with ID: ${docSnapshot.id}`);
          danglingDocuments.push(docSnapshot.id);
        }
      }

      // Delete dangling documents
      for (const docId of danglingDocuments) {
        await deleteDoc(doc(db, 'referrals', docId));
        console.log(`Deleted dangling document with ID: ${docId}`);
      }

      console.log('Dangling documents removed.');
      setProcessComplete(true);
    } catch (error) {
      console.error('Error cleaning up schema:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Clean Up Schema</h2>
      <p>
        This will identify and delete any documents in the "referrals" collection
        that do not conform to the new schema.
      </p>
      <button onClick={cleanUpSchema} disabled={loading || processComplete}>
        {loading ? 'Processing...' : 'Clean Up Schema'}
      </button>
      {processComplete && <p>Schema clean-up is complete!</p>}
    </div>
  );
};

export default FirebaseSchemaCleanUp;
