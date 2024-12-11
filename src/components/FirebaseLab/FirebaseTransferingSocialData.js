import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const FirebaseTransferingSocialData = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const transferSocialData = async () => {
    setIsProcessing(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Fetch all documents from the social_verifications collection
      const socialVerificationsCollection = collection(db, 'social_verifications_backup');
      const socialSnapshot = await getDocs(socialVerificationsCollection);

      // Iterate over social_verifications documents
      const updatePromises = socialSnapshot.docs.map(async (socialDoc) => {
        const socialData = socialDoc.data();
        const { publicKey, twitterHandle, telegramVerification } = socialData;

        if (!publicKey) {
          console.warn(`Skipping document with no publicKey: ${socialDoc.id}`);
          return;
        }

        // Extract telegram data if it exists
        const telegramUserId = telegramVerification?.telegramUserId || null;
        const telegramVerified = telegramVerification?.verifiedStatus || false;

        try {
          // Fetch the corresponding referral document
          const referralDocRef = doc(db, 'referrals', publicKey);

          // Update the referral document with social data
          await updateDoc(referralDocRef, {
            telegramId: telegramUserId, // Add telegramUserId if it exists, otherwise null
            telegramVerified, // Add verified status
            twitterHandle: twitterHandle || null, // Add twitterHandle if it exists, otherwise null
          });

          console.log(`Updated social data for publicKey: ${publicKey}`);
        } catch (updateError) {
          console.error(`Error updating referral for publicKey: ${publicKey}`, updateError);
        }
      });

      await Promise.all(updatePromises); // Wait for all updates to complete

      setSuccessMessage('Social data transferred successfully.');
    } catch (error) {
      console.error('Error transferring social data:', error);
      setErrorMessage('Failed to transfer social data. Check the console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Transfer Social Data to Referrals</h2>
      <button onClick={transferSocialData} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Transfer Social Data'}
      </button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default FirebaseTransferingSocialData;
