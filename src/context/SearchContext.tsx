import React from 'react';
import { createContext, useReducer } from 'react';

interface SearchContextProps {
  city: string | undefined;
  dates: any[];
  options: {
    adult: number;
    children: number;
    room: number;
  };
  dispatch?: React.Dispatch<any>;
}

const INITIAL_STATE: SearchContextProps = {
  city: undefined,
  dates: [],
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
