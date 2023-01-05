import React, { useContext } from 'react';
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import SearchBar from '../SearchBar';
import styles from './Header.module.scss';

interface HeaderProps {
  type?: string;
}

export interface DatesInterface {
  startDate: Date;
  endDate: Date;
  key: string;
}

const Header = ({ type }: HeaderProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles['header']}>
      <div
        className={`${styles['header__container']} ${
          type === 'list' ? styles['listMode'] : styles['']
        }`}
      >
        <div className={styles['header__container__list']}>
          <div
            className={`${styles['header__container__list__item']} ${styles['active']}`}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <h1 className={styles['header__container__title']}>
              A lifetime of discounts? It is Genius.
            </h1>
            <p className={styles['header__container__description']}>
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free Booking account
            </p>
            {!user && (
              <button
                className={styles['header__container__btn']}
                onClick={handleClick}
              >
                Sign in / Register
              </button>
            )}
            <SearchBar />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
