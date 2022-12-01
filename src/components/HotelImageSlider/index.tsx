import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './HotelImageSlider.module.scss';

interface HotelImageSliderProps {
  photos?: string[];
  setIsOpenSlider: any;
}

const HotelImageSlider = ({
  photos,
  setIsOpenSlider,
}: HotelImageSliderProps) => {
  const [slideNumber, setSlideNumber] = useState(0);

  const handleMoveSlider = (direction: string) => {
    let newSlideNumber;
    if (direction === 'left') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  return (
    <div className={styles['hotel-image__slider']}>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className={styles['hotel-image__slider__close']}
        onClick={() => setIsOpenSlider(false)}
      />
      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        className={styles['hotel-image__slider__arrow']}
        onClick={() => handleMoveSlider('left')}
      />
      <div className={styles['hotel-image__slider__wrapper']}>
        <img
          src={photos && photos[slideNumber]}
          alt=""
          className={styles['hotel-image__slider__wrapper__img']}
        />
      </div>
      <FontAwesomeIcon
        icon={faCircleArrowRight}
        className={styles['hotel-image__slider__arrow']}
        onClick={() => handleMoveSlider('right')}
      />
    </div>
  );
};

export default HotelImageSlider;
