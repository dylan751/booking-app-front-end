import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './UserReservationDetailsContent.module.scss';

const UserReservationDetailsContent = () => {
  return (
    <>
      <h2>Check your details</h2>
      <div className={styles['reservation-content']}>
        <div className={styles['reservation-content__left']}>
          <div className={styles['reservation-content__left__detail']}>
            <h3>LaHomestay Trúc Bạch</h3>
            <div className={styles['reservation-content__left__detail__item']}>
              <span
                className={
                  styles['reservation-content__left__detail__item__title']
                }
              >
                Confirmation number
              </span>
              <span
                className={
                  styles['reservation-content__left__detail__item__content']
                }
              >
                2614.622.058
              </span>
            </div>
            <div className={styles['reservation-content__left__detail__item']}>
              <span
                className={
                  styles['reservation-content__left__detail__item__title']
                }
              >
                PIN code
              </span>
              <span
                className={
                  styles['reservation-content__left__detail__item__content']
                }
              >
                8699
              </span>
            </div>
            <div className={styles['reservation-content__left__detail__item']}>
              <span
                className={
                  styles['reservation-content__left__detail__item__title']
                }
              >
                Booking details
              </span>
              <span
                className={
                  styles['reservation-content__left__detail__item__content']
                }
              >
                1 night, 1 apartment
              </span>
            </div>
            <div className={styles['reservation-content__left__detail__item']}>
              <span
                className={
                  styles['reservation-content__left__detail__item__title']
                }
              >
                You booked for
              </span>
              <span
                className={
                  styles['reservation-content__left__detail__item__content']
                }
              >
                2 adults
              </span>
            </div>
            <div className={styles['reservation-content__left__detail__item']}>
              <span
                className={
                  styles['reservation-content__left__detail__item__title']
                }
              >
                Check-in
              </span>
              <span
                className={
                  styles['reservation-content__left__detail__item__content']
                }
              >
                Tuesday, 6 December 2022 (14:00 - 19:00)
              </span>
            </div>
            <div className={styles['reservation-content__left__detail__item']}>
              <span
                className={
                  styles['reservation-content__left__detail__item__title']
                }
              >
                Check-out
              </span>
              <span
                className={
                  styles['reservation-content__left__detail__item__content']
                }
              >
                Wednesday, 7 December 2022 (08:00 - 12:00)
              </span>
            </div>
          </div>
          <div className={styles['reservation-content__left__more-info']}>
            <div
              className={styles['reservation-content__left__more-info__vat']}
            >
              <div
                className={
                  styles['reservation-content__left__more-info__vat__item']
                }
              >
                <span>1 apartment</span>
                <span>US$20</span>
              </div>
              <div
                className={
                  styles['reservation-content__left__more-info__vat__item']
                }
              >
                {' '}
                <span>8% VAT</span>
                <span>US$2</span>
              </div>
            </div>
            <div
              className={styles['reservation-content__left__more-info__price']}
            >
              <div
                className={
                  styles['reservation-content__left__more-info__price__item']
                }
              >
                <span>Price</span>
                <span>approx. US$22</span>
              </div>
              <div
                className={
                  styles['reservation-content__left__more-info__price__item']
                }
              >
                <span
                  className={
                    styles[
                      'reservation-content__left__more-info__price__item__comment'
                    ]
                  }
                >
                  (for 2 guests)
                </span>
                <span>VND 510,000</span>
              </div>
            </div>
            <div
              className={styles['reservation-content__left__more-info__item']}
            >
              <h3>
                The final price shown is the amount you will pay to the
                property.
              </h3>
              <p>
                Booking.com does not charge guests any reservation,
                administration or other fees. Your card issuer may charge you a
                foreign transaction fee.
              </p>
            </div>
            <div
              className={styles['reservation-content__left__more-info__item']}
            >
              <h3>Payment information</h3>
              <p>
                This property accepts the following forms of payment: Cash only
              </p>
            </div>
            <div
              className={styles['reservation-content__left__more-info__item']}
            >
              <h3></h3>
              <p>
                Currency and exchange rate information You will pay LaHomestay
                Trúc Bạch in VND according to the exchange rate on the day of
                payment. The amount displayed in USD is just an estimate based
                on <strong>today</strong> exchange rate for VND.
              </p>
            </div>
            <div
              className={styles['reservation-content__left__more-info__item']}
            >
              <h3>Additional information</h3>
              <p>
                Please note that additional supplements (e.g. extra bed) are not
                added in this total. If you don not show up or cancel,
                applicable taxes may still be charged by the property. Please
                remember to read the <strong>Important information</strong>{' '}
                below, as this may contain important details not mentioned here.
              </p>
            </div>
            <div
              className={styles['reservation-content__left__more-info__item']}
            >
              <h3>Want to know more about payment?</h3>
              <p>
                Read our Frequently Asked Questions about how and when to pay.
              </p>
            </div>
          </div>
        </div>
        <div className={styles['reservation-content__right']}>
          <h3>Is everything correct?</h3>
          <span>
            You can always view or change your booking online - no registration
            required.
          </span>
          <div className={styles['reservation-content__right__item']}>
            <FontAwesomeIcon icon={faCancel} />
            <a>Cancellation options</a>
          </div>
          <div className={styles['reservation-content__right__item']}>
            <FontAwesomeIcon icon={faCancel} />
            <a>Edit guest details</a>
          </div>
          <div className={styles['reservation-content__right__item']}>
            <FontAwesomeIcon icon={faCancel} />
            <a>Message property</a>
          </div>
          <div className={styles['reservation-content__right__btn']}>
            View booking
          </div>
          <span>Tip: You can make changes to this booking at anytime</span>
        </div>
      </div>
    </>
  );
};

export default UserReservationDetailsContent;
