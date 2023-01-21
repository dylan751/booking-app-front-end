import React, { useMemo, useState } from 'react';
import AllHotelList from '../../components/AllHotelList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HotelFAQ from '../../components/HotelFAQ';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import PropertyList from '../../components/PropertyList';
import useFetch from '../../hooks/useFetch';
import { pageSize } from '../../constants/constants';
import { Hotel } from '../../models/Hotel';
import styles from './AllHotelPage.module.scss';

interface AllHotelPageProps {
  type: 'Hotel' | 'Apartment' | 'Resort' | 'Villa' | 'Cabin';
}

const AllHotelPage = ({ type }: AllHotelPageProps) => {
  // TODO: Add Pagination
  const { data, loading, error } = useFetch<Hotel[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?type=${type}`,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['hotel-page']}>
      <Navbar />
      <Header />
      <div className={styles['hotel-page__container']}>
        <AllHotelList
          hotelList={currentTableData}
          loading={loading}
          type={type}
        />
        {data && (
          <Pagination
            className={styles['pagination-bar']}
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      <HotelFAQ type={type} />
      <div className={styles['property-list__container']}>
        <div className={styles['property-list__container__header']}>
          <h3>More accommodation on Zuong Booking</h3>
          <p>
            Dive into our world of apartments, villas and other unique
            accommodation
          </p>
        </div>
        <PropertyList />
        <Footer />
      </div>
    </div>
  );
};

export default AllHotelPage;
