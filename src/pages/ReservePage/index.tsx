import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ReserveContext } from '../../context/ReserveContext';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { Room } from '../../models/Room';
import ReserveDetails from './ReserveDetails';
import ReserveFinalStep from './ReserveFinalStep';
import styles from './ReservePage.module.scss';

const ReservePage = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];

  const {
    data: hotelData,
    loading,
    error,
  } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${hotelId}`,
  );

  const { selectedRooms } = useContext(ReserveContext);
  const { data: roomData } = useFetch<Room[]>(
    `${
      process.env.REACT_APP_API_ENDPOINT
    }/rooms/multiple/${selectedRooms.toString()}`,
  );

  return (
    <>
      <Navbar />
      <div className={styles['reserve-page']}>
        {step === 1 && (
          <ReserveDetails
            setStep={setStep}
            hotel={hotelData}
            roomData={roomData}
          />
        )}
        {step === 2 && (
          <ReserveFinalStep
            setStep={setStep}
            hotel={hotelData}
            roomData={roomData}
          />
        )}
      </div>
    </>
  );
};

export default ReservePage;
