import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SearchItemSkeleton.module.scss';

const SearchItemSkeleton = () => (
  <>
    <div className={styles['search-item-skeleton']}>
      <Skeleton height={220} />
    </div>
  </>
);

export default SearchItemSkeleton;
