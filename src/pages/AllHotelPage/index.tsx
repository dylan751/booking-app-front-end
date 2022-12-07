import React from 'react';
import AllHotelList from '../../components/AllHotelList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import styles from './AllHotelPage.module.scss';

const AllHotelPage = () => {
  // TODO: Add Pagination
  const { data, loading, error } = useFetch<Hotel[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?limit=6&offset=0`,
  );

  return (
    <div className={styles['hotel-page']}>
      <Navbar />
      <Header />
      <div className={styles['hotel-page__container']}>
        <AllHotelList hotelList={data} />
      </div>
      <Footer />
    </div>
  );
};

export default AllHotelPage;
