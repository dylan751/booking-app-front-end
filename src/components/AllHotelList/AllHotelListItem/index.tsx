import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel } from '../../../models/Hotel';
import styles from './AllHotelListItem.module.scss';

interface AllHotelListItemProps {
  item: Hotel;
}

const AllHotelListItem = ({ item }: AllHotelListItemProps) => {
  const navigate = useNavigate();
  const handleClick = (hotelId: number) => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <div
      className={styles['hotel-list-item']}
      onClick={() => handleClick(item._id)}
    >
      <img className={styles['hotel-list-item__img']} src={item.photos[0]} />
      <div className={styles['hotel-list-item__content']}>
        <div className={styles['hotel-list-item__content__header']}>
          <div className={styles['hotel-list-item__content__header__title']}>
            <h5>{item.name}</h5>
            <span>{item.address}</span>
          </div>
          <div className={styles['hotel-list-item__content__header__rating']}>
            <button>{item.rating || 9.9}</button>
          </div>
        </div>
        <div className={styles['hotel-list-item__content__description']}>
          <span>From</span>
          <div
            className={styles['hotel-list-item__content__description__price']}
          >
            USD ${item.cheapestPrice}
          </div>
          <span>For tonight</span>
        </div>
      </div>
    </div>
  );
};

export default AllHotelListItem;
