import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Hotel } from '../../models/Hotel';
import styles from './SearchItem.module.scss';

interface SearchItemProps {
  item: Hotel;
}

const SearchItem = ({ item }: SearchItemProps) => {
  return (
    <div className={styles['search-item']}>
      <img src={item.photos[0]} alt="" className={styles['search-item__img']} />
      <div className={styles['search-item__description']}>
        <Link to={`/hotels/${item._id}`}>
          <h1 className={styles['search-item__description__title']}>
            {item.name}
          </h1>
        </Link>
        <span className={styles['search-item__description__distance']}>
          {item.distance}km from center
        </span>
        <span className={styles['search-item__description__taxi-option']}>
          Free airport taxi
        </span>
        <span className={styles['search-item__description__subtitle']}>
          Studio Apartment with Air conditioning
        </span>
        <span className={styles['search-item__description__feature']}>
          {`${item.description.substring(0, 150)} ...`}
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
        {/* {item.rating && (
          <div className={styles['search-item__detail__rating']}>
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )} */}
        <div className={styles['search-item__detail__rating']}>
          <span>Excellent</span>
          <button>9.0</button>
        </div>
        <div className={styles['search-item__detail__text']}>
          <span className={styles['search-item__detail__text__price']}>
            US${item.cheapestPrice}
          </span>
          <span className={styles['search-item__detail__text__tax-option']}>
            Include taxes and fees
          </span>
          <Link to={`/hotels/${item._id}`}>
            <button className={styles['search-item__detail__text__check-btn']}>
              See availablity <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
