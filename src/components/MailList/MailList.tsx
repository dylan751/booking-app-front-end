import React from 'react';
import styles from './MailList.module.scss';

const MailList = () => {
  return (
    <div className={styles['mail-list']}>
      <h1 className={styles['mail-list__title']}>Save time, save money!</h1>
      <span className={styles['mail-list__description']}>
        Sign up and we will send the best deals to you
      </span>
      <div className={styles['mail-list__input-container']}>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
