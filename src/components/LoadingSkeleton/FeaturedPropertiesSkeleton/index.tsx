import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './FeaturedPropertiesSkeleton.module.scss';

const FeaturedPropertiesSkeleton = () => (
  <>
    <div className={styles['featured-properties-skeleton']}>
      <Skeleton height={210} />
    </div>
  </>
);

export default FeaturedPropertiesSkeleton;
