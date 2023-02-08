import {} from '@fortawesome/free-regular-svg-icons';
import {
  faParking,
  faUtensils,
  faVanShuttle,
  faWifi,
  faStar,
  faLock,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReserveSideBar from '../../../components/ReserveSideBar';
import { AuthContext } from '../../../context/AuthContext';
import { ReserveContext } from '../../../context/ReserveContext';
import { SearchContext } from '../../../context/SearchContext';
import { Form } from '../../../models/Form';
import { Hotel } from '../../../models/Hotel';
import { Room } from '../../../models/Room';
import { checkout } from '../../../services/checkout';
import { dayDifference } from '../../../services/utils';
import styles from './ReserveFinalStep.module.scss';

interface ReserveFinalStepProps {
  setStep: any;
  hotel?: Hotel;
  roomData?: Room[];
  formData: Form;
  setFormData: any;
}

const ReserveFinalStep = ({
  setStep,
  hotel,
  roomData,
  formData,
  setFormData,
}: ReserveFinalStepProps) => {
  const { dates, options } = useContext(SearchContext);
  const { selectedRooms } = useContext(ReserveContext);
  const { user } = useContext(AuthContext);

  const [isDisabled, setIsDisabled] = useState(true);
  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);
  const price = hotel && numberOfDays * hotel.cheapestPrice * options.room;

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, price: price && price * 1.05 };
    });
  }, []);

  useEffect(() => {
    setIsDisabled(
      !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.country ||
        !formData.phoneNumber ||
        !formData.hotelId ||
        !formData.roomIds,
    );
  }, [formData]);

  const getDatesInRage = (startDate, endDate) => {
    const date = new Date(startDate.getTime());
    const dateList: number[] = [];

    while (date <= endDate) {
      dateList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dateList;
  };

  const allDates = getDatesInRage(dates[0].startDate, dates[0].endDate);

  const handleReserve = async () => {
    try {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/forms`,
          formData,
        );
      } catch (err) {
        console.log('Create Form err', err);
      }

      await Promise.all(
        selectedRooms.map((roomId) => {
          axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/rooms/availability/${roomId}`,
            { dates: allDates },
          );
        }),
      );

      // Redirect to Stripe
      const lineItems: any = [];
      lineItems.push({
        price: 'price_1MZAv2I7VVxG2TJjxzaod1iy',
        quantity: options.room,
      }),
        checkout({
          lineItems,
        });

      toast.success('Reserve Hotel Succeeded');
    } catch (err) {
      console.log('Update room availability err', err);
    }
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return (
    <div className={styles['reserve']}>
      <ReserveSideBar roomData={roomData} />
      <div className={styles['reserve__personal']}>
        <div className={styles['reserve__personal__container']}>
          <div className={styles['reserve__personal__container__hotel']}>
            <div
              className={
                styles['reserve__personal__container__hotel__container']
              }
            >
              <img
                className={
                  styles['reserve__personal__container__hotel__container__img']
                }
                src={hotel?.photos[0]}
                alt="hotel-logo"
              />
              <div
                className={
                  styles[
                    'reserve__personal__container__hotel__container__details'
                  ]
                }
              >
                <div
                  className={
                    styles[
                      'reserve__personal__container__hotel__container__details__title'
                    ]
                  }
                >
                  <span>Hotel</span>
                  <FontAwesomeIcon icon={faStar} size="xs" color="#febb02" />
                  <FontAwesomeIcon icon={faStar} size="xs" color="#febb02" />
                </div>
                <h3>{hotel?.name}</h3>
                <span>{hotel?.address}</span>
                <span
                  className={
                    styles[
                      'reserve__personal__container__hotel__container__details__review'
                    ]
                  }
                >
                  Excellent Location — 9.0
                </span>
                <div
                  className={
                    styles[
                      'reserve__personal__container__hotel__container__details__rating'
                    ]
                  }
                >
                  <button>9.0</button>
                  <span>Excellent</span>
                </div>
                <div
                  className={
                    styles[
                      'reserve__personal__container__hotel__container__details__service'
                    ]
                  }
                >
                  <div
                    className={
                      styles[
                        'reserve__personal__container__hotel__container__details__service__item'
                      ]
                    }
                  >
                    <FontAwesomeIcon icon={faParking} />
                    Parking
                  </div>
                  <div
                    className={
                      styles[
                        'reserve__personal__container__hotel__container__details__service__item'
                      ]
                    }
                  >
                    <FontAwesomeIcon icon={faUtensils} />
                    Restaurant
                  </div>
                  <div
                    className={
                      styles[
                        'reserve__personal__container__hotel__container__details__service__item'
                      ]
                    }
                  >
                    <FontAwesomeIcon icon={faVanShuttle} />
                    Airport shuttle
                  </div>
                  <div
                    className={
                      styles[
                        'reserve__personal__container__hotel__container__details__service__item'
                      ]
                    }
                  >
                    <FontAwesomeIcon icon={faWifi} />
                    Free Wifi
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['reserve__personal__container__details']}>
            <div
              className={
                styles['reserve__personal__container__details__header']
              }
            >
              <div
                className={
                  styles['reserve__personal__container__details__header__title']
                }
              >
                <h3>Enter your details</h3>
                <span>Almost done! Just fill in the * required info</span>
              </div>
            </div>
            <div
              className={styles['reserve__personal__container__details__form']}
            >
              <div
                className={
                  styles['reserve__personal__container__details__form__data']
                }
              >
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__data__country'
                    ]
                  }
                >
                  <label>Country/region *</label>
                  <input
                    type="text"
                    placeholder="Viet Nam"
                    defaultValue={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                  />
                </div>
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__data__phone'
                    ]
                  }
                >
                  <label>{'Telephone (mobile number preferred) *'}</label>
                  <input
                    type="number"
                    placeholder="+0123456789"
                    defaultValue={formData.phoneNumber}
                    onChange={(e) =>
                      handleChange('phoneNumber', e.target.value)
                    }
                  />
                  <span>Needed by the property to validate your booking</span>
                </div>
              </div>
              <div
                className={
                  styles['reserve__personal__container__details__form__info']
                }
              >
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__info__name'
                    ]
                  }
                >
                  <span>Name</span>
                  <div>
                    {formData.firstName
                      ? `${formData.firstName} ${formData.lastName}`
                      : user.username}
                  </div>
                </div>
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__info__email'
                    ]
                  }
                >
                  <span>Email</span>
                  <div>{formData.email || user.email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['reserve__personal__container__more-info']}>
            <div
              className={styles['reserve__personal__container__more-info__1']}
            >
              You can unsubscribe at any time. View our{' '}
              <span>privacy policy</span>.
            </div>
            <div
              className={styles['reserve__personal__container__more-info__2']}
            >
              Your booking is with Lovely House directly and by completing this
              booking you agree to the <span>booking conditions</span>,{' '}
              <span>general terms</span>, and <span>privacy policy</span>.
            </div>
          </div>
        </div>
        {!formData.firstName ? (
          <span className={styles['reserve__warning']}>
            * Please input your first name
          </span>
        ) : !formData.lastName ? (
          <span className={styles['reserve__warning']}>
            * Please input your last name
          </span>
        ) : !formData.email ? (
          <span className={styles['reserve__warning']}>
            * Please input your email
          </span>
        ) : !formData.country ? (
          <span className={styles['reserve__warning']}>
            * Please input your country
          </span>
        ) : !formData.phoneNumber ? (
          <span className={styles['reserve__warning']}>
            * Please input your phone number
          </span>
        ) : !formData.hotelId ? (
          <span className={styles['reserve__warning']}>
            * Please choose a hotel
          </span>
        ) : !formData.roomIds ? (
          <span className={styles['reserve__warning']}>
            * Please choose hotel rooms
          </span>
        ) : (
          <span></span>
        )}
        <div className={styles['reserve__btn__group']}>
          <button
            onClick={() => setStep(1)}
            className={styles['reserve__btn__group__previous-button']}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            <span>Previous Step</span>
          </button>
          <button
            onClick={handleReserve}
            className={styles['reserve__btn__group__reserve-button']}
            disabled={isDisabled}
          >
            <FontAwesomeIcon icon={faLock} size="lg" />
            <span>Complete Booking</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveFinalStep;
