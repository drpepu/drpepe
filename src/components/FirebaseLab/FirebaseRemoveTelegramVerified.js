import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, deleteField } from 'firebase/firestore';

const FirebaseRemoveTelegramVerified = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const removeTelegramVerifiedField = async () => {
    setIsProcessing(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const referralsCollection = collection(db, 'referrals');
      const referralsSnapshot = await getDocs(referralsCollection);

      const updatePromises = referralsSnapshot.docs.map(async (referralDoc) => {
        const referralDocRef = doc(db, 'referrals', referralDoc.id);

        try {
          // Remove the telegramVerified field completely
          await updateDoc(referralDocRef, {
            telegramVerified: deleteField(),
          });
          console.log(`Removed telegramVerified field for document ID: ${referralDoc.id}`);
        } catch (error) {
          console.error(`Error removing telegramVerified field for document ID: ${referralDoc.id}`, error);
        }
      });

      await Promise.all(updatePromises); // Wait for all updates to complete
      setSuccessMessage('telegramVerified field removed successfully from all documents.');
    } catch (error) {
      console.error('Error removing telegramVerified field:', error);
      setErrorMessage('Failed to remove telegramVerified field. Check the console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Remove telegramVerified Field</h2>
      <button onClick={removeTelegramVerifiedField} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Remove telegramVerified Field'}
      </button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default FirebaseRemoveTelegramVerified;
