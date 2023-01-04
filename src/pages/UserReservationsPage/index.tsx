import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import UserReservationsPageSkeleton from '../../components/LoadingSkeleton/UserReservationsPageSkeleton';
import Navbar from '../../components/Navbar';
import UserReservationsList from '../../components/UserReservationsList';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { Form } from '../../models/Form';
import styles from './UserReservationsPage.module.scss';

const UserReservationsPage = () => {
  const { user } = useContext(AuthContext);
  const {
    data: reservationDatas,
    loading,
    error,
  } = useFetch<Form[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/users/${user._id}/reservation`,
  );

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className={styles['reservation-page']}>
      <Navbar />
      <div className={styles['reservation-page__container']}>
        <h1>Bookings & Trips</h1>
        {loading ? (
          <UserReservationsPageSkeleton count={reservationDatas?.length} />
        ) : reservationDatas && reservationDatas.length > 0 ? (
          <UserReservationsList reservationDatas={reservationDatas} />
        ) : (
          <div
            className={styles['reservation-page__container__empty']}
          >{`You haven't reserve any Hotel`}</div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default UserReservationsPage;
