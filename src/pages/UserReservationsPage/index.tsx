import React, { useContext, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import UserReservationsList from '../../components/UserReservationsList';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { Form } from '../../models/Form';
import styles from './UserReservationsPage.module.scss';

const UserReservationsPage = () => {
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  // TODO: Fetch user's reservation `forms`
  const {
    data: reservationDatas,
    loading,
    error,
  } = useFetch<Form[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/users/${user._id}/reservation`,
  );

  // const [reservationDatas] = useState<Form[]>([
  //   {
  //     userId: '636af8082834c89832baeec4',
  //     isTravelForWork: true,
  //     firstName: 'Duong',
  //     lastName: 'Nguyen',
  //     email: 'muoi07052001@gmail.com',
  //     whoBookingFor: 0, // 0: i'm the main guest, 1: i'm booking for someone else
  //     specialRequest: 'Nothing',
  //     country: 'Viet Nam',
  //     phoneNumber: '0339410781',
  //     price: 123,
  //     hotelId: '6371f85da398d36fac03392b',
  //     roomIds: '63779fd09d8dc0839edae8f7,6377a4099d8dc0839edae936',
  //     startDate: dates[0].startDate,
  //     endDate: dates[0].endDate,
  //   },
  //   {
  //     userId: '123',
  //     isTravelForWork: true,
  //     firstName: 'Duong',
  //     lastName: 'Nguyen',
  //     email: 'muoi07052001@gmail.com',
  //     whoBookingFor: 0, // 0: i'm the main guest, 1: i'm booking for someone else
  //     specialRequest: 'Nothing',
  //     country: 'Viet Nam',
  //     phoneNumber: '0339410781',
  //     price: 123,
  //     hotelId: '6371f96da398d36fac033973',
  //     roomIds: '63779fd09d8dc0839edae8f7,6377a4099d8dc0839edae936',
  //     startDate: dates[0].startDate,
  //     endDate: dates[0].endDate,
  //   },
  // ]);

  return (
    <div className={styles['reservation-page']}>
      <Navbar />
      <div className={styles['reservation-page__container']}>
        <h1>Bookings & Trips</h1>
        {reservationDatas && reservationDatas.length > 0 ? (
          <UserReservationsList reservationDatas={reservationDatas} />
        ) : (
          <div>{`You haven't reserve any Hotel`}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserReservationsPage;