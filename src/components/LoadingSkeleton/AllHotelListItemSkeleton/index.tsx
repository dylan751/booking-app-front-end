import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './AllHotelListItemSkeleton.module.scss';

interface AllHotelListItemSkeletonProps {
  count: number;
}

const AllHotelListItemSkeleton = ({ count }: AllHotelListItemSkeletonProps) => (
  <>
    {Array(count)
      .fill(0)
      .map((_item, index) => (
        <div className={styles['hotel-list-item-skeleton']} key={index}>
          <Skeleton height={150} />
        </div>
      ))}
  </>
);

export default AllHotelListItemSkeleton;
