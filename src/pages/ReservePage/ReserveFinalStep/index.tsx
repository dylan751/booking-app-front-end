import React from 'react';
import styles from './ReserveFinalStep.module.scss';

interface ReserveFinalStepProps {
  setStep: any;
}

const ReserveFinalStep = ({ setStep }: ReserveFinalStepProps) => {
  return (
    <div>
      <h1>ReserveFinalStep</h1>
      <button onClick={() => setStep(1)}>Previous</button>
      <button>Reserve</button>
    </div>
  );
};

export default ReserveFinalStep;
