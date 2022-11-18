import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './FeaturedSkeleton.module.scss';

const FeaturedSkeleton = () => (
  <>
    <div className={styles['featured-skeleton']}>
      <div className={styles['featured-skeleton__item']}>
        <Skeleton />
      </div>
    </div>
  </>
);

export default FeaturedSkeleton;
