import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['header__container']}>
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
        <h1 className={styles['header__container__title']}>
          A lifetime of discounts? It is Genius.
        </h1>
        <p className={styles['header__container__description']}>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free Zuongbooking account
        </p>
        <button className={styles['header__container__btn']}>
          Sign in / Register
        </button>
        <div className={styles['header__container__search']}>
          <div className={styles['header__container__search__item']}>
            <FontAwesomeIcon
              icon={faBed}
              className={styles['header__container__search__item__icon']}
            />
            <input
              type="text"
              placeholder="Where are you going?"
              className={styles['header__container__search__item__input']}
            />
          </div>
          <div className={styles['header__container__search__item']}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={styles['header__container__search__item__icon']}
            />
            <span className={styles['header__container__search__item__text']}>
              date to date
            </span>
          </div>
          <div className={styles['header__container__search__item']}>
            <FontAwesomeIcon
              icon={faPerson}
              className={styles['header__container__search__item__icon']}
            />
            <span className={styles['header__container__search__item__text']}>
              2 adults 2 children 1 room
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
