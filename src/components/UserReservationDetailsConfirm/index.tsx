import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './UserReservationDetailsConfirm.module.scss';

const UserReservationDetailsConfirm = () => {
  return (
    <div className={styles['reservation-confirm']}>
      <div className={styles['reservation-confirm__header']}>
        <span>Thanks Hai Duong!</span>
        <h2>Your booking in Hanoi is confirmed</h2>
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
            <strong>muoi07052001@gmail.com</strong>
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
