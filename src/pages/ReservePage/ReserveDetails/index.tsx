import {
  faCircleCheck,
  faCreditCard,
} from '@fortawesome/free-regular-svg-icons';
import {
  faDesktop,
  faUserTie,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { SearchContext } from '../../../context/SearchContext';
import styles from './ReserveDetails.module.scss';

interface ReserveDetailsProps {
  setStep: any;
}

const ReserveDetails = ({ setStep }: ReserveDetailsProps) => {
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  console.log(dates);
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
          Your payment schedule
        </div>
        <div className={styles['reserve__booking__cancel-cost']}>
          How much will it cost to cancel?
        </div>
      </div>
      <div className={styles['reserve__personal']}>
        <div className={styles['reserve__personal__container']}>
          <div className={styles['reserve__personal__container__hotel']}>
            Hotel
          </div>
          <div className={styles['reserve__personal__container__good-to-know']}>
            <h3>Good to know:</h3>
            <div
              className={
                styles[
                  'reserve__personal__container__good-to-know__description'
                ]
              }
            >
              <FontAwesomeIcon
                icon={faCreditCard}
                color={'#00800a'}
                className={
                  styles['reserve__personal__container__good-to-know__icon']
                }
              />
              <span>No credit card needed!</span>
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
              <div
                className={
                  styles[
                    'reserve__personal__container__details__header__username'
                  ]
                }
              >
                <FontAwesomeIcon icon={faUserTie} />
                {user.username}
              </div>
            </div>
            <div
              className={styles['reserve__personal__container__details__form']}
            >
              <div
                className={
                  styles['reserve__personal__container__details__form__work']
                }
              >
                <h5>Are you traveling for work?</h5>
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__work__input'
                    ]
                  }
                >
                  <input type="radio" id="yes" name="work" value={1} />{' '}
                  <span>Yes</span>
                  <input type="radio" id="no" name="work" value={0} />{' '}
                  <span>No</span>
                </div>
              </div>
              <div
                className={
                  styles['reserve__personal__container__details__form__data']
                }
              >
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__data__name'
                    ]
                  }
                >
                  <div
                    className={
                      styles[
                        'reserve__personal__container__details__form__data__name__first'
                      ]
                    }
                  >
                    <label>First Name</label>
                    <input type="text" placeholder="Duong" />
                  </div>
                  <div
                    className={
                      styles[
                        'reserve__personal__container__details__form__data__name__last'
                      ]
                    }
                  >
                    <label>Last Name</label>
                    <input type="text" placeholder="Nguyen" />
                  </div>
                </div>
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__data__email'
                    ]
                  }
                >
                  <label>Email Address</label>
                  <input type="email" placeholder="example@gmail.com" />
                  <span>Confirmation email sent to this address</span>
                </div>
              </div>
              <div
                className={
                  styles[
                    'reserve__personal__container__details__form__who-booking'
                  ]
                }
              >
                <h5>Who are you booking for?</h5>
                <div
                  className={
                    styles[
                      'reserve__personal__container__details__form__who-booking__container'
                    ]
                  }
                >
                  <div
                    className={
                      styles[
                        'reserve__personal__container__details__form__who-booking__container__input'
                      ]
                    }
                  >
                    <input
                      type="radio"
                      id="main-guest"
                      name="who-booking"
                      value={1}
                    />{' '}
                    <span>{`I'm the main guest`}</span>
                  </div>
                  <div
                    className={
                      styles[
                        'reserve__personal__container__details__form__who-booking__container__input'
                      ]
                    }
                  >
                    <input
                      type="radio"
                      id="someone-else"
                      name="who-booking"
                      value={0}
                    />{' '}
                    <span>{`I'm booking for someone else`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles['reserve__personal__container__special-request']}
          >
            <h3>Special requests</h3>
            <div
              className={
                styles[
                  'reserve__personal__container__special-request__container'
                ]
              }
            >
              <p>
                {`Special requests can't be guaranteed, but the property will do
                its best to meet your needs. You can always make a special
                request after your booking is complete.`}
              </p>
              <span>
                Please write your requests in English or Vietnamese. (optional)
              </span>
              <textarea rows={4} id="special-request" name="special-request" />
            </div>
          </div>
          <div className={styles['reserve__personal__container__arrival-time']}>
            <h3>Your arrival time</h3>
            <div
              className={
                styles['reserve__personal__container__arrival-time__container']
              }
            >
              <div
                className={
                  styles[
                    'reserve__personal__container__arrival-time__container__description'
                  ]
                }
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="xl"
                  color="#00800a"
                />
                <p>
                  Your room will be ready for check-in between 2:00 PM and 11:30
                  PM
                </p>
              </div>
              <div
                className={
                  styles[
                    'reserve__personal__container__arrival-time__container__description'
                  ]
                }
              >
                <FontAwesomeIcon icon={faDesktop} size="xl" color="#00800a" />
                <p>24-hour front desk – help whenever you need it!</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => setStep(2)} className={styles['reserve__btn']}>
          Next: Final details{' '}
          <FontAwesomeIcon
            icon={faChevronRight}
            className={styles['hotel__container__slider__arrow']}
            size="sm"
          />
        </button>
      </div>
    </div>
  );
};

export default ReserveDetails;
