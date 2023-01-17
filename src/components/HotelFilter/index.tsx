import React from 'react';
import styles from './HotelFilter.module.scss';

const HotelFilter = () => {
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
            value="hotel"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Hotels</label>
        </div>
        <div className={styles['hotel-filter__type__item']}>
          <input
            type="checkbox"
            value="apartment"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Apartments</label>
        </div>
        <div className={styles['hotel-filter__type__item']}>
          <input
            type="checkbox"
            value="villa"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Villas</label>
        </div>
        <div className={styles['hotel-filter__type__item']}>
          <input
            type="checkbox"
            value="resort"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Resorts</label>
        </div>
      </div>
      <div className={styles['hotel-filter__room-type']}>
        <h3>Room type</h3>
        <div className={styles['hotel-filter__room-type__item']}>
          <input
            type="checkbox"
            value="single"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Single room</label>
        </div>
        <div className={styles['hotel-filter__room-type__item']}>
          <input
            type="checkbox"
            value="double"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Double room</label>
        </div>
      </div>
      <div className={styles['hotel-filter__facility']}>
        <h3>Facilities</h3>
        <div className={styles['hotel-filter__facility__item']}>
          <input
            type="checkbox"
            value="parking"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Parking</label>
        </div>
        <div className={styles['hotel-filter__facility__item']}>
          <input
            type="checkbox"
            value="restaurant"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Restaurant</label>
        </div>
        <div className={styles['hotel-filter__facility__item']}>
          <input
            type="checkbox"
            value="pet"
            onClick={(e: any) =>
              console.log(e.target.checked ? e.target.value : '')
            }
          />
          <label> Pets allowed</label>
        </div>
      </div>
    </div>
  );
};

export default HotelFilter;
