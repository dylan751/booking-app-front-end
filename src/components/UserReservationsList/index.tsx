import React from 'react';
import { Form } from '../../models/Form';
import UserReservationsListItem from './UserReservationListItem';
import styles from './UserReservationsList.module.scss';

interface UserReservationsListProps {
  reservationDatas?: Form[];
}

const UserReservationsList = ({
  reservationDatas,
}: UserReservationsListProps) => {
  return (
    <div className={styles['reservation-list']}>
      {reservationDatas?.map((item, index) => (
        <UserReservationsListItem key={index} item={item} />
      ))}
    </div>
  );
};

export default UserReservationsList;
