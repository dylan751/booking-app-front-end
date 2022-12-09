import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './HotelItemSkeletonImage.module.scss';

const HotelItemSkeletonImage = () => (
  <div className={styles['hotel-item-skeleton-image']}>
    {Array(6)
      .fill(0)
      .map((_item, index) => (
        <div className={styles['hotel-item-skeleton-image__item']} key={index}>
          <Skeleton height={250} width={373} />
        </div>
      ))}
  </div>
);

export default HotelItemSkeletonImage;
