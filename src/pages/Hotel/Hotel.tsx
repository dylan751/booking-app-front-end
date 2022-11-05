import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MailList from '../../components/MailList/MailList';
import Navbar from '../../components/Navbar/Navbar';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import styles from './Hotel.module.scss';

const HotelPage = () => {
  const { dates, options } = useContext(SearchContext);
  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [isOpenSlider, setIsOpenSlider] = useState(false);

  const { data, loading, error } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${hotelId}`,
  );

  // Calculate number of dates function
  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (startDate, endDate) => {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  };

  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);
  console.log(data && numberOfDays * data.cheapestPrice * options.room);

  const handleOpenSlider = (index: number) => {
    setSlideNumber(index);
    setIsOpenSlider(true);
  };

  const handleMoveSlider = (direction: string) => {
    let newSlideNumber;
    if (direction === 'left') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  return (
    <div className={styles['hotel']}>
      <Navbar />
      <Header type="list" />
      {loading ? (
        'Loading Please wait'
      ) : (
        <div className={styles['hotel__container']}>
          {isOpenSlider && (
            <div className={styles['hotel__container__slider']}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={styles['hotel__container__slider__close']}
                onClick={() => setIsOpenSlider(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className={styles['hotel__container__slider__arrow']}
                onClick={() => handleMoveSlider('left')}
              />
              <div className={styles['hotel__container__slider__wrapper']}>
                <img
                  src={data?.photos[slideNumber]}
                  alt=""
                  className={styles['hotel__container__slider__wrapper__img']}
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className={styles['hotel__container__slider__arrow']}
                onClick={() => handleMoveSlider('right')}
              />
            </div>
          )}
          <div className={styles['hotel__container__wrapper']}>
            <button className={styles['hotel__container__wrapper__book-btn']}>
              Reserve or Book Now!
            </button>
            <h1 className={styles['hotel__container__wrapper__title']}>
              {data?.name}
            </h1>
            <div className={styles['hotel__container__wrapper__address']}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data?.address}</span>
            </div>
            <span className={styles['hotel__container__wrapper__distance']}>
              Excellent location - {data?.distance}m from center
            </span>
            <span
              className={styles['hotel__container__wrapper__price-highlight']}
            >
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            {/* Sub Photos */}
            <div className={styles['hotel__container__wrapper__images']}>
              {data?.photos?.map((photo, index) => (
                <div
                  className={styles['hotel__container__wrapper__images__item']}
                  key={index}
                >
                  <img
                    src={photo}
                    alt=""
                    className={
                      styles['hotel__container__wrapper__images__item__img']
                    }
                    onClick={() => handleOpenSlider(index)}
                  />
                </div>
              ))}
            </div>
            {/* Hotel Details */}
            <div className={styles['hotel__container__wrapper__detail']}>
              <div
                className={styles['hotel__container__wrapper__detail__text']}
              >
                <h1
                  className={
                    styles['hotel__container__wrapper__detail__text__title']
                  }
                >
                  {data?.title}
                </h1>
                <p
                  className={
                    styles[
                      'hotel__container__wrapper__detail__text__description'
                    ]
                  }
                >
                  {data?.description}
                </p>
              </div>
              <div
                className={styles['hotel__container__wrapper__detail__price']}
              >
                <h1>Perfect for a {numberOfDays}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>
                    ${data && numberOfDays * data.cheapestPrice * options.room}
                  </b>{' '}
                  ({numberOfDays} nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default HotelPage;
