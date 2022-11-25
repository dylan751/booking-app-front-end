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
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { SearchContext } from '../../../context/SearchContext';
import { Hotel } from '../../../models/Hotel';
import styles from './ReserveFinalStep.module.scss';

interface ReserveFinalStepProps {
  setStep: any;
  hotel?: Hotel;
}

const ReserveFinalStep = ({ setStep, hotel }: ReserveFinalStepProps) => {
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const handleReserve = async () => {
    console.log('Reserve');
    try {
      // await Promise.all(
      //   selectedRooms.map((roomId) => {
      //     axios.put(
      //       `${process.env.REACT_APP_API_ENDPOINT}/rooms/availability/${roomId}`,
      //       { dates: allDates },
      //     );
      //   }),
      // );
      // setIsOpenBookingModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles['reserve']}>
      <div className={styles['reserve__booking']}>
        <div className={styles['reserve__booking__details']}>
          <h4 className={styles['reserve__booking__details__header']}>
            Your booking Details
          </h4>
          <div className={styles['reserve__booking__details__content']}>
            <div className={styles['reserve__booking__details__content__date']}>
              <div
                className={
                  styles['reserve__booking__details__content__date__check-in']
                }
              >
                <h5>Check-in</h5>
                <p>{format(dates[0].startDate, 'E, MMM dd, yyyy')}</p>
                <span>2:00 PM – 11:30 PM</span>
              </div>
              <div
                className={
                  styles['reserve__booking__details__content__date__check-out']
                }
              >
                <h5>Check-out</h5>
                <p>{format(dates[0].endDate, 'E, MMM dd, yyyy')}</p>
                <span>7:00 AM – 12:00 PM</span>
              </div>
            </div>
            <div
              className={
                styles['reserve__booking__details__content__day-length']
              }
            >
              <h5>Total length of stay:</h5>
              <span>1 night</span>
            </div>
            <hr />
            <div
              className={
                styles['reserve__booking__details__content__selected-room']
              }
            >
              <h5>You selected:</h5>
            </div>
          </div>
        </div>
        <div className={styles['reserve__booking__price-summary']}>
          <h4 className={styles['reserve__booking__price-summary__header']}>
            Your price summary
          </h4>
        </div>
        <div className={styles['reserve__booking__payment-schedule']}>
          <h4 className={styles['reserve__booking__payment-schedule__header']}>
            Your payment schedule
          </h4>
          <div
            className={styles['reserve__booking__payment-schedule__content']}
          >
            <span>{`Before you stay you'll pay`}</span>
            <span>US$15</span>
          </div>
        </div>
        <div className={styles['reserve__booking__cancel-cost']}>
          <h4 className={styles['reserve__booking__cancel-cost__header']}>
            How much will it cost to cancel?
          </h4>
          <div className={styles['reserve__booking__cancel-cost__content']}>
            <span>{`If you cancel, you'll pay`}</span>
            <span>US$15</span>
          </div>
        </div>
      </div>
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
                  <input type="text" placeholder="Viet Nam" />
                </div>
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__data__phone'
                    ]
                  }
                >
                  <label>{'Telephone (mobile number preferred) *'}</label>
                  <input type="number" placeholder="+0123456789" />
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
                  <div>{user.username}</div>
                </div>
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__info__email'
                    ]
                  }
                >
                  <span>Email</span>
                  <div>{user.email}</div>
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
