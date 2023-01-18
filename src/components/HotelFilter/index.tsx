import React from 'react';
import styles from './HotelFilter.module.scss';

interface HotelFilterProps {
  queryString: string;
  setQueryString: any;
}

const HotelFilter = ({ queryString, setQueryString }: HotelFilterProps) => {
  console.log(queryString);

  const handleFilterType = (e: any) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&type=${e.target.value}`))
      : setQueryString(queryString.replace(`&type=${e.target.value}`, ''));
  };

  const handleFilterRoomType = (e: any) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&roomType=${e.target.value}`))
      : setQueryString(queryString.replace(`&roomType=${e.target.value}`, ''));
  };

  const handleFilterTag = (e: any) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&tag=${e.target.value}`))
      : setQueryString(queryString.replace(`&tag=${e.target.value}`, ''));
  };

  return (
    <div className={styles['hotel-filter']}>
      <h2>Filter by:</h2>
      <div className={styles['hotel-filter__distance']}>
        <h3>Distance from centre of Myrtle Beach</h3>
        <div className={styles['hotel-filter__distance__item']}>
          <input
            type="checkbox"
            value="1"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Less than 1km</label>
        </div>
        <div className={styles['hotel-filter__distance__item']}>
          <input
            type="checkbox"
            value="3"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Less than 3km</label>
        </div>
        <div className={styles['hotel-filter__distance__item']}>
          <input
            type="checkbox"
            value="5"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Less than 5km</label>
        </div>
      </div>
      <div className={styles['hotel-filter__type']}>
        <h3>Property type</h3>
        <div className={styles['hotel-filter__type__item']}>
          <input
            type="checkbox"
            value="Hotel"
            onClick={(e: any) => handleFilterType(e)}
          />
          <label> Hotels</label>
        </div>
        <div className={styles['hotel-filter__type__item']}>
          <input
            type="checkbox"
            value="Apartment"
            onClick={(e: any) => handleFilterType(e)}
          />
          <label> Apartments</label>
        </div>
        <div className={styles['hotel-filter__type__item']}>
          <input
            type="checkbox"
            value="Villa"
            onClick={(e: any) => handleFilterType(e)}
          />
          <label> Villas</label>
        </div>
        <div className={styles['hotel-filter__type__item']}>
          <input
            type="checkbox"
            value="Resort"
            onClick={(e: any) => handleFilterType(e)}
          />
          <label> Resorts</label>
        </div>
      </div>
      <div className={styles['hotel-filter__room-type']}>
        <h3>Room type</h3>
        <div className={styles['hotel-filter__room-type__item']}>
          <input
            type="checkbox"
            value="Single"
            onClick={(e: any) => handleFilterRoomType(e)}
          />
          <label> Single room</label>
        </div>
        <div className={styles['hotel-filter__room-type__item']}>
          <input
            type="checkbox"
            value="Double"
            onClick={(e: any) => handleFilterRoomType(e)}
          />
          <label> Double room</label>
        </div>
      </div>
      <div className={styles['hotel-filter__facility']}>
        <h3>Facilities</h3>
        <div className={styles['hotel-filter__facility__item']}>
          <input
            type="checkbox"
            value="Parking"
            onClick={(e: any) => handleFilterTag(e)}
          />
          <label> Parking</label>
        </div>
        <div className={styles['hotel-filter__facility__item']}>
          <input
            type="checkbox"
            value="Restaurant"
            onClick={(e: any) => handleFilterTag(e)}
          />
          <label> Restaurant</label>
        </div>
        <div className={styles['hotel-filter__facility__item']}>
          <input
            type="checkbox"
            value="Free WiFi"
            onClick={(e: any) => handleFilterTag(e)}
          />
          <label> Free wifi</label>
        </div>
      </div>
    </div>
  );
};

export default HotelFilter;
