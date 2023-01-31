import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { ReserveContext } from '../../context/ReserveContext';
import useFetch from '../../hooks/useFetch';
import { Room } from '../../models/Room';
import styles from './HotelRoomList.module.scss';

interface ReserveProps {
  hotelId: string;
}

const HotelRoomList = ({ hotelId }: ReserveProps) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [numberOfSelect, setNumberOfSelect] = useState<number>(0);
  const { data, error } = useFetch<Room[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/room/${hotelId}`,
  );
  const { dates, options } = useContext(SearchContext);
  const { dispatch: reserveDispatch } = useContext(ReserveContext);

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

  // Check if a room is available or not
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime()),
    );

    return !isFound;
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setNumberOfSelect(numberOfSelect + 1);
    } else {
      setNumberOfSelect(numberOfSelect - 1);
    }
  };

  const handleSelectRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value),
    );
  };

  const handleClickReserve = async () => {
    try {
      reserveDispatch &&
        reserveDispatch({
          type: 'NEW_RESERVE',
          payload: { selectedRooms },
        });
      navigate(`/reserve/${hotelId}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['hotel-room']}>
      <table className={styles['hotel-room__table']}>
        <tr>
          <th>Room type</th>
          <th>Sleeps</th>
          <th>Today price</th>
          <th>Select a room</th>
          <th></th>
        </tr>
        {data?.map((item, index) => (
          <tr key={index}>
            <td width="30%">
              <div className={styles['hotel-room__table__room']}>
                <div className={styles['hotel-room__table__room__type']}>
                  {item.title}
                </div>
                <div className={styles['hotel-room__table__room__description']}>
                  {item.description}
                </div>
                <div className={styles['hotel-room__table__room__tags']}>
                  {item.tags.map((tag, index) => (
                    <div
                      className={styles['hotel-room__table__room__tags__item']}
                      key={index}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={
                          styles['hotel-room__table__room__tags__item__icon']
                        }
                      />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </td>
            <td width="10%">
              <div className={styles['hotel-room__table__user']}>
                {Array(item.maxPeople)
                  .fill(0)
                  .map((index) => (
                    <FontAwesomeIcon icon={faUser} key={index} />
                  ))}
              </div>
            </td>
            <td width="20%">
              <div className={styles['hotel-room__table__price']}>
                <div>US${item.price}</div>
                <span className={styles['hotel-room__table__price__tax']}>
                  Includes taxes and charges
                </span>
                <span className={styles['hotel-room__table__price__credit']}>
                  Earn US${Math.floor(item.price * 0.05)} Credits (5%)
                </span>
              </div>
            </td>
            <td width="20%">
              {item.roomNumbers.map((roomNumber, index) => (
                <div
                  className={styles['hotel-room__table__room-select']}
                  key={index}
                >
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelectRoom}
                    disabled={
                      !isAvailable(roomNumber) || numberOfSelect >= options.room
                    }
                    onClick={handleCheckbox}
                  />
                </div>
              ))}
            </td>
            {index == 0 && (
              <td rowSpan={0}>
                <div className={styles['hotel-room__table__reserve']}>
                  <button
                    className={styles['hotel-room__table__reserve__btn']}
                    onClick={handleClickReserve}
                  >
                    {`I'll reserve`}
                  </button>
                  <div>
                    <ul>
                      <li>It only takes 2 minutes</li>
                      <li>Confirmation is immediate</li>
                      <li>No booking or credit card fees!</li>
                    </ul>
                  </div>
                  <span>
                    <strong>No credit card</strong> needed!
                  </span>
                </div>
              </td>
            )}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default HotelRoomList;
