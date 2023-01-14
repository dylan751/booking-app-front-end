import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReserveContext } from '../../context/ReserveContext';
import { SearchContext } from '../../context/SearchContext';
import { Room } from '../../models/Room';
import { calculatePrice, dayDifference } from '../../services/utils';
import styles from './ReserveSideBar.module.scss';

interface ReserveSideBarProps {
  roomData?: Room[];
}

const ReserveSideBar = ({ roomData }: ReserveSideBarProps) => {
  const { dates } = useContext(SearchContext);
  const { selectedRooms } = useContext(ReserveContext);

  const navigate = useNavigate();
  const hotelId = location.pathname.split('/')[2];

  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);
  const price =
    roomData && numberOfDays * calculatePrice(roomData, selectedRooms);

  const handleChangeSelection = () => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
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
            className={styles['reserve__booking__details__content__day-length']}
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
                styles['reserve__booking__price-summary__content__price__item']
              }
            >
              <span>Two-Bedroom Superior Apartment</span>
              <span>US${price}</span>
            </div>
            <div
              className={
                styles['reserve__booking__price-summary__content__price__item']
              }
            >
              <span>5 % VAT</span>
              <span>US${price && (price * 0.05).toFixed(2)}</span>
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
        <div className={styles['reserve__booking__payment-schedule__content']}>
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
  );
};

export default ReserveSideBar;
