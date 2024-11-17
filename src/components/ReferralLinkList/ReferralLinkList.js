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

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'referrals_two'));
        const data = querySnapshot.docs.map(doc => {
          const docData = doc.data();

          // Convert timestamp to Date object
          if (docData.timestamp) {
            docData.timestamp = docData.timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
          }

          return {
            id: doc.id, // Include the document ID for uniqueness
            ...docData, // Spread the document data
          };
        });

        setReferralData(data);
      } catch (err) {
        console.error('Error fetching referral data:', err);
      }
    };

    fetchReferralData();
  }, []);

  // Truncate signature to show first 5 and last 5 characters
  const truncateSignature = (signature) => {
    if (signature && signature.length > 10) {
      return `${signature.slice(0, 5)}...${signature.slice(-5)}`;
    }
    return signature;
  };



  // Sort function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter data based on search term
  const filteredData = referralData.filter(row =>
    row.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.referrerPublicKey?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.referredPublicKey?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.signature?.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Compute unique counts
  const uniqueIds = new Set(referralData.map(row => row.id));
  const uniqueReferrers = new Set(referralData.map(row => row.referrerPublicKey));
  const uniqueReferred = new Set(referralData.map(row => row.referredPublicKey));
  const uniqueSignatures = new Set(referralData.map(row => row.signature));

  // Calculate the earliest and latest date from referral data
  const dates = referralData.map(row => row.timestamp).filter(date => date != null); // Only consider valid dates

  const earliestDate = dates.length > 0 ? new Date(Math.min(...dates)) : null;
  const latestDate = dates.length > 0 ? new Date(Math.max(...dates)) : null;

  const totalDays = earliestDate && latestDate
    ? Math.floor((latestDate - earliestDate) / (1000 * 60 * 60 * 24)) // Calculate total days between the two dates
    : 0;

  return (
    <>
      <div className={styles.referralLinksList_main_container}>
        <h2 className={styles.referralLinksList_title}>REFERRAL FULL DATABASE</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by referrer, referred, or signature..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />

        {/* Unique Counts Table */}
        <table className={styles.referralTable}>
          <thead>
            <tr>
              <th>Unique IDs</th>
              <th>Unique Referrers</th>
              <th>Unique Referred</th>
              <th>Unique Signatures</th>
              <th>Total Days</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{uniqueIds.size}</td>
              <td>{uniqueReferrers.size}</td>
              <td>{uniqueReferred.size}</td>
              <td>{uniqueSignatures.size}</td>
              <td>{totalDays} days</td>
            </tr>
          </tbody>
        </table>

        {/* Main Referral Data Table */}
        <table className={styles.referralTable}>
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>ID</th>
              <th onClick={() => requestSort('referrerPublicKey')}>Referrer PublicKey</th>
              <th onClick={() => requestSort('referredPublicKey')}>Referred PublicKey</th>
              <th onClick={() => requestSort('signature')}>Signature</th>
              <th onClick={() => requestSort('timestamp')}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{truncateSignature(row.referrerPublicKey)}</td>
                <td>{truncateSignature(row.referredPublicKey)}</td>
                <td>{truncateSignature(row.signature)}</td>
                <td>{row.timestamp ? row.timestamp.toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className={styles.referral_list_pagination}>
          {/* Previous Button */}
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>

          {/* Page Numbers */}
          {currentPage > 2 && (
            <>
              <button onClick={() => setCurrentPage(1)}>1</button>
              <span>...</span>
            </>
          )}

          {Array.from({ length: 5 }, (_, index) => {
            const pageNumber = currentPage - 2 + index;
            return pageNumber > 0 && pageNumber <= Math.ceil(sortedData.length / rowsPerPage) ? (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? styles.activePage : ''}
              >
                {pageNumber}
              </button>
            ) : null;
          })}

          {currentPage < Math.ceil(sortedData.length / rowsPerPage) - 1 && (
            <>
              <span>...</span>
              <button onClick={() => setCurrentPage(Math.ceil(sortedData.length / rowsPerPage))}>
                {Math.ceil(sortedData.length / rowsPerPage)}
              </button>
            </>
          )}

          {/* Next Button */}
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
