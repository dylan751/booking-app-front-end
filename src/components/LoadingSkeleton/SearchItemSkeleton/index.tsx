import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SearchItemSkeleton.module.scss';

interface SearchItemSkeletonProps {
  count: number;
}

const SearchItemSkeleton = ({ count }: SearchItemSkeletonProps) => (
  <>
    {Array(count)
      .fill(0)
      .map((_item, index) => (
        <div className={styles['search-item-skeleton']} key={index}>
          <Skeleton height={220} />
        </div>
      ))}
  </>
);

export default SearchItemSkeleton;
