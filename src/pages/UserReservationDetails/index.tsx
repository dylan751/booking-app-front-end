import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import UserReservationDetailsConfirm from '../../components/UserReservationDetailsConfirm';
import UserReservationDetailsContent from '../../components/UserReservationDetailsContent';
import useFetch from '../../hooks/useFetch';
import { Form } from '../../models/Form';
import styles from './UserReservationDetails.module.scss';

const UserReservationDetails = () => {
  const formId = location.pathname.split('/')[2];
  const { data: reservationData, loading } = useFetch<Form>(
    `${process.env.REACT_APP_API_ENDPOINT}/forms/${formId}`,
  );

  if (loading) return <h2>Loading please wait</h2>;

  return (
    <div className={styles['reservation']}>
      <Navbar />
      <Header type="list" />
      {reservationData && (
        <div className={styles['reservation__container']}>
          <UserReservationDetailsConfirm reservationData={reservationData} />
          <UserReservationDetailsContent reservationData={reservationData} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserReservationDetails;
