import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const FirebaseAddingSocials = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addSocialFields = async () => {
    setIsProcessing(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const referralsCollection = collection(db, 'referrals');
      const querySnapshot = await getDocs(referralsCollection);

      const updatePromises = querySnapshot.docs.map((docSnapshot) => {
        const docRef = doc(db, 'referrals', docSnapshot.id);

        return updateDoc(docRef, {
          telegramId: null, // Add telegramId field
          twitterHandle: null, // Add twitterHandle field
        });
      });

      await Promise.all(updatePromises); // Wait for all updates to complete
      setSuccessMessage('Social fields added successfully to all documents.');
    } catch (error) {
      console.error('Error adding social fields:', error);
      setErrorMessage('Failed to add social fields. Check the console for more details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Add Social Fields to Referrals</h2>
      <button onClick={addSocialFields} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Add Social Fields'}
      </button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default FirebaseAddingSocials;
