import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { CountByCity } from '../../models/CountByCity';
import FeaturedCitySkeleton from '../LoadingSkeleton/FeaturedCitySkeleton';
import styles from './FeaturedCity.module.scss';

const FeaturedCity = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<CountByCity[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/count/byCity?cities=Krakow,New York,Madrid,Ha Noi,Nha Trang`,
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  const dummy_featured_1 = [
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max600/652923.webp?k=38c46c1be4120dd87755482ba1e719be391760be25977efbb6149691f0e861fb&o=',
      city: 'Krakow',
      propertyCount: data && data[0],
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max600/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=',
      city: 'New York',
      propertyCount: data && data[1],
    },
  ];

  const dummy_featured_2 = [
    {
      src: 'https://cf.bstatic.com/xdata/images/city/500x400/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=',
      city: 'Madrid',
      propertyCount: data && data[2],
    },
    {
      src: 'https://q-xx.bstatic.com/xdata/images/city/500x400/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=',
      city: 'Ha Noi',
      propertyCount: data && data[3],
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/500x400/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=',
      city: 'Nha Trang',
      propertyCount: data && data[4],
    },
  ];

  const currentDate = new Date();
  const handleClick = (city: string) => {
    navigate('/hotels', {
      state: {
        destination: city,
        dates: [
          {
            startDate: currentDate,
            endDate: new Date(currentDate.getTime() + 86400000),
            key: 'selection',
          },
        ],
        options: { adult: 1, children: 0, room: 1 },
        openDate: true,
      },
    });
  };

  return (
    <div className={styles['featured-city']}>
      <div className={styles['featured-city__container']}>
        <div className={styles['featured-city__container-1']}>
          {dummy_featured_1.map((featured, index) => (
            <div
              className={styles['featured-city__container-1__item']}
              key={index}
              onClick={() => handleClick(featured.city)}
            >
              {loading && <FeaturedCitySkeleton />}
              <img
                src={featured.src}
                alt=""
                className={styles['featured-city__container-1__item__img']}
              />
              <div
                className={styles['featured-city__container-1__item__title']}
              >
                <h1>{featured.city}</h1>
                <h2>{featured.propertyCount} properties</h2>
              </div>
            </div>
          ))}
        </div>
        <div className={styles['featured-city__container-2']}>
          {dummy_featured_2.map((featured, index) => (
            <div
              className={styles['featured-city__container-2__item']}
              key={index}
              onClick={() => handleClick(featured.city)}
            >
              {loading && <FeaturedCitySkeleton />}
              <img
                src={featured.src}
                alt=""
                className={styles['featured-city__container-2__item__img']}
              />
              <div
                className={styles['featured-city__container-2__item__title']}
              >
                <h1>{featured.city}</h1>
                <h2>{featured.propertyCount} properties</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCity;
