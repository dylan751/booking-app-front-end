import React from 'react';
import { Hotel } from '../../models/Hotel';
import AllHotelListItemSkeleton from '../LoadingSkeleton/AllHotelListItemSkeleton';
import styles from './AllHotelList.module.scss';
import AllHotelListItem from './AllHotelListItem';

interface AllHotelListProps {
  hotelList?: Hotel[];
  loading: boolean;
  type: 'Hotel' | 'Apartment' | 'Resort' | 'Villa' | 'Cabin';
}

const AllHotelList = ({ hotelList, loading, type }: AllHotelListProps) => {
  return (
    <div className={styles['hotel-list']}>
      <div className={styles['hotel-list__container']}>
        <div className={styles['hotel-list__container__header']}>
          <h3>Last minute {type.toLowerCase()} near you</h3>
          <p>
            Find a great deal on a {type.toLowerCase()} for tonight or an upcoming
            trip
          </p>
        </div>
        <div className={styles['hotel-list__container__items']}>
          {loading ? (
            <AllHotelListItemSkeleton count={6} />
          ) : (
            hotelList?.map((hotel) => (
              <AllHotelListItem key={hotel._id} item={hotel} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHotelList;
