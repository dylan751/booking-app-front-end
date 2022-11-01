import React from 'react';
import styles from './SearchItem.module.scss';

const SearchItem = () => {
  return (
    <div className={styles['search-item']}>
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className={styles['search-item__img']}
      />
      <div className={styles['search-item__description']}>
        <h1 className={styles['search-item__description__title']}>
          Tower Street Apartments
        </h1>
        <span className={styles['search-item__description__distance']}>
          500m from center
        </span>
        <span className={styles['search-item__description__taxi-option']}>
          Free airport taxi
        </span>
        <span className={styles['search-item__description__subtitle']}>
          Studio Apartment with Air conditioning
        </span>
        <span className={styles['search-item__description__feature']}>
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className={styles['search-item__description__cancel-option']}>
          Free cancellation{' '}
        </span>
        <span
          className={styles['search-item__description__cancel-option-subtitle']}
        >
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={styles['search-item__detail']}>
        <div className={styles['search-item__detail__rating']}>
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className={styles['search-item__detail__text']}>
          <span className={styles['search-item__detail__text__price']}>
            $123
          </span>
          <span className={styles['search-item__detail__text__tax-option']}>
            Include taxes and fees
          </span>
          <button className={styles['search-item__detail__text__check-btn']}>See availablity</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
