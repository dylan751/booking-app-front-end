import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Form } from '../../models/Form';
import { Hotel } from '../../models/Hotel';
import styles from './UserReservationDetailsConfirm.module.scss';

interface UserReservationDetailsConfirmProps {
  reservationData: Form;
}

const UserReservationDetailsConfirm = ({
  reservationData,
}: UserReservationDetailsConfirmProps) => {
  const { data: hotelData } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${reservationData.hotelId}`,
  );

  return (
    <div className={styles['reservation-confirm']}>
      <div className={styles['reservation-confirm__header']}>
        <span>{`Thanks ${reservationData.firstName} ${reservationData.lastName}!`}</span>
        <h2>{`Your booking in ${hotelData?.city} is confirmed`}</h2>
      </div>
      <div className={styles['reservation-confirm__detail']}>
        <div className={styles['reservation-confirm__detail__item']}>
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className={styles['reservation-confirm__detail__item__icon']}
          />
          <span>
            We have sent your confirmation email to{' '}
            <strong>{reservationData.email}</strong>
          </span>
        </div>
        <div className={styles['reservation-confirm__detail__item']}>
          <FontAwesomeIcon
            icon={faCheck}
            size="lg"
            className={styles['reservation-confirm__detail__item__icon']}
          />
          <span>
            You can now sit down and looking forward to the check-in day
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserReservationDetailsConfirm;
