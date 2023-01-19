import React from 'react';
import {
  hotelDistanceFromCity,
  hotelPropertyTypes,
  hotelTagsArr,
  hotelPriceRange,
  roomTagsArr,
} from '../../constants/constants';
import { Slider } from '@material-ui/core';
import styles from './HotelFilter.module.scss';

interface HotelFilterProps {
  queryString: string;
  setQueryString: any;
  city: string;
  value: number[];
  setValue: any;
}

const HotelFilter = ({
  queryString,
  setQueryString,
  city,
  value,
  setValue,
}: HotelFilterProps) => {
  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterDistance = (e: any) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&distance=${e.target.value}`))
      : setQueryString(queryString.replace(`&distance=${e.target.value}`, ''));
  };

  const handleFilterType = (e: any) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&type=${e.target.value}`))
      : setQueryString(queryString.replace(`&type=${e.target.value}`, ''));
  };

  const handleFilterHotelTag = (e: any) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&hotelTag=${e.target.value}`))
      : setQueryString(queryString.replace(`&hotelTag=${e.target.value}`, ''));
  };

  const handleFilterRoomTag = (e: any) => {
    e.target.checked
      ? setQueryString((prev) => (prev += `&roomTag=${e.target.value}`))
      : setQueryString(queryString.replace(`&roomTag=${e.target.value}`, ''));
  };

  return (
    <div className={styles['hotel-filter']}>
      <h2>Filter by:</h2>
      <div className={styles['hotel-filter__price']}>
        <h3>Select Price Range</h3>
        <Slider
          className={styles['hotel-filter__price__slider']}
          value={value}
          onChange={rangeSelector}
          valueLabelDisplay="auto"
          step={50}
          marks={hotelPriceRange}
          min={0}
          max={500}
        />
      </div>
      <div className={styles['hotel-filter__distance']}>
        <h3>Distance from centre of {city}</h3>
        {hotelDistanceFromCity.map((distance, index) => (
          <div className={styles['hotel-filter__distance__item']} key={index}>
            <input
              type="checkbox"
              value={distance}
              onClick={(e: any) => handleFilterDistance(e)}
            />
            <label> Less than {distance}km</label>
          </div>
        ))}
      </div>
      <div className={styles['hotel-filter__type']}>
        <h3>Property type</h3>
        {hotelPropertyTypes.map((type, index) => (
          <div className={styles['hotel-filter__type__item']} key={index}>
            <input
              type="checkbox"
              value={type}
              onClick={(e: any) => handleFilterType(e)}
            />
            <label> {type}s</label>
          </div>
        ))}
      </div>
      <div className={styles['hotel-filter__facility']}>
        <h3>Facilities</h3>
        {hotelTagsArr.map((tag, index) => (
          <div className={styles['hotel-filter__facility__item']} key={index}>
            <input
              type="checkbox"
              value={tag}
              onClick={(e: any) => handleFilterHotelTag(e)}
            />
            <label> {tag}</label>
          </div>
        ))}
      </div>
      <div className={styles['hotel-filter__room-facility']}>
        <h3>Room facilities</h3>
        {roomTagsArr.map((tag, index) => (
          <div
            className={styles['hotel-filter__room-facility__item']}
            key={index}
          >
            <input
              type="checkbox"
              value={tag}
              onClick={(e: any) => handleFilterRoomTag(e)}
            />
            <label> {tag}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelFilter;
