import React from 'react';
import AllHotelList from '../../components/AllHotelList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import styles from './AllHotelPage.module.scss';

const AllHotelPage = () => {
  return (
    <div className={styles['hotel-page']}>
      <Navbar />
      <Header />
      <div className={styles['hotel-page__container']}>
        <AllHotelList />
      </div>
      <Footer />
    </div>
  );
};

export default AllHotelPage;
