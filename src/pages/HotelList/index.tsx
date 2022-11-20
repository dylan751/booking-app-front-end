import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { DateRange } from 'react-date-range';
import './HotelList.css';
import SearchItem from '../../components/SearchItem';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { SearchContext } from '../../context/SearchContext';

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
  const [min, setMin] = useState<string>('0');
  const [max, setMax] = useState<string>('999');

  const { data, loading, error, reFetch } = useFetch<Hotel[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?city=${destination}&min=${min}&max=${max}`,
  );

  const handleOption = (name: string, number: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: number,
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
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy',
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
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
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult.toString()}
                    onChange={(e) => handleOption('adult', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children.toString()}
                    onChange={(e) => handleOption('children', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room.toString()}
                    onChange={(e) => handleOption('room', e.target.value)}
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
