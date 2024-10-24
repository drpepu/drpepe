import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './NotFound.module.css';
import pepefat from '../../Assets/DRPEPEFAT.svg';

function NotFound() {
  return (
    <div className={styles.notFound_container}>
      <img width={200} src={pepefat} alt='pepefat' />
      <div className='notfound-text-one'>404 - Page Not Found</div>
      <div className='notfound-text-two'>Sorry, the page you are looking for does not exist.</div>
      
      {/* Link to navigate back to the home page */}
      <Link to="/" className={styles.back_home_link}>back home fren</Link>
    </div>
  );
}

export default NotFound;
