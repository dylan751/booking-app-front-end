import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { ReserveContext } from '../../context/ReserveContext';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { Form } from '../../models/Form';
import { Hotel } from '../../models/Hotel';
import { Room } from '../../models/Room';
import ReserveDetails from './ReserveDetails';
import ReserveFinalStep from './ReserveFinalStep';
import styles from './ReservePage.module.scss';

const ReservePage = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];

  const { data: hotelData } = useFetch<Hotel>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/${hotelId}`,
  );

  const { selectedRooms } = useContext(ReserveContext);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { data: roomData } = useFetch<Room[]>(
    `${
      process.env.REACT_APP_API_ENDPOINT
    }/rooms/multiple/${selectedRooms.toString()}`,
  );

  const [formData, setFormData] = useState<Form>({
    userId: user._id,
    isTravelForWork: false,
    firstName: '',
    lastName: '',
    email: user.email || '',
    whoBookingFor: 0, // 0: i'm the main guest, 1: i'm booking for someone else
    specialRequest: '',
    country: '',
    phoneNumber: '',
    price: 0,
    hotelId: hotelId,
    roomIds: selectedRooms.toString(),
    startDate: dates[0].startDate,
    endDate: dates[0].endDate,
  });

  return (
    <>
      <Navbar />
      <div className={styles['reserve-page']}>
        {step === 1 && (
          <ReserveDetails
            setStep={setStep}
            hotel={hotelData}
            roomData={roomData}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <ReserveFinalStep
            setStep={setStep}
            hotel={hotelData}
            roomData={roomData}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </>
  );
};

export default ReservePage;
