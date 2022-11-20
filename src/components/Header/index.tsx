import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

interface HeaderProps {
  type?: string;
}

export interface DatesInterface {
  startDate: Date;
  endDate: Date;
  key: string;
}

const Header = ({ type }: HeaderProps) => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const currentDate = new Date();
  const [dates, setDates] = useState<DatesInterface[]>([
    {
      startDate: currentDate,
      endDate: new Date(currentDate.getTime() + 86400000),
      key: 'selection',
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  const handleOption = (name: string, operation: 'd' | 'i') => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch &&
      dispatch({
        type: 'NEW_SEARCH',
        payload: { destination, dates, options },
      });
    navigate('/hotels', { state: { destination, dates, options } });
  };

  return (
    <div className={styles['header']}>
      <div
        className={`${styles['header__container']} ${
          type === 'list' ? styles['listMode'] : styles['']
        }`}
      >
        <div className={styles['header__container__list']}>
          <div
            className={`${styles['header__container__list__item']} ${styles['active']}`}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className={styles['header__container__list__item']}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <h1 className={styles['header__container__title']}>
              A lifetime of discounts? It is Genius.
            </h1>
            <p className={styles['header__container__description']}>
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free Zuongbooking account
            </p>
            {!user && (
              <button
                className={styles['header__container__btn']}
                onClick={handleClick}
              >
                Sign in / Register
              </button>
            )}
            <div className={styles['header__container__search']}>
              <div className={styles['header__container__search__item']}>
                <FontAwesomeIcon
                  icon={faBed}
                  className={styles['header__container__search__item__icon']}
                />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className={styles['header__container__search__item__input']}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className={styles['header__container__search__item']}>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className={styles['header__container__search__item__icon']}
                />
                <span
                  className={styles['header__container__search__item__text']}
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
                    className={styles['header__container__search__item__date']}
                  />
                )}
              </div>
              <div className={styles['header__container__search__item']}>
                <FontAwesomeIcon
                  icon={faPerson}
                  className={styles['header__container__search__item__icon']}
                />
                <span
                  className={styles['header__container__search__item__text']}
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adult ・ ${options.children} children ・ ${options.room} room`}
                </span>
                {openOptions && (
                  <div
                    className={
                      styles['header__container__search__item__options']
                    }
                  >
                    <div
                      className={
                        styles['header__container__search__item__options__item']
                      }
                    >
                      <span
                        className={
                          styles[
                            'header__container__search__item__options__item__text'
                          ]
                        }
                      >
                        Adult
                      </span>
                      <div
                        className={
                          styles[
                            'header__container__search__item__options__item__counter-container'
                          ]
                        }
                      >
                        <button
                          className={
                            styles[
                              'header__container__search__item__options__item__counter-btn'
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
                              'header__container__search__item__options__item__counter-number'
                            ]
                          }
                        >
                          {options.adult}
                        </span>
                        <button
                          className={
                            styles[
                              'header__container__search__item__options__item__counter-btn'
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
                        styles['header__container__search__item__options__item']
                      }
                    >
                      <span
                        className={
                          styles[
                            'header__container__search__item__options__item__text'
                          ]
                        }
                      >
                        Children
                      </span>
                      <div
                        className={
                          styles[
                            'header__container__search__item__options__item__counter-container'
                          ]
                        }
                      >
                        <button
                          className={
                            styles[
                              'header__container__search__item__options__item__counter-btn'
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
                              'header__container__search__item__options__item__counter-number'
                            ]
                          }
                        >
                          {options.children}
                        </span>
                        <button
                          className={
                            styles[
                              'header__container__search__item__options__item__counter-btn'
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
                        styles['header__container__search__item__options__item']
                      }
                    >
                      <span
                        className={
                          styles[
                            'header__container__search__item__options__item__text'
                          ]
                        }
                      >
                        Room
                      </span>
                      <div
                        className={
                          styles[
                            'header__container__search__item__options__item__counter-container'
                          ]
                        }
                      >
                        <button
                          className={
                            styles[
                              'header__container__search__item__options__item__counter-btn'
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
                              'header__container__search__item__options__item__counter-number'
                            ]
                          }
                        >
                          {options.room}
                        </span>
                        <button
                          className={
                            styles[
                              'header__container__search__item__options__item__counter-btn'
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
              <div className={styles['header__container__search__item']}>
                <button
                  className={styles['header__container__btn']}
                  onClick={handleSearch}
                  disabled={!destination}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;