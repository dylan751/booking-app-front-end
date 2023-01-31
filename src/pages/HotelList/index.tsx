import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { DateRange } from 'react-date-range';
import './HotelList.css';
import styles from './HotelList.module.scss';
import SearchInput, { createFilter } from 'react-search-input';
import SearchItem from '../../components/SearchItem';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { SearchContext } from '../../context/SearchContext';
import SearchItemSkeleton from '../../components/LoadingSkeleton/SearchItemSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { City } from '../../models/City';
import Skeleton from 'react-loading-skeleton';
import HotelFilter from '../../components/HotelFilter';

interface OptionsInterface {
  adult: number;
  children: number;
  room: number;
}

const HotelList = () => {
  const location = useLocation();
  const { dispatch } = useContext(SearchContext);
  const { data: cityData } = useFetch<City[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/cities`,
  );

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
  const [value, setValue] = useState<number[]>([0, 500]);
  const [queryString, setQueryString] = useState<string>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?city=${destination}&min=${value[0]}&max=${value[1]}`,
  );

  const { data, loading, error, reFetch } = useFetch<Hotel[]>(queryString);

  const handleOption = (name: string, operation: 'd' | 'i') => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  useEffect(() => {
    setQueryString(
      `${process.env.REACT_APP_API_ENDPOINT}/hotels?city=${destination}&min=${value[0]}&max=${value[1]}`,
    );
  }, [value, destination]);

  const handleSearch = () => {
    dispatch &&
      dispatch({
        type: 'NEW_SEARCH',
        payload: { destination, dates, options },
      });
    reFetch();
  };

  const [searchTerm, setSearchTerm] = useState('');
  const KEYS_TO_FILTERS = ['name'];
  const filteredCity: any = cityData?.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );

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
            <div className="listSearchContainer">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination/property name</label>
                <div className="lsDestination">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                  <SearchInput
                    className={styles['header__container__search__item__input']}
                    placeholder="Where are you going?"
                    onChange={(e: any) => {
                      setSearchTerm(e);
                    }}
                    value={destination}
                  />
                  {searchTerm !== '' && (
                    <div
                      className={
                        styles['header__container__search__item__result']
                      }
                    >
                      {filteredCity.length ? (
                        filteredCity.map((city: City, index: number) => (
                          <div
                            className={
                              styles[
                                'header__container__search__item__result__item'
                              ]
                            }
                            key={index}
                          >
                            <img src={city.image || ''} alt="" />
                            <div
                              className={
                                styles[
                                  'header__container__search__item__result__item__city'
                                ]
                              }
                              onClick={(e: any) => {
                                setDestination(e.target.innerText);
                                setSearchTerm('');
                              }}
                            >
                              {city.name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>Không có kết quả phù hợp</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="lsItem">
                <label>Check-in - Check-out</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates[0].startDate,
                  'EE d MMM',
                )} – ${format(dates[0].endDate, 'EE d MMM')}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                    months={2}
                    direction="horizontal"
                    className={styles['header__container__search__item__date']}
                  />
                )}
              </div>
              <div className="lsItem">
                <div className="lsOption">
                  <div className={styles['header__container__search__item']}>
                    <span
                      className={
                        styles['header__container__search__item__text']
                      }
                      onClick={() => setOpenOptions(!openOptions)}
                    >
                      {`${options.adult} adults・${options.children} children・${options.room} room`}
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
                </div>
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>
            <HotelFilter
              queryString={queryString}
              setQueryString={setQueryString}
              city={destination}
              value={value}
              setValue={setValue}
            />
          </div>
          <div className="listResult">
            <>
              <h1>
                {loading ? (
                  <Skeleton width={300} />
                ) : (
                  `${destination || '...'}: ${data?.length} properties found`
                )}
              </h1>
              {loading ? (
                <SearchItemSkeleton count={6} />
              ) : data && data.length > 0 ? (
                data?.map((item) => <SearchItem item={item} key={item._id} />)
              ) : (
                <div
                  className={styles['reservation-page__container__empty']}
                >{`No hotel matches your search`}</div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
