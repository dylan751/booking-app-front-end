import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './HotelItemSkeletonTitle.module.scss';

const HotelItemSkeletonTitle = () => (
  <>
    <div className={styles['hotel-item-skeleton-title']}>
      {Array(3)
        .fill(0)
        .map((_item, index) => (
          <div
            className={styles['hotel-item-skeleton-title__header']}
            key={index}
          >
            <Skeleton width={300} />
          </div>
        ))}
    </div>
    <Skeleton count={1} width={400} />
  </>
);

export default HotelItemSkeletonTitle;
