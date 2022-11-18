import React from 'react';
import { createContext, useReducer } from 'react';
import { DatesInterface } from '../components/Header';

interface SearchContextProps {
  city: string | undefined;
  dates: DatesInterface[];
  options: {
    adult: number;
    children: number;
    room: number;
  };
  dispatch?: React.Dispatch<any>;
}

const currentDate = new Date();

const INITIAL_STATE: SearchContextProps = {
  city: undefined,
  dates: [
    {
      startDate: currentDate,
      endDate: new Date(currentDate.getTime() + 86400000),
      key: 'selection',
    },
  ],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext<SearchContextProps>(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return action.payload;
    case 'RESET_SEARCH':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
