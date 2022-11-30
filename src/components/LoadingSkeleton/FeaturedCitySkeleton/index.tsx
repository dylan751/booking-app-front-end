import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './FeaturedCitySkeleton.module.scss';

const FeaturedCitySkeleton = () => (
  <>
    <div className={styles['featured-city-skeleton']}>
      <Skeleton height={250} />
    </div>
  </>
);

export default FeaturedCitySkeleton;
