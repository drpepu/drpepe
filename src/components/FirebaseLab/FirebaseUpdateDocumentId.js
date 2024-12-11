import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';

const SafelyUpdateAndDeleteDuplicates = () => {
  const [loading, setLoading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [deletionComplete, setDeletionComplete] = useState(false);

  const updateDocumentIDsSafely = async () => {
    if (loading || processComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'social_verifications_backup'); // Target collection
      const querySnapshot = await getDocs(collectionRef);

      const failedDocuments = [];

      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const { publicKey } = data; // Use publicKey as the new document ID

        if (!publicKey) {
          console.warn(`Skipping document with no publicKey: ${docSnapshot.id}`);
          failedDocuments.push(docSnapshot.id);
          continue;
        }

        try {
          // Create a new document with publicKey as the ID
          const newDocRef = doc(db, 'social_verifications_backup', publicKey);
          await setDoc(newDocRef, data);
          console.log(`Created document with new ID: ${publicKey}`);
        } catch (error) {
          console.error(`Failed to create document with new ID: ${publicKey}`, error);
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

  const deleteOldDocuments = async () => {
    if (loading || !processComplete || deletionComplete) return;

    setLoading(true);

    try {
      const collectionRef = collection(db, 'social_verifications_backup');
      const querySnapshot = await getDocs(collectionRef);

      const deletePromises = querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const { publicKey } = data;

        if (!publicKey || docSnapshot.id === publicKey) {
          // Skip documents that already use publicKey as ID
          return;
        }

        try {
          // Delete the old document
          await deleteDoc(doc(db, 'social_verifications_backup', docSnapshot.id));
          console.log(`Deleted old document with ID: ${docSnapshot.id}`);
        } catch (error) {
          console.error(`Failed to delete document with ID: ${docSnapshot.id}`, error);
        }
      });

      await Promise.all(deletePromises); // Wait for all deletions to complete
      setDeletionComplete(true);
      console.log('Old documents deleted successfully.');
    } catch (error) {
      console.error('Error deleting old documents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Safely Update and Delete Duplicates</h2>
      <p>
        This will create new documents with <strong>publicKey</strong> as the ID in the
        "social_verifications_backup" collection and optionally delete old documents with
        auto-generated IDs.
      </p>
      <button onClick={updateDocumentIDsSafely} disabled={loading || processComplete}>
        {loading ? 'Processing...' : 'Safely Update Document IDs'}
      </button>
      {processComplete && !deletionComplete && (
        <button onClick={deleteOldDocuments} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Old Documents'}
        </button>
      )}
      {processComplete && deletionComplete && (
        <p>
          Document ID update and cleanup are complete! Please verify the data for consistency.
        </p>
      )}
    </div>
  );
};

export default SafelyUpdateAndDeleteDuplicates;
