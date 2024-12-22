import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs } from 'firebase/firestore';

const FirebaseDownloadCollection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadCollectionAsJSON = async () => {
    setLoading(true);
    setError(null);

    try {
      // Reference the Firestore collection you want to download
      const collectionRef = collection(db, 'referrals');
      const querySnapshot = await getDocs(collectionRef);

      // Convert documents to JSON
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Create a Blob and trigger a download
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(jsonBlob);

      // Create a temporary <a> element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'referrals.json'; // File name
      a.click();

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading collection:', error);
      setError('Failed to download the collection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Download Firestore Collection</h2>
      <button onClick={downloadCollectionAsJSON} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Collection as JSON'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FirebaseDownloadCollection;
