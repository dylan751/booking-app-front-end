import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ReserveDetails from './ReserveDetails';
import ReserveFinalStep from './ReserveFinalStep';
import styles from './ReservePage.module.scss';

const ReservePage = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <Navbar />
      <div className={styles['reserve-page']}>
        {step === 1 && <ReserveDetails setStep={setStep} />}
        {step === 2 && <ReserveFinalStep setStep={setStep} />}
      </div>
    </>
  );
};

export default ReservePage;
