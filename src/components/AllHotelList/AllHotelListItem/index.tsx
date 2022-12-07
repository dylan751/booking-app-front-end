import React from 'react';
import { Hotel } from '../../../models/Hotel';
import styles from './AllHotelListItem.module.scss';

interface AllHotelListItemProps {
  item: Hotel;
}

const AllHotelListItem = ({ item }: AllHotelListItemProps) => {
  return (
    <div className={styles['hotel-list-item']}>
      <img className={styles['hotel-list-item__img']} src={item.photos[0]} />
      <div className={styles['hotel-list-item__content']}>
        <div className={styles['hotel-list-item__content__header']}>
          <div className={styles['hotel-list-item__content__header__title']}>
            <h5>{item.name}</h5>
            <span>{item.address}</span>
          </div>
          <div className={styles['hotel-list-item__content__header__rating']}>
            <button>{item.rating}</button>
          </div>
        </div>
        <div className={styles['hotel-list-item__content__description']}>
          <span>From</span>
          <div
            className={styles['hotel-list-item__content__description__price']}
          >
            USD {item.cheapestPrice}
          </div>
          <span>For tonight</span>
        </div>
      </div>
    </div>
  );
};

export default AllHotelListItem;
