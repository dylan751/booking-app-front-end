import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';
import { Form } from '../../../models/Form';
import { Hotel } from '../../../models/Hotel';
import { dayDifference } from '../../../services/utils';
import UserReservationsListItemSkeleton from '../../LoadingSkeleton/UserReservationsListItemSkeleton';
import styles from './UserReservationsListItem.module.scss';

interface UserReservationsListItemProps {
  item: Form;
}

const UserReservationsListItem = ({ item }: UserReservationsListItemProps) => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${item.hotelId}`,
  );
  const start = new Date(item.startDate);
  const end = new Date(item.endDate);
  const numberOfDays = dayDifference(start, end);
  const price = data && numberOfDays * data.cheapestPrice * data.rooms.length;

  const handleNavigate = () => {
    navigate(`/reservations/${item._id}`);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['reservation-list-item']}>
      {loading ? (
        <UserReservationsListItemSkeleton />
      ) : (
        <>
          <h2>{data?.city}</h2>
          <span>
            {format(start, 'dd MMM')} - {format(end, 'dd MMM')}
          </span>
          <div
            className={styles['reservation-list-item__container']}
            onClick={handleNavigate}
          >
            <img src={data?.photos[0]} alt="hotel" />
            <div
              className={
                styles['reservation-list-item__container__description']
              }
            >
              <div
                className={
                  styles['reservation-list-item__container__description__name']
                }
              >
                {data?.name}
              </div>
              <div
                className={
                  styles['reservation-list-item__container__description__time']
                }
              >
                {' '}
                {format(start, 'dd MMM')} - {format(end, 'dd MMM')} .{' '}
                {data?.city}
              </div>
              <div
                className={
                  styles[
                    'reservation-list-item__container__description__status'
                  ]
                }
              >
                Completed
              </div>
            </div>
            <div className={styles['reservation-list-item__container__price']}>
              US${price && price + price * 0.05}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserReservationsListItem;
