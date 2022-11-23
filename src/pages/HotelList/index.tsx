import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { DateRange } from 'react-date-range';
import './HotelList.css';
import styles from './HotelList.module.scss';
import SearchItem from '../../components/SearchItem';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { SearchContext } from '../../context/SearchContext';
import { CountByCity } from '../../models/CountByCity';

interface OptionsInterface {
  adult: number;
  children: number;
  room: number;
}

const HotelList = () => {
  const location = useLocation();
  const { dispatch } = useContext(SearchContext);
  const currentDate = new Date();
  const [destination, setDestination] = useState(
    location.state?.destination || '',
  );
  const [dates, setDates] = useState(
    location.state?.dates || [
      {
        startDate: currentDate,
        endDate: new Date(currentDate.getTime() + 86400000),
        key: 'selection',
      },
    ],
  );
  const [openDate, setOpenDate] = useState(location.state?.openDate || false);
  const [options, setOptions] = useState<OptionsInterface>(
    location.state?.options || { adult: 1, children: 0, room: 1 },
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [min, setMin] = useState<string>('0');
  const [max, setMax] = useState<string>('999');

  const { data, loading, error, reFetch } = useFetch<Hotel[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?city=${destination}&min=${min}&max=${max}`,
  );

  const { data: countData } = useFetch<CountByCity[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/count/byCity?cities=${destination}`,
  );

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
    reFetch();
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                value={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy',
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
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
            <div className="lsItem">
              <label>1-night stay</label>
              <div className="lsOption">
                <div className={styles['header__container__search__item']}>
                  <span
                    className={styles['header__container__search__item__text']}
                    onClick={() => setOpenOptions(!openOptions)}
                  >
                    {`${options.adult} adult・${options.children} children・${options.room} room`}
                  </span>
                  {openOptions && (
                    <div
                      className={
                        styles['header__container__search__item__options']
                      }
                    >
                      <div
                        className={
                          styles[
                            'header__container__search__item__options__item'
                          ]
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
                          styles[
                            'header__container__search__item__options__item'
                          ]
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
                          styles[
                            'header__container__search__item__options__item'
                          ]
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
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                    placeholder="1"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                    placeholder="1000"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              'loading'
            ) : (
              <>
                <h1>
                  {destination || '...'}: {(countData && countData[0]) || '-'}{' '}
                  properties found
                </h1>
                {data?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
