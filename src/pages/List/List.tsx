import { format } from 'date-fns';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { DateRange } from 'react-date-range';
import styles from './List.module.scss';
import SearchItem from '../../components/SearchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState<string>('0');
  const [max, setMax] = useState<string>('999');

  const { data, loading, error, reFetch } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?city=${destination}&min=${min}&max=${max}`,
  );

  const handleSearch = () => {
    reFetch();
  };

  return (
    <div className={styles['list']}>
      <Navbar />
      <Header type="list" />
      <div className={styles['list__container']}>
        <div className={styles['list__container__wrapper']}>
          <div className={styles['list__container__wrapper__search']}>
            <h1 className={styles['list__container__wrapper__search__title']}>
              Search
            </h1>
            <div className={styles['list__container__wrapper__search__item']}>
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                className={
                  styles['list__container__wrapper__search__item__input']
                }
              />
            </div>
            <div className={styles['list__container__wrapper__search__item']}>
              <label>Check-in Date</label>
              <span
                className={
                  styles['list__container__wrapper__search__item__span']
                }
                onClick={() => setOpenDate(!openDate)}
              >{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
                date[0].endDate,
                'MM/dd/yyyy',
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  ranges={date}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className={styles['list__container__wrapper__search__item']}>
              <label>Options</label>
              <div
                className={
                  styles['list__container__wrapper__search__item__option']
                }
              >
                <div
                  className={
                    styles[
                      'list__container__wrapper__search__item__option__item'
                    ]
                  }
                >
                  <span
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__text'
                      ]
                    }
                  >
                    Min price <small>per night</small>
                  </span>
                  <input
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__input'
                      ]
                    }
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div
                  className={
                    styles[
                      'list__container__wrapper__search__item__option__item'
                    ]
                  }
                >
                  <span
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__text'
                      ]
                    }
                  >
                    Max price <small>per night</small>
                  </span>
                  <input
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__input'
                      ]
                    }
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div
                  className={
                    styles[
                      'list__container__wrapper__search__item__option__item'
                    ]
                  }
                >
                  <span
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__text'
                      ]
                    }
                  >
                    Adult
                  </span>
                  <input
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__input'
                      ]
                    }
                    type="number"
                    min={1}
                    placeholder={options.adult}
                  />
                </div>
                <div
                  className={
                    styles[
                      'list__container__wrapper__search__item__option__item'
                    ]
                  }
                >
                  <span
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__text'
                      ]
                    }
                  >
                    Children
                  </span>
                  <input
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__input'
                      ]
                    }
                    type="number"
                    min={0}
                    placeholder={options.children}
                  />
                </div>
                <div
                  className={
                    styles[
                      'list__container__wrapper__search__item__option__item'
                    ]
                  }
                >
                  <span
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__text'
                      ]
                    }
                  >
                    Room
                  </span>
                  <input
                    className={
                      styles[
                        'list__container__wrapper__search__item__option__item__input'
                      ]
                    }
                    type="number"
                    min={1}
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className={styles['list__container__wrapper__result']}>
            {loading ? (
              'Loading Please wait'
            ) : (
              <>
                {data.map((item) => (
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

export default List;
