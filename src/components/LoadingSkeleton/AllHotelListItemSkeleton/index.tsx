import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './AllHotelListItemSkeleton.module.scss';

const AllHotelListItemSkeleton = () => (
  <>
    <div className={styles['hotel-list-item-skeleton']}>
      <Skeleton height={150} />
    </div>
  </>
);

export default AllHotelListItemSkeleton;
