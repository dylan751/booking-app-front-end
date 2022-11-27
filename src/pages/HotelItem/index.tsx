import {
  faCalendarDays,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import Header, { DatesInterface } from '../../components/Header';
import MailList from '../../components/MailList';
import Navbar from '../../components/Navbar';
import Reserve from '../../components/Reserve';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { dayDifference } from '../../services/utils';
import styles from './HotelItem.module.scss';

const HotelItem = () => {
  const {
    dates: contextDates,
    options: contextOptions,
    dispatch,
  } = useContext(SearchContext);
  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState<DatesInterface[]>(contextDates);

  const [options, setOptions] = useState(contextOptions);
  const [openOptions, setOpenOptions] = useState(false);
  const handleOption = (name: string, operation: 'd' | 'i') => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  console.log(dates, options);

  const handleSearch = () => {
    dispatch &&
      dispatch({
        type: 'NEW_SEARCH',
        payload: { destination: data?.city, dates, options },
      });
    toast.success('Apply changes succeeded');
  };

  const { data, loading, error } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${hotelId}`,
  );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Calculate number of dates function
  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);

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

  const handleBook = () => {
    if (user) {
      setIsOpenBookingModal(true);
    } else {
      navigate('/login');
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }

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
            <button
              className={styles['hotel__container__wrapper__book-btn']}
              onClick={handleBook}
            >
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
                <button onClick={handleBook}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <div className={styles['hotel__container__wrapper__search']}>
            <div className={styles['hotel__container__wrapper__search__item']}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                className={
                  styles['hotel__container__wrapper__search__item__icon']
                }
              />
              <span
                className={
                  styles['hotel__container__wrapper__search__item__text']
                }
                onClick={() => setOpenDate(!openDate)}
              >
                {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
                  dates[0].endDate,
                  'MM/dd/yyyy',
                )}`}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  className={
                    styles['hotel__container__wrapper__search__item__date']
                  }
                />
              )}
            </div>
            <div className={styles['hotel__container__wrapper__search__item']}>
              <FontAwesomeIcon
                icon={faPerson}
                className={
                  styles['hotel__container__wrapper__search__item__icon']
                }
              />
              <span
                className={
                  styles['hotel__container__wrapper__search__item__text']
                }
                onClick={() => setOpenOptions(!openOptions)}
              >
                {`${options.adult} adult ・ ${options.children} children ・ ${options.room} room`}
              </span>
              {openOptions && (
                <div
                  className={
                    styles['hotel__container__wrapper__search__item__options']
                  }
                >
                  <div
                    className={
                      styles[
                        'hotel__container__wrapper__search__item__options__item'
                      ]
                    }
                  >
                    <span
                      className={
                        styles[
                          'hotel__container__wrapper__search__item__options__item__text'
                        ]
                      }
                    >
                      Adult
                    </span>
                    <div
                      className={
                        styles[
                          'hotel__container__wrapper__search__item__options__item__counter-container'
                        ]
                      }
                    >
                      <button
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-btn'
                          ]
                        }
                        onClick={() => handleOption('adult', 'd')}
                        disabled={options.adult <= 1}
                      >
                        -
                      </button>
                      <span
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-number'
                          ]
                        }
                      >
                        {options.adult}
                      </span>
                      <button
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-btn'
                          ]
                        }
                        onClick={() => handleOption('adult', 'i')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      styles[
                        'hotel__container__wrapper__search__item__options__item'
                      ]
                    }
                  >
                    <span
                      className={
                        styles[
                          'hotel__container__wrapper__search__item__options__item__text'
                        ]
                      }
                    >
                      Children
                    </span>
                    <div
                      className={
                        styles[
                          'hotel__container__wrapper__search__item__options__item__counter-container'
                        ]
                      }
                    >
                      <button
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-btn'
                          ]
                        }
                        onClick={() => handleOption('children', 'd')}
                        disabled={options.children <= 0}
                      >
                        -
                      </button>
                      <span
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-number'
                          ]
                        }
                      >
                        {options.children}
                      </span>
                      <button
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-btn'
                          ]
                        }
                        onClick={() => handleOption('children', 'i')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      styles[
                        'hotel__container__wrapper__search__item__options__item'
                      ]
                    }
                  >
                    <span
                      className={
                        styles[
                          'hotel__container__wrapper__search__item__options__item__text'
                        ]
                      }
                    >
                      Room
                    </span>
                    <div
                      className={
                        styles[
                          'hotel__container__wrapper__search__item__options__item__counter-container'
                        ]
                      }
                    >
                      <button
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-btn'
                          ]
                        }
                        onClick={() => handleOption('room', 'd')}
                        disabled={options.room <= 1}
                      >
                        -
                      </button>
                      <span
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-number'
                          ]
                        }
                      >
                        {options.room}
                      </span>
                      <button
                        className={
                          styles[
                            'hotel__container__wrapper__search__item__options__item__counter-btn'
                          ]
                        }
                        onClick={() => handleOption('room', 'i')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles['hotel__container__search__item']}>
              <button
                className={styles['hotel__container__btn']}
                onClick={handleSearch}
              >
                Apply Changes
              </button>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {isOpenBookingModal && (
        <Reserve
          setIsOpenBookingModal={setIsOpenBookingModal}
          hotelId={hotelId}
        />
      )}
    </div>
  );
};

export default HotelItem;
