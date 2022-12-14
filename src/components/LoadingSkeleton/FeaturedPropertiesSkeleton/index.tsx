import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './FeaturedPropertiesSkeleton.module.scss';

interface FeaturedPropertiesSkeletonProps {
  count: number;
}

const FeaturedPropertiesSkeleton = ({
  count,
}: FeaturedPropertiesSkeletonProps) => (
  <div className={styles['featured-properties-skeleton']}>
    {Array(count)
      .fill(0)
      .map((_item, index) => (
        <div
          className={styles['featured-properties-skeleton__item']}
          key={index}
        >
          <Skeleton
            height={210}
            width={'100%'}
            className={styles['featured-properties-skeleton__item__img']}
          />
          <Skeleton width={180} height={20} />
          <Skeleton width={210} height={20} />
          <Skeleton width={100} height={20} />
          <Skeleton width={80} height={20} />
        </div>
      ))}
  </div>
);

export default FeaturedPropertiesSkeleton;
