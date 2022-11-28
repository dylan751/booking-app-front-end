import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faDesktop,
  faUserTie,
  faChevronRight,
  faParking,
  faUtensils,
  faVanShuttle,
  faWifi,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ReserveContext } from '../../../context/ReserveContext';
import { SearchContext } from '../../../context/SearchContext';
import { Form } from '../../../models/Form';
import { Hotel } from '../../../models/Hotel';
import { Room } from '../../../models/Room';
import { dayDifference } from '../../../services/utils';
import styles from './ReserveDetails.module.scss';

interface ReserveDetailsProps {
  setStep: any;
  hotel?: Hotel;
  roomData?: Room[];
  formData: Form;
  setFormData: any;
}

const ReserveDetails = ({
  setStep,
  hotel,
  roomData,
  formData,
  setFormData,
}: ReserveDetailsProps) => {
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { selectedRooms } = useContext(ReserveContext);

  const navigate = useNavigate();
  const hotelId = location.pathname.split('/')[2];

  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);
  const price = hotel && numberOfDays * hotel.cheapestPrice * options.room;

  const handleChangeSelection = () => {
    navigate(`/hotels/${hotelId}`);
  };

  const handleChange = (key: string, value: any) => {
    console.log(key, value);
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
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
              <div
                className={
                  styles[
                    'reserve__booking__details__content__selected-room__container'
                  ]
                }
              >
                {roomData?.map((room) => (
                  <div key={room._id}>
                    <>
                      {room.title} -{' '}
                      {room.roomNumbers.map(
                        (roomNumber, index) =>
                          selectedRooms.includes(roomNumber._id) && (
                            <span key={index}>{roomNumber.number}</span>
                          ),
                      )}
                    </>
                  </div>
                ))}
              </div>
              <span
                className={
                  styles[
                    'reserve__booking__details__content__selected-room__container__change-selection'
                  ]
                }
                onClick={handleChangeSelection}
              >
                Change your selection
              </span>
            </div>
          </div>
        </div>
        <div className={styles['reserve__booking__price-summary']}>
          <h4 className={styles['reserve__booking__price-summary__header']}>
            Your price summary
          </h4>
          <div className={styles['reserve__booking__price-summary__content']}>
            <div
              className={
                styles['reserve__booking__price-summary__content__price']
              }
            >
              <div
                className={
                  styles[
                    'reserve__booking__price-summary__content__price__item'
                  ]
                }
              >
                <span>Two-Bedroom Superior Apartment</span>
                <span>US${price}</span>
              </div>
              <div
                className={
                  styles[
                    'reserve__booking__price-summary__content__price__item'
                  ]
                }
              >
                <span>5 % VAT</span>
                <span>US${price && price * 0.05}</span>
              </div>
            </div>
            <div
              className={
                styles['reserve__booking__price-summary__content__price-total']
              }
            >
              <span>Price</span>
              <span>US${price && price + price * 0.05} *</span>
            </div>
            <div
              className={
                styles[
                  'reserve__booking__price-summary__content__excluded-charges'
                ]
              }
            >
              <h5>Excluded charges</h5>
              <div
                className={
                  styles[
                    'reserve__booking__price-summary__content__excluded-charges__item'
                  ]
                }
              >
                <span>City tax</span>
                <span>US$8</span>
              </div>
              <div
                className={
                  styles[
                    'reserve__booking__price-summary__content__excluded-charges__item'
                  ]
                }
              >
                <span>
                  Damage deposit <b>Fully refundable</b>
                </span>
                <span>US$156 *</span>
              </div>
            </div>
            <hr />
            <div
              className={
                styles['reserve__booking__price-summary__content__more-info']
              }
            >
              <span>
                {`* This price is converted to show you the approximate cost in US$. You'll pay in`}{' '}
                <b>€</b> {`or`} <b>HUF</b>
                {`. The exchange rate may change before you pay.`}
              </span>
              <span>{`Bear in mind that your card issuer may charge you a foreign transaction fee.`}</span>
            </div>
          </div>
        </div>
        <div className={styles['reserve__booking__payment-schedule']}>
          <h4 className={styles['reserve__booking__payment-schedule__header']}>
            Your payment schedule
          </h4>
          <div
            className={styles['reserve__booking__payment-schedule__content']}
          >
            <span>{`No payment today. You'll pay when you stay.`}</span>
          </div>
        </div>
        <div className={styles['reserve__booking__cancel-cost']}>
          <h4 className={styles['reserve__booking__cancel-cost__header']}>
            How much will it cost to cancel?
          </h4>
          <div className={styles['reserve__booking__cancel-cost__content']}>
            <span>{`Free cancellation until 23:59 on ${format(
              dates[0].startDate,
              'dd MMM',
            )}`}</span>
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
          <div className={styles['reserve__personal__container__good-to-know']}>
            <h3>Good to know:</h3>
            <div
              className={
                styles[
                  'reserve__personal__container__good-to-know__description'
                ]
              }
            >
              <div
                className={
                  styles[
                    'reserve__personal__container__good-to-know__description__item'
                  ]
                }
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color={'#00800a'}
                  className={
                    styles['reserve__personal__container__good-to-know__icon']
                  }
                  size="lg"
                />
                <span>
                  Free cancellation until 23:59 on{' '}
                  {format(dates[0].startDate, 'dd MMM yyyy')}
                </span>
              </div>
              <div
                className={
                  styles[
                    'reserve__personal__container__good-to-know__description__item'
                  ]
                }
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color={'#00800a'}
                  className={
                    styles['reserve__personal__container__good-to-know__icon']
                  }
                  size="lg"
                />
                <span>No credit card needed!</span>
              </div>
              <div
                className={
                  styles[
                    'reserve__personal__container__good-to-know__description__item'
                  ]
                }
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color={'#00800a'}
                  className={
                    styles['reserve__personal__container__good-to-know__icon']
                  }
                  size="lg"
                />
                <span>{`No payment needed today. You'll pay when you stay.`}</span>
              </div>
              <div
                className={
                  styles[
                    'reserve__personal__container__good-to-know__description__item'
                  ]
                }
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color={'#00800a'}
                  className={
                    styles['reserve__personal__container__good-to-know__icon']
                  }
                  size="lg"
                />
                <span>{`Congratulations! You've chosen the cheapest apartment at ${hotel?.name}. Don't miss out, book now!`}</span>
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
              <div
                className={
                  styles[
                    'reserve__personal__container__details__header__username'
                  ]
                }
              >
                <FontAwesomeIcon icon={faUserTie} color="#003580" />
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
                  <input
                    type="radio"
                    id="yes"
                    name="work"
                    value={1}
                    onChange={(e) =>
                      handleChange('isTravelForWork', e.target.value)
                    }
                  />{' '}
                  <span>Yes</span>
                  <input
                    type="radio"
                    id="no"
                    name="work"
                    value={0}
                    onChange={(e) =>
                      handleChange('isTravelForWork', e.target.value)
                    }
                  />{' '}
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
                    <input
                      type="text"
                      placeholder="Duong"
                      defaultValue={formData.firstName}
                      onChange={(e) =>
                        handleChange('firstName', e.target.value)
                      }
                    />
                  </div>
                  <div
                    className={
                      styles[
                        'reserve__personal__container__details__form__data__name__last'
                      ]
                    }
                  >
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Nguyen"
                      defaultValue={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                    />
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
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    defaultValue={user.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
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
                      value={0}
                      onChange={(e) =>
                        handleChange('whoBookingFor', e.target.value)
                      }
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
                      value={1}
                      onChange={(e) =>
                        handleChange('whoBookingFor', e.target.value)
                      }
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
              <textarea
                rows={4}
                id="special-request"
                name="special-request"
                defaultValue={formData.specialRequest}
                onChange={(e) => handleChange('specialRequest', e.target.value)}
              />
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
        <button onClick={() => {setStep(2)}} className={styles['reserve__btn']}>
          Next: Final details{' '}
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </button>
      </div>
    </div>
  );
};

export default ReserveDetails;
