import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const CopyFieldToAnotherName = () => {
  const [dataCopied, setDataCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyField = async () => {
    if (dataCopied || loading) return; // Prevent copying fields multiple times and loading state

    setLoading(true); // Set loading state to true

    try {
      const collectionRef = collection(db, 'referrals_two'); // Replace with your collection name
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach(async (document) => {
        const docRef = doc(db, 'referrals_two', document.id);

        // Check if the userPublicKey exists and then copy it to referredPublicKey
        const data = document.data();

        if (data.userPublicKey) {
          // Copy the value of userPublicKey to referredPublicKey while keeping the old userPublicKey
          await updateDoc(docRef, {
            referredPublicKey: data.userPublicKey, // Copy field to new name
          });

          console.log(`Field copied for document ID: ${document.id}`);
        }
      });

      console.log("All documents processed successfully.");
      setDataCopied(true); // Mark the data as copied
    } catch (error) {
      console.error("Error copying fields:", error);
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <div>
      <h2>Field Copier</h2>
      <p>Copying the userPublicKey to referredPublicKey...</p>
      <button onClick={copyField} disabled={dataCopied || loading}>
        {loading ? "Copying..." : "Copy Fields"}
      </button>
      {dataCopied && <p>Fields have been copied successfully!</p>}
    </div>
  );
};

export default CopyFieldToAnotherName;
