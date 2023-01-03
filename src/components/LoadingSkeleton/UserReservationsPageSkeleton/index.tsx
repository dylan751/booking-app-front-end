import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './UserReservationsPageSkeleton.module.scss';

interface UserReservationsPageSkeletonProps {
  count?: number;
}

const UserReservationsPageSkeleton = ({
  count,
}: UserReservationsPageSkeletonProps) => (
  <>
    {Array(count)
      .fill(0)
      .map((_item, index) => (
        <div className={styles['reservation-page-skeleton']} key={index}>
          <Skeleton width={100} height={20} />
          <Skeleton width={150} height={20} />
          <Skeleton height={130} />
        </div>
      ))}
  </>
);

export default UserReservationsPageSkeleton;
