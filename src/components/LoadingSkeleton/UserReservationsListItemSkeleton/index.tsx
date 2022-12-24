import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './UserReservationsListItemSkeleton.module.scss';

const UserReservationsListItemSkeleton = () => (
  <>
    <div className={styles['reservation-list-item-skeleton']}>
      <Skeleton width={100} height={20} />
      <Skeleton width={150} height={20} />
      <Skeleton height={130} />
    </div>
  </>
);

export default UserReservationsListItemSkeleton;
