import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles['navbar']}>
      <div className={styles['navbar__container']}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className={styles['navbar__container__logo']}>
            Zuong Booking
          </span>
        </Link>
        <div className={styles['navbar__container__items']}>
          <button className={styles['navbar__container__items__btn']}>
            Register
          </button>
          <button className={styles['navbar__container__items__btn']}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
