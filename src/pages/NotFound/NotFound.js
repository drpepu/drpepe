
import React from 'react';

import styles from './NotFound.modules.css';


function NotFound() {


  return (
    <div className={styles.notFound_container}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
