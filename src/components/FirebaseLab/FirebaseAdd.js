import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const PushTestData = () => {
  const [dataPushed, setDataPushed] = useState(false);
  const [loading, setLoading] = useState(false);

  const pushTestData = async () => {
    if (dataPushed || loading) return; // Prevent multiple pushes and loading state

    setLoading(true); // Set loading state to true

    try {
      // Reference to the 'collection_test' collection
      const collectionRef = collection(db, 'collection_test');
      
      // Data to push
      const testData = {
        referrerPublicKey: "abcd1234",
        userPublicKey: "xyz7890",
        signature: "test-signature-1",
        timestamp: {
          seconds: 1699870200,
          nanoseconds: 0,
        },
      };

      // Query to check if referrerPublicKey already exists in the collection
      const q = query(collectionRef, where("referrerPublicKey", "==", testData.referrerPublicKey));
      const querySnapshot = await getDocs(q);

      // If the query returns no documents, proceed to add the new data
      if (querySnapshot.empty) {
        // Add the document to the collection
        const docRef = await addDoc(collectionRef, testData);
        console.log(`Document added with ID: ${docRef.id}`);
        setDataPushed(true);  // Mark the data as pushed after successful addition
      } else {
        console.log("Document with the same referrerPublicKey already exists.");
      }
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <div>
      <h2>Test Data Pusher</h2>
      <p>Data is being pushed to Firestore...</p>
      <button onClick={pushTestData} disabled={dataPushed || loading}>
        {loading ? "Pushing..." : "Push Data"}
      </button>
      {dataPushed && <p>Data has been pushed successfully!</p>}
    </div>
  );
};

export default PushTestData;
