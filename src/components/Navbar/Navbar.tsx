import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return <div className={styles['navbar']}>
    <div className={styles['navbar__container']}>
      <span className={styles['navbar__container__logo']}>Zuong Booking</span>
      <div className={styles['navbar__container__items']}>
        <button className={styles['navbar__container__items__btn']}>Register</button>
        <button className={styles['navbar__container__items__btn']}>Login</button>
      </div>
    </div>
  </div>;
};

export default Navbar;