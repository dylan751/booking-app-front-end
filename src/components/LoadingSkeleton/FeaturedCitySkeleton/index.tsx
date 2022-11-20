import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './FeaturedSkeleton.module.scss';

const FeaturedCitySkeleton = () => (
  <>
    <div className={styles['featured-city-skeleton']}>
      <div className={styles['featured-city-skeleton__item']}>
        <Skeleton />
      </div>
    </div>
  </>
);

export default FeaturedCitySkeleton;
