import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './PropertyListSkeleton.module.scss';

const PropertyListSkeleton = () => (
  <>
    <div className={styles['property-list-skeleton']}>
      <Skeleton height={200} />
    </div>
  </>
);

export default PropertyListSkeleton;
