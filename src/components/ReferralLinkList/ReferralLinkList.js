import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is properly set up
import { collection, getDocs } from 'firebase/firestore';
import styles from './ReferralLinksList.module.css';

const ReferralLinksList = () => {
  const [referralData, setReferralData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [totalReads, setTotalReads] = useState(0); // Counter for database reads

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        // Start a new database read
        const querySnapshot = await getDocs(collection(db, 'referrals'));
        setTotalReads((prevReads) => {
          const newReads = prevReads + 1;
          console.log(`Total Database Reads: ${newReads}`); // Log total reads to the console
          return newReads;
        });

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID (unique per referrer)
          referrerPublicKey: doc.data().referrerPublicKey,
          totalReferrals: doc.data().totalReferrals,
          level1Referrals: doc.data().level1Referrals || 0, // Level 1 referrals
          level2Referrals: doc.data().level2Referrals || 0, // Level 2 referrals
          totalPoints: doc.data().totalPoints || 0, // Total points
        }));

        setReferralData(data);
      } catch (err) {
        console.error('Error fetching referral data:', err);
      }
    };

    fetchReferralData();
  }, []);

  // Filter data based on search term
  const filteredData = referralData.filter((row) =>
    row.referrerPublicKey?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Paginate the sorted and filtered data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(sortedData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Sort function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className={styles.referralLinksList_main_container}>
        <h2 className={styles.referralLinksList_title}>REFERRAL SUMMARY</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by referrer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />

        {/* Main Referral Data Table */}
        <table className={styles.referralTable}>
          <thead>
            <tr>
              <th onClick={() => requestSort('referrerPublicKey')}>Referrer PublicKey</th>
              <th onClick={() => requestSort('totalReferrals')}>Total Referrals</th>
              <th onClick={() => requestSort('level1Referrals')}>Level 1 Referrals</th>
              <th onClick={() => requestSort('level2Referrals')}>Level 2 Referrals</th>
              <th onClick={() => requestSort('totalPoints')}>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.referrerPublicKey}</td>
                <td>{row.totalReferrals}</td>
                <td>{row.level1Referrals}</td>
                <td>{row.level2Referrals}</td>
                <td>{row.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className={styles.referral_list_pagination}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(sortedData.length / rowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(sortedData.length / rowsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ReferralLinksList;
