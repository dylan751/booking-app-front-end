import React from 'react';
import { Hotel } from '../../models/Hotel';
import AllHotelListItemSkeleton from '../LoadingSkeleton/AllHotelListItemSkeleton';
import FeaturedCitySkeleton from '../LoadingSkeleton/FeaturedCitySkeleton';
import styles from './AllHotelList.module.scss';
import AllHotelListItem from './AllHotelListItem';

interface AllHotelListProps {
  hotelList?: Hotel[];
  loading: boolean;
}

const AllHotelList = ({ hotelList, loading }: AllHotelListProps) => {
  return (
    <div className={styles['hotel-list']}>
      <div className={styles['hotel-list__container']}>
        <div className={styles['hotel-list__container__header']}>
          <h3>Last minute hotels near you</h3>
          <p>Find a great deal on a hotel for tonight or an upcoming trip</p>
        </div>
        <div className={styles['hotel-list__container__items']}>
          {hotelList?.map((hotel) =>
            loading ? (
              <AllHotelListItemSkeleton />
            ) : (
              <AllHotelListItem key={hotel._id} item={hotel} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHotelList;
