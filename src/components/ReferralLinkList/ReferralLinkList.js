import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Make sure to set up Firebase
import { collection, getDocs } from 'firebase/firestore';
import styles from './ReferralLinksList.module.css';

const ReferralLinksList = () => {
  const [referralLinks, setReferralLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust the number of items per page here
  const baseUrl = 'https://www.drpepe.ai/referral-program';

  useEffect(() => {
    const fetchReferralLinks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const links = querySnapshot.docs.map(doc => ({
          publicKey: doc.data().referrerPublicKey, // Make sure publicKey is stored in each document
          referralLink: `${baseUrl}?referrer=${doc.data().referrerPublicKey}`,
        }));
        setReferralLinks(links);
      } catch (err) {
        console.error("Error fetching referral links:", err);
      }
    };

    fetchReferralLinks();
  }, []);

  // Pagination logic
  const indexOfLastLink = currentPage * itemsPerPage;
  const indexOfFirstLink = indexOfLastLink - itemsPerPage;
  const currentLinks = referralLinks.slice(indexOfFirstLink, indexOfLastLink);

  const totalPages = Math.ceil(referralLinks.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.referralLinksList_main_container}>
      <h2>All Referral Links (as JSON)</h2>
      <pre className={styles.jsonContainer}>
        {JSON.stringify(currentLinks, null, 2)}
      </pre>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ReferralLinksList;
