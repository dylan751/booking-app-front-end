import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Hotel } from '../../models/Hotel';
import styles from './FeaturedProperties.module.scss';

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<Hotel[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?featured=true&limit=4`,
  );

  const handleClick = (hotelId: number) => {
    navigate(`/hotels/${hotelId}`);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['featured-properties']}>
      {loading ? (
        'Loading Please wait'
      ) : (
        <>
          {data?.map((item) => (
            <div
              className={styles['featured-properties__item']}
              key={item._id}
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
              {item.rating && (
                <div className={styles['featured-properties__item__rating']}>
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;