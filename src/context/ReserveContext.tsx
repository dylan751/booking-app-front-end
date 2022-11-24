import React from 'react';
import { createContext, useReducer } from 'react';

interface ReserveContextProps {
  selectedRooms: number[];
  dispatch?: React.Dispatch<any>;
}

const INITIAL_STATE: ReserveContextProps = {
  selectedRooms: [],
};

export const ReserveContext = createContext<ReserveContextProps>(INITIAL_STATE);

const ReserveReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_RESERVE':
      return action.payload;
    case 'RESET_RESERVE':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const ReserveContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(ReserveReducer, INITIAL_STATE);

  return (
    <ReserveContext.Provider
      value={{
        selectedRooms: state.selectedRooms,
        dispatch,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};
