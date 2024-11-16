import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs, updateDoc, doc, deleteField } from 'firebase/firestore';

const DeleteUserPublicKey = () => {
  const [dataDeleted, setDataDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteUserPublicKey = async () => {
    if (dataDeleted || loading) return; // Prevent deleting fields multiple times and during loading

    setLoading(true); // Set loading state to true

    try {
      const collectionRef = collection(db, 'referrals_two'); // Replace with your collection name
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach(async (document) => {
        const docRef = doc(db, 'referrals_two', document.id);

        // Check if userPublicKey exists and delete it
        const data = document.data();

        if (data.userPublicKey) {
          // Delete the userPublicKey field using deleteField
          await updateDoc(docRef, {
            userPublicKey: deleteField(), // Remove the field from the document
          });

          console.log(`Field deleted for document ID: ${document.id}`);
        }
      });

      console.log("All documents processed successfully.");
      setDataDeleted(true); // Mark the data as deleted
    } catch (error) {
      console.error("Error deleting fields:", error);
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <div>
      <h2>Delete userPublicKey</h2>
      <p>Deleting the userPublicKey from all documents...</p>
      <button onClick={deleteUserPublicKey} disabled={dataDeleted || loading}>
        {loading ? "Deleting..." : "Delete userPublicKey"}
      </button>
      {dataDeleted && <p>userPublicKey field has been deleted from all documents!</p>}
    </div>
  );
};

export default DeleteUserPublicKey;
