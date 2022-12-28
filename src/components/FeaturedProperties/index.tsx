import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './FeaturedProperties.module.scss';
import FeaturedPropertiesSkeleton from '../LoadingSkeleton/FeaturedPropertiesSkeleton';

interface FeaturedPropertiesProps {
  type: string;
}

const FeaturedProperties = ({ type }: FeaturedPropertiesProps) => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<Hotel[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?type=${type}&featured=true&limit=4`,
  );

  const handleClick = (hotelId: number) => {
    navigate(`/hotels/${hotelId}`);
  };

  const [slidesNumber, setSlidesNumber] = useState(
    window.innerWidth > 1024
      ? 4
      : window.innerWidth > 768
      ? 3
      : window.innerWidth > 480
      ? 2
      : 1,
  );
  useEffect(() => {
    const handleResize = () => {
      setSlidesNumber(
        window.innerWidth > 1024
          ? 4
          : window.innerWidth > 768
          ? 3
          : window.innerWidth > 480
          ? 2
          : 1,
      );
    };

    window.addEventListener('resize', handleResize);
  }, [window.innerWidth]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['featured-properties']}>
      {loading ? (
        <FeaturedPropertiesSkeleton count={slidesNumber} />
      ) : (
        <Swiper spaceBetween={10} slidesPerView={slidesNumber}>
          {data?.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                className={styles['featured-properties__item']}
                onClick={() => handleClick(item._id)}
              >
                <img
                  src={item.photos[0]}
                  alt=""
                  className={styles['featured-properties__item__img']}
                />
                <span className={styles['featured-properties__item__name']}>
                  {item.name}
                </span>
                <span className={styles['featured-properties__item__address']}>
                  {item.address}
                </span>
                <span className={styles['featured-properties__item__price']}>
                  <p>Starting from</p> ${item.cheapestPrice}
                </span>
                {/* {item.rating && (
                <div className={styles['featured-properties__item__rating']}>
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )} */}
                <div className={styles['featured-properties__item__rating']}>
                  <>
                    <button>9.0</button>
                    <span>Excellent</span>
                  </>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FeaturedProperties;
