import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const DeletesDuplicate = () => {
  const [processComplete, setProcessComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const removeDuplicates = async () => {
    if (processComplete || loading) return; // Prevent reprocessing during loading

    setLoading(true); // Set loading state to true

    try {
      const collectionRef = collection(db, 'referrals'); // Replace with your collection name
      const querySnapshot = await getDocs(collectionRef);

      const seenSignatures = new Set(); // To track unique signatures
      const duplicateIds = []; // To store document IDs with duplicate signatures

      querySnapshot.forEach((document) => {
        const data = document.data();

        if (data.signature) {
          if (seenSignatures.has(data.signature)) {
            // If signature already exists, mark this document as duplicate
            duplicateIds.push(document.id);
          } else {
            // Otherwise, add signature to the set
            seenSignatures.add(data.signature);
          }
        }
      });

      // Delete documents with duplicate IDs
      for (const id of duplicateIds) {
        const docRef = doc(db, 'referrals', id);
        await deleteDoc(docRef);
        console.log(`Deleted duplicate document with ID: ${id}`);
      }

      console.log("Duplicates removed successfully.");
      setProcessComplete(true); // Mark the process as complete
    } catch (error) {
      console.error("Error removing duplicates:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Remove Duplicate Signatures</h2>
      <p>Eliminating duplicate signature entries...</p>
      <button onClick={removeDuplicates} disabled={processComplete || loading}>
        {loading ? "Processing..." : "Remove Duplicates"}
      </button>
      {processComplete && <p>Duplicate signatures have been removed!</p>}
    </div>
  );
};

export default DeletesDuplicate;
