import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './PropertyListSkeleton.module.scss';

interface PropertyListSkeletonProps {
  count: number;
}

const PropertyListSkeleton = ({ count }: PropertyListSkeletonProps) => (
  <>
    <div className={styles['property-list-skeleton']}>
      {Array(count)
        .fill(0)
        .map((_item, index) => (
          <div className={styles['property-list-skeleton__item']} key={index}>
            <Skeleton
              height={200}
              width={'100%'}
              className={styles['property-list-skeleton__item__img']}
            />
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={20} />
          </div>
        ))}
    </div>
  </>
);

export default PropertyListSkeleton;
